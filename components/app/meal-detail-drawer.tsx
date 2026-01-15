"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";
import type { MenuItem, SelectedOptions } from "@/types/menu";

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
	const extrasTotal =
		selectedOptions.extras?.reduce((sum, id) => {
			const extra = item.options?.extras?.find((e) => e.id === id);
			return sum + (extra?.priceTnd || 0);
		}, 0) || 0;
	const totalPrice = (itemPrice + extrasTotal) * quantity;

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="flex h-full max-h-[94vh] flex-col">
				<div className="mx-auto flex h-full w-full max-w-xl flex-col overflow-hidden">
					<DrawerHeader className="shrink-0 px-6 pt-6 pb-2">
						<DrawerTitle className="font-black text-2xl text-foreground">
							{t(item.nameKey)}
						</DrawerTitle>
						<DrawerDescription className="mt-1 text-balance text-muted-foreground">
							{t(item.descriptionKey)}
						</DrawerDescription>
					</DrawerHeader>

					{/* Replaced ScrollArea with a native div + flex-1 + overflow-y-auto */}
					<div className="flex-1 overflow-y-auto overscroll-contain px-6">
						<div className="space-y-8 py-6">
							{/* Image */}
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-sm">
								<Image
									src={item.imageUrl}
									alt={t(item.nameKey)}
									fill
									className="object-cover"
									priority
								/>
							</div>

							{/* Nutrition Section */}
							<div className="rounded-2xl border border-border/40 bg-muted/30 p-5">
								<div className="grid grid-cols-3 gap-4 text-center">
									<div className="flex flex-col">
										<span className="font-black text-primary text-xl leading-none">
											{item.nutrition.calories}
										</span>
										<span className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
											{t("menu.nutrition.calories")}
										</span>
									</div>
									<div className="flex flex-col border-border/50 border-x">
										<span className="font-black text-foreground text-xl leading-none">
											{item.nutrition.protein}g
										</span>
										<span className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
											{t("menu.nutrition.protein")}
										</span>
									</div>
									<div className="flex flex-col">
										<span className="font-black text-foreground text-xl leading-none">
											{item.nutrition.fiber}g
										</span>
										<span className="mt-1 font-bold text-[9px] text-muted-foreground uppercase">
											{t("menu.nutrition.fiber")}
										</span>
									</div>
								</div>
							</div>

							{/* Customization (Extras) */}
							{item.options?.extras && (
								<div className="space-y-4">
									<h4 className="font-black text-foreground text-sm uppercase tracking-tight">
										{t("menu.customize.extras")}
									</h4>
									<div className="grid gap-3">
										{item.options.extras.map((extra) => (
											// biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
												key={extra.id}
												onClick={() => handleExtraToggle(extra.id)}
												className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition-all hover:bg-muted/20 active:scale-[0.98]"
											>
												<div className="flex items-center gap-3">
													<Checkbox
														id={extra.id}
														checked={!!selectedOptions.extras?.includes(extra.id)} 
														onCheckedChange={() => handleExtraToggle(extra.id)}
													/>
													<span className="font-bold">{extra.label}</span>
												</div>
												<span className="font-black text-primary text-sm">
													+{formatTnd(extra.priceTnd || 0)}
												</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Notes (Instructions) - Already connected, but verified */}
							<div className="space-y-3 pb-8">
								<Label
									htmlFor="notes"
									className="font-black text-foreground text-sm uppercase"
								>
									{t("menu.customize.notes")}
								</Label>
								<Textarea
									id="notes"
									className="min-h-[100px] resize-none rounded-xl border-border bg-background focus:ring-primary/20"
									placeholder={t("menu.customize.notesPlaceholder")}
									value={selectedOptions.notes || ""}
									onChange={(e) =>
										setSelectedOptions({
											...selectedOptions,
											notes: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<DrawerFooter className="shrink-0 border-border border-t bg-background/95 px-6 py-6 backdrop-blur-md">
						<div className="mb-4 flex items-center justify-between">
							<QuantitySelector
								value={quantity}
								onChange={setQuantity}
								className="rounded-xl bg-muted/50 p-1"
							/>
							<div className="text-right">
								<span className="block font-black text-[9px] text-muted-foreground uppercase tracking-tighter">
									{t("menu.total")}
								</span>
								<span className="font-black text-2xl text-primary leading-none">
									{formatTnd(totalPrice)}
								</span>
							</div>
						</div>
						<Button
							onClick={handleAddToCart}
							size="lg"
							className="h-14 w-full rounded-2xl bg-primary font-black text-lg shadow-primary/20 shadow-xl transition-transform hover:bg-primary/90 active:scale-[0.98]"
						>
							{t("menu.addToCart")}
						</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
