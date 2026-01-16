"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatTnd } from "@/lib/utils";
import type { CartTotals } from "@/types/cart";

interface CheckoutFormProps {
	totals: CartTotals;
	onBack: () => void;
	onSubmit: (data: { name: string; phone: string; location: string }) => void;
}

export function CheckoutForm({ totals, onBack, onSubmit }: CheckoutFormProps) {
	const t = useTranslations();
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		location: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<>
			<DrawerHeader className="px-6 pt-6 pb-2">
				<div className="flex items-center justify-between">
					<DrawerTitle className="flex items-center gap-2 font-black text-2xl">
						<Button
							variant="ghost"
							size="icon"
							onClick={onBack}
							className="-ml-2 h-8 w-8"
						>
							<ArrowLeftIcon className="h-5 w-5" />
						</Button>
						{t("checkout.title")}
					</DrawerTitle>
				</div>
			</DrawerHeader>

			<form
				onSubmit={handleSubmit}
				className="flex flex-1 flex-col overflow-hidden"
			>
				<div className="flex-1 overflow-y-auto px-6 py-4">
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="checkout-name">
									{t("checkout.name.label")}
								</FieldLabel>
								<Input
									id="checkout-name"
									placeholder={t("checkout.name.placeholder")}
									className="bg-card/50"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									required
								/>
								<FieldDescription>
									{t("checkout.name.description")}
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel htmlFor="checkout-phone">
									{t("checkout.phone.label")}
								</FieldLabel>
								<Input
									id="checkout-phone"
									type="tel"
									placeholder={t("checkout.phone.placeholder")}
									className="bg-card/50"
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									required
								/>
								<FieldDescription>
									{t("checkout.phone.description")}
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel htmlFor="checkout-location">
									{t("checkout.location.label")}
								</FieldLabel>
								<Input
									id="checkout-location"
									placeholder={t("checkout.location.placeholder")}
									className="bg-card/50"
									value={formData.location}
									onChange={(e) =>
										setFormData({ ...formData, location: e.target.value })
									}
									required
								/>
								<FieldDescription>
									{t("checkout.location.description")}
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldSet>
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
						type="submit"
						className="h-14 w-full rounded-2xl bg-primary font-black text-lg shadow-lg shadow-primary/20"
					>
						{t("checkout.submit")}
					</Button>
				</DrawerFooter>
			</form>
		</>
	);
}
