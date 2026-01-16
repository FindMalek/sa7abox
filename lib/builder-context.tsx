"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { ComputedPlate } from "@/types/ingredient-builder";

interface BuilderContextValue {
	computed: ComputedPlate | null;
	hasSelections: boolean;
	canAddToCart: boolean;
	onAddToCart: () => void;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export function BuilderProvider({
	children,
	value,
}: {
	children: ReactNode;
	value: BuilderContextValue;
}) {
	return (
		<BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
	);
}

export function useBuilder() {
	const context = useContext(BuilderContext);
	return context;
}
