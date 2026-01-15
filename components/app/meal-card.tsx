import Image from "next/image";
import { useTranslations } from "next-intl";
import { MenuItem } from "@/lib/consts";
import { Badge } from "@/components/ui/badge";

export function MealCard({ item }: { item: MenuItem }) {
  const t = useTranslations();
  
  return (
    <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border">
      {/* Image Container */}
      <div className="relative aspect-square w-full">
        <Image
          src={item.image}
          alt={t(item.nameKey)}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <div className="mb-2">
          <Badge variant="outline">
            {t(item.categoryTagKey)}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-1">
          {t(item.nameKey)}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-snug mb-4 grow line-clamp-2">
          {t(item.descriptionKey)}
        </p>
        
        <div className="text-primary font-black text-lg">
          {item.price} {t('menu.currency')}
        </div>
      </div>
    </div>
  );
}