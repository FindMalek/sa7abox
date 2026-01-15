'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MenuItem } from "@/types/menu";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";

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
        className="group flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border text-left transition-all hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/20 p-2"
      >
        <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden shadow-sm">
          <Image src={item.imageUrl} alt={t(item.nameKey)} fill className="object-cover transition-transform group-hover:scale-105 duration-500" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 backdrop-blur-md text-primary border-none font-black text-[10px] py-1 shadow-sm">
              {t(categoryKey)}
            </Badge>
          </div>
        </div>
  
        <div className="px-4 py-5 flex flex-col grow">
          <h3 className="text-xl font-black text-foreground mb-2 leading-tight">
            {t(item.nameKey)}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4 grow line-clamp-2 font-medium">
            {t(item.descriptionKey)}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-black text-primary">
              {item.priceTnd} <span className="text-xs font-bold opacity-80 uppercase">{t("menu.currency")}</span>
            </span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <PlusIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </button>
    );
  }