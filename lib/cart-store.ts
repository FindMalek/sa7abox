import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "@/types/cart";
import { MenuItem, SelectedOptions } from "@/types/menu";
import {
	generateCartItemId,
	calculateItemPrice,
	calculateTotals,
	findCartItem,
} from "@/lib/cart";

interface CartStore extends CartState {
	addItem: (item: MenuItem, options: SelectedOptions, quantity: number) => void;
	removeItem: (cartItemId: string) => void;
	updateQuantity: (cartItemId: string, quantity: number) => void;
	clearCart: () => void;
	getTotals: () => ReturnType<typeof calculateTotals>;
}

const MAX_QUANTITY = 20;
const MIN_QUANTITY = 1;

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (menuItem, options, quantity) => {
				const cartItemId = generateCartItemId(menuItem.id, options);
				const existingItem = findCartItem(get().items, cartItemId);

				if (existingItem) {
					const newQuantity = Math.min(
						existingItem.quantity + quantity,
						MAX_QUANTITY,
					);
					get().updateQuantity(cartItemId, newQuantity);
				} else {
					set((state) => ({
						items: [
							...state.items,
							{
								cartItemId,
								menuItem,
								selectedOptions: options,
								quantity: Math.min(quantity, MAX_QUANTITY),
							},
						],
					}));
				}
			},

			removeItem: (cartItemId) => {
				set((state) => ({
					items: state.items.filter((item) => item.cartItemId !== cartItemId),
				}));
			},

			updateQuantity: (cartItemId, quantity) => {
				const clampedQty = Math.max(
					MIN_QUANTITY,
					Math.min(quantity, MAX_QUANTITY),
				);
				set((state) => ({
					items: state.items.map((item) =>
						item.cartItemId === cartItemId
							? { ...item, quantity: clampedQty }
							: item,
					),
				}));
			},

			clearCart: () => {
				set({ items: [] });
			},

			getTotals: () => {
				return calculateTotals(get().items);
			},
		}),
		{
			name: "sa7abox-cart",
			version: 1,
		},
	),
);
