"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SIZE_LABELS, SIZE_MODIFIERS, SPICY_LABELS } from "@/data/builder";
import { MENU_ITEMS } from "@/data/menu-items";
import { formatTnd } from "@/lib/utils";
import type { BuilderConfig, MealSize, SpicyLevel } from "@/types/builder";

interface MealStepProps {
	config: BuilderConfig;
	onConfigChange: (config: BuilderConfig) => void;
	onNext: () => void;
}

export function MealStep({ config, onConfigChange }: MealStepProps) {
	const t = useTranslations();
	const boxMeals = MENU_ITEMS.filter((m) => m.category === "box");
	const selectedMeal = MENU_ITEMS.find((m) => m.id === config.mealId);

	const updateSize = (size: MealSize) => {
		onConfigChange({ ...config, size });
	};

	const updateSpicyLevel = (level: SpicyLevel) => {
		onConfigChange({
			...config,
			toggles: { ...config.toggles, spicyLevel: level },
		});
	};

	const updateNoOnions = (checked: boolean) => {
		onConfigChange({
			...config,
			toggles: { ...config.toggles, noOnions: checked },
		});
	};

	return (
		<div className="space-y-8 px-6 py-6">
			{/* Meal Selection */}
			<div>
				<h3 className="mb-4 font-black text-foreground text-lg">
					{t("builder.selectMeal")}
				</h3>
				<div className="grid grid-cols-2 gap-3">
					{boxMeals.map((meal) => (
						<button
							key={meal.id}
							onClick={() => onConfigChange({ ...config, mealId: meal.id })}
							className={`rounded-2xl border-2 p-4 text-left transition-all ${
								config.mealId === meal.id
									? "border-primary bg-primary/5"
									: "border-border bg-card hover:border-primary/50"
							}`}
						>
							<div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl">
								<Image
									src={meal.imageUrl}
									alt={t(meal.nameKey)}
									fill
									className="object-cover"
								/>
							</div>
							<h4 className="mb-1 font-black text-foreground">
								{t(meal.nameKey)}
							</h4>
							<p className="line-clamp-2 text-muted-foreground text-xs">
								{t(meal.descriptionKey)}
							</p>
							<div className="mt-2 font-black text-primary text-sm">
								{meal.priceTnd} {t("menu.currency")}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Selected Meal Preview */}
			{selectedMeal && (
				<div className="rounded-2xl border border-border bg-card p-5">
					<div className="flex gap-4">
						<div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
							<Image
								src={selectedMeal.imageUrl}
								alt={t(selectedMeal.nameKey)}
								fill
								className="object-cover"
							/>
						</div>
						<div className="min-w-0 flex-1">
							<h4 className="mb-1 font-black text-foreground text-lg">
								{t(selectedMeal.nameKey)}
							</h4>
							<p className="mb-2 text-muted-foreground text-xs">
								{t(selectedMeal.descriptionKey)}
							</p>
							<div className="font-black text-lg text-primary">
								{formatTnd(selectedMeal.priceTnd || 0)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Size Selection */}
			{selectedMeal && (
				<div>
					<Label className="mb-3 block font-black text-foreground text-sm">
						{t("builder.size")}
					</Label>
					<div className="grid grid-cols-3 gap-2">
						{(["standard", "large", "xl"] as MealSize[]).map((size) => {
							const modifier = SIZE_MODIFIERS[size];
							return (
								<button
									key={size}
									onClick={() => updateSize(size)}
									className={`rounded-xl px-4 py-3 font-bold text-sm transition-all ${
										config.size === size
											? "bg-foreground text-background"
											: "bg-muted text-muted-foreground hover:bg-muted/80"
									}`}
								>
									{SIZE_LABELS[size]}
									{modifier > 0 && (
										<span className="mt-0.5 block text-[10px] opacity-80">
											+{formatTnd(modifier)}
										</span>
									)}
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Customization Toggles */}
			{selectedMeal && (
				<div className="space-y-6">
					{/* Spicy Level */}
					<div>
						<Label className="mb-3 block font-black text-foreground text-sm">
							{t("builder.spicyLevel")}
						</Label>
						<div className="grid grid-cols-4 gap-2">
							{([0, 1, 2, 3] as SpicyLevel[]).map((level) => (
								<button
									key={level}
									onClick={() => updateSpicyLevel(level)}
									className={`rounded-xl px-3 py-2.5 font-bold text-xs transition-all ${
										config.toggles.spicyLevel === level
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground hover:bg-muted/80"
									}`}
								>
									{SPICY_LABELS[level]}
								</button>
							))}
						</div>
					</div>

					{/* No Onions */}
					<div className="flex items-center justify-between rounded-xl border border-border p-4">
						<Label
							htmlFor="no-onions"
							className="cursor-pointer font-bold text-foreground"
						>
							{t("builder.noOnions")}
						</Label>
						<Checkbox
							id="no-onions"
							checked={config.toggles.noOnions}
							onCheckedChange={updateNoOnions}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
