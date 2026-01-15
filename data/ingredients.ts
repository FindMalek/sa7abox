import { Nutrition } from "@/types/menu";

export type IngredientCategory = "base" | "protein" | "veg" | "sauce" | "extra";

export interface Ingredient {
	id: string;
	nameKey: string; // Translation key
	descriptionKey: string; // Translation key
	imageUrl?: string;
	unitLabel: string; // e.g. "container", "portion", "scoop"
	unitPriceTnd: number;
	nutritionPerUnit: Nutrition;
	minQty: number; // Usually 0 or 1
	maxQty: number; // e.g. 6
	category?: IngredientCategory;
	required: boolean; // If true, minQty must be >= 1
}

export const INGREDIENTS: Ingredient[] = [
	// Base (Required)
	{
		id: "rice",
		nameKey: "ingredients.rice.name",
		descriptionKey: "ingredients.rice.description",
		imageUrl: "/placeholder.png",
		unitLabel: "container",
		unitPriceTnd: 3,
		nutritionPerUnit: {
			calories: 180,
			protein: 4,
			carbs: 38,
			fat: 2,
			fiber: 2,
		},
		minQty: 1,
		maxQty: 3,
		category: "base",
		required: true,
	},
	// Proteins
	{
		id: "chicken-breast",
		nameKey: "ingredients.chickenBreast.name",
		descriptionKey: "ingredients.chickenBreast.description",
		imageUrl: "/placeholder.png",
		unitLabel: "portion",
		unitPriceTnd: 8,
		nutritionPerUnit: {
			calories: 165,
			protein: 31,
			carbs: 0,
			fat: 3.6,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},
	{
		id: "crevette",
		nameKey: "ingredients.crevette.name",
		descriptionKey: "ingredients.crevette.description",
		imageUrl: "/placeholder.png",
		unitLabel: "portion",
		unitPriceTnd: 12,
		nutritionPerUnit: {
			calories: 85,
			protein: 18,
			carbs: 0,
			fat: 1,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},
	// Vegetables
	{
		id: "salad",
		nameKey: "ingredients.salad.name",
		descriptionKey: "ingredients.salad.description",
		imageUrl: "/placeholder.png",
		unitLabel: "portion",
		unitPriceTnd: 2,
		nutritionPerUnit: {
			calories: 15,
			protein: 1,
			carbs: 3,
			fat: 0,
			fiber: 2,
		},
		minQty: 0,
		maxQty: 4,
		category: "veg",
		required: false,
	},
	// Sauces/Extras
	{
		id: "harissa-light",
		nameKey: "ingredients.harissaLight.name",
		descriptionKey: "ingredients.harissaLight.description",
		imageUrl: "/placeholder.png",
		unitLabel: "scoop",
		unitPriceTnd: 1.5,
		nutritionPerUnit: {
			calories: 25,
			protein: 0,
			carbs: 3,
			fat: 1,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 3,
		category: "sauce",
		required: false,
	},
	{
		id: "olive-oil",
		nameKey: "ingredients.oliveOil.name",
		descriptionKey: "ingredients.oliveOil.description",
		imageUrl: "/placeholder.png",
		unitLabel: "drizzle",
		unitPriceTnd: 1,
		nutritionPerUnit: {
			calories: 40,
			protein: 0,
			carbs: 0,
			fat: 4.5,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 3,
		category: "sauce",
		required: false,
	},
];
