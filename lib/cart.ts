import { CartItem, CartTotals } from "@/types/cart";
import { MenuItem, SelectedOptions } from "@/types/menu";

export function generateCartItemId(
  menuItemId: string,
  options: SelectedOptions
): string {
  const optionsStr = JSON.stringify(options);
  return `${menuItemId}_${btoa(optionsStr).replace(/[^a-zA-Z0-9]/g, "")}`;
}

export function calculateItemPrice(menuItem: MenuItem, options: SelectedOptions): number {
    const basePrice = menuItem.priceTnd || 0;
    
    // Sum up all selected extras
    const extrasPrice = options.extras?.reduce((sum, extraId) => {
      const extra = menuItem.options?.extras?.find(e => e.id === extraId);
      return sum + (extra?.priceTnd || 0);
    }, 0) || 0;
  
    return basePrice + extrasPrice;
  }
  
  export function calculateTotals(items: CartItem[]) {
    return items.reduce((acc, item) => {
      const pricePerUnit = calculateItemPrice(item.menuItem, item.selectedOptions);
      return {
        itemCount: acc.itemCount + item.quantity,
        subtotalTnd: acc.subtotalTnd + (pricePerUnit * item.quantity)
      };
    }, { itemCount: 0, subtotalTnd: 0 });
  }

export function findCartItem(
  items: CartItem[],
  cartItemId: string
): CartItem | undefined {
  return items.find((item) => item.cartItemId === cartItemId);
}