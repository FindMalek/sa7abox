import { useCartStore } from "@/lib/cart-store";

export function useCart() {
	const items = useCartStore((state) => state.items);
	const getTotals = useCartStore((state) => state.getTotals);

	return {
		items,
		totals: getTotals(),
		addItem: useCartStore((state) => state.addItem),
		removeItem: useCartStore((state) => state.removeItem),
		updateQuantity: useCartStore((state) => state.updateQuantity),
		clearCart: useCartStore((state) => state.clearCart),
		isEmpty: items.length === 0,
	};
}
