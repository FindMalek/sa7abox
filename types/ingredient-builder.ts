import type { Nutrition } from "./menu";

export interface IngredientSelection {
	ingredientId: string;
	quantity: number;
}

export interface IngredientBuilderConfig {
	selections: IngredientSelection[];
}

export interface ComputedPlate {
	nutrition: Nutrition;
	priceTnd: number;
	summary: string; // e.g. "Rice x1, Chicken Breast x2, Salad x1"
}

export interface IngredientBuilderDraft extends IngredientBuilderConfig {
	timestamp: number;
}
