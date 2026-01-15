import { MenuItem } from "@/types/menu";

export const MENU_ITEMS: MenuItem[] = [
	// Power Boxes
	{
		id: "supercut",
		category: "box",
		nameKey: "menu.items.supercut.name",
		descriptionKey: "menu.items.supercut.description",
		imageUrl: "/placeholder.png",
		priceTnd: 22,
		nutrition: {
			calories: 420,
			protein: 45,
			carbs: 35,
			fat: 8,
			fiber: 6,
		},
		options: {
			extras: [
				{ id: "extra-chicken", label: "Extra Chicken", priceTnd: 5 },
				{ id: "extra-quinoa", label: "Extra Quinoa", priceTnd: 2 },
			],
			sauces: ["Caesar", "Lemon Herb", "Spicy"],
			removeIngredients: ["Broccoli", "Carrots"],
		},
	},
	{
		id: "superman",
		category: "box",
		nameKey: "menu.items.superman.name",
		descriptionKey: "menu.items.superman.description",
		imageUrl: "/placeholder.png",
		priceTnd: 28,
		nutrition: {
			calories: 580,
			protein: 52,
			carbs: 48,
			fat: 18,
			fiber: 8,
		},
		options: {
			extras: [
				{ id: "extra-steak", label: "Extra Steak", priceTnd: 8 },
				{ id: "extra-sweet-potato", label: "Extra Sweet Potato", priceTnd: 3 },
			],
			sauces: ["BBQ", "Garlic Butter", "Herb"],
			removeIngredients: ["Green Beans"],
		},
	},
	// Salads
	{
		id: "carthage-caesar",
		category: "salad",
		nameKey: "menu.items.carthageCaesar.name",
		descriptionKey: "menu.items.carthageCaesar.description",
		imageUrl: "/placeholder.png",
		priceTnd: 18,
		nutrition: {
			calories: 320,
			protein: 28,
			carbs: 22,
			fat: 12,
			fiber: 5,
		},
		options: {
			extras: [
				{ id: "extra-chicken", label: "Extra Chicken", priceTnd: 5 },
				{ id: "extra-cheese", label: "Extra Cheese", priceTnd: 2 },
			],
			sauces: ["Caesar", "Light Caesar", "No Dressing"],
		},
	},
	{
		id: "tunisian-tuna",
		category: "salad",
		nameKey: "menu.items.tunisianTuna.name",
		descriptionKey: "menu.items.tunisianTuna.description",
		imageUrl: "/placeholder.png",
		priceTnd: 16,
		nutrition: {
			calories: 280,
			protein: 32,
			carbs: 15,
			fat: 10,
			fiber: 4,
		},
		options: {
			extras: [
				{ id: "extra-tuna", label: "Extra Tuna", priceTnd: 4 },
				{ id: "extra-olives", label: "Extra Olives", priceTnd: 2 },
			],
			sauces: ["Olive Oil", "Lemon", "Balsamic"],
		},
	},
	// Sides
	{
		id: "rice-bowl",
		category: "side",
		nameKey: "menu.items.riceBowl.name",
		descriptionKey: "menu.items.riceBowl.description",
		imageUrl: "/placeholder.png",
		priceTnd: 8,
		nutrition: {
			calories: 180,
			protein: 4,
			carbs: 38,
			fat: 2,
			fiber: 2,
		},
	},
	// Drinks
	{
		id: "protein-shake",
		category: "drink",
		nameKey: "menu.items.proteinShake.name",
		descriptionKey: "menu.items.proteinShake.description",
		imageUrl: "/placeholder.png",
		priceTnd: 12,
		nutrition: {
			calories: 150,
			protein: 25,
			carbs: 8,
			fat: 2,
			fiber: 1,
		},
		options: {
			extras: [{ id: "extra-protein", label: "Extra Scoop", priceTnd: 3 }],
		},
	},
];
