import { MenuItem, SelectedOptions } from "./menu";

export interface CartItem {
	cartItemId: string;
	menuItem: MenuItem;
	selectedOptions: SelectedOptions;
	quantity: number;
}

export interface CartTotals {
	itemCount: number;
	subtotalTnd: number;
}

export interface CartState {
	items: CartItem[];
}
