"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PORTION_CONFIG } from "@/data/builder";
import { formatTnd } from "@/lib/utils";
import type { BuilderConfig, ComputedMeal } from "@/types/builder";

interface MacrosStepProps {
	config: BuilderConfig;
	onConfigChange: (config: BuilderConfig) => void;
	computed: ComputedMeal | null;
}

export function MacrosStep({
	config,
	onConfigChange,
	computed,
}: MacrosStepProps) {
	const t = useTranslations();

	const updatePortion = (key: keyof typeof config.portions, delta: number) => {
		const portion = PORTION_CONFIG[key];
		const current = config.portions[key];
		const newValue = Math.max(
			portion.min,
			Math.min(portion.max, current + delta),
		);
		onConfigChange({
			...config,
			portions: { ...config.portions, [key]: newValue },
		});
	};

	if (!computed) return null;

	return (
		<div className="space-y-8 px-6 py-6">
			{/* Portion Controls */}
			<div className="space-y-4">
				{(
					Object.keys(PORTION_CONFIG) as Array<keyof typeof PORTION_CONFIG>
				).map((key) => {
					const portion = PORTION_CONFIG[key];
					const current = config.portions[key];
					const isMin = current <= portion.min;
					const isMax = current >= portion.max;

					return (
						<div
							key={key}
							className="rounded-2xl border border-border bg-card p-5"
						>
							<div className="mb-3 flex items-center justify-between">
								<div>
									<h4 className="font-black text-foreground">
										{portion.label}
									</h4>
									<p className="text-muted-foreground text-xs">
										{portion.min}-{portion.max} portions
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Button
										variant="outline"
										size="icon"
										onClick={() => updatePortion(key, -1)}
										disabled={isMin}
										className="h-10 w-10 rounded-xl"
										aria-label={`Decrease ${portion.label}`}
									>
										<MinusIcon className="h-4 w-4" />
									</Button>
									<span className="w-12 text-center font-black text-xl">
										{current}
									</span>
									<Button
										variant="outline"
										size="icon"
										onClick={() => updatePortion(key, 1)}
										disabled={isMax}
										className="h-10 w-10 rounded-xl"
										aria-label={`Increase ${portion.label}`}
									>
										<PlusIcon className="h-4 w-4" />
									</Button>
								</div>
							</div>
							{current > 0 && (
								<div className="mt-3 border-border/50 border-t pt-3 text-muted-foreground text-xs">
									+{current * portion.nutritionPerPortion.calories} kcal, +
									{current * portion.nutritionPerPortion.protein}g protein
									{portion.nutritionPerPortion.carbs > 0 &&
										`, +${current * portion.nutritionPerPortion.carbs}g carbs`}
									{portion.nutritionPerPortion.fat > 0 &&
										`, +${current * portion.nutritionPerPortion.fat}g fat`}
									{portion.nutritionPerPortion.fiber > 0 &&
										`, +${current * portion.nutritionPerPortion.fiber}g fiber`}
									{" • "}
									<span className="font-bold text-primary">
										+{formatTnd(current * portion.pricePerPortion)}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Nutrition Summary */}
			<div className="rounded-2xl border border-border/40 bg-muted/30 p-6">
				<h4 className="mb-4 font-black text-muted-foreground text-xs uppercase tracking-widest">
					{t("builder.nutritionSummary")}
				</h4>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="font-black text-2xl text-primary leading-none">
							{computed.nutrition.calories}
						</div>
						<div className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
							{t("menu.nutrition.calories")}
						</div>
					</div>
					<div className="border-border/50 border-x">
						<div className="font-black text-2xl text-foreground leading-none">
							{computed.nutrition.protein}g
						</div>
						<div className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
							{t("menu.nutrition.protein")}
						</div>
					</div>
					<div>
						<div className="font-black text-2xl text-foreground leading-none">
							{computed.nutrition.fiber}g
						</div>
						<div className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
							{t("menu.nutrition.fiber")}
						</div>
					</div>
				</div>
				{(computed.nutrition.carbs || computed.nutrition.fat) && (
					<div className="mt-4 grid grid-cols-2 gap-4 border-border/50 border-t pt-4 text-center">
						{computed.nutrition.carbs !== undefined && (
							<div>
								<div className="font-black text-foreground text-lg">
									{computed.nutrition.carbs}g
								</div>
								<div className="font-bold text-[9px] text-muted-foreground uppercase">
									{t("menu.nutrition.carbs")}
								</div>
							</div>
						)}
						{computed.nutrition.fat !== undefined && (
							<div>
								<div className="font-black text-foreground text-lg">
									{computed.nutrition.fat}g
								</div>
								<div className="font-bold text-[9px] text-muted-foreground uppercase">
									{t("menu.nutrition.fat")}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
