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
		<div className="group relative flex h-full flex-col justify-between rounded-3xl border border-border/40 bg-card p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
			<div className="space-y-4">
				{/* Top Row: Info */}
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-1">
						<h3 className="font-black text-foreground text-xl leading-tight">
							{point.gymName}
						</h3>
						<div className="flex items-center gap-1.5 font-bold text-muted-foreground text-sm">
							<MapPinIcon className="h-3.5 w-3.5 text-primary/60" />
							{point.areaLabel}
						</div>
					</div>
					<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted/30 p-2">
						<Image
							src={point.logoUrl}
							alt={point.gymName}
							fill
							className="object-contain p-2"
						/>
					</div>
				</div>
			</div>

			{/* CTA Button */}
			<div className="mt-8">
				<Button
					variant="outline"
					className="h-12 w-full rounded-xl border-2 font-black transition-colors hover:bg-primary hover:text-white"
				>
					<a
						href={point.mapUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${t("pickup.openMap")} for ${point.gymName}`}
					>
						{t("pickup.openMap")}
					</a>
				</Button>
			</div>
		</div>
	);
}
