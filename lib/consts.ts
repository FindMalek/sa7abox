export interface MenuItem {
	id: string;
	nameKey: string; // Translation key instead of direct name
	descriptionKey: string; // Translation key instead of direct description
	price: number;
	image: string;
	categoryTagKey: string; // Translation key for category tag
}

export const POWER_BOXES: MenuItem[] = [
	{
		id: "supercut",
		nameKey: "menu.items.supercut.name",
		descriptionKey: "menu.items.supercut.description",
		price: 22,
		image: "/placeholder.png",
		categoryTagKey: "menu.tags.highProtein",
	},
	{
		id: "superman",
		nameKey: "menu.items.superman.name",
		descriptionKey: "menu.items.superman.description",
		price: 28,
		image: "/placeholder.png",
		categoryTagKey: "menu.tags.bulking",
	},
];

export const GREEN_FRESH: MenuItem[] = [
	{
		id: "carthage-caesar",
		nameKey: "menu.items.carthageCaesar.name",
		descriptionKey: "menu.items.carthageCaesar.description",
		price: 18,
		image: "/placeholder.png",
		categoryTagKey: "menu.tags.fresh",
	},
	{
		id: "tunisian-tuna",
		nameKey: "menu.items.tunisianTuna.name",
		descriptionKey: "menu.items.tunisianTuna.description",
		price: 16,
		image: "/placeholder.png",
		categoryTagKey: "menu.tags.traditional",
	},
];

export const PROTEIN_DESSERTS: MenuItem[] = [
	{
		id: "oat-cookies",
		nameKey: "menu.items.oatCookies.name",
		descriptionKey: "menu.items.oatCookies.description",
		price: 12,
		image: "/placeholder.png",
		categoryTagKey: "menu.tags.lowCarb",
	},
];
