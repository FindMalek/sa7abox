
# Sa7a Box Content Update Playbook

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Adding a New Menu Item](#adding-a-new-menu-item)
4. [Editing an Existing Menu Item](#editing-an-existing-menu-item)
5. [Adding a New Ingredient](#adding-a-new-ingredient)
6. [Adding a New Pickup Point](#adding-a-new-pickup-point)
7. [Adding Translations](#adding-translations)
8. [Managing Public Assets](#managing-public-assets)
9. [Common Mistakes](#common-mistakes)
10. [Validation Checklist](#validation-checklist)
11. [Quick Add Cheatsheet](#quick-add-cheatsheet)

---

## Architecture Overview

Sa7a Box uses a data-driven architecture:
- Content is stored in TypeScript constant files (no database)
- All text uses translation keys (no hardcoded strings)
- Components read from data files only
- Public assets follow a naming convention

### How It Works

```
Data Files → Components → UI
     ↓
Translation Files → Translated Text
```

- Fuel Section reads from `data/menu-items.ts`
- Build Your Meal reads from `data/ingredients.ts`
- Pickup Points reads from `data/pickup-points.ts`
- All text comes from `locale/en.json` and `locale/fr.json`

---

## File Structure

### Current Structure (Recommended)

```
sa7abox/
├── data/
│   ├── menu-items.ts          # All menu items (Fuel section)
│   ├── ingredients.ts          # All builder ingredients
│   └── pickup-points.ts       # All gym pickup locations
├── types/
│   ├── menu.ts                # MenuItem type definitions
│   ├── ingredient-builder.ts  # Ingredient type definitions
│   └── pickup.ts              # PickupPoint type definitions
├── locale/
│   ├── en.json                # English translations
│   └── fr.json                # French translations
└── public/
    ├── assets/
    │   ├── menus/             # Menu item photos
    │   ├── ingredients/       # Ingredient photos
    │   └── pickup-points/     # Gym logos
    └── placeholder.png        # Fallback image
```

### File Responsibilities

| File | Purpose | What to Edit |
|------|---------|--------------|
| `data/menu-items.ts` | Menu items data | Add/edit menu items |
| `data/ingredients.ts` | Builder ingredients | Add/edit ingredients |
| `data/pickup-points.ts` | Pickup locations | Add/edit gyms |
| `locale/en.json` | English text | Add/edit English translations |
| `locale/fr.json` | French text | Add/edit French translations |
| `types/*.ts` | TypeScript types | Only if adding new fields |

---

## Adding a New Menu Item

### Step-by-Step Guide

#### Step 1: Add Translation Keys

Open `locale/en.json` and add under `menu.items`:

```json
{
  "menu": {
    "items": {
      "supercut": { ... },
      "superman": { ... },
      "yourNewItem": {
        "name": "Your New Item Name",
        "description": "A delicious description of your new item."
      }
    }
  }
}
```

Open `locale/fr.json` and add the French translation:

```json
{
  "menu": {
    "items": {
      "yourNewItem": {
        "name": "Nom de Votre Nouveau Produit",
        "description": "Une description délicieuse de votre nouveau produit."
      }
    }
  }
}
```

#### Step 2: Add Image to Public Assets

1. Save your image as: `public/assets/menus/your-new-item.jpg`
   - Use lowercase-kebab-case
   - Supported formats: `.jpg`, `.png`, `.webp`
   - Recommended size: 800x600px minimum

#### Step 3: Add Menu Item Data

Open `data/menu-items.ts` and add to the `MENU_ITEMS` array:

```typescript
{
  id: "your-new-item",                    // Unique ID (lowercase-kebab-case)
  category: "box",                         // "box" | "salad" | "side" | "drink"
  nameKey: "menu.items.yourNewItem.name", // Translation key
  descriptionKey: "menu.items.yourNewItem.description",
  imageUrl: "/assets/menus/your-new-item.jpg",
  priceTnd: 25,                           // Price in Tunisian Dinar
  nutrition: {
    calories: 450,
    protein: 50,
    carbs: 40,
    fat: 10,
    fiber: 6,
  },
  options: {                              // Optional
    extras: [
      { id: "extra-chicken", label: "Extra Chicken", priceTnd: 5 },
    ],
    sauces: ["BBQ", "Garlic"],
    removeIngredients: ["Onions"],
  },
},
```

#### Step 4: Verify

- [ ] Item appears in Fuel section
- [ ] Name and description show correctly in EN and FR
- [ ] Image loads properly
- [ ] Price displays correctly
- [ ] Nutrition badges show correct values
- [ ] Options (extras/sauces) work if added
- [ ] Can add to cart successfully

### Complete Example: Adding "Tunisian Power Bowl"

**1. Translations (`locale/en.json`):**
```json
"menu": {
  "items": {
    "tunisianPowerBowl": {
      "name": "Tunisian Power Bowl",
      "description": "Grilled chicken, couscous, roasted vegetables, harissa."
    }
  }
}
```

**2. Translations (`locale/fr.json`):**
```json
"menu": {
  "items": {
    "tunisianPowerBowl": {
      "name": "Bol Tunisien Puissant",
      "description": "Poulet grillé, couscous, légumes rôtis, harissa."
    }
  }
}
```

**3. Image:** Save as `public/assets/menus/tunisian-power-bowl.jpg`

**4. Data (`data/menu-items.ts`):**
```typescript
{
  id: "tunisian-power-bowl",
  category: "box",
  nameKey: "menu.items.tunisianPowerBowl.name",
  descriptionKey: "menu.items.tunisianPowerBowl.description",
  imageUrl: "/assets/menus/tunisian-power-bowl.jpg",
  priceTnd: 24,
  nutrition: {
    calories: 480,
    protein: 48,
    carbs: 45,
    fat: 12,
    fiber: 7,
  },
  options: {
    extras: [
      { id: "extra-chicken", label: "Extra Chicken", priceTnd: 5 },
    ],
    sauces: ["Harissa", "Lemon", "Olive Oil"],
  },
},
```

---

## Editing an Existing Menu Item

### Common Edits

#### Change Price
```typescript
// In data/menu-items.ts
{
  id: "supercut",
  // ... other fields ...
  priceTnd: 25,  // Change from 22 to 25
}
```

#### Update Nutrition
```typescript
{
  id: "supercut",
  nutrition: {
    calories: 450,  // Updated value
    protein: 48,    // Updated value
    carbs: 35,
    fat: 8,
    fiber: 6,
  },
}
```

#### Add/Remove Extras
```typescript
{
  id: "supercut",
  options: {
    extras: [
      { id: "extra-chicken", label: "Extra Chicken", priceTnd: 5 },
      { id: "extra-quinoa", label: "Extra Quinoa", priceTnd: 2 },
      { id: "extra-avocado", label: "Extra Avocado", priceTnd: 3 }, // NEW
    ],
  },
}
```

#### Change Image
1. Replace the image file: `public/assets/menus/supercut.jpg`
2. Or update the path in `data/menu-items.ts`:
```typescript
{
  id: "supercut",
  imageUrl: "/assets/menus/supercut-new.jpg",  // Updated path
}
```

#### Update Description
Edit translations only (not the data file):

`locale/en.json`:
```json
"menu": {
  "items": {
    "supercut": {
      "name": "Supercut",
      "description": "Updated description here."
    }
  }
}
```

---

## Adding a New Ingredient

### Step-by-Step Guide

#### Step 1: Add Translation Keys

`locale/en.json`:
```json
{
  "ingredients": {
    "yourIngredient": {
      "name": "Your Ingredient Name",
      "description": "Description of the ingredient."
    }
  }
}
```

`locale/fr.json`:
```json
{
  "ingredients": {
    "yourIngredient": {
      "name": "Nom de Votre Ingrédient",
      "description": "Description de l'ingrédient."
    }
  }
}
```

#### Step 2: Add Image

Save as: `public/assets/ingredients/your-ingredient.png`

#### Step 3: Add Ingredient Data

Open `data/ingredients.ts` and add to `INGREDIENTS` array:

```typescript
{
  id: "your-ingredient",                              // Unique ID
  nameKey: "ingredients.yourIngredient.name",        // Translation key
  descriptionKey: "ingredients.yourIngredient.description",
  imageUrl: "/assets/ingredients/your-ingredient.png",
  unitLabel: "portion",                              // "container" | "portion" | "scoop" | "drizzle"
  unitPriceTnd: 5,                                    // Price per unit
  nutritionPerUnit: {
    calories: 120,
    protein: 20,
    carbs: 5,
    fat: 3,
    fiber: 1,
  },
  minQty: 0,                                         // Minimum quantity (0 or 1)
  maxQty: 4,                                         // Maximum quantity
  category: "protein",                                // "base" | "protein" | "veg" | "sauce" | "extra"
  required: false,                                    // true if minQty >= 1
},
```

### Complete Example: Adding "Grilled Beef"

**1. Translations:**

`locale/en.json`:
```json
"ingredients": {
  "grilledBeef": {
    "name": "Grilled Beef",
    "description": "Lean grilled beef steak"
  }
}
```

`locale/fr.json`:
```json
"ingredients": {
  "grilledBeef": {
    "name": "Bœuf Grillé",
    "description": "Steak de bœuf maigre grillé"
  }
}
```

**2. Image:** `public/assets/ingredients/grilled-beef.jpg`

**3. Data (`data/ingredients.ts`):**
```typescript
{
  id: "grilled-beef",
  nameKey: "ingredients.grilledBeef.name",
  descriptionKey: "ingredients.grilledBeef.description",
  imageUrl: "/assets/ingredients/grilled-beef.jpg",
  unitLabel: "portion",
  unitPriceTnd: 10,
  nutritionPerUnit: {
    calories: 200,
    protein: 35,
    carbs: 0,
    fat: 6,
    fiber: 0,
  },
  minQty: 0,
  maxQty: 4,
  category: "protein",
  required: false,
},
```

### Ingredient Field Reference

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier (kebab-case) | `"chicken-breast"` |
| `nameKey` | string | Translation key for name | `"ingredients.chickenBreast.name"` |
| `descriptionKey` | string | Translation key for description | `"ingredients.chickenBreast.description"` |
| `imageUrl` | string | Path to image | `"/assets/ingredients/chicken-breast.jpg"` |
| `unitLabel` | string | Unit name | `"portion"`, `"container"`, `"scoop"` |
| `unitPriceTnd` | number | Price per unit | `8` |
| `nutritionPerUnit` | object | Nutrition values per unit | See below |
| `minQty` | number | Minimum selectable quantity | `0` or `1` |
| `maxQty` | number | Maximum selectable quantity | `4` |
| `category` | string | Ingredient category | `"base"`, `"protein"`, `"veg"`, `"sauce"` |
| `required` | boolean | Must be selected if true | `false` |

**Nutrition Object:**
```typescript
nutritionPerUnit: {
  calories: number;    // Required
  protein: number;     // Required
  carbs?: number;      // Optional
  fat?: number;        // Optional
  fiber: number;       // Required
}
```

---

## Adding a New Pickup Point

### Step-by-Step Guide

#### Step 1: Add Translation Keys (if needed)

Pickup points use direct strings in the data file, but you can add translations if you want localized area labels.

#### Step 2: Add Gym Logo

Save as: `public/assets/pickup-points/gym-name-logo.png`

#### Step 3: Get Google Maps URL

1. Search for the gym on Google Maps
2. Click "Share" → "Copy link"
3. Use that URL

#### Step 4: Add Pickup Point Data

Open `data/pickup-points.ts` and add to `PICKUP_POINTS` array:

```typescript
{
  id: "gym-name-location",                    // Unique ID
  gymName: "Gym Name",                        // Display name
  areaLabel: "Area Name",                     // Location label
  logoUrl: "/assets/pickup-points/gym-name-logo.png",
  mapUrl: "https://maps.google.com/?q=Gym+Name+Location",
  phone: "71 000 000",                        // Optional phone number
},
```

### Complete Example: Adding "FitZone Sousse"

**1. Logo:** `public/assets/pickup-points/fitzone-sousse-logo.png`

**2. Data (`data/pickup-points.ts`):**
```typescript
{
  id: "fitzone-sousse",
  gymName: "FitZone",
  areaLabel: "Sousse Centre",
  logoUrl: "/assets/pickup-points/fitzone-sousse-logo.png",
  mapUrl: "https://maps.google.com/?q=FitZone+Sousse+Centre",
  phone: "73 123 456",
},
```

### Pickup Point Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (kebab-case) |
| `gymName` | string | Yes | Gym display name |
| `areaLabel` | string | Yes | Location/area name |
| `logoUrl` | string | Yes | Path to gym logo |
| `mapUrl` | string | Yes | Google Maps link |
| `phone` | string | No | Contact phone number |

---

## Adding Translations

### Translation File Structure

Translations are organized by feature:

```json
{
  "menu": { ... },
  "ingredients": { ... },
  "pickup": { ... },
  "checkout": { ... },
  "builder": { ... }
}
```

### Adding a New Translation Key

#### Step 1: Add to English (`locale/en.json`)

```json
{
  "menu": {
    "newSection": {
      "title": "New Section Title",
      "subtitle": "New section subtitle"
    }
  }
}
```

#### Step 2: Add to French (`locale/fr.json`)

```json
{
  "menu": {
    "newSection": {
      "title": "Titre de la Nouvelle Section",
      "subtitle": "Sous-titre de la nouvelle section"
    }
  }
}
```

#### Step 3: Use in Code

```typescript
// In data files, reference the key:
nameKey: "menu.newSection.title"

// In components:
const t = useTranslations();
t("menu.newSection.title")
```

### Translation Key Naming Convention

- Use camelCase for keys: `"yourNewKey"`
- Use dot notation for nesting: `"menu.items.supercut.name"`
- Keep keys descriptive: `"checkout.submit"` not `"btn1"`

### Common Translation Patterns

**Menu Items:**
```json
"menu": {
  "items": {
    "itemId": {
      "name": "Display Name",
      "description": "Item description"
    }
  }
}
```

**Ingredients:**
```json
"ingredients": {
  "ingredientId": {
    "name": "Display Name",
    "description": "Ingredient description"
  }
}
```

**UI Labels:**
```json
"checkout": {
  "title": "Checkout",
  "submit": "Place Order"
}
```

---

## Managing Public Assets

### Folder Structure

```
public/
├── assets/
│   ├── menus/              # Menu item photos
│   ├── ingredients/        # Ingredient photos
│   └── pickup-points/     # Gym logos
└── placeholder.png        # Fallback image
```

### Naming Conventions

- Use lowercase-kebab-case: `chicken-breast.jpg`
- No spaces or special characters
- Use descriptive names: `supercut-box.jpg` not `img1.jpg`
- Match the item ID when possible: item ID `"supercut"` → `supercut.jpg`

### Image Requirements

| Asset Type | Recommended Size | Format | Max File Size |
|------------|------------------|--------|---------------|
| Menu Items | 800x600px | JPG, PNG, WebP | 200KB |
| Ingredients | 400x400px | JPG, PNG, WebP | 100KB |
| Gym Logos | 200x200px | PNG (transparent) | 50KB |

### Adding a New Image

1. Optimize the image (compress if needed)
2. Save with correct name: `your-item-name.jpg`
3. Place in correct folder: `public/assets/menus/`
4. Reference in data file: `imageUrl: "/assets/menus/your-item-name.jpg"`

### Replacing an Existing Image

1. Keep the same filename
2. Replace the file in the same location
3. No code changes needed (browser cache may require hard refresh)

### Image Path Reference

| Asset Type | Path Pattern | Example |
|------------|--------------|---------|
| Menu Item | `/assets/menus/{id}.jpg` | `/assets/menus/supercut.jpg` |
| Ingredient | `/assets/ingredients/{id}.png` | `/assets/ingredients/chicken-breast.png` |
| Gym Logo | `/assets/pickup-points/{id}-logo.png` | `/assets/pickup-points/california-gym-logo.png` |

---

## Common Mistakes

### ❌ Mistake 1: Hardcoding Text in Data Files

**Wrong:**
```typescript
{
  id: "new-item",
  name: "New Item",  // ❌ Hardcoded string
}
```

**Correct:**
```typescript
{
  id: "new-item",
  nameKey: "menu.items.newItem.name",  // ✅ Translation key
}
```

### ❌ Mistake 2: Missing Translation Keys

**Wrong:**
```typescript
// Added to data file but forgot translations
nameKey: "menu.items.newItem.name"  // ❌ Key doesn't exist in locale files
```

**Correct:**
```typescript
// Always add to BOTH en.json and fr.json first
```

### ❌ Mistake 3: Incorrect Image Paths

**Wrong:**
```typescript
imageUrl: "/menus/item.jpg"  // ❌ Wrong path
imageUrl: "assets/menus/item.jpg"  // ❌ Missing leading slash
```

**Correct:**
```typescript
imageUrl: "/assets/menus/item.jpg"  // ✅ Correct path
```

### ❌ Mistake 4: Duplicate IDs

**Wrong:**
```typescript
// Two items with same ID
{ id: "supercut", ... },
{ id: "supercut", ... },  // ❌ Duplicate
```

**Correct:**
```typescript
{ id: "supercut", ... },
{ id: "supercut-v2", ... },  // ✅ Unique ID
```

### ❌ Mistake 5: Wrong Category Value

**Wrong:**
```typescript
category: "boxes",  // ❌ Invalid category
```

**Correct:**
```typescript
category: "box",  // ✅ Valid: "box" | "salad" | "side" | "drink"
```

### ❌ Mistake 6: Missing Required Fields

**Wrong:**
```typescript
{
  id: "new-item",
  // Missing nameKey, descriptionKey, priceTnd, nutrition
}
```

**Correct:**
```typescript
{
  id: "new-item",
  category: "box",
  nameKey: "menu.items.newItem.name",
  descriptionKey: "menu.items.newItem.description",
  imageUrl: "/assets/menus/new-item.jpg",
  priceTnd: 20,
  nutrition: {
    calories: 400,
    protein: 40,
    carbs: 30,
    fat: 10,
    fiber: 5,
  },
}
```

---

## Validation Checklist

### Before Submitting Changes

#### Menu Items
- [ ] Translation keys exist in both `en.json` and `fr.json`
- [ ] `id` is unique and uses kebab-case
- [ ] `category` is one of: `"box"`, `"salad"`, `"side"`, `"drink"`
- [ ] `priceTnd` is a positive number
- [ ] All nutrition values are numbers (calories, protein, fiber required)
- [ ] `imageUrl` points to existing file in `/assets/menus/`
- [ ] Image file exists and is optimized
- [ ] Extras have `id`, `label`, and `priceTnd` if provided
- [ ] Item appears correctly on website (EN and FR)

#### Ingredients
- [ ] Translation keys exist in both `en.json` and `fr.json`
- [ ] `id` is unique and uses kebab-case
- [ ] `category` is valid: `"base"`, `"protein"`, `"veg"`, `"sauce"`, `"extra"`
- [ ] `minQty` >= 0 and `maxQty` > `minQty`
- [ ] `required: true` only if `minQty >= 1`
- [ ] `unitPriceTnd` is a positive number
- [ ] Nutrition values are numbers per unit
- [ ] `imageUrl` points to existing file in `/assets/ingredients/`
- [ ] Ingredient appears in builder correctly (EN and FR)
- [ ] Quantity controls work (min/max enforced)

#### Pickup Points
- [ ] `id` is unique and uses kebab-case
- [ ] `gymName` and `areaLabel` are provided
- [ ] `mapUrl` is a valid Google Maps link
- [ ] `logoUrl` points to existing file in `/assets/pickup-points/`
- [ ] Logo file exists and is optimized
- [ ] Pickup point appears in carousel
- [ ] "Open Map" button works correctly

#### Translations
- [ ] All new keys added to both `en.json` and `fr.json`
- [ ] Key names use camelCase
- [ ] Nested structure matches data file references
- [ ] No typos in translations
- [ ] French translations are accurate

#### Images
- [ ] File names use lowercase-kebab-case
- [ ] Files are in correct folders (`/assets/menus/`, `/assets/ingredients/`, etc.)
- [ ] Image paths in data files match actual file locations
- [ ] Images are optimized (reasonable file size)
- [ ] Images display correctly on website

### Testing Checklist

After making changes, verify:

1. **Build Success**
   ```bash
   pnpm build
   ```
   - [ ] No TypeScript errors
   - [ ] No missing translation errors
   - [ ] Build completes successfully

2. **Visual Verification**
   - [ ] New items appear in correct sections
   - [ ] Images load properly
   - [ ] Text displays correctly (both languages)
   - [ ] Prices and nutrition show correctly
   - [ ] Interactive elements work (add to cart, builder, etc.)

3. **Functionality**
   - [ ] Can add new menu items to cart
   - [ ] Can build meals with new ingredients
   - [ ] Can view pickup points and open maps
   - [ ] Cart calculations are correct

---

## Quick Add Cheatsheet

### Add Menu Item (5 steps)

1. **Add translations** → `locale/en.json` & `locale/fr.json`
   ```json
   "menu": { "items": { "itemId": { "name": "...", "description": "..." } } }
   ```

2. **Add image** → `public/assets/menus/item-id.jpg`

3. **Add data** → `data/menu-items.ts`
   ```typescript
   { id: "item-id", category: "box", nameKey: "menu.items.itemId.name", ... }
   ```

4. **Verify** → Check website shows item correctly

5. **Test** → Add to cart works

---

### Add Ingredient (5 steps)

1. **Add translations** → `locale/en.json` & `locale/fr.json`
   ```json
   "ingredients": { "ingredientId": { "name": "...", "description": "..." } }
   ```

2. **Add image** → `public/assets/ingredients/ingredient-id.png`

3. **Add data** → `data/ingredients.ts`
   ```typescript
   { id: "ingredient-id", nameKey: "ingredients.ingredientId.name", ... }
   ```

4. **Verify** → Check builder shows ingredient

5. **Test** → Can select and add to plate

---

### Add Pickup Point (4 steps)

1. **Add logo** → `public/assets/pickup-points/gym-name-logo.png`

2. **Get map URL** → Google Maps share link

3. **Add data** → `data/pickup-points.ts`
   ```typescript
   { id: "gym-name", gymName: "...", mapUrl: "...", ... }
   ```

4. **Verify** → Check carousel shows gym, map opens correctly

---

### Edit Existing Item (2 steps)

1. **Update data** → Edit values in `data/*.ts` file

2. **Update translations** → Edit text in `locale/*.json` if needed

---

### File Quick Reference

| What to Change | File to Edit |
|----------------|--------------|
| Menu item name/description | `locale/en.json` & `locale/fr.json` |
| Menu item price/nutrition | `data/menu-items.ts` |
| Ingredient name/description | `locale/en.json` & `locale/fr.json` |
| Ingredient price/nutrition | `data/ingredients.ts` |
| Pickup point info | `data/pickup-points.ts` |
| Menu item image | Replace file in `public/assets/menus/` |
| Ingredient image | Replace file in `public/assets/ingredients/` |
| Gym logo | Replace file in `public/assets/pickup-points/` |

---

## Need Help?

- Check existing items in data files for examples
- Verify translation keys match exactly (case-sensitive)
- Ensure image paths start with `/assets/`
- Test in both English and French
- Run `pnpm build` to catch TypeScript errors

---

**Last Updated:** January 2025  
**Maintained by:** Sa7a Box Development Team