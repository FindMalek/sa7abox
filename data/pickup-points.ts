import type { PickupPoint } from "@/types/pickup";

export const PICKUP_POINTS: PickupPoint[] = [
	{
		id: "california-gym-marsa",
		gymName: "California Gym",
		areaLabel: "Marsa Plage",
		logoUrl: "/logos/cg-logo.png", // Use placeholders if actual logos aren't ready
		mapUrl: "https://maps.google.com/?q=California+Gym+Marsa",
		phone: "71 000 000",
	},
	{
		id: "olympy-lac1",
		gymName: "Olympy",
		areaLabel: "Lac 1",
		logoUrl: "/logos/olympy-logo.png",
		mapUrl: "https://maps.google.com/?q=Olympy+Lac+1",
	},
	{
		id: "titan-gym-naser",
		gymName: "Titan Gym",
		areaLabel: "Ennasr 2",
		logoUrl: "/logos/titan-logo.png",
		mapUrl: "https://maps.google.com/?q=Titan+Gym+Ennasr",
	},
	{
		id: "oxygen-gym-lac2",
		gymName: "Oxygen Gym",
		areaLabel: "Lac 2",
		logoUrl: "/logos/oxygen-logo.png",
		mapUrl: "https://maps.google.com/?q=Oxygen+Gym+Lac+2",
	},
	{
		id: "be-fit-ariana",
		gymName: "Be Fit",
		areaLabel: "Ariana",
		logoUrl: "/logos/befit-logo.png",
		mapUrl: "https://maps.google.com/?q=Be+Fit+Ariana",
	},
];
