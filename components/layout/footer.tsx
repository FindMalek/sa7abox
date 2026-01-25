"use client";

import { FacebookIcon, InstagramIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
	const t = useTranslations();

	return (
		<footer className="relative border-white/5 border-t bg-[#0f0f0f] text-white selection:bg-primary/30 pb-8">
			<div className="container mx-auto px-6 py-12 md:py-20">
				{/* Top Section: Brand & Socials */}
				<div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
					{/* Brand Block */}
					<div className="space-y-4">
						<div className="space-y-1">
							<h2 className="font-black text-3xl uppercase tracking-tighter md:text-4xl">
								Sa7a Box
							</h2>
							<p className="font-medium text-muted-foreground text-sm">
								{t("footer.foundedIn")}
							</p>
						</div>
						<p className="font-black text-primary text-xl uppercase italic tracking-widest">
							{t("brand.tagline")}
						</p>
					</div>

					{/* Social Block */}
					<div className="flex items-center gap-6">
						<SocialLink
							href="https://www.instagram.com/sa7abox/"
							icon={<InstagramIcon className="h-6 w-6" />}
							label="Instagram"
						/>
					</div>
				</div>

				{/* Middle Divider */}
				<div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

				{/* Bottom Section: Credit & Meta */}
				<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					{/* Developer Signature */}
					<div className="group space-y-2">
						<p className="font-bold text-muted-foreground text-xs uppercase tracking-widest">
							Crafted with passion
						</p>
						<a
							href="https://www.malekgarahellal.com"
							target="_blank"
							rel="noopener noreferrer"
							className="block space-y-1 outline-none"
						>
							<span className="block font-black text-lg transition-colors group-hover:text-primary">
								Malek Gara-Hellal
							</span>
							<span className="block text-muted-foreground text-sm transition-colors group-hover:text-white/80">
								Product Engineer & Full-Stack Developer
							</span>
							<span className="block text-muted-foreground text-sm transition-colors group-hover:text-white/80">
								malekgarahellal.com
							</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

function SocialLink({
	href,
	icon,
	label,
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all hover:scale-110 hover:border-primary/50 hover:bg-primary hover:text-white active:scale-95"
		>
			{icon}
		</a>
	);
}
