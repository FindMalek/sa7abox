import { headers } from "next/headers";

/**
 * Get client IP address from request headers
 * Optimized for Vercel deployment
 */
export async function getClientIP(): Promise<string> {
	const headersList = await headers();

	// Vercel-specific: Check x-vercel-forwarded-for first
	const vercelForwarded = headersList.get("x-vercel-forwarded-for");
	if (vercelForwarded) {
		return vercelForwarded.split(",")[0].trim();
	}

	// Standard: Check x-forwarded-for (for proxies, load balancers, etc.)
	const forwarded = headersList.get("x-forwarded-for");
	if (forwarded) {
		return forwarded.split(",")[0].trim();
	}

	// Alternative: Check x-real-ip
	const realIP = headersList.get("x-real-ip");
	if (realIP) {
		return realIP;
	}

	// Fallback to a default identifier
	return "unknown";
}
