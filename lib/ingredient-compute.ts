import { INGREDIENTS } from "@/data/ingredients";
import type {
	ComputedPlate,
	IngredientSelection,
} from "@/types/ingredient-builder";
import type { Nutrition } from "@/types/menu";

export function computePlateTotals(
	selections: IngredientSelection[],
): ComputedPlate {
	const totals = selections.reduce(
		(acc, selection) => {
			const ingredient = INGREDIENTS.find(
				(i) => i.id === selection.ingredientId,
			);
			if (!ingredient || selection.quantity === 0) return acc;

			const multiplier = selection.quantity;
			return {
				nutrition: {
					calories:
						acc.nutrition.calories +
						ingredient.nutritionPerUnit.calories * multiplier,
					protein:
						acc.nutrition.protein +
						ingredient.nutritionPerUnit.protein * multiplier,
					carbs:
						(acc.nutrition.carbs || 0) +
						(ingredient.nutritionPerUnit.carbs || 0) * multiplier,
					fat:
						(acc.nutrition.fat || 0) +
						(ingredient.nutritionPerUnit.fat || 0) * multiplier,
					fiber:
						acc.nutrition.fiber +
						ingredient.nutritionPerUnit.fiber * multiplier,
				},
				price: acc.price + ingredient.unitPriceTnd * multiplier,
			};
		},
		{
			nutrition: {
				calories: 0,
				protein: 0,
				carbs: 0,
				fat: 0,
				fiber: 0,
			} as Nutrition,
			price: 0,
		},
	);

	// Round nutrition to integers, price to 2 decimals
	return {
		nutrition: {
			calories: Math.round(totals.nutrition.calories),
			protein: Math.round(totals.nutrition.protein),
			carbs: totals.nutrition.carbs
				? Math.round(totals.nutrition.carbs)
				: undefined,
			fat: totals.nutrition.fat ? Math.round(totals.nutrition.fat) : undefined,
			fiber: Math.round(totals.nutrition.fiber),
		},
		priceTnd: Math.round(totals.price * 100) / 100,
		summary: createPlateSummary(selections),
	};
}

function createPlateSummary(selections: IngredientSelection[]): string {
	const parts = selections
		.filter((s) => s.quantity > 0)
		.map((selection) => {
			const ingredient = INGREDIENTS.find(
				(i) => i.id === selection.ingredientId,
			);
			if (!ingredient) return null;
			return `${ingredient.nameKey} x${selection.quantity}`;
		})
		.filter((p): p is string => p !== null);

	return parts.length > 0 ? parts.join(", ") : "Empty plate";
}
