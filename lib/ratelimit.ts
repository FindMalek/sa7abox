import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiter for order submissions
// Allows 5 orders per 10 minutes per identifier (IP or phone)
export const orderRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "10 m"),
	analytics: true,
	prefix: "@sa7abox/ratelimit/orders",
});

// Rate limiter for Telegram webhook (more lenient)
// Allows 100 requests per minute per IP
export const webhookRatelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(100, "1 m"),
	analytics: true,
	prefix: "@sa7abox/ratelimit/webhook",
});