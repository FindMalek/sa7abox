import { MenuItem } from "@/types/menu";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "supercut",
    category: "box",
    nameKey: "menu.items.supercut.name",
    descriptionKey: "menu.items.supercut.description",
    imageUrl: "/assets/menus/supercut.png",
    priceTnd: 22,
    nutrition: {
      calories: 585,
      protein: 75,
      carbs: 51,
      fat: 8,
      fiber: 6,
    },
  },
  {
    id: "superbalance",
    category: "box",
    nameKey: "menu.items.superbalance.name",
    descriptionKey: "menu.items.superbalance.description",
    imageUrl: "/assets/menus/superbalance.png",
    priceTnd: 24,
    nutrition: {
      calories: 903,
      protein: 81,
      carbs: 91,
      fat: 24,
      fiber: 7,
    },
  },
  {
    id: "superbulk",
    category: "box",
    nameKey: "menu.items.superbulk.name",
    descriptionKey: "menu.items.superbulk.description",
    imageUrl: "/assets/menus/superbulk.png",
    priceTnd: 28,
    nutrition: {
      calories: 1187,
      protein: 82,
      carbs: 138,
      fat: 33,
      fiber: 8,
    },
  },
  {
  id: "carthageCaesar",
  category: "salad",
  nameKey: "menu.items.carthageCaesar.name",
  descriptionKey: "menu.items.carthageCaesar.description",
  imageUrl: "/assets/menus/carthage-caesar.png",
  priceTnd: 18,
  nutrition: {
    calories: 295,
    protein: 46,
    carbs: 6,
    fat: 8.5,
    fiber: 3,
  },
  options: {
    extras: [
      { id: "extra-chicken", label: "Extra Chicken", priceTnd: 5 },
      { id: "extra-cheese", label: "Extra Cheese", priceTnd: 3 },
    ],
    sauces: ["Caesar", "Olive Oil", "Lemon"],
  },
},

];
