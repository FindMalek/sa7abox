/**
 * Telegram Service - Sends order notifications to registered team members
 */

import { getTranslations } from "next-intl/server";
import { INGREDIENTS } from "@/data/ingredients";
import { MENU_ITEMS } from "@/data/menu-items";
import { db } from "@/lib/db";

const BOT_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

interface OrderItem {
	name: string;
	nameKey?: string; // Translation key
	quantity: number;
	price: number;
	isCustomPlate?: boolean;
	ingredientSelections?: Array<{ ingredientId: string; quantity: number }>;
	extras?: string[];
	sauce?: string;
	removedIngredients?: string[];
	notes?: string;
}

interface OrderData {
	orderId: string;
	customerName: string;
	customerPhone: string;
	customerLocation: string;
	items: OrderItem[];
	total: number;
	status?:
		| "PENDING"
		| "PREPARING"
		| "READY"
		| "SHIPPED"
		| "DELIVERED"
		| "CANCELLED";
}

/**
 * Get all registered chat IDs from database
 */
async function getRegisteredChatIds(): Promise<string[]> {
	const subscribers = await db.telegramSubscriber.findMany({
		select: { telegramChatId: true },
	});
	return subscribers.map((s) => s.telegramChatId);
}

/**
 * Format order items for Telegram message
 */
function formatOrderItems(
	items: OrderItem[],
	t: (key: string) => string,
): string {
	return items
		.map((item, index) => {
			const itemName = item.nameKey ? t(item.nameKey) : item.name;
			const itemPrice = item.price.toFixed(2);
			const parts: string[] = [];

			// Item header
			parts.push(
				`<b>${index + 1}. ${itemName}</b> x${item.quantity} - ${itemPrice} TND`,
			);

			// Custom plate ingredients
			if (item.isCustomPlate && item.ingredientSelections?.length) {
				const ingredients = item.ingredientSelections
					.filter((sel) => sel.quantity > 0)
					.map((sel) => {
						const ingredient = INGREDIENTS.find(
							(i) => i.id === sel.ingredientId,
						);
						const name = ingredient ? t(ingredient.nameKey) : sel.ingredientId;
						return `${name} x${sel.quantity}`;
					})
					.join(", ");
				if (ingredients) {
					parts.push(`   🥗 ${ingredients}`);
				}
			}

			// Regular item extras
			if (!item.isCustomPlate && item.extras?.length) {
				const extrasList = item.extras
					.map((extraId) => {
						// Find extra label from menu items
						for (const menuItem of MENU_ITEMS) {
							const extra = menuItem.options?.extras?.find(
								(e) => e.id === extraId,
							);
							if (extra) return extra.label;
						}
						return extraId;
					})
					.join(", ");
				parts.push(`   ➕ Extras: ${extrasList}`);
			}

			// Sauce
			if (item.sauce) {
				parts.push(`   🍯 Sauce: ${item.sauce}`);
			}

			// Removed ingredients
			if (item.removedIngredients?.length) {
				parts.push(`   ❌ Remove: ${item.removedIngredients.join(", ")}`);
			}

			// Notes
			if (item.notes) {
				parts.push(`   📝 Note: "${item.notes}"`);
			}

			return parts.join("\n");
		})
		.join("\n\n");
}

/**
 * Get status emoji and text
 */
function getStatusDisplay(
	status: OrderData["status"],
	t: (key: string) => string,
): string {
	const statusMap = {
		PENDING: "⏳ Pending",
		PREPARING: "👨‍🍳 Preparing",
		READY: "📦 Ready",
		SHIPPED: "🚚 Shipped",
		DELIVERED: "✅ Delivered",
		CANCELLED: "❌ Cancelled",
	};
	return statusMap[status as keyof typeof statusMap] || statusMap.PENDING;
}

/**
 * Build order message text
 */
function buildOrderMessage(
	order: OrderData,
	t: (key: string) => string,
): string {
	const statusDisplay = getStatusDisplay(order.status, t);
	const itemsText = formatOrderItems(order.items, t);

	return `🛒 <b>Order #${order.orderId}</b> ${statusDisplay}

<b>Customer:</b> ${order.customerName}
<b>Phone:</b> ${order.customerPhone}
<b>Location:</b> ${order.customerLocation}

<b>Items:</b>
${itemsText}

<b>Total:</b> ${order.total.toFixed(2)} TND`;
}

/**
 * Send order notification to all registered team members
 */
