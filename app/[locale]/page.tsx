'use client';

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/app/hero";
import { Menu } from "@/components/app/menu";
import { CartDrawer } from "@/components/app/cart-drawer";
import { CartBottomBar } from "@/components/app/cart-bottom-bar";

export default function Page() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <Menu />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <CartBottomBar onOpenCart={() => setCartOpen(true)} />
    </main>
  );
}