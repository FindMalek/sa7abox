import type { MenuItem } from "@/types/menu";

export const MENU_ITEMS: MenuItem[] = [
	/* ===================== */
	/* 💪 SUPER CUT (585 kcal ref.) */
	/* ===================== */

	{
		id: "supercut",
		category: "box",
		groupKey: "supercut",
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
		id: "supercutCrunchy",
		category: "box",
		groupKey: "supercut",
		nameKey: "menu.items.supercutCrunchy.name",
		descriptionKey: "menu.items.supercutCrunchy.description",
		imageUrl: "/assets/menus/supercut.png",
		priceTnd: 11,
		nutrition: {
			calories: 605,
			protein: 68,
			carbs: 59,
			fat: 13,
			fiber: 6,
		},
	},
	{
		id: "supercutViande",
		category: "box",
		groupKey: "supercut",
		nameKey: "menu.items.supercutViande.name",
		descriptionKey: "menu.items.supercutViande.description",
		imageUrl: "/assets/menus/supercut.png",
		priceTnd: 18,
		nutrition: {
			calories: 615,
			protein: 70,
			carbs: 51,
			fat: 14,
			fiber: 6,
		},
	},

	/* ===================== */
	/* 💪 SUPER BULK (1187 kcal ref.) */
	/* ===================== */

	{
		id: "superbulk",
		category: "box",
		groupKey: "superbulk",
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
		id: "superbulkCrunchy",
		category: "box",
		groupKey: "superbulk",
		nameKey: "menu.items.superbulkCrunchy.name",
		descriptionKey: "menu.items.superbulkCrunchy.description",
		imageUrl: "/assets/menus/superbulk.png",
		priceTnd: 13,
		nutrition: {
			calories: 1207,
			protein: 75,
			carbs: 146,
			fat: 38,
			fiber: 8,
		},
	},
	{
		id: "superbulkViande",
		category: "box",
		groupKey: "superbulk",
		nameKey: "menu.items.superbulkViande.name",
		descriptionKey: "menu.items.superbulkViande.description",
		imageUrl: "/assets/menus/superbulk.png",
		priceTnd: 20,
		nutrition: {
			calories: 1217,
			protein: 77,
			carbs: 138,
			fat: 39,
			fiber: 8,
		},
	},

	/* ===================== */
	/* 💪 SUPER BALANCE (903 kcal ref.) */
	/* ===================== */

	{
		id: "superbalance",
		category: "box",
		groupKey: "superbalance",
		nameKey: "menu.items.superbalance.name",
		descriptionKey: "menu.items.superbalance.description",
		imageUrl: "/assets/menus/superbalance.png",
		priceTnd: 11,
		nutrition: {
			calories: 903,
			protein: 81,
			carbs: 91,
			fat: 24,
			fiber: 7,
		},
	},
	{
		id: "superbalanceCrunchy",
		category: "box",
		groupKey: "superbalance",
		nameKey: "menu.items.superbalanceCrunchy.name",
		descriptionKey: "menu.items.superbalanceCrunchy.description",
		imageUrl: "/assets/menus/superbalance.png",
		priceTnd: 12,
		nutrition: {
			calories: 923,
			protein: 74,
			carbs: 99,
			fat: 29,
			fiber: 7,
		},
	},
	{
		id: "superbalanceViande",
		category: "box",
		groupKey: "superbalance",
		nameKey: "menu.items.superbalanceViande.name",
		descriptionKey: "menu.items.superbalanceViande.description",
		imageUrl: "/assets/menus/superbalance.png",
		priceTnd: 19,
		nutrition: {
			calories: 933,
			protein: 76,
			carbs: 91,
			fat: 30,
			fiber: 7,
		},
	},

	/* ===================== */
	/* 🍤 PLATS CREVETTE */
	/* ===================== */

	{
		id: "platcrevettegrillee",
		category: "crevette",
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
	{
		id: "platcrevettepannee",
		category: "crevette",
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
		id: "crevetteGrilleeDorade",
		category: "crevette",
		nameKey: "menu.items.crevetteGrilleeDorade.name",
		descriptionKey: "menu.items.crevetteGrilleeDorade.description",
		imageUrl: "/assets/menus/plat-crevette-grillee.png",
		priceTnd: 28,
		nutrition: {
			calories: 853,
			protein: 93,
			carbs: 77,
			fat: 19,
			fiber: 7,
		},
	},
	{
		id: "crevetteCrispyDorade",
		category: "crevette",
		nameKey: "menu.items.crevetteCrispyDorade.name",
		descriptionKey: "menu.items.crevetteCrispyDorade.description",
		imageUrl: "/assets/menus/plat-crevette-panne.png",
		priceTnd: 30,
		nutrition: {
			calories: 853,
			protein: 93,
			carbs: 77,
			fat: 19,
			fiber: 7,
		},
	},

	/* ===================== */
	/* 🍽️ A LA CARTE */
	/* ===================== */

	{
		id: "carthageCaesar",
		category: "alaCarte",
		nameKey: "menu.items.carthageCaesar.name",
		descriptionKey: "menu.items.carthageCaesar.description",
		imageUrl: "/assets/menus/carthage-caesar.png",
		priceTnd: 9,
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
		category: "alaCarte",
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
	{
		id: "doradeGrillee",
		category: "alaCarte",
		nameKey: "menu.items.doradeGrillee.name",
		descriptionKey: "menu.items.doradeGrillee.description",
		imageUrl: "/assets/menus/dorade-grillee.jpg",
		priceTnd: 15,
		nutrition: {
			calories: 280,
			protein: 45,
			carbs: 2,
			fat: 10,
			fiber: 1,
		},
	},

	/* ===================== */
	/* 🥤 HEALTHY DRINKS */
	/* ===================== */

	{
		id: "yaourtArbi",
		category: "healthyJuice",
		nameKey: "menu.items.yaourtArbi.name",
		descriptionKey: "menu.items.yaourtArbi.description",
		imageUrl: "/assets/menus/banana-protein-yogurt.png",
		priceTnd: 4,
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
