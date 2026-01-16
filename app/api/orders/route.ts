import { sendOrderNotification } from "@/lib/telegram";
import { db } from "@/lib/db";
import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import type { CartItem } from "@/types/cart";

interface OrderRequest {
	customerName: string;
	customerPhone: string;
	customerLocation: string;
	items: CartItem[];
	total: number;
}

export async function POST(request: Request) {
	try {
		const body: OrderRequest = await request.json();

		if (!body.customerName || !body.customerPhone || !body.customerLocation) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		if (!body.items || body.items.length === 0) {
			return NextResponse.json(
				{ error: "Cart is empty" },
				{ status: 400 },
			);
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

		// Format items for storage and Telegram
		const formattedItems = body.items.map((item) => {
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
				options = options ? `${options}, Extras: ${extras}` : `Extras: ${extras}`;
			}

			if (item.selectedOptions.sauce) {
				options = options ? `${options}, Sauce: ${item.selectedOptions.sauce}` : `Sauce: ${item.selectedOptions.sauce}`;
			}

			if (item.selectedOptions.notes) {
				options = options ? `${options}, Notes: ${item.selectedOptions.notes}` : `Notes: ${item.selectedOptions.notes}`;
			}

			return {
				name: item.menuItem.nameKey,
				quantity: item.quantity,
				price: (item.menuItem.priceTnd || 0) * item.quantity,
				options: options || undefined,
			};
		});

		// Create order in database
		const order = await db.order.create({
			data: {
				orderNumber,
				customerId: customer.id,
				customerName: body.customerName,
				customerPhone: body.customerPhone,
				customerLocation: body.customerLocation,
				total: body.total,
				items: body.items as unknown as object, // Store full cart items
				status: "PENDING",
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