'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const t = useTranslations();
  const { items, totals, removeItem, updateQuantity, isEmpty } = useCart();

  const handleCheckout = () => {
    // TODO: Implement Telegram checkout
    alert(t('menu.checkout.comingSoon'));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>{t('menu.cart.title')}</SheetTitle>
          <SheetDescription>{t('menu.cart.description')}</SheetDescription>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>{t('menu.cart.empty.title')}</EmptyTitle>
                <EmptyDescription>
                  {t('menu.cart.empty.description')}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline">
                  <Link href="#menu">{t('menu.cart.empty.action')}</Link>
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => {
                const itemPrice =
                  (item.menuItem.priceTnd || 0) * item.quantity;
                const extrasTotal =
                  item.selectedOptions.extras?.reduce((sum, id) => {
                    const extra = item.menuItem.options?.extras?.find(
                      (e) => e.id === id
                    );
                    return sum + (extra?.priceTnd || 0) * item.quantity;
                  }, 0) || 0;
                const totalItemPrice = itemPrice + extrasTotal;

                return (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4 p-4 rounded-lg border border-border"
                  >
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.menuItem.imageUrl}
                        alt={t(item.menuItem.nameKey)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {t(item.menuItem.nameKey)}
                      </h3>
                      {item.selectedOptions.sauce && (
                        <p className="text-xs text-muted-foreground">
                          {t('menu.cart.sauce')}: {item.selectedOptions.sauce}
                        </p>
                      )}
                      {item.selectedOptions.extras &&
                        item.selectedOptions.extras.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {t('menu.cart.extras')}:{" "}
                            {item.selectedOptions.extras.length}
                          </p>
                        )}
                      <div className="mt-2 flex items-center justify-between">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(qty) =>
                            updateQuantity(item.cartItemId, qty)
                          }
                          className="scale-90"
                        />
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            {formatTnd(totalItemPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.cartItemId)}
                      aria-label={t('menu.cart.remove')}
                      className="shrink-0"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {t('menu.cart.subtotal')}
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatTnd(totals.subtotalTnd)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  {t('menu.cart.continueBrowsing')}
                </Button>
                <Button onClick={handleCheckout} className="flex-1">
                  {t('menu.cart.checkout')}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}