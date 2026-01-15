import { CartItem, CartTotals } from "@/types/cart";
import { MenuItem, SelectedOptions } from "@/types/menu";

export function generateCartItemId(
  menuItemId: string,
  options: SelectedOptions
): string {
  const optionsStr = JSON.stringify(options);
  return `${menuItemId}_${btoa(optionsStr).replace(/[^a-zA-Z0-9]/g, "")}`;
}

export function calculateItemPrice(
  menuItem: MenuItem,
  options: SelectedOptions
): number {
  if (!menuItem.priceTnd) return 0;
  
  let total = menuItem.priceTnd;
  
  if (options.extras && menuItem.options?.extras) {
    options.extras.forEach((extraId) => {
      const extra = menuItem.options?.extras?.find((e) => e.id === extraId);
      if (extra?.priceTnd) {
        total += extra.priceTnd;
      }
    });
  }
  
  return total;
}

export function calculateTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalTnd = items.reduce(
    (sum, item) =>
      sum + calculateItemPrice(item.menuItem, item.selectedOptions) * item.quantity,
    0
  );
  
  return { itemCount, subtotalTnd };
}

export function findCartItem(
  items: CartItem[],
  cartItemId: string
): CartItem | undefined {
  return items.find((item) => item.cartItemId === cartItemId);
}