"use client";

import { useTranslations } from "next-intl";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import type { MenuItem } from "@/types/menu";
import { MealCard } from "./meal-card";

interface MenuSectionProps {
	titleKey: string;
	items: MenuItem[];
	onItemClick: (item: MenuItem) => void;
}

export function MenuSection({
	titleKey,
	items,
	onItemClick,
}: MenuSectionProps) {
	const t = useTranslations();

	return (
		<div className="mb-12">
			<h2 className="mb-6 px-4 font-black text-2xl text-foreground">
				{t(titleKey)}
			</h2>

			<Carousel
				opts={{
					align: "start",
					dragFree: true,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4 px-4">
					{items.map((item) => (
						<CarouselItem
							key={item.id}
							className="basis-[70%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
						>
							<MealCard item={item} onOpenDetail={onItemClick} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
