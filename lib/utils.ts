import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTnd(amount: number): string {
	return `${amount.toFixed(2)} TND`;
}

export function formatCurrency(amount: number, currency = "TND"): string {
	return `${amount.toFixed(2)} ${currency}`;
}

/**
 * Creates a stable hash from a string or object for use as cartItemId
 */
export function hashObject(obj: unknown): string {
	const str =
		typeof obj === "string"
			? obj
			: JSON.stringify(obj, Object.keys(obj as Record<string, unknown>).sort());
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return Math.abs(hash).toString(36);
}
