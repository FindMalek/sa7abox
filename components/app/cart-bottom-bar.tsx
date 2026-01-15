"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";

interface CartBottomBarProps {
	onOpenCart: () => void;
}

export function CartBottomBar({ onOpenCart }: CartBottomBarProps) {
	const t = useTranslations();
	const { totals, isEmpty } = useCart();

	if (isEmpty) return null;

	return (
		<div className="fixed right-0 bottom-0 left-0 z-40 border-border border-t bg-background/95 pb-safe backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<div>
						<div className="text-muted-foreground text-sm">
							{totals.itemCount}{" "}
							{totals.itemCount === 1
								? t("menu.cart.item")
								: t("menu.cart.items")}
						</div>
						{totals.subtotalTnd > 0 && (
							<div className="font-bold text-lg text-primary">
								{formatTnd(totals.subtotalTnd)}
							</div>
						)}
					</div>
					<Button onClick={onOpenCart} size="lg" className="px-8">
						{t("menu.cart.review")}
					</Button>
				</div>
			</div>
		</div>
	);
}
