import type { IngredientBuilderDraft } from "@/types/ingredient-builder";

const CART_STORAGE_KEY = "sa7abox_cart";

export function saveCartToStorage(state: unknown): void {
	try {
		if (typeof window === "undefined") return;
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
	} catch (error) {
		console.error("Failed to save cart to storage:", error);
	}
}

export function loadCartFromStorage(): unknown | null {
	try {
		if (typeof window === "undefined") return null;
		const stored = localStorage.getItem(CART_STORAGE_KEY);
		return stored ? JSON.parse(stored) : null;
	} catch (error) {
		console.error("Failed to load cart from storage:", error);
		return null;
	}
}

export function clearCartStorage(): void {
	try {
		if (typeof window === "undefined") return;
		localStorage.removeItem(CART_STORAGE_KEY);
	} catch (error) {
		console.error("Failed to clear cart storage:", error);
	}
}

const BUILDER_STORAGE_KEY = "sa7abox_ingredient_builder_draft";

export function saveBuilderDraft(draft: IngredientBuilderDraft): void {
	try {
		if (typeof window === "undefined") return;
		localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(draft));
	} catch (error) {
		console.error("Failed to save builder draft:", error);
	}
}

export function loadBuilderDraft(): IngredientBuilderDraft | null {
	try {
		if (typeof window === "undefined") return null;
		const stored = localStorage.getItem(BUILDER_STORAGE_KEY);
		if (!stored) return null;
		const parsed = JSON.parse(stored);
		if (
			parsed.selections &&
			Array.isArray(parsed.selections) &&
			parsed.timestamp
		) {
			return parsed as IngredientBuilderDraft;
		}
		return null;
	} catch (error) {
		console.error("Failed to load builder draft:", error);
		return null;
	}
}

export function clearBuilderDraft(): void {
	try {
		if (typeof window === "undefined") return;
		localStorage.removeItem(BUILDER_STORAGE_KEY);
	} catch (error) {
		console.error("Failed to clear builder draft:", error);
	}
}
