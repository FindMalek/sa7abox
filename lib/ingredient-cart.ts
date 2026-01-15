import { hashObject } from "@/lib/utils";
import type { CartItem } from "@/types/cart";
import {
	ComputedPlate,
	type IngredientSelection,
} from "@/types/ingredient-builder";
import type { MenuItem } from "@/types/menu";
import { computePlateTotals } from "./ingredient-compute";

export function createCartItemFromIngredients(
	selections: IngredientSelection[],
): CartItem {
	const computed = computePlateTotals(selections);

	// Create stable cartItemId from normalized selections
	const normalizedSelections = [...selections]
		.filter((s) => s.quantity > 0)
		.sort((a, b) => a.ingredientId.localeCompare(b.ingredientId))
		.map((s) => `${s.ingredientId}:${s.quantity}`)
		.join("|");

	const cartItemId = `custom_plate_${hashObject(normalizedSelections)}`;

	// Create synthetic MenuItem for the cart
	const customMenuItem: MenuItem = {
		id: "custom-plate",
		category: "box",
		nameKey: "builder.customPlate.name",
		descriptionKey: "builder.customPlate.description",
		imageUrl: "/placeholder.png",
		priceTnd: computed.priceTnd,
		nutrition: computed.nutrition,
	};

	return {
		cartItemId,
		menuItem: customMenuItem,
		selectedOptions: {
			ingredientSelections: selections,
			ingredientSummary: computed.summary,
		},
		quantity: 1,
	};
}
