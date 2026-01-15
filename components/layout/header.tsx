'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";

interface HeaderProps {
  onOpenCart: () => void;
}

export function Header({ onOpenCart }: HeaderProps) {
  const t = useTranslations("header");
  const { totals, isEmpty } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary shrink-0" />
          <span className="text-2xl font-bold text-primary">Sa7a Box</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            size="default"
            onClick={onOpenCart}
            className="bg-primary text-primary-foreground hover:bg-primary/90 relative"
          >
            {t("order")}
            {!isEmpty && (
              <>
                {totals.subtotalTnd > 0 && (
                  <span className="ml-2 text-sm opacity-90">
                    — {formatTnd(totals.subtotalTnd)}
                  </span>
                )}
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-5 px-1.5 text-xs"
                >
                  {totals.itemCount}
                </Badge>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}