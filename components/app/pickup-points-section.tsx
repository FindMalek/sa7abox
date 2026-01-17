"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { PICKUP_POINTS } from "@/data/pickup-points";
import { PickupPointCard } from "./pickup-point-card";

export function PickupPointsSection() {
	const t = useTranslations();
	const [emblaRef] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
		slidesToScroll: 1,
	});

	return (
		<section className="bg-background py-16 md:py-24" id="locations">
			<div className="container mx-auto">
				{/* Header */}
				<div className="mb-10 px-6 text-center">
					<h2 className="mb-2 font-black text-3xl text-foreground md:text-4xl">
						{t("pickup.title")}
					</h2>
					<p className="font-bold text-muted-foreground">
						{t("pickup.subtitle", { count: PICKUP_POINTS.length })}
					</p>
				</div>

				{/* Carousel Wrapper */}
				<div className="relative">
					{/* Horizontal Scroll Area */}
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex px-6 pb-8">
							{PICKUP_POINTS.map((point) => (
								<div
									key={point.id}
									className="mr-4 min-w-[85%] flex-none last:mr-0 sm:min-w-[45%] lg:min-w-[30%]"
								>
									<PickupPointCard point={point} />
								</div>
							))}
						</div>
					</div>

					{/* Subtle Side Fades (Indicating Scroll) */}
					<div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
					<div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
				</div>
			</div>
		</section>
	);
}
