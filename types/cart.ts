import type { IngredientSelection } from "./ingredient-builder";
import type { MenuItem, SelectedOptions } from "./menu";

export interface CartItem {
	cartItemId: string;
	menuItem: MenuItem;
	selectedOptions: SelectedOptions & {
		ingredientSelections?: IngredientSelection[];
		ingredientSummary?: string;
	};
	quantity: number;
}

export interface CartTotals {
	itemCount: number;
	subtotalTnd: number;
}

export interface CartState {
	items: CartItem[];
}
