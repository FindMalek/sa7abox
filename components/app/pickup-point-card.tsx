"use client";

import Image from "next/image";
import type { PickupPoint } from "@/types/pickup";

interface PickupPointCardProps {
	point: PickupPoint;
}

export function PickupPointCard({ point }: PickupPointCardProps) {
	return (
		<a
			href={point.mapUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-border/20 bg-card shadow-sm transition-all hover:scale-105 hover:shadow-md"
			aria-label={`${point.gymName} - ${point.areaLabel}`}
		>
			<Image
				src={point.logoUrl}
				alt={point.gymName}
				fill
				className="object-contain p-2 transition-opacity group-hover:opacity-90"
				priority
				unoptimized
			/>
		</a>
	);
}
