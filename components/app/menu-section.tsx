'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MealCard } from "./meal-card";
import { MenuItem } from "@/types/menu";
import { useTranslations } from "next-intl";

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
      <h2 className="text-2xl font-black text-foreground mb-6 px-4">
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
              className="pl-4 basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <MealCard item={item} onOpenDetail={onItemClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}