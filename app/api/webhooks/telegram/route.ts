import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
	answerCallbackQuery,
	registerChatId,
	sendWelcomeMessage,
} from "@/lib/telegram";

export async function POST(request: Request) {
	try {
		const update = await request.json();

		// Handle callback queries (button clicks)
		if (update.callback_query) {
			const { data, id: callbackQueryId, message } = update.callback_query;

			if (data?.startsWith("ship_")) {
				const orderNumber = data.replace("ship_", "");

				// Update order status
				await db.order.update({
					where: { orderNumber },
					data: { status: "SHIPPED" },
				});

				await answerCallbackQuery(
					callbackQueryId,
					`✅ Order #${orderNumber} marked as shipped!`,
				);
			}

			if (data?.startsWith("preparing_")) {
				const orderNumber = data.replace("preparing_", "");

				await db.order.update({
					where: { orderNumber },
					data: { status: "PREPARING" },
				});

				await answerCallbackQuery(
					callbackQueryId,
					`👨‍🍳 Order #${orderNumber} marked as preparing!`,
				);
			}

			if (data?.startsWith("ready_")) {
				const orderNumber = data.replace("ready_", "");

				await db.order.update({
					where: { orderNumber },
					data: { status: "READY" },
				});

				await answerCallbackQuery(
					callbackQueryId,
					`📦 Order #${orderNumber} marked as ready!`,
				);
			}

			return NextResponse.json({ ok: true });
		}

		// Handle /start command - Register user
		if (update.message?.text?.startsWith("/start")) {
			const chatId = update.message.chat.id.toString();
			const from = update.message.from;

			await registerChatId(chatId, {
				username: from?.username,
				firstName: from?.first_name,
				lastName: from?.last_name,
			});

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
