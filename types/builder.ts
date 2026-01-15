import { Nutrition } from "@/types/menu";

export type MealSize = "standard" | "large" | "xl";
export type SpicyLevel = 0 | 1 | 2 | 3;

export interface BuilderConfig {
	mealId: string | "custom";
	size: MealSize;
	toggles: {
		noOnions: boolean;
		spicyLevel: SpicyLevel;
	};
	portions: {
		protein: number;
		carbs: number;
		veg: number;
		fat: number;
	};
}

export interface ComputedMeal {
	nutrition: Nutrition;
	priceTnd: number;
	summary: string; // Human-readable summary for cart
}

export interface BuilderDraft extends BuilderConfig {
	timestamp: number;
}
