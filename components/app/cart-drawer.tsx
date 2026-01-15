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
        <div className="mx-auto w-full max-w-xl flex flex-col h-full">
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
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 py-4">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4 p-4 rounded-2xl bg-muted/20 border border-border/50 relative group">
                      <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 shadow-sm border border-border/30">
                        <Image src={item.menuItem.imageUrl} alt={t(item.menuItem.nameKey)} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-black text-foreground truncate">{t(item.menuItem.nameKey)}</h3>
                            <button onClick={() => removeItem(item.cartItemId)} className="text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2Icon className="w-4 h-4" />
                            </button>
                          </div>
                          {item.selectedOptions.sauce && (
                            <span className="text-[10px] uppercase font-black text-primary tracking-wider mt-1 block">
                              {item.selectedOptions.sauce}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <QuantitySelector
                            value={item.quantity}
                            onChange={(qty) => updateQuantity(item.cartItemId, qty)}
                            className="bg-background scale-90 -ml-2"
                          />
                          <span className="font-black text-foreground">{formatTnd(item.menuItem.priceTnd! * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <DrawerFooter className="px-6 py-6 border-t border-border bg-background/80 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-black text-muted-foreground block tracking-widest">{t('menu.cart.subtotal')}</span>
                    <span className="text-3xl font-black text-primary leading-none">{formatTnd(totals.subtotalTnd)}</span>
                  </div>
                  <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-bold text-muted-foreground hover:text-foreground">
                    {t('menu.cart.continueBrowsing')}
                  </Button>
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