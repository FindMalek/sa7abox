"use client";

import { ChefHatIcon, SparklesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface BuildMealSectionProps {
	onOpenBuilder: () => void;
}

export function BuildMealSection({ onOpenBuilder }: BuildMealSectionProps) {
	const t = useTranslations();

	return (
		<section
			id="build-meal"
			className="bg-background px-4 py-16 sm:px-6 lg:px-8"
		>
			<div className="container mx-auto max-w-4xl">
				<div className="relative overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5 p-8 sm:p-12 lg:p-16">
					{/* Decorative elements */}
					<div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

					<div className="relative z-10 text-center">
						{/* Icon */}
						<div className="mb-6 flex justify-center">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
								<ChefHatIcon className="h-8 w-8 text-primary" />
							</div>
						</div>

						{/* Title */}
						<h2 className="mb-4 font-black text-3xl text-foreground sm:text-4xl lg:text-5xl">
							{t("builder.callout.title") || "Build Your Meal"}
						</h2>

						{/* Description */}
						<p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
							{t("builder.callout.description") ||
								"Customize your nutrition exactly how you want it. Choose your base, adjust macros, and create the perfect meal for your goals."}
						</p>

						{/* Features */}
						<div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div className="flex flex-col items-center gap-2 rounded-xl bg-card/50 p-4 backdrop-blur-sm">
								<SparklesIcon className="h-5 w-5 text-primary" />
								<span className="font-bold text-foreground text-sm">
									{t("builder.callout.feature1") || "Custom Macros"}
								</span>
							</div>
							<div className="flex flex-col items-center gap-2 rounded-xl bg-card/50 p-4 backdrop-blur-sm">
								<SparklesIcon className="h-5 w-5 text-primary" />
								<span className="font-bold text-foreground text-sm">
									{t("builder.callout.feature2") || "Real-time Pricing"}
								</span>
							</div>
							<div className="flex flex-col items-center gap-2 rounded-xl bg-card/50 p-4 backdrop-blur-sm">
								<SparklesIcon className="h-5 w-5 text-primary" />
								<span className="font-bold text-foreground text-sm">
									{t("builder.callout.feature3") || "Perfect Portions"}
								</span>
							</div>
						</div>

						{/* CTA Button */}
						<Button
							onClick={onOpenBuilder}
							size="lg"
							className="h-14 rounded-2xl bg-primary px-10 font-black text-lg shadow-primary/20 shadow-xl hover:bg-primary/90"
						>
							{t("builder.callout.cta") || "Start Building"}
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
