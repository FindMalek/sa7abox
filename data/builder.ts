import type { MealSize } from "@/types/builder";

// Size price modifiers
export const SIZE_MODIFIERS: Record<MealSize, number> = {
	standard: 0,
	large: 5,
	xl: 10,
};

// Portion system constants
export const PORTION_CONFIG = {
	protein: {
		label: "Protein",
		min: 0,
		max: 4,
		nutritionPerPortion: {
			calories: 120,
			protein: 25,
			carbs: 0,
			fat: 0,
			fiber: 0,
		},
		pricePerPortion: 2,
	},
	carbs: {
		label: "Carbs",
		min: 0,
		max: 4,
		nutritionPerPortion: {
			calories: 130,
			protein: 0,
			carbs: 30,
			fat: 0,
			fiber: 0,
		},
		pricePerPortion: 1.5,
	},
	veg: {
		label: "Veg/Fiber",
		min: 0,
		max: 4,
		nutritionPerPortion: {
			calories: 25,
			protein: 0,
			carbs: 0,
			fat: 0,
			fiber: 1,
		},
		pricePerPortion: 0.5,
	},
	fat: {
		label: "Fat/Sauce",
		min: 0,
		max: 3,
		nutritionPerPortion: {
			calories: 90,
			protein: 0,
			carbs: 0,
			fat: 10,
			fiber: 0,
		},
		pricePerPortion: 1,
	},
} as const;

// Spicy level labels
export const SPICY_LABELS = ["Not spicy", "Mild", "Medium", "Hot"] as const;

// Size labels
export const SIZE_LABELS: Record<MealSize, string> = {
	standard: "Standard",
	large: "Large",
	xl: "XL",
};
