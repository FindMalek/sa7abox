"use client";

import { PICKUP_POINTS } from "@/data/pickup-points";
import { PickupPointCard } from "./pickup-point-card";

export function PickupPointsSection() {
	return (
		<section className="bg-accent" id="locations">
			<div className="mx-auto grid max-w-sm grid-cols-4 justify-items-center gap-2">
				{PICKUP_POINTS.map((point) => (
					<PickupPointCard key={point.id} point={point} />
				))}
			</div>
		</section>
	);
}
