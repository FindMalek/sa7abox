import { ClockIcon, DumbbellIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function Hero() {
	const t = useTranslations("hero");

	return (
		<section className="w-full bg-secondary px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
			<div className="container mx-auto max-w-xl">
				{/* Category Tag */}
				<div className="mb-4">
					<span className="font-bold text-primary text-xs uppercase tracking-wider">
						{t("category")}
					</span>
				</div>

				{/* Headline */}
				<h1 className="mb-4 font-extrabold text-[42px] text-foreground leading-[1.1] tracking-tight sm:text-6xl">
					{t("headlinePart1")}
					<br />
					<span className="text-primary">{t("headlinePart2")}</span>
				</h1>

				{/* Description */}
				<p className="mb-8 text-lg text-muted-foreground leading-relaxed sm:text-xl">
					{t("description")}
				</p>

				{/* CTAs */}
				<div className="mb-10 grid grid-cols-2 gap-4">
					<Button
						size="lg"
						className="h-14 rounded-xl bg-primary font-bold text-lg text-primary-foreground hover:bg-primary/90"
					>
						<Link href="#order-form">{t("orderNow")}</Link>
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-14 rounded-xl border-2 border-foreground bg-transparent font-bold text-foreground text-lg hover:bg-foreground/5"
					>
						<Link href="#locations">{t("findUs")}</Link>
					</Button>
				</div>

				{/* Feature Chips */}
				<div className="mb-12 flex flex-wrap gap-3">
					{/* Gym Pickup */}
					<div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
						<DumbbellIcon className="h-4 w-4 text-primary" />
						<span className="font-semibold text-foreground text-sm">
							{t("features.gymPickup")}
						</span>
					</div>

					{/* Fresh Daily */}
					<div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
						<ClockIcon className="h-4 w-4 text-primary" />
						<span className="font-semibold text-black text-sm">
							{t("features.freshDaily")}
						</span>
					</div>

					{/* Delivery */}
					<div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
						<TruckIcon className="h-4 w-4 text-[#e86b2c]" />
						<span className="font-semibold text-foreground text-sm">
							{t("features.delivery")}
						</span>
					</div>
				</div>

				{/* Main Image */}
				<div className="relative aspect-4/3 w-full overflow-hidden rounded-xl shadow-xl">
					<Image
						src="/placeholder.png"
						alt="Sa7a Box Premium Meal"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
		</section>
	);
}
