"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MacrosStep } from "@/components/app/macros-step";
import { MealStep } from "@/components/app/meal-step";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { MENU_ITEMS } from "@/data/menu-items";
import { useCart } from "@/hooks/use-cart";
import { createCartItemFromBuilder } from "@/lib/cart-integration";
import { createComputedMeal } from "@/lib/compute";
import {
	clearBuilderDraft,
	loadBuilderDraft,
	saveBuilderDraft,
} from "@/lib/storage";
import { formatTnd } from "@/lib/utils";
import { type BuilderConfig, MealSize, SpicyLevel } from "@/types/builder";

interface MealBuilderProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const DEFAULT_CONFIG: BuilderConfig = {
	mealId: "",
	size: "standard",
	toggles: {
		noOnions: false,
		spicyLevel: 0,
	},
	portions: {
		protein: 0,
		carbs: 0,
		veg: 0,
		fat: 0,
	},
};

export function MealBuilder({ open, onOpenChange }: MealBuilderProps) {
	const t = useTranslations();
	const { addItem } = useCart();
	const [step, setStep] = useState<1 | 2>(1);
	const [config, setConfig] = useState<BuilderConfig>(() => {
		const draft = loadBuilderDraft();
		if (draft) {
			// Check if draft is recent (within 24 hours)
			const age = Date.now() - draft.timestamp;
			if (age < 24 * 60 * 60 * 1000) {
				return {
					mealId: draft.mealId,
					size: draft.size,
					toggles: draft.toggles,
					portions: draft.portions,
				};
			}
		}
		// Default to first box meal
		const firstBox = MENU_ITEMS.find((m) => m.category === "box");
		return {
			...DEFAULT_CONFIG,
			mealId: firstBox?.id || "",
		};
	});

	// Save draft on config change
	useEffect(() => {
		if (config.mealId) {
			saveBuilderDraft({
				...config,
				timestamp: Date.now(),
			});
		}
	}, [config]);

	const selectedMeal = MENU_ITEMS.find((m) => m.id === config.mealId);
	const computed = selectedMeal
		? createComputedMeal(
				config,
				selectedMeal.nutrition,
				selectedMeal.priceTnd || 0,
			)
		: null;

	const handleAddToCart = () => {
		if (!selectedMeal) return;
		const cartItem = createCartItemFromBuilder(config, selectedMeal);
		addItem(cartItem.menuItem, cartItem.selectedOptions, 1);
		clearBuilderDraft();
		onOpenChange(false);
		// Reset to step 1
		setStep(1);
		const firstBox = MENU_ITEMS.find((m) => m.category === "box");
		setConfig({
			...DEFAULT_CONFIG,
			mealId: firstBox?.id || "",
		});
	};

	const canProceedToStep2 = !!config.mealId;
	const canAddToCart = canProceedToStep2 && step === 2;

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="flex h-full max-h-[96vh] flex-col">
				<div className="mx-auto flex h-full w-full max-w-xl flex-col overflow-hidden">
					<DrawerHeader className="shrink-0 border-border border-b px-6 pt-6 pb-4">
						<DrawerTitle className="font-black text-3xl text-foreground">
							{t("builder.title")}
						</DrawerTitle>
						<DrawerDescription className="mt-1 text-muted-foreground">
							{t("builder.subtitle")}
						</DrawerDescription>

						{/* Stepper Tabs */}
						<div className="mt-6 flex gap-2">
							<button
								onClick={() => setStep(1)}
								className={`flex-1 rounded-xl px-4 py-2.5 font-bold text-sm transition-all ${
									step === 1
										? "bg-foreground text-background"
										: "bg-muted text-muted-foreground"
								}`}
							>
								1. {t("builder.steps.meal")}
							</button>
							<button
								onClick={() => canProceedToStep2 && setStep(2)}
								disabled={!canProceedToStep2}
								className={`flex-1 rounded-xl px-4 py-2.5 font-bold text-sm transition-all ${
									step === 2
										? "bg-foreground text-background"
										: canProceedToStep2
											? "bg-muted text-muted-foreground"
											: "cursor-not-allowed bg-muted/50 text-muted-foreground/50"
								}`}
							>
								2. {t("builder.steps.macros")}
							</button>
						</div>
					</DrawerHeader>

					<div className="flex-1 overflow-y-auto">
						{step === 1 ? (
							<MealStep
								config={config}
								onConfigChange={setConfig}
								onNext={() => canProceedToStep2 && setStep(2)}
							/>
						) : (
							<MacrosStep
								config={config}
								onConfigChange={setConfig}
								computed={computed}
							/>
						)}
					</div>

					{computed && (
						<DrawerFooter className="shrink-0 border-border border-t bg-background/95 px-6 py-6 backdrop-blur-md">
							<div className="mb-4 flex w-full items-center justify-between">
								<div>
									<div className="font-black text-[10px] text-muted-foreground uppercase tracking-wider">
										{t("builder.total")}
									</div>
									<div className="font-black text-2xl text-primary leading-none">
										{formatTnd(computed.priceTnd)}
									</div>
								</div>
								{step === 1 && (
									<Button
										onClick={() => canProceedToStep2 && setStep(2)}
										disabled={!canProceedToStep2}
										size="lg"
										className="h-12 rounded-xl px-8 font-black"
									>
										{t("builder.next")}
									</Button>
								)}
								{step === 2 && (
									<Button
										onClick={handleAddToCart}
										size="lg"
										className="h-14 rounded-2xl bg-primary px-8 font-black text-lg shadow-primary/20 shadow-xl hover:bg-primary/90"
									>
										{t("builder.addToOrder")}
									</Button>
								)}
							</div>
						</DrawerFooter>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
