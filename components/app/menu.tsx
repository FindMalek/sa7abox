"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MENU_ITEMS } from "@/data/menu-items";
import type { MenuItem } from "@/types/menu";
import { MealDetailDrawer } from "./meal-detail-drawer";
import { MenuSection } from "./menu-section";

export function Menu() {
	const t = useTranslations("menu");
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleItemClick = (item: MenuItem) => {
		setSelectedItem(item);
		setDrawerOpen(true);
	};

	const powerBoxes = MENU_ITEMS.filter((item) => item.category === "box");
	const salads = MENU_ITEMS.filter((item) => item.category === "salad");
	const sides = MENU_ITEMS.filter((item) => item.category === "side");
	const drinks = MENU_ITEMS.filter((item) => item.category === "drink");
	const healthySweet = MENU_ITEMS.filter(
		(item) => item.category === "healthySweet",
	);
	const healthyJuice = MENU_ITEMS.filter(
		(item) => item.category === "healthyJuice",
	);

	return (
		<>
			<section id="menu" className="bg-background py-16 pb-24">
				<div className="container mx-auto">
					<div className="mb-12 text-center">
						<h2 className="mb-2 font-black text-3xl text-foreground sm:text-4xl">
							{t("title")}
						</h2>
						<p className="font-medium text-muted-foreground">{t("subtitle")}</p>
					</div>

					{powerBoxes.length > 0 && (
						<MenuSection
							titleKey="menu.categories.powerBoxes"
							items={powerBoxes}
							onItemClick={handleItemClick}
						/>
					)}
					{healthySweet.length > 0 && (
						<MenuSection
							titleKey="menu.categories.healthySweet"
							items={healthySweet}
							onItemClick={handleItemClick}
						/>
					)}
					{salads.length > 0 && (
						<MenuSection
							titleKey="menu.categories.salad"
							items={salads}
							onItemClick={handleItemClick}
						/>
					)}
					{sides.length > 0 && (
						<MenuSection
							titleKey="menu.categories.sides"
							items={sides}
							onItemClick={handleItemClick}
						/>
					)}
					{drinks.length > 0 && (
						<MenuSection
							titleKey="menu.categories.drinks"
							items={drinks}
							onItemClick={handleItemClick}
						/>
					)}
					{healthyJuice.length > 0 && (
						<MenuSection
							titleKey="menu.categories.healthyJuice"
							items={healthyJuice}
							onItemClick={handleItemClick}
						/>
					)}
				</div>
			</section>

			<MealDetailDrawer
				item={selectedItem}
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
			/>
		</>
	);
}
