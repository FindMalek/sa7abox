import type { BuilderConfig } from "./builder";
import type { MenuItem, SelectedOptions } from "./menu";

export interface CartItem {
	cartItemId: string;
	menuItem: MenuItem;
	selectedOptions: SelectedOptions & {
		builderConfig?: BuilderConfig;
		builderSummary?: string;
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
