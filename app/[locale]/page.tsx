"use client";

import { useState } from "react";
import { CartBottomBar } from "@/components/app/cart-bottom-bar";
import { CartDrawer } from "@/components/app/cart-drawer";
import { Hero } from "@/components/app/hero";
import { IngredientBuilderSection } from "@/components/app/ingredient-builder-section";
import { Menu } from "@/components/app/menu";
import { PickupPointsSection } from "@/components/app/pickup-points-section";
import { Header } from "@/components/layout/header";

export default function Page() {
	const [cartOpen, setCartOpen] = useState(false);

	return (
		<main className="min-h-screen pb-24 lg:pb-0">
			<Header onOpenCart={() => setCartOpen(true)} />
			<Hero />
			<PickupPointsSection />
			<Menu />
			<IngredientBuilderSection />
			<CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
			<CartBottomBar onOpenCart={() => setCartOpen(true)} />
		</main>
	);
}
