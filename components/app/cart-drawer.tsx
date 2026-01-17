"use client";

import { ShoppingBagIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckoutForm } from "@/components/app/checkout-form";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { INGREDIENTS } from "@/data/ingredients";
import { useCart } from "@/hooks/use-cart";
import { formatTnd } from "@/lib/utils";
import type { IngredientSelection } from "@/types/ingredient-builder";

interface CartDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
	const t = useTranslations();
	const { items, totals, removeItem, updateQuantity, isEmpty, clearCart } =
		useCart();
	const [showCheckout, setShowCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCheckout = () => {
		setShowCheckout(true);
		setError(null);
	};

	const handleBackToCart = () => {
		setShowCheckout(false);
		setError(null);
	};

	const handleSubmitOrder = async (formData: {
		name: string;
		phone: string;
		location: string;
	}) => {
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customerName: formData.name,
					customerPhone: formData.phone,
					customerLocation: formData.location,
					items: items,
					total: totals.subtotalTnd,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || "Failed to submit order");
			}

			const result = await response.json();
			console.log(result);

			// Success! Clear cart and close drawer
			clearCart();
			onOpenChange(false);
			setShowCheckout(false);
		} catch (err) {
			console.error("Order submission error:", err);
			setError(
				err instanceof Error
					? err.message
					: t("checkout.error") || "Failed to submit order. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="max-h-[92vh]">
				<div className="mx-auto flex h-full w-full max-w-xl flex-col overflow-hidden">
					{showCheckout ? (
						<>
							<CheckoutForm
								totals={totals}
								onBack={handleBackToCart}
								onSubmit={handleSubmitOrder}
								isSubmitting={isSubmitting}
							/>
							{error && (
								<div className="px-6 pb-4">
									<div className="rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm">
										{error}
									</div>
								</div>
							)}
						</>
					) : (
						<>
							<DrawerHeader className="px-6 pt-6 pb-2">
								<div className="flex items-center justify-between">
									<DrawerTitle className="flex items-center gap-2 font-black text-2xl">
										<ShoppingBagIcon className="h-6 w-6 text-primary" />
										{t("menu.cart.title")}
									</DrawerTitle>
									<Badge variant="secondary" className="font-bold">
										{totals.itemCount}{" "}
										{totals.itemCount === 1
											? t("menu.cart.item")
											: t("menu.cart.items")}
									</Badge>
								</div>
							</DrawerHeader>

							{isEmpty ? (
								<div className="flex flex-1 items-center justify-center p-12">
									<Empty className="border-none">
										<EmptyHeader>
											<EmptyTitle className="font-bold text-xl">
												{t("menu.cart.empty.title")}
											</EmptyTitle>
											<EmptyDescription>
												{t("menu.cart.empty.description")}
											</EmptyDescription>
										</EmptyHeader>
										<EmptyContent className="mt-4">
											<Button
												variant="outline"
												className="h-12 rounded-xl border-2 px-8 font-bold"
											>
												<Link href="#menu" onClick={() => onOpenChange(false)}>
													{t("menu.cart.empty.action")}
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
												const extrasPrice =
													item.selectedOptions.extras?.reduce(
														(sum, extraId) => {
															const extra = item.menuItem.options?.extras?.find(
																(e) => e.id === extraId,
															);
															return sum + (extra?.priceTnd || 0);
														},
														0,
													) || 0;
												const unitPrice =
													(item.menuItem.priceTnd || 0) + extrasPrice;

												const isCustomPlate =
													!!item.selectedOptions.ingredientSelections;
												const ingredientSelections = item.selectedOptions
													.ingredientSelections as
													| IngredientSelection[]
													| undefined;

												return (
													<div
														key={item.cartItemId}
														className="flex flex-col gap-3 rounded-3xl border border-border/50 bg-muted/20 p-4"
													>
														<div className="flex gap-4">
															<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border/30">
																<Image
																	src={item.menuItem.imageUrl}
																	alt=""
																	fill
																	className="object-cover"
																/>
															</div>
															<div className="flex min-w-0 flex-1 flex-col justify-center">
																<h3 className="font-black text-foreground text-lg leading-tight">
																	{t(item.menuItem.nameKey)}
																</h3>
																{!isCustomPlate && (
																	<div className="mt-1 flex flex-wrap gap-1">
																		{item.selectedOptions.sauce && (
																			<Badge
																				variant="outline"
																				className="h-4 border-primary/30 px-1.5 py-0 font-bold text-[9px] text-primary uppercase"
																			>
																				{item.selectedOptions.sauce}
																			</Badge>
																		)}
																		{item.selectedOptions.extras?.map((id) => (
																			<Badge
																				key={id}
																				variant="outline"
																				className="h-4 px-1.5 py-0 font-bold text-[9px] uppercase"
																			>
																				+
																				{
																					item.menuItem.options?.extras?.find(
																						(e) => e.id === id,
																					)?.label
																				}
																			</Badge>
																		))}
																	</div>
																)}
															</div>
															<Button
																variant="ghost"
																size="icon"
																onClick={() => removeItem(item.cartItemId)}
																className="self-start p-1 text-muted-foreground hover:text-destructive"
															>
																<Trash2Icon className="h-4 w-4" />
															</Button>
														</div>

														{item.selectedOptions.notes && (
															<div className="rounded-xl border border-border border-dashed bg-white/50 p-2 text-[11px] text-muted-foreground italic">
																&quot;{item.selectedOptions.notes}&quot;
															</div>
														)}

														{isCustomPlate &&
															ingredientSelections &&
															ingredientSelections.length > 0 && (
																<div className="flex flex-wrap gap-1.5">
																	{ingredientSelections
																		.filter((sel) => sel.quantity > 0)
																		.map((selection) => {
																			const ingredient = INGREDIENTS.find(
																				(i) => i.id === selection.ingredientId,
																			);
																			if (!ingredient) return null;
																			return (
																				<Badge
																					key={selection.ingredientId}
																					variant="outline"
																					className="h-5 border-primary/30 bg-primary/10 px-2 py-0 font-bold text-[9px] text-primary"
																				>
																					{t(ingredient.nameKey)} x
																					{selection.quantity}
																				</Badge>
																			);
																		})}
																</div>
															)}

														<div className="flex items-center justify-between border-border/20 border-t pt-2">
															<QuantitySelector
																value={item.quantity}
																onChange={(qty) =>
																	updateQuantity(item.cartItemId, qty)
																}
																className="rounded-xl bg-background/50"
															/>
															<span className="font-black text-primary">
																{formatTnd(unitPrice * item.quantity)}
															</span>
														</div>
													</div>
												);
											})}
										</div>
									</div>

									<DrawerFooter className="border-border border-t bg-background/80 px-6 py-6 backdrop-blur-sm">
										<div className="mb-6 flex items-end justify-between">
											<div className="space-y-1">
												<span className="block font-black text-[10px] text-muted-foreground uppercase tracking-widest">
													{t("menu.cart.subtotal")}
												</span>
												<span className="font-black text-3xl text-primary leading-none">
													{formatTnd(totals.subtotalTnd)}
												</span>
											</div>
										</div>
										<Button
											onClick={handleCheckout}
											className="h-14 w-full rounded-2xl bg-primary font-black text-lg shadow-lg shadow-primary/20"
										>
											{t("menu.cart.checkout")}
										</Button>
									</DrawerFooter>
								</>
							)}
						</>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