export async function sendOrderNotification(order: OrderData): Promise<{
	messageIds: Array<{ chatId: string; messageId: number }>;
}> {
	if (!BOT_API_URL) {
		throw new Error("Telegram bot token not configured");
	}

	const chatIds = await getRegisteredChatIds();
	if (chatIds.length === 0) {
		console.warn("No registered chat IDs found. Order not sent to Telegram.");
		return { messageIds: [] };
	}

	// Get translations (default to English)
	let t: (key: string) => string;
	try {
		const translations = await getTranslations({ locale: "en" });
		t = (key: string) => translations(key) || key;
	} catch {
		// Fallback if translations fail
		t = (key: string) => key;
	}

	const message = buildOrderMessage(order, t);

	const replyMarkup = {
		inline_keyboard: [
			[
				{
					text: "✅ Mark as Shipped",
					callback_data: `ship_${order.orderId}`,
				},
				{
					text: "📞 Show Phone",
					callback_data: `phone_${order.orderId}`,
				},
			],
			[
				{
					text: "👨‍🍳 Preparing",
					callback_data: `preparing_${order.orderId}`,
				},
				{
					text: "📦 Ready",
					callback_data: `ready_${order.orderId}`,
				},
			],
			[
				{
					text: "📱 WhatsApp",
					url: `https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}`,
				},
				{
					text: "📍 View Location",
					url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.customerLocation)}`,
				},
			],
		],
	};

	const messageIds: Array<{ chatId: string; messageId: number }> = [];

	// Send to all registered chat IDs
	const promises = chatIds.map(async (chatId) => {
		try {
			const response = await fetch(`${BOT_API_URL}/sendMessage`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
					parse_mode: "HTML",
					reply_markup: replyMarkup,
				}),
			});

			if (!response.ok) {
				const error = await response.json().catch(() => ({}));
				console.error(
					`Failed to send to ${chatId}:`,
					error.description || response.statusText,
				);
				return null;
			}

			const data = await response.json();
			if (data.result?.message_id) {
				messageIds.push({ chatId, messageId: data.result.message_id });
			}
		} catch (error) {
			console.error(`Error sending to ${chatId}:`, error);
		}
		return null;
	});

	await Promise.allSettled(promises);
	return { messageIds };
}

/**
 * Update order message with new status
 */
export async function updateOrderMessage(
	orderNumber: string,
	chatId: string,
	messageId: number,
): Promise<void> {
	if (!BOT_API_URL) {
		return;
	}

	// Get order from database
	const order = await db.order.findUnique({
		where: { orderNumber },
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

	if (!order) {
		console.error(`Order ${orderNumber} not found`);
		return;
	}

	// Get translations
	let t: (key: string) => string;
	try {
		const translations = await getTranslations({ locale: "en" });
		t = (key: string) => translations(key) || key;
	} catch {
		t = (key: string) => key;
	}

	// Format items for message
	const formattedItems: OrderItem[] = order.items.map((item) => {
		const menuItem = MENU_ITEMS.find((m) => m.id === item.menuItemId);
		return {
			name: item.name,
			nameKey: menuItem?.nameKey || item.name,
			quantity: item.quantity,
			price: Number(item.totalPrice),
			isCustomPlate: item.isCustomPlate,
			ingredientSelections: item.ingredients.map((ing) => ({
				ingredientId: ing.ingredientId,
				quantity: ing.quantity,
			})),
			extras: item.extras.map((e) => e.extraId),
			sauce: item.selectedSauce || undefined,
			removedIngredients: item.removedIngredients.map((r) => r.ingredientId),
			notes: item.notes || undefined,
		};
	});

	const orderData: OrderData = {
		orderId: order.orderNumber,
		customerName: order.customer.name,
		customerPhone: order.customer.phone,
		customerLocation: order.customer.location || "",
		items: formattedItems,
		total: Number(order.total),
		status: order.status as OrderData["status"],
	};

	const message = buildOrderMessage(orderData, t);

	// Update message
	try {
		await fetch(`${BOT_API_URL}/editMessageText`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				message_id: messageId,
				text: message,
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "✅ Mark as Shipped",
								callback_data: `ship_${order.orderNumber}`,
							},
							{
								text: "📞 Show Phone",
								callback_data: `phone_${order.orderNumber}`,
							},
						],
						[
							{
								text: "👨‍🍳 Preparing",
								callback_data: `preparing_${order.orderNumber}`,
							},
							{
								text: "📦 Ready",
								callback_data: `ready_${order.orderNumber}`,
							},
						],
						[
							{
								text: "📱 WhatsApp",
								url: `https://wa.me/${order.customer.phone.replace(/[^0-9]/g, "")}`,
							},
							{
								text: "📍 View Location",
								url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.customer.location || "")}`,
							},
						],
					],
				},
			}),
		});
	} catch (error) {
		console.error("Failed to update message:", error);
	}
}

/**
 * Register a chat ID (called when user sends /start)
 */
export async function registerChatId(
	chatId: string,
	username?: string,
): Promise<void> {
	await db.telegramSubscriber.upsert({
		where: { telegramChatId: chatId },
		update: {
			username: username || null,
		},
		create: {
			telegramChatId: chatId,
			username: username || null,
		},
	});
}

/**
 * Answer callback query (for button clicks)
 */
export async function answerCallbackQuery(
	callbackQueryId: string,
	text?: string,
	showAlert = false,
): Promise<void> {
	if (!BOT_API_URL) {
		console.error("Telegram bot token not configured");
		return;
	}

	try {
		const response = await fetch(`${BOT_API_URL}/answerCallbackQuery`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
				text,
				show_alert: showAlert,
			}),
		});

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			throw new Error(
				`Telegram API error: ${error.description || response.statusText}`,
			);
		}
	} catch (error) {
		console.error("Failed to answer callback query:", error);
		throw error;
	}
}

/**
 * Send welcome message when user registers
 */
export async function sendWelcomeMessage(chatId: string): Promise<void> {
	if (!BOT_API_URL) {
		return;
	}

	const message = `✅ <b>You're registered!</b>

You will now receive order notifications from Sa7a Box.

<b>Commands:</b>
/start - Register for notifications
/help - Show help

You're all set! 🎉`;

	try {
		await fetch(`${BOT_API_URL}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: message,
				parse_mode: "HTML",
			}),
		});
	} catch (error) {
		console.error("Failed to send welcome message:", error);
	}
}
