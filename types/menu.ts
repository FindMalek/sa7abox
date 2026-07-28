export type MenuCategory =
	| "box"
	| "salad"
	| "side"
	| "drink"
	| "healthySweet"
	| "healthyJuice"
	| "crevette"
	| "alaCarte";

export interface Nutrition {
	calories: number;
	protein: number;
	carbs?: number;
	fat?: number;
	fiber: number;
}

export interface MenuItemOption {
	id: string;
	label: string;
	priceTnd?: number;
}

export interface MenuItemOptions {
	base: MenuItemOption[];
	extras?: MenuItemOption[];
	sauces?: string[];
	removeIngredients?: string[];
}

export interface MenuItem {
	id: string;
	category: MenuCategory;
	groupKey?: string;
	nameKey: string;
	descriptionKey: string;
	imageUrl: string;
	priceTnd?: number;
	nutrition: Nutrition;
	options?: MenuItemOptions;
}

export interface SelectedOptions {
	base?: string[]; // ← ajouter ceci
	extras?: string[];
	sauce?: string;
	removeIngredients?: string[];
	notes?: string;
}
