import { Nutrition } from "@/types/menu";

export type IngredientCategory = "base" | "protein" | "veg" | "sauce" | "extra";

export interface Ingredient {
	id: string;
	nameKey: string;
	descriptionKey: string;
	imageUrl?: string;
	unitLabel: string;
	unitPriceTnd: number;
	nutritionPerUnit: Nutrition;
	minQty: number;
	maxQty: number;
	category: IngredientCategory;
	required: boolean;
}

export const INGREDIENTS: Ingredient[] = [
	/* ===================== */
	/* 🥗 BASES */
	/* ===================== */

	{
		id: "riz",
		nameKey: "ingredients.bases.riz",
		descriptionKey: "ingredients.nutrition.riz",
		imageUrl: "/assets/ingredients/rice.png",
		unitLabel: "container",
		unitPriceTnd: 2,
		nutritionPerUnit: {
			calories: 210,
			protein: 5,
			carbs: 46,
			fat: 0,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 3,
		category: "base",
		required: false,
	},

	{
		id: "borghol",
		nameKey: "ingredients.bases.borghol",
		descriptionKey: "ingredients.nutrition.borghol",
		imageUrl: "/assets/ingredients/bulgur.png",
		unitLabel: "portion",
		unitPriceTnd: 2,
		nutritionPerUnit: {
			calories: 240,
			protein: 8,
			carbs: 44,
			fat: 1,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 3,
		category: "base",
		required: false,
	},

	{
		id: "salade-lentilles",
		nameKey: "ingredients.bases.salade-lentilles",
		descriptionKey: "ingredients.nutrition.salade-lentilles",
		imageUrl: "/assets/ingredients/lentils.jpeg",
		unitLabel: "portion",
		unitPriceTnd: 1,
		nutritionPerUnit: {
			calories: 180,
			protein: 13,
			carbs: 30,
			fat: 0,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 3,
		category: "veg",
		required: false,
	},

	{
		id: "salade-laitue",
		nameKey: "ingredients.bases.salade-laitue",
		descriptionKey: "ingredients.nutrition.salade-laitue",
		imageUrl: "/assets/ingredients/lettuce.png",
		unitLabel: "portion",
		unitPriceTnd: 0.8,
		nutritionPerUnit: {
			calories: 30,
			protein: 2,
			carbs: 6,
			fat: 0,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "veg",
		required: false,
	},

	{
		id: "salade-crombe",
		nameKey: "ingredients.bases.salade-crombe",
		descriptionKey: "ingredients.nutrition.salade-crombe",
		imageUrl: "/assets/ingredients/cabbage.png",
		unitLabel: "portion",
		unitPriceTnd: 1,
		nutritionPerUnit: {
			calories: 55,
			protein: 3,
			carbs: 11,
			fat: 0,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "veg",
		required: false,
	},

	/* ===================== */
	/* 🍗 PROTÉINES */
	/* ===================== */

	{
		id: "escalope-poulet",
		nameKey: "ingredients.proteins.escalope-poulet",
		descriptionKey: "ingredients.nutrition.escalope-poulet",
		imageUrl: "/assets/ingredients/chicken-breast.png",
		unitLabel: "portion",
		unitPriceTnd: 5,
		nutritionPerUnit: {
			calories: 175,
			protein: 35,
			carbs: 0,
			fat: 3,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},

	{
		id: "crevette",
		nameKey: "ingredients.proteins.crevette",
		descriptionKey: "ingredients.nutrition.crevette",
		imageUrl: "/assets/ingredients/shrimp.png",
		unitLabel: "portion",
		unitPriceTnd: 8,
		nutritionPerUnit: {
			calories: 105,
			protein: 24,
			carbs: 0,
			fat: 1,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},

	{
		id: "cuisses-poulet",
		nameKey: "ingredients.proteins.cuisses-poulet",
		descriptionKey: "ingredients.nutrition.cuisses-poulet",
		imageUrl: "/assets/ingredients/chicken-thigh.png",
		unitLabel: "portion",
		unitPriceTnd: 4.5,
		nutritionPerUnit: {
			calories: 241,
			protein: 40,
			carbs: 11,
			fat: 0,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},

	{
		id: "2-oeufs",
		nameKey: "ingredients.proteins.2-oeufs",
		descriptionKey: "ingredients.nutrition.2-oeufs",
		imageUrl: "/assets/ingredients/eggs.png",
		unitLabel: "portion",
		unitPriceTnd: 1.5,
		nutritionPerUnit: {
			calories: 150,
			protein: 14,
			carbs: 11,
			fat: 11,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},

	{
		id: "2-blancs-oeuf",
		nameKey: "ingredients.proteins.2-blancs-oeuf",
		descriptionKey: "ingredients.nutrition.2-blancs-oeuf",
		imageUrl: "/assets/ingredients/egg-whites.png",
		unitLabel: "portion",
		unitPriceTnd: 1.5,
		nutritionPerUnit: {
			calories: 32,
			protein: 8,
			carbs: 0,
			fat: 0,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "protein",
		required: false,
	},

	/* ===================== */
	/* ➕ EXTRAS & SAUCES */
	/* ===================== */

	{
		id: "amande",
		nameKey: "ingredients.extras.amande",
		descriptionKey: "ingredients.nutrition.amande",
		imageUrl: "/assets/ingredients/almonds.png",
		unitLabel: "portion",
		unitPriceTnd: 3,
		nutritionPerUnit: {
			calories: 280,
			protein: 10,
			carbs: 10,
			fat: 25,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 4,
		category: "extra",
		required: false,
	},

	{
		id: "sauce-sa7abox",
		nameKey: "ingredients.extras.sauce-sa7abox",
		descriptionKey: "ingredients.nutrition.sauce-sa7abox",
		imageUrl: "/assets/ingredients/sa7abox-sauce.png",
		unitLabel: "scoop",
		unitPriceTnd: 0,
		nutritionPerUnit: {
			calories: 60,
			protein: 6,
			carbs: 0,
			fat: 4,
			fiber: 0,
		},
		minQty: 0,
		maxQty: 3,
		category: "sauce",
		required: false,
	},
];
