'use client';

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { MenuItem, SelectedOptions } from "@/types/menu";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";

interface MealDetailDrawerProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MealDetailDrawer({
  item,
  open,
  onOpenChange,
}: MealDetailDrawerProps) {
  const t = useTranslations();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  if (!item) return null;

  const handleAddToCart = () => {
    addItem(item, selectedOptions, quantity);
    onOpenChange(false);
    // Reset state
    setQuantity(1);
    setSelectedOptions({});
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedOptions((prev) => {
      const extras = prev.extras || [];
      return {
        ...prev,
        extras: extras.includes(extraId)
          ? extras.filter((id) => id !== extraId)
          : [...extras, extraId],
      };
    });
  };

  const itemPrice = item.priceTnd || 0;
  const extrasTotal =
    selectedOptions.extras?.reduce((sum, id) => {
      const extra = item.options?.extras?.find((e) => e.id === id);
      return sum + (extra?.priceTnd || 0);
    }, 0) || 0;
  const totalPrice = (itemPrice + extrasTotal) * quantity;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">{t(item.nameKey)}</SheetTitle>
          <SheetDescription className="sr-only">
            {t(item.descriptionKey)}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Image */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={t(item.nameKey)}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Name & Description */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t(item.nameKey)}
            </h2>
            <p className="text-muted-foreground">{t(item.descriptionKey)}</p>
          </div>

          {/* Nutrition Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-3 py-1">
              {item.nutrition.calories} {t('menu.nutrition.calories')}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {item.nutrition.protein}g {t('menu.nutrition.protein')}
            </Badge>
            {item.nutrition.carbs !== undefined && (
              <Badge variant="outline" className="px-3 py-1">
                {item.nutrition.carbs}g {t('menu.nutrition.carbs')}
              </Badge>
            )}
            {item.nutrition.fat !== undefined && (
              <Badge variant="outline" className="px-3 py-1">
                {item.nutrition.fat}g {t('menu.nutrition.fat')}
              </Badge>
            )}
            <Badge variant="outline" className="px-3 py-1">
              {item.nutrition.fiber}g {t('menu.nutrition.fiber')}
            </Badge>
          </div>

          {/* Extras */}
          {item.options?.extras && item.options.extras.length > 0 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">
                {t('menu.customize.extras')}
              </Label>
              <div className="space-y-2">
                {item.options.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={extra.id}
                        checked={selectedOptions.extras?.includes(extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra.id)}
                      />
                      <Label htmlFor={extra.id} className="cursor-pointer">
                        {extra.label}
                      </Label>
                    </div>
                    {extra.priceTnd && (
                      <span className="text-sm text-muted-foreground">
                        +{formatTnd(extra.priceTnd)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sauces */}
          {item.options?.sauces && item.options.sauces.length > 0 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">
                {t('menu.customize.sauce')}
              </Label>
              <div className="space-y-2">
                {item.options.sauces.map((sauce) => (
                  <div
                    key={sauce}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border"
                  >
                    <Checkbox
                      id={`sauce-${sauce}`}
                      checked={selectedOptions.sauce === sauce}
                      onCheckedChange={(checked) => {
                        setSelectedOptions((prev) => ({
                          ...prev,
                          sauce: checked ? sauce : undefined,
                        }));
                      }}
                    />
                    <Label htmlFor={`sauce-${sauce}`} className="cursor-pointer">
                      {sauce}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-base font-semibold mb-3 block">
              {t('menu.customize.notes')}
            </Label>
            <Textarea
              id="notes"
              placeholder={t('menu.customize.notesPlaceholder')}
              value={selectedOptions.notes || ""}
              onChange={(e) =>
                setSelectedOptions((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
            />
          </div>

          {/* Quantity & Price */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                {t('menu.quantity')}
              </Label>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
              />
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">
                {t('menu.total')}
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatTnd(totalPrice)}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            {t('menu.addToCart')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}