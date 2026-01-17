/**
 * Telegram Service - Sends order notifications to registered team members
 */

import { db } from "@/lib/db";

const BOT_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

interface OrderItem {
	name: string;
	quantity: number;
	price: number;
	options?: string;
}

interface OrderData {
	orderId: string;
	customerName: string;
	customerPhone: string;
	customerLocation: string;
	items: OrderItem[];
	total: number;
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

	const itemsText = order.items
		.map((item) => {
			const optionsText = item.options ? `\n   ${item.options}` : "";
			return `  • ${item.name} x${item.quantity} - ${item.price.toFixed(2)} TND${optionsText}`;
		})
		.join("\n");

	const message = `🛒 <b>New Order #${order.orderId}</b>

<b>Customer:</b> ${order.customerName}
<b>Phone:</b> ${order.customerPhone}
<b>Location:</b> ${order.customerLocation}

<b>Items:</b>
${itemsText}

<b>Total:</b> ${order.total.toFixed(2)} TND`;

	const replyMarkup = {
		inline_keyboard: [
			[
				{
					text: "✅ Mark as Shipped",
					callback_data: `ship_${order.orderId}`,
				},
				{
					text: "📞 Call Customer",
					url: `tel:${order.customerPhone}`,
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
				console.error(`Failed to send to ${chatId}:`, error.description || response.statusText);
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