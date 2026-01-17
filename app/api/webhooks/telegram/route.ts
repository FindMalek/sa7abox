import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
	answerCallbackQuery,
	registerChatId,
	sendWelcomeMessage,
	updateOrderMessage,
} from "@/lib/telegram";

export async function POST(request: Request) {
	try {
		const update = await request.json();

		// Handle callback queries (button clicks)
		if (update.callback_query) {
			const {
				data,
				id: callbackQueryId,
				message: callbackMessage,
			} = update.callback_query;

			if (data?.startsWith("ship_")) {
				const orderNumber = data.replace("ship_", "");

				// Update order status
				const order = await db.order.update({
					where: { orderNumber },
					data: { status: "SHIPPED" },
					include: {
						customer: true,
					},
				});

				// Update Telegram message if we have message info
				if (callbackMessage?.chat?.id && callbackMessage?.message_id) {
					await updateOrderMessage(
						orderNumber,
						callbackMessage.chat.id.toString(),
						callbackMessage.message_id,
					);
				}

				await answerCallbackQuery(
					callbackQueryId,
					`✅ Order #${orderNumber} marked as shipped!`,
				);
			}

			if (data?.startsWith("preparing_")) {
				const orderNumber = data.replace("preparing_", "");

				const order = await db.order.update({
					where: { orderNumber },
					data: { status: "PREPARING" },
					include: {
						customer: true,
					},
				});

				// Update Telegram message
				if (callbackMessage?.chat?.id && callbackMessage?.message_id) {
					await updateOrderMessage(
						orderNumber,
						callbackMessage.chat.id.toString(),
						callbackMessage.message_id,
					);
				}

				await answerCallbackQuery(
					callbackQueryId,
					`👨‍🍳 Order #${orderNumber} marked as preparing!`,
				);
			}

			if (data?.startsWith("ready_")) {
				const orderNumber = data.replace("ready_", "");

				const order = await db.order.update({
					where: { orderNumber },
					data: { status: "READY" },
					include: {
						customer: true,
					},
				});

				// Update Telegram message
				if (callbackMessage?.chat?.id && callbackMessage?.message_id) {
					await updateOrderMessage(
						orderNumber,
						callbackMessage.chat.id.toString(),
						callbackMessage.message_id,
					);
				}

				await answerCallbackQuery(
					callbackQueryId,
					`📦 Order #${orderNumber} marked as ready!`,
				);
			}

			if (data?.startsWith("phone_")) {
				const orderNumber = data.replace("phone_", "");

				// Get order to find customer phone
				const order = await db.order.findUnique({
					where: { orderNumber },
					include: { customer: true },
				});

				if (order) {
					await answerCallbackQuery(
						callbackQueryId,
						`📞 Customer Phone: ${order.customer.phone}`,
						true, // show_alert = true to show in alert popup
					);
				} else {
					await answerCallbackQuery(callbackQueryId, "Order not found");
				}
			}

			return NextResponse.json({ ok: true });
		}

		// Handle /start command - Register user
		if (update.message?.text?.startsWith("/start")) {
			const chatId = update.message.chat.id.toString();
			const from = update.message.from;

			await registerChatId(chatId, from?.username);

			await sendWelcomeMessage(chatId);

			return NextResponse.json({ ok: true });
		}

		// Handle /help command
		if (update.message?.text?.startsWith("/help")) {
			const chatId = update.message.chat.id.toString();

			await fetch(
				`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						chat_id: chatId,
						text: "📖 <b>Sa7a Box Bot Commands</b>\n\n/start - Register for order notifications\n/help - Show this help",
						parse_mode: "HTML",
					}),
				},
			);

			return NextResponse.json({ ok: true });
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Telegram webhook error:", error);
		return NextResponse.json({ ok: true }, { status: 200 });
	}
}
