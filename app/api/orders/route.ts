import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { INGREDIENTS } from "@/data/ingredients";
import { db } from "@/lib/db";
import { getClientIP } from "@/lib/get-ip";
import { orderRatelimit } from "@/lib/ratelimit";
import { sendOrderNotification } from "@/lib/telegram";
import type { CartItem } from "@/types/cart";

interface OrderRequest {
	customerName: string;
	customerPhone: string;
	customerLocation: string;
	items: CartItem[];
	total: number;
}

function calculateItemNutrition(item: CartItem) {
	// For custom plates, calculate from ingredient selections
	if (item.selectedOptions.ingredientSelections) {
		const nutrition = item.selectedOptions.ingredientSelections.reduce(
			(acc, selection) => {
				const ingredient = INGREDIENTS.find(
					(i) => i.id === selection.ingredientId,
				);
				if (!ingredient || selection.quantity === 0) return acc;

				const multiplier = selection.quantity;
				return {
					calories:
						acc.calories + ingredient.nutritionPerUnit.calories * multiplier,
					protein:
						acc.protein + ingredient.nutritionPerUnit.protein * multiplier,
					carbs:
						(acc.carbs || 0) +
						(ingredient.nutritionPerUnit.carbs || 0) * multiplier,
					fat:
						(acc.fat || 0) +
						(ingredient.nutritionPerUnit.fat || 0) * multiplier,
					fiber: acc.fiber + ingredient.nutritionPerUnit.fiber * multiplier,
				};
			},
			{ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
		);

		return {
			calories: Math.round(nutrition.calories),
			protein: Number(nutrition.protein.toFixed(2)),
			carbs: nutrition.carbs ? Number(nutrition.carbs.toFixed(2)) : null,
			fat: nutrition.fat ? Number(nutrition.fat.toFixed(2)) : null,
			fiber: Number(nutrition.fiber.toFixed(2)),
		};
	}

	// For regular menu items, use menuItem nutrition
	return {
		calories: item.menuItem.nutrition.calories,
		protein: Number(item.menuItem.nutrition.protein.toFixed(2)),
		carbs: item.menuItem.nutrition.carbs
			? Number(item.menuItem.nutrition.carbs.toFixed(2))
			: null,
		fat: item.menuItem.nutrition.fat
			? Number(item.menuItem.nutrition.fat.toFixed(2))
			: null,
		fiber: Number(item.menuItem.nutrition.fiber.toFixed(2)),
	};
}

function calculateItemPrice(item: CartItem): number {
	const basePrice = item.menuItem.priceTnd || 0;

	// For custom plates, calculate from ingredient selections
	if (item.selectedOptions.ingredientSelections) {
		return item.selectedOptions.ingredientSelections.reduce(
			(sum, selection) => {
				const ingredient = INGREDIENTS.find(
					(i) => i.id === selection.ingredientId,
				);
				return sum + (ingredient?.unitPriceTnd || 0) * selection.quantity;
			},
			0,
		);
	}

	// For regular items, add extras price
	const extrasPrice =
		item.selectedOptions.extras?.reduce((sum, extraId) => {
			const extra = item.menuItem.options?.extras?.find(
				(e) => e.id === extraId,
			);
			return sum + (extra?.priceTnd || 0);
		}, 0) || 0;

	return basePrice + extrasPrice;
}

export async function POST(request: Request) {
	try {
		// Rate limiting: Use both IP and phone number as identifiers
		const ip = await getClientIP();
		const body: OrderRequest = await request.json();
		
		// Rate limit by IP address
		const ipLimit = await orderRatelimit.limit(`ip:${ip}`);
		if (!ipLimit.success) {
			return NextResponse.json(
				{
					error: "Too many requests. Please wait a few minutes before placing another order.",
				},
				{
					status: 429,
					headers: {
						"Retry-After": String(ipLimit.reset - Date.now()),
						"X-RateLimit-Limit": "5",
						"X-RateLimit-Remaining": String(ipLimit.remaining),
						"X-RateLimit-Reset": String(ipLimit.reset),
					},
				},
			);
		}

		// Rate limit by phone number (prevents same customer spamming)
		if (body.customerPhone) {
			const phoneLimit = await orderRatelimit.limit(`phone:${body.customerPhone}`);
			if (!phoneLimit.success) {
				return NextResponse.json(
					{
						error: "Too many orders from this phone number. Please wait a few minutes.",
					},
					{
						status: 429,
						headers: {
							"Retry-After": String(phoneLimit.reset - Date.now()),
							"X-RateLimit-Limit": "5",
							"X-RateLimit-Remaining": String(phoneLimit.remaining),
							"X-RateLimit-Reset": String(phoneLimit.reset),
						},
					},
				);
			}
		}

		// Validation
		if (!body.customerName || !body.customerPhone || !body.customerLocation) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		if (!body.items || body.items.length === 0) {
			return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
		}

		const orderNumber = `SA7A-${randomInt(100000, 999999)}`;

		// Find or create customer
		const customer = await db.customer.upsert({
			where: { phone: body.customerPhone },
			update: {
				name: body.customerName,
				location: body.customerLocation,
			},
			create: {
				name: body.customerName,
				phone: body.customerPhone,
				location: body.customerLocation,
			},
		});

		// Format items for Telegram notification
		const formattedItems = body.items.map((item) => {
			const isCustomPlate = !!item.selectedOptions.ingredientSelections;
			let options = "";

			if (item.selectedOptions.ingredientSelections) {
				const selections = item.selectedOptions.ingredientSelections
					.filter((s) => s.quantity > 0)
					.map((s) => `${s.ingredientId} x${s.quantity}`)
					.join(", ");
				if (selections) {
					options = selections;
				}
			}

			if (item.selectedOptions.extras?.length) {
				const extras = item.selectedOptions.extras.join(", ");
				options = options
					? `${options}, Extras: ${extras}`
					: `Extras: ${extras}`;
			}

			if (item.selectedOptions.sauce) {
				options = options
					? `${options}, Sauce: ${item.selectedOptions.sauce}`
					: `Sauce: ${item.selectedOptions.sauce}`;
			}

			if (item.selectedOptions.notes) {
				options = options
					? `${options}, Notes: ${item.selectedOptions.notes}`
					: `Notes: ${item.selectedOptions.notes}`;
			}

			const unitPrice = calculateItemPrice(item);
			return {
				name: item.menuItem.nameKey, // Keep nameKey for translation
				nameKey: item.menuItem.nameKey,
				quantity: item.quantity,
				price: unitPrice * item.quantity,
				isCustomPlate,
				ingredientSelections: item.selectedOptions.ingredientSelections,
				extras: item.selectedOptions.extras,
				sauce: item.selectedOptions.sauce,
				removedIngredients: item.selectedOptions.removeIngredients,
				notes: item.selectedOptions.notes,
			};
		});

		// Create order with all items and related data
		const order = await db.order.create({
			data: {
				orderNumber,
				customerId: customer.id,
				total: body.total,
				status: "PENDING",
				items: {
					create: body.items.map((item) => {
						const unitPrice = calculateItemPrice(item);
						const nutrition = calculateItemNutrition(item);
						const isCustomPlate = !!item.selectedOptions.ingredientSelections;

						return {
							menuItemId: isCustomPlate ? null : item.menuItem.id,
							isCustomPlate,
							name: item.menuItem.nameKey,
							quantity: item.quantity,
							unitPrice,
							totalPrice: unitPrice * item.quantity,
							selectedSauce: item.selectedOptions.sauce || null,
							notes: item.selectedOptions.notes || null,
							calories: nutrition.calories,
							protein: nutrition.protein,
							carbs: nutrition.carbs,
							fat: nutrition.fat,
							fiber: nutrition.fiber,
							// Custom plate ingredients
							ingredients: isCustomPlate
								? {
										create: item.selectedOptions
											.ingredientSelections!.filter((s) => s.quantity > 0)
											.map((selection) => ({
												ingredientId: selection.ingredientId,
												quantity: selection.quantity,
											})),
									}
								: undefined,
							// Regular item extras
							extras:
								!isCustomPlate && item.selectedOptions.extras?.length
									? {
											create: item.selectedOptions.extras.map((extraId) => ({
												extraId,
											})),
										}
									: undefined,
							// Removed ingredients
							removedIngredients: item.selectedOptions.removeIngredients?.length
								? {
										create: item.selectedOptions.removeIngredients.map(
											(ingredientId) => ({
												ingredientId,
											}),
										),
									}
								: undefined,
						};
					}),
				},
			},
			include: {
				customer: true,
				items: {
					include: {
						ingredients: true,
						extras: true,
						removedIngredients: true,
					},
				},
			},
		});

		// Send to Telegram
		const { messageIds } = await sendOrderNotification({
			orderId: orderNumber,
			customerName: body.customerName,
			customerPhone: body.customerPhone,
			customerLocation: body.customerLocation,
			items: formattedItems,
			total: body.total,
		});

		// Update order with Telegram message IDs (store first one)
		if (messageIds.length > 0) {
			await db.order.update({
				where: { id: order.id },
				data: {
					telegramMessageId: messageIds[0]?.messageId,
					telegramChatId: messageIds[0]?.chatId,
				},
			});
		}

		return NextResponse.json({
			success: true,
			orderId: orderNumber,
		});
	} catch (error) {
		console.error("Order submission error:", error);
		return NextResponse.json(
			{ error: "Failed to submit order" },
			{ status: 500 },
		);
	}
}
