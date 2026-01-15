"use client";

import { useState } from "react";
import { BuildMealSection } from "@/components/app/build-meal-section";
import { CartBottomBar } from "@/components/app/cart-bottom-bar";
import { CartDrawer } from "@/components/app/cart-drawer";
import { Hero } from "@/components/app/hero";
import { MealBuilder } from "@/components/app/meal-builder";
import { Menu } from "@/components/app/menu";
import { Header } from "@/components/layout/header";

export default function Page() {
	const [cartOpen, setCartOpen] = useState(false);
	const [builderOpen, setBuilderOpen] = useState(false);

	return (
		<main className="min-h-screen">
			<Header onOpenCart={() => setCartOpen(true)} />
			<Hero />
			<Menu />
			<BuildMealSection onOpenBuilder={() => setBuilderOpen(true)} />
			<MealBuilder open={builderOpen} onOpenChange={setBuilderOpen} />
			<CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
			<CartBottomBar onOpenCart={() => setCartOpen(true)} />
		</main>
	);
}
