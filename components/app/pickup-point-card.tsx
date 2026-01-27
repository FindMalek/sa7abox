"use client";

import { ClockIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { PickupPoint } from "@/types/pickup";

interface PickupPointCardProps {
	point: PickupPoint;
}

export function PickupPointCard({ point }: PickupPointCardProps) {
	const t = useTranslations();

	return (
		<div className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-border/20 bg-card shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl">
			{/* Background Logo */}
			<div className="absolute inset-0">
				<Image
					src={point.logoUrl}
					alt={point.gymName}
					fill
					className="object-cover opacity-20 transition-opacity group-hover:opacity-30"
					priority
				/>
				{/* Dark Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />
			</div>

			{/* Content */}
			<div className="relative z-10 flex h-full flex-col justify-between p-6">
				{/* Top Section: Gym Info */}
				<div className="space-y-3">
					<div className="space-y-2">
						<h3 className="font-black text-2xl text-white leading-tight drop-shadow-lg">
							{point.gymName}
						</h3>
						<div className="flex items-center gap-2 font-semibold text-sm text-white/80">
							<MapPinIcon className="h-4 w-4 text-primary" />
							<span className="drop-shadow-md">{point.areaLabel}</span>
						</div>
					</div>
				</div>

				{/* Bottom Section: CTA Button */}
				<div className="mt-6">
					<Button
						variant="outline"
						className="h-12 w-full rounded-xl border-2 border-white/20 bg-white/10 font-black text-white backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-white"
					>
						<a
							href={point.mapUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`${t("pickup.openMap")} for ${point.gymName}`}
							className="flex w-full items-center justify-center"
						>
							{t("pickup.openMap")}
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
