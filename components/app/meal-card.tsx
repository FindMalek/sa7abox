'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MenuItem } from "@/types/menu";
import { Badge } from "@/components/ui/badge";

interface MealCardProps {
  item: MenuItem;
  onOpenDetail: (item: MenuItem) => void;
}

export function MealCard({ item, onOpenDetail }: MealCardProps) {
  const t = useTranslations();
  const categoryKey = `menu.categories.${item.category}`;

  return (
    <button
      onClick={() => onOpenDetail(item)}
      className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border text-left transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={t(item.nameKey)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full">
        <Image
          src={item.imageUrl}
          alt={t(item.nameKey)}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <div className="mb-2">
          <Badge variant="outline">
            {t(categoryKey)}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1">
          {t(item.nameKey)}
        </h3>

        <p className="text-sm text-muted-foreground leading-snug mb-4 grow line-clamp-2">
          {t(item.descriptionKey)}
        </p>

        {item.priceTnd && (
          <div className="text-primary font-black text-lg">
            {item.priceTnd} {t("menu.currency")}
          </div>
        )}
      </div>
    </button>
  );
}