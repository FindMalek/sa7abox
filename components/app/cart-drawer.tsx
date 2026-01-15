'use client';

import Image from "next/image";
import Link from "next/link";
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
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";
import { Trash2Icon, ShoppingBagIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const t = useTranslations();
  const { items, totals, removeItem, updateQuantity, isEmpty } = useCart();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh]">
      <div className="mx-auto w-full max-w-xl flex flex-col h-full overflow-hidden">
      <DrawerHeader className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-2xl font-black flex items-center gap-2">
                <ShoppingBagIcon className="w-6 h-6 text-primary" />
                {t('menu.cart.title')}
              </DrawerTitle>
              <Badge variant="secondary" className="font-bold">
                {totals.itemCount} {totals.itemCount === 1 ? t('menu.cart.item') : t('menu.cart.items')}
              </Badge>
            </div>
          </DrawerHeader>

          {isEmpty ? (
            <div className="flex-1 flex items-center justify-center p-12">
              <Empty className="border-none">
                <EmptyHeader>
                  <EmptyTitle className="text-xl font-bold">{t('menu.cart.empty.title')}</EmptyTitle>
                  <EmptyDescription>{t('menu.cart.empty.description')}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="mt-4">
                  <Button variant="outline"  className="rounded-xl border-2 font-bold h-12 px-8">
                    <Link href="#menu" onClick={() => onOpenChange(false)}>
                      {t('menu.cart.empty.action')}
                    </Link>
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          ) : (
            <>

<div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-4 py-4">
              {items.map((item) => {
                // Calculate extras price for this specific item
                const extrasPrice = item.selectedOptions.extras?.reduce((sum, extraId) => {
                  const extra = item.menuItem.options?.extras?.find(e => e.id === extraId);
                  return sum + (extra?.priceTnd || 0);
                }, 0) || 0;
                const unitPrice = (item.menuItem.priceTnd || 0) + extrasPrice;

                return (
                  <div key={item.cartItemId} className="flex flex-col gap-3 p-4 rounded-3xl bg-muted/20 border border-border/50">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 border border-border/30">
                        <Image src={item.menuItem.imageUrl} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-black text-foreground text-lg leading-tight">{t(item.menuItem.nameKey)}</h3>
                        {/* Show chosen Extras & Sauces */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.selectedOptions.sauce && (
                            <Badge variant="outline" className="text-[9px] py-0 px-1.5 h-4 border-primary/30 text-primary uppercase font-bold">{item.selectedOptions.sauce}</Badge>
                          )}
                          {item.selectedOptions.extras?.map(id => (
                            <Badge key={id} variant="outline" className="text-[9px] py-0 px-1.5 h-4 uppercase font-bold">
                              +{item.menuItem.options?.extras?.find(e => e.id === id)?.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.cartItemId)} className="text-muted-foreground hover:text-destructive self-start p-1">
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Show Special Instructions if present */}
                    {item.selectedOptions.notes && (
                      <div className="text-[11px] bg-white/50 p-2 rounded-xl border border-dashed border-border text-muted-foreground italic">
                        &quot;{item.selectedOptions.notes}&quot;
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border/20">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.cartItemId, qty)}
                        className="bg-background/50 rounded-xl"
                      />
                      <span className="font-black text-primary">{formatTnd(unitPrice * item.quantity)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> 

              <DrawerFooter className="px-6 py-6 border-t border-border bg-background/80 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-black text-muted-foreground block tracking-widest">{t('menu.cart.subtotal')}</span>
                    <span className="text-3xl font-black text-primary leading-none">{formatTnd(totals.subtotalTnd)}</span>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl text-lg font-black bg-primary shadow-lg shadow-primary/20">
                  {t('menu.cart.checkout')}
                </Button>
              </DrawerFooter>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}