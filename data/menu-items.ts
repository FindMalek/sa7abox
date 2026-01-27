import type { MenuItem } from "@/types/menu";

export const MENU_ITEMS: MenuItem[] = [
	{
		id: "supercut",
		category: "box",
		nameKey: "menu.items.supercut.name",
		descriptionKey: "menu.items.supercut.description",
		imageUrl: "/assets/menus/supercut.png",
		priceTnd: 10,
		nutrition: {
			calories: 585,
			protein: 75,
			carbs: 51,
			fat: 8,
			fiber: 6,
		},
	},
	{
		id: "superbalance",
		category: "box",
		nameKey: "menu.items.superbalance.name",
		descriptionKey: "menu.items.superbalance.description",
		imageUrl: "/assets/menus/superbalance.png",
		priceTnd: 10,
		nutrition: {
			calories: 903,
			protein: 81,
			carbs: 91,
			fat: 24,
			fiber: 7,
		},
	},
	{
		id: "superbulk",
		category: "box",
		nameKey: "menu.items.superbulk.name",
		descriptionKey: "menu.items.superbulk.description",
		imageUrl: "/assets/menus/superbulk.png",
		priceTnd: 12,
		nutrition: {
			calories: 1187,
			protein: 82,
			carbs: 138,
			fat: 33,
			fiber: 8,
		},
	},
	{
		id: "carthageCaesar",
		category: "box",
		nameKey: "menu.items.carthageCaesar.name",
		descriptionKey: "menu.items.carthageCaesar.description",
		imageUrl: "/assets/menus/carthage-caesar.png",
		priceTnd: 6,
		nutrition: {
			calories: 295,
			protein: 46,
			carbs: 6,
			fat: 8.5,
			fiber: 3,
		},
	},

	{
		id: "healthyNuggets",
		category: "box",
		nameKey: "menu.items.healthyNuggets.name",
		descriptionKey: "menu.items.healthyNuggets.description",
		imageUrl: "/assets/menus/healthy-nuggets.png",
		priceTnd: 10,
		nutrition: {
			calories: 341,
			protein: 34,
			carbs: 3,
			fat: 8.5,
			fiber: 0,
		},
	},

	/* ===================== */
	/* 🍤 CREVETTE BOXES */
	/* ===================== */

	{
		id: "platcrevettepannee",
		category: "box",
		nameKey: "menu.items.platcrevettepannee.name",
		descriptionKey: "menu.items.platcrevettepannee.description",
		imageUrl: "/assets/menus/plat-crevette-panne.png",
		priceTnd: 18,
		nutrition: {
			calories: 573,
			protein: 48,
			carbs: 75,
			fat: 9,
			fiber: 6,
		},
	},
	{
		id: "platcrevettegrillee",
		category: "box",
		nameKey: "menu.items.platcrevettegrillee.name",
		descriptionKey: "menu.items.platcrevettegrillee.description",
		imageUrl: "/assets/menus/plat-crevette-grillee.png",
		priceTnd: 16,
		nutrition: {
			calories: 573,
			protein: 48,
			carbs: 75,
			fat: 9,
			fiber: 6,
		},
	},	

	/* ===================== */
	/* 🍊 HEALTHY JUICE */
	/* ===================== */

	{
		id: "orangeJuice",
		category: "healthyJuice",
		nameKey: "menu.items.orangeJuice.name",
		descriptionKey: "menu.items.orangeFreshJuice.description",
		imageUrl: "/assets/menus/orange-fresh-juice.png",
		priceTnd: 4,
		nutrition: {
			calories: 170,
			carbs: 45,
			protein: 3,
			fat: 0,
			fiber: 1,
		},
	},
	{
		id: "bananaJuice",
		category: "healthyJuice",
		nameKey: "menu.items.bananaJuice.name",
		descriptionKey: "menu.items.bananaJuice.description",
		imageUrl: "/assets/menus/orange-protein-juice.png",
		priceTnd: 6.5,
		nutrition: {
			calories: 245,
			protein: 10,
			carbs: 43,
			fat: 5.5,
			fiber: 1,
		},
	},
	{
		id: "yaourtArbi",
		category: "healthyJuice",
		nameKey: "menu.items.yaourtArbi.name",
		descriptionKey: "menu.items.yaourtArbi.description",
		imageUrl: "/assets/menus/banana-protein-yogurt.png",
		priceTnd: 1,
		nutrition: {
			calories: 130,
			protein: 8,
			carbs: 10,
			fat: 6,
			fiber: 1,
		},
	},
	{
		id: "proteinSmoothie",
		category: "healthyJuice",
		nameKey: "menu.items.proteinSmoothie.name",
		descriptionKey: "menu.items.proteinSmoothie.description",
		imageUrl: "/assets/menus/banana-protein-smoothie.png",
		priceTnd: 8.5,
		nutrition: {
			calories: 360,
			protein: 39,
			carbs: 41,
			fat: 8,
			fiber: 3,
		},
	},
];
