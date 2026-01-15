import {
	PORTION_CONFIG,
	SIZE_LABELS,
	SIZE_MODIFIERS,
	SPICY_LABELS,
} from "@/data/builder";
import type { BuilderConfig, ComputedMeal } from "@/types/builder";
import type { Nutrition } from "@/types/menu";

export function computeNutrition(
	config: BuilderConfig,
	baseNutrition: Nutrition,
): Nutrition {
	const portionNutrition = Object.entries(config.portions).reduce(
		(acc, [key, count]) => {
			const portion = PORTION_CONFIG[key as keyof typeof PORTION_CONFIG];
			const nutrition = portion.nutritionPerPortion;
			return {
				calories: acc.calories + nutrition.calories * count,
				protein: acc.protein + nutrition.protein * count,
				carbs: (acc.carbs || 0) + nutrition.carbs * count,
				fat: (acc.fat || 0) + nutrition.fat * count,
				fiber: acc.fiber + nutrition.fiber * count,
			};
		},
		{ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
	);

	return {
		calories: baseNutrition.calories + portionNutrition.calories,
		protein: baseNutrition.protein + portionNutrition.protein,
		carbs: (baseNutrition.carbs || 0) + portionNutrition.carbs,
		fat: (baseNutrition.fat || 0) + portionNutrition.fat,
		fiber: baseNutrition.fiber + portionNutrition.fiber,
	};
}

export function computePrice(config: BuilderConfig, basePrice: number): number {
	const sizeModifier = SIZE_MODIFIERS[config.size];
	const portionPrice = Object.entries(config.portions).reduce(
		(acc, [key, count]) => {
			const portion = PORTION_CONFIG[key as keyof typeof PORTION_CONFIG];
			return acc + portion.pricePerPortion * count;
		},
		0,
	);

	return basePrice + sizeModifier + portionPrice;
}

export function createSummary(config: BuilderConfig): string {
	const parts: string[] = [];

	// Size
	if (config.size !== "standard") {
		parts.push(SIZE_LABELS[config.size]);
	}

	// Spicy level
	if (config.toggles.spicyLevel > 0) {
		parts.push(SPICY_LABELS[config.toggles.spicyLevel]);
	}

	// No onions
	if (config.toggles.noOnions) {
		parts.push("No onions");
	}

	// Portions
	Object.entries(config.portions).forEach(([key, count]) => {
		if (count > 0) {
			const label = PORTION_CONFIG[key as keyof typeof PORTION_CONFIG].label;
			parts.push(`+${count} ${label}`);
		}
	});

	return parts.length > 0 ? parts.join(", ") : "Standard";
}

export function createComputedMeal(
	config: BuilderConfig,
	baseNutrition: Nutrition,
	basePrice: number,
): ComputedMeal {
	return {
		nutrition: computeNutrition(config, baseNutrition),
		priceTnd: computePrice(config, basePrice),
		summary: createSummary(config),
	};
}
