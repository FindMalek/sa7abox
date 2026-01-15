'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MenuSection } from "./menu-section";
import { MealDetailDrawer } from "./meal-detail-drawer";
import { MenuItem } from "@/types/menu";
import { MENU_ITEMS } from "@/data/menu-items";

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

  return (
    <>
      <section id="menu" className="py-16 bg-background pb-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
              {t("title")}
            </h2>
            <p className="text-muted-foreground font-medium">{t("subtitle")}</p>
          </div>

          {powerBoxes.length > 0 && (
            <MenuSection
              titleKey="menu.categories.powerBoxes"
              items={powerBoxes}
              onItemClick={handleItemClick}
            />
          )}
          {salads.length > 0 && (
            <MenuSection
              titleKey="menu.categories.greenFresh"
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