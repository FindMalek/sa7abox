export type MenuCategory = "box" | "salad" | "side" | "drink";

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
  extras?: MenuItemOption[];
  sauces?: string[];
  removeIngredients?: string[];
}

export interface MenuItem {
  id: string;
  category: MenuCategory;
  nameKey: string;
  descriptionKey: string;
  imageUrl: string;
  priceTnd?: number;
  nutrition: Nutrition;
  options?: MenuItemOptions;
}

export interface SelectedOptions {
  extras?: string[];
  sauce?: string;
  removeIngredients?: string[];
  notes?: string;
}