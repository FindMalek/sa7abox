import { hashObject } from "@/lib/utils";
import type { BuilderConfig, ComputedMeal } from "@/types/builder";
import type { CartItem } from "@/types/cart";
import type { MenuItem } from "@/types/menu";
import { createComputedMeal } from "./compute";

export function createCartItemFromBuilder(
	config: BuilderConfig,
	baseMeal: MenuItem,
): CartItem {
	const computed = createComputedMeal(
		config,
		baseMeal.nutrition,
		baseMeal.priceTnd || 0,
	);

	// Create stable cartItemId from config
	const configHash = hashObject({
		mealId: config.mealId,
		size: config.size,
		toggles: config.toggles,
		portions: config.portions,
	});

	const cartItemId = `builder_${baseMeal.id}_${configHash}`;

	// Create a synthetic MenuItem for the cart
	const customMenuItem: MenuItem = {
		...baseMeal,
		priceTnd: computed.priceTnd,
		nutrition: computed.nutrition,
	};

	// Store builder config in selectedOptions for display
	const selectedOptions = {
		builderConfig: config,
		builderSummary: computed.summary,
	};

	return {
		cartItemId,
		menuItem: customMenuItem,
		selectedOptions,
		quantity: 1,
	};
}
