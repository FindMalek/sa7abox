"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BuilderSummary } from "@/components/app/builder-summary";
import { IngredientCard } from "@/components/app/ingredient-card";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { INGREDIENTS } from "@/data/ingredients";
import { useCart } from "@/hooks/use-cart";
import { createCartItemFromIngredients } from "@/lib/ingredient-cart";
import { computePlateTotals } from "@/lib/ingredient-compute";
import {
	clearBuilderDraft,
	loadBuilderDraft,
	saveBuilderDraft,
} from "@/lib/storage";
import { formatTnd } from "@/lib/utils";
import {
	IngredientBuilderConfig,
	type IngredientSelection,
} from "@/types/ingredient-builder";

export function IngredientBuilderSection() {
	const t = useTranslations();
	const { addItem } = useCart();

	// Initialize selections from draft or defaults
	const [selections, setSelections] = useState<IngredientSelection[]>(() => {
		const draft = loadBuilderDraft();
		if (draft && draft.selections) {
			return draft.selections;
		}
		// Initialize with required ingredients at minQty
		return INGREDIENTS.filter((i) => i.required).map((ing) => ({
			ingredientId: ing.id,
			quantity: ing.minQty,
		}));
	});

	// Save draft on change
	useEffect(() => {
		saveBuilderDraft({
			selections,
			timestamp: Date.now(),
		});
	}, [selections]);

	const updateQuantity = (ingredientId: string, quantity: number) => {
		setSelections((prev) => {
			const existing = prev.find((s) => s.ingredientId === ingredientId);
			if (existing) {
				return prev.map((s) =>
					s.ingredientId === ingredientId ? { ...s, quantity } : s,
				);
			}
			return [...prev, { ingredientId, quantity }];
		});
	};

	const getQuantity = (ingredientId: string): number => {
		return (
			selections.find((s) => s.ingredientId === ingredientId)?.quantity || 0
		);
	};

	const computed = computePlateTotals(selections);
	const hasSelections = selections.some((s) => s.quantity > 0);
	const canAddToCart = hasSelections && computed.priceTnd > 0;

	const handleAddToCart = () => {
		if (!canAddToCart) return;
		const cartItem = createCartItemFromIngredients(selections);
		addItem(cartItem.menuItem, cartItem.selectedOptions, 1);
		// Clear draft after adding
		clearBuilderDraft();
		// Reset to required ingredients only
		setSelections(
			INGREDIENTS.filter((i) => i.required).map((ing) => ({
				ingredientId: ing.id,
				quantity: ing.minQty,
			})),
		);
	};

	// Group ingredients by category for better organization
	const groupedIngredients = INGREDIENTS.reduce(
		(acc, ing) => {
			const category = ing.category || "extra";
			if (!acc[category]) acc[category] = [];
			acc[category].push(ing);
			return acc;
		},
		{} as Record<string, typeof INGREDIENTS>,
	);

	const categoryOrder: Array<keyof typeof groupedIngredients> = [
		"base",
		"protein",
		"veg",
		"sauce",
		"extra",
	];

	return (
		<section
			id="build-meal"
			className="bg-background px-4 py-16 sm:px-6 lg:px-8"
		>
			<div className="container mx-auto max-w-6xl">
				{/* Header */}
				<div className="mb-12 text-center">
					<h2 className="mb-2 font-black text-3xl text-foreground sm:text-4xl">
						{t("builder.title") || "Build Your Meal"}
					</h2>
					<p className="text-lg text-muted-foreground">
						{t("builder.subtitle") ||
							"Pick ingredients, customize quantities, see your macros instantly."}
					</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1fr_400px]">
					{/* Ingredients Grid */}
					<div className="space-y-8">
						{categoryOrder.map((category) => {
							const categoryIngredients = groupedIngredients[category];
							if (!categoryIngredients || categoryIngredients.length === 0)
								return null;

							return (
								<div key={category}>
									<h3 className="mb-4 font-black text-foreground text-xl capitalize">
										{t(`builder.categories.${category}`) || category}
									</h3>
									<div className="grid gap-4 sm:grid-cols-2">
										{categoryIngredients.map((ingredient) => (
											<IngredientCard
												key={ingredient.id}
												ingredient={ingredient}
												quantity={getQuantity(ingredient.id)}
												onQuantityChange={(qty) =>
													updateQuantity(ingredient.id, qty)
												}
											/>
										))}
									</div>
								</div>
							);
						})}

						{!hasSelections && (
							<Empty className="border-none">
								<EmptyHeader>
									<EmptyTitle className="font-bold text-lg">
										{t("builder.empty.title") || "Start Building"}
									</EmptyTitle>
									<EmptyDescription>
										{t("builder.empty.description") ||
											"Select ingredients to build your custom plate."}
									</EmptyDescription>
								</EmptyHeader>
							</Empty>
						)}
					</div>

					{/* Summary Sidebar */}
					<div className="lg:sticky lg:top-24 lg:h-fit">
						<BuilderSummary computed={computed} />
						<Button
							onClick={handleAddToCart}
							disabled={!canAddToCart}
							size="lg"
							className="mt-4 h-14 w-full rounded-2xl bg-primary font-black text-lg shadow-primary/20 shadow-xl hover:bg-primary/90 disabled:opacity-50"
						>
							{t("builder.addToOrder") || "Add Plate to Order"}
						</Button>
					</div>
				</div>

				{/* Mobile Sticky Bottom CTA */}
				<div className="fixed right-0 bottom-0 left-0 z-40 border-border border-t bg-background/95 pb-safe backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
					<div className="container mx-auto px-4 py-3">
						<Button
							onClick={handleAddToCart}
							disabled={!canAddToCart}
							size="lg"
							className="h-12 w-full rounded-xl font-black"
						>
							{t("builder.addToOrder") || "Add to Order"} —{" "}
							{formatTnd(computed.priceTnd)}
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
