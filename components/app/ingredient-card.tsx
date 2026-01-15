"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ingredient } from "@/data/ingredients";
import { formatTnd } from "@/lib/utils";

interface IngredientCardProps {
	ingredient: Ingredient;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
}

export function IngredientCard({
	ingredient,
	quantity,
	onQuantityChange,
}: IngredientCardProps) {
	const t = useTranslations();
	const isMin = quantity <= ingredient.minQty;
	const isMax = quantity >= ingredient.maxQty;

	const handleDecrement = () => {
		if (!isMin) {
			onQuantityChange(quantity - 1);
		}
	};

	const handleIncrement = () => {
		if (!isMax) {
			onQuantityChange(quantity + 1);
		}
	};

	return (
		<div className="flex gap-4 rounded-2xl border border-border bg-card p-4">
			{/* Thumbnail */}
			{ingredient.imageUrl && (
				<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
					<Image
						src={ingredient.imageUrl}
						alt={t(ingredient.nameKey)}
						fill
						className="object-cover"
					/>
				</div>
			)}

			{/* Content */}
			<div className="flex flex-1 flex-col justify-between gap-2">
				<div>
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0 flex-1">
							<h4 className="font-black text-foreground text-lg leading-tight">
								{t(ingredient.nameKey)}
							</h4>
							<p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs">
								{t(ingredient.descriptionKey)}
							</p>
						</div>
						{ingredient.required && (
							<Badge
								variant="secondary"
								className="shrink-0 font-bold text-[9px]"
							>
								Required
							</Badge>
						)}
					</div>
					<div className="mt-1.5 flex items-center gap-2 text-muted-foreground text-xs">
						<span className="font-bold">{ingredient.unitLabel}</span>
						<span>•</span>
						<span className="font-black text-primary">
							{formatTnd(ingredient.unitPriceTnd)}/{ingredient.unitLabel}
						</span>
					</div>
				</div>

				{/* Quantity Controls */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={handleDecrement}
							disabled={isMin}
							className="h-10 w-10 rounded-xl"
							aria-label={`Decrease ${t(ingredient.nameKey)}`}
						>
							<MinusIcon className="h-4 w-4" />
						</Button>
						<span
							className="w-12 text-center font-black text-xl"
							aria-label={`Quantity: ${quantity}`}
						>
							{quantity}
						</span>
						<Button
							variant="outline"
							size="icon"
							onClick={handleIncrement}
							disabled={isMax}
							className="h-10 w-10 rounded-xl"
							aria-label={`Increase ${t(ingredient.nameKey)}`}
						>
							<PlusIcon className="h-4 w-4" />
						</Button>
					</div>
					{quantity > 0 && (
						<div className="text-right">
							<div className="font-black text-lg text-primary">
								{formatTnd(ingredient.unitPriceTnd * quantity)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
