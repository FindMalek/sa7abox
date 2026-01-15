const STORAGE_KEY = "sa7abox_cart";

export function saveCartToStorage(state: unknown): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
}

export function loadCartFromStorage(): unknown | null {
  try {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return null;
  }
}

export function clearCartStorage(): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cart storage:", error);
  }
}