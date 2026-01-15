'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MenuItem } from "@/types/menu";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
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
      <div
        onClick={() => onOpenDetail(item)}
        className="group flex flex-col h-full bg-card rounded-[2rem] overflow-hidden border border-border text-left transition-all hover:shadow-xl cursor-pointer"
      >
        {/* Edge-to-edge Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image 
            src={item.imageUrl} 
            alt={t(item.nameKey)} 
            fill 
            className="object-cover transition-transform group-hover:scale-105 duration-500" 
          />
          {/* Performance Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/60 backdrop-blur-md text-white border-none font-black text-[10px] py-1.5 px-3 rounded-full shadow-sm">
              {item.nutrition.calories} kcal • {item.nutrition.protein}g P
            </Badge>
          </div>
        </div>
  
        <div className="px-5 py-6 flex flex-col grow">
          <h3 className="text-xl font-black text-foreground mb-2 leading-tight">
            {t(item.nameKey)}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4 grow line-clamp-2 font-medium">
            {t(item.descriptionKey)}
          </p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-xl font-black text-primary">
              {item.priceTnd} <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">{t("menu.currency")}</span>
            </span>
            {/* Direct Add Button */}
            <button 
              onClick={handleQuickAdd}
              className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
            >
              <PlusIcon className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    );
  }