'use client';

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { MenuItem, SelectedOptions } from "@/types/menu";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    setQuantity(1);
    setSelectedOptions({});
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedOptions((prev) => {
      const currentExtras = prev.extras || [];
      const newExtras = currentExtras.includes(extraId)
        ? currentExtras.filter((id) => id !== extraId)
        : [...currentExtras, extraId];
      return { ...prev, extras: newExtras };
    });
  };

  const itemPrice = item.priceTnd || 0;
  const extrasTotal = selectedOptions.extras?.reduce((sum, id) => {
    const extra = item.options?.extras?.find((e) => e.id === id);
    return sum + (extra?.priceTnd || 0);
  }, 0) || 0;
  const totalPrice = (itemPrice + extrasTotal) * quantity;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="max-h-[94vh] h-full flex flex-col">
      <div className="mx-auto w-full max-w-xl flex flex-col h-full overflow-hidden"> 
        
        <DrawerHeader className="px-6 pt-6 pb-2 shrink-0">
              <DrawerTitle className="text-2xl font-black text-foreground">
                {t(item.nameKey)}
              </DrawerTitle>
              <DrawerDescription className="text-muted-foreground mt-1 text-balance">
                {t(item.descriptionKey)}
              </DrawerDescription>
        </DrawerHeader>

        {/* Replaced ScrollArea with a native div + flex-1 + overflow-y-auto */}
        <div className="flex-1 overflow-y-auto px-6 overscroll-contain">
          <div className="space-y-8 py-6">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm border border-border/50 bg-muted">
              <Image
                src={item.imageUrl}
                alt={t(item.nameKey)}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Nutrition Section */}
            <div className="bg-muted/30 rounded-2xl p-5 border border-border/40">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-primary leading-none">{item.nutrition.calories}</span>
                  <span className="text-[9px] uppercase font-bold text-muted-foreground mt-1">{t('menu.nutrition.calories')}</span>
                </div>
                <div className="flex flex-col border-x border-border/50">
                  <span className="text-xl font-black text-foreground leading-none">{item.nutrition.protein}g</span>
                  <span className="text-[9px] uppercase font-bold text-muted-foreground mt-1">{t('menu.nutrition.protein')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-foreground leading-none">{item.nutrition.fiber}g</span>
                  <span className="text-[9px] uppercase font-bold text-muted-foreground mt-1">{t('menu.nutrition.fiber')}</span>
                </div>
              </div>
            </div>

            {/* Customization (Extras) */}
            {item.options?.extras && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-tight text-foreground">
                    {t('menu.customize.extras')}
                  </h4>
                  <div className="grid gap-3">
                    {item.options.extras.map((extra) => (
                      <div 
                        key={extra.id} 
                        onClick={() => handleExtraToggle(extra.id)} // Add click handler to label
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/20 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            id={extra.id} 
                            checked={selectedOptions.extras?.includes(extra.id)} // Connect to state
                            onCheckedChange={() => handleExtraToggle(extra.id)} // Connect to state
                          />
                          <span className="font-bold">{extra.label}</span>
                        </div>
                        <span className="text-sm font-black text-primary">+{formatTnd(extra.priceTnd || 0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes (Instructions) - Already connected, but verified */}
              <div className="space-y-3 pb-8">
                <Label htmlFor="notes" className="text-sm font-black uppercase text-foreground">
                  {t('menu.customize.notes')}
                </Label>
                <Textarea
                  id="notes"
                  className="rounded-xl border-border bg-background focus:ring-primary/20 min-h-[100px] resize-none"
                  placeholder={t('menu.customize.notesPlaceholder')}
                  value={selectedOptions.notes || ''}
                  onChange={(e) => setSelectedOptions({ ...selectedOptions, notes: e.target.value })}
                />
              </div>
          </div>
        </div>

        <DrawerFooter className="px-6 py-6 border-t border-border bg-background/95 backdrop-blur-md shrink-0">
          <div className="flex items-center justify-between mb-4">
            <QuantitySelector value={quantity} onChange={setQuantity} className="bg-muted/50 rounded-xl p-1" />
            <div className="text-right">
              <span className="text-[9px] uppercase font-black text-muted-foreground block tracking-tighter">{t('menu.total')}</span>
              <span className="text-2xl font-black text-primary leading-none">{formatTnd(totalPrice)}</span>
            </div>
          </div>
          <Button 
            onClick={handleAddToCart} 
            size="lg" 
            className="w-full h-14 rounded-2xl text-lg font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform"
          >
            {t('menu.addToCart')}
          </Button>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
  );
}