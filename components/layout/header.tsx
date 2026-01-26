"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";

interface HeaderProps {
	onOpenCart: () => void;
}

export function Header({ onOpenCart }: HeaderProps) {
	const t = useTranslations("header");
	const { totals, isEmpty } = useCart();

	return (
		<header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-2">
					<Image src="/logo.svg" alt="Sa7a Box" width={32} height={32} />
					<span className="font-bold text-2xl text-primary">Sa7a Box</span>
				</Link>

				<div className="flex items-center gap-3 sm:gap-4">
					<Button
						size="default"
						onClick={onOpenCart}
						className="relative bg-primary text-primary-foreground hover:bg-primary/90"
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
