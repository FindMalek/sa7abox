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
	const crevette = MENU_ITEMS.filter((item) => item.category === "crevette");
	const alaCarte = MENU_ITEMS.filter((item) => item.category === "alaCarte");
	const salads = MENU_ITEMS.filter((item) => item.category === "salad");
	const sides = MENU_ITEMS.filter((item) => item.category === "side");
	const drinks = MENU_ITEMS.filter((item) => item.category === "drink");
	const healthySweet = MENU_ITEMS.filter(
		(item) => item.category === "healthySweet",
	);
	const healthyJuice = MENU_ITEMS.filter(
		(item) => item.category === "healthyJuice",
	);

	// One row per plate (groupKey), preserving the order each group first
	// appears in the data file.
	const powerBoxGroups: { groupKey: string; items: typeof powerBoxes }[] = [];
	for (const item of powerBoxes) {
		const key = item.groupKey ?? item.id;
		let group = powerBoxGroups.find((g) => g.groupKey === key);
		if (!group) {
			group = { groupKey: key, items: [] };
			powerBoxGroups.push(group);
		}
		group.items.push(item);
	}

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

					{powerBoxGroups.map((group) => (
						<MenuSection
							key={group.groupKey}
							titleKey={`menu.groups.${group.groupKey}`}
							items={group.items}
							onItemClick={handleItemClick}
						/>
					))}
					{crevette.length > 0 && (
						<MenuSection
							titleKey="menu.categories.crevette"
							items={crevette}
							onItemClick={handleItemClick}
						/>
					)}
					{alaCarte.length > 0 && (
						<MenuSection
							titleKey="menu.categories.alaCarte"
							items={alaCarte}
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
