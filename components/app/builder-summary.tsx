"use client";

import { useTranslations } from "next-intl";
import { formatTnd } from "@/lib/utils";
import type { ComputedPlate } from "@/types/ingredient-builder";

interface BuilderSummaryProps {
	computed: ComputedPlate;
}

export function BuilderSummary({ computed }: BuilderSummaryProps) {
	const t = useTranslations();

	return (
		<div className="sticky bottom-0 z-10 rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-xl">
			<h3 className="mb-4 font-black text-foreground text-lg">
				{t("builder.summary.title") || "Your Plate"}
			</h3>

			{/* Nutrition Summary */}
			<div className="mb-4 rounded-xl border border-border/40 bg-muted/30 p-4">
				<h4 className="mb-3 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
					{t("builder.summary.nutrition") || "Nutrition"}
				</h4>
				<div className="grid grid-cols-3 gap-3 text-center">
					<div>
						<div className="font-black text-primary text-xl leading-none">
							{computed.nutrition.calories}
						</div>
						<div className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
							{t("menu.nutrition.calories")}
						</div>
					</div>
					<div className="border-border/50 border-x">
						<div className="font-black text-foreground text-xl leading-none">
							{computed.nutrition.protein}g
						</div>
						<div className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
							{t("menu.nutrition.protein")}
						</div>
					</div>
					<div>
						<div className="font-black text-foreground text-xl leading-none">
							{computed.nutrition.fiber}g
						</div>
						<div className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
							{t("menu.nutrition.fiber")}
						</div>
					</div>
				</div>
				{(computed.nutrition.carbs || computed.nutrition.fat) && (
					<div className="mt-3 grid grid-cols-2 gap-3 border-border/50 border-t pt-3 text-center">
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

			{/* Price & CTA */}
			<div className="flex items-center justify-between border-border border-t pt-4">
				<div>
					<div className="font-black text-[10px] text-muted-foreground uppercase tracking-wider">
						{t("builder.summary.total") || "Total"}
					</div>
					<div className="font-black text-3xl text-primary leading-none">
						{formatTnd(computed.priceTnd)}
					</div>
				</div>
			</div>
		</div>
	);
}
