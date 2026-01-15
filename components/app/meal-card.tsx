"use client";

import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { MenuItem } from "@/types/menu";

interface MealCardProps {
	item: MenuItem;
	onOpenDetail: (item: MenuItem) => void;
}

export function MealCard({ item, onOpenDetail }: MealCardProps) {
	const t = useTranslations();
	const { addItem } = useCart();

	const handleQuickAdd = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent opening the drawer
		addItem(item, {}, 1); // Add with default options
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={() => onOpenDetail(item)}
			className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-border bg-card text-left transition-all hover:shadow-xl"
		>
			{/* Edge-to-edge Image */}
			<div className="relative aspect-[4/5] w-full overflow-hidden">
				<Image
					src={item.imageUrl}
					alt={t(item.nameKey)}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{/* Performance Badge */}
				<div className="absolute top-4 left-4">
					<Badge className="rounded-full border-none bg-black/60 px-3 py-1.5 font-black text-[10px] text-white shadow-sm backdrop-blur-md">
						{item.nutrition.calories} kcal • {item.nutrition.protein}g P
					</Badge>
				</div>
			</div>

			<div className="flex grow flex-col px-5 py-6">
				<h3 className="mb-2 font-black text-foreground text-xl leading-tight">
					{t(item.nameKey)}
				</h3>
				<p className="mb-4 line-clamp-2 grow font-medium text-muted-foreground text-xs leading-relaxed">
					{t(item.descriptionKey)}
				</p>
				<div className="mt-auto flex items-center justify-between pt-2">
					<span className="font-black text-primary text-xl">
						{item.priceTnd}{" "}
						<span className="font-bold text-[10px] uppercase tracking-tighter opacity-80">
							{t("menu.currency")}
						</span>
					</span>
					{/* Direct Add Button */}
					<Button
						size="icon"
						onClick={handleQuickAdd}
						className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition-all hover:scale-110 active:scale-95"
					>
						<PlusIcon className="h-5 w-5" strokeWidth={3} />
					</Button>
				</div>
			</div>
		</div>
	);
}
