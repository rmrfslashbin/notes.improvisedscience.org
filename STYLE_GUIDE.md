# Recipe Style Guide

Reference for authoring and editing recipes on this site. All existing content has been brought into conformance with these rules.

---

## File & Directory Naming

- **Format**: kebab-case, all lowercase
- **Single-file recipes**: `recipe-name.md` (e.g. `slow-cooker-lentil-soup.md`)
- **Multi-file recipes** (with images, etc.): `recipe-name/index.md`
- **No underscores, spaces, uppercase letters, or special characters** in filenames
- **Accented characters** are stripped: `Crème brûlée` → `creme-brulee`, `Gougères` → `gougeres`
- **Apostrophes and punctuation** are removed: `Aunt Bill's` → `aunt-bills`

---

## Frontmatter

Every recipe requires all of the following fields:

```yaml
---
title: "Recipe Title in Title Case"
date: 2025-01-15T00:00:00-05:00
draft: false
description: "One sentence. Specific and evocative — no generic phrases like 'a delicious recipe'."
categories: ["Main"]
tags: ["Ingredient", "Cuisine", "DietaryFlag"]
methods: ["Stove-Top"]
themes: ["Vegetarian"]
prep_time: "15 minutes"
cook_time: "30 minutes"
total_time: "45 minutes"
servings: 4
---
```

### Field rules

**`title`** — Title Case. Matches the recipe's display name.

**`date`** — Full ISO 8601 with timezone offset.

**`draft`** — Always `false` for published recipes.

**`description`** — One sentence. Should describe the dish specifically (key ingredients, technique, character). No filler.

**`categories`** — Single value from this controlled list, as a quoted array:

| Value | Use for |
|-------|---------|
| `["Main"]` | Main courses, entrées |
| `["Side Dish"]` | Side dishes, accompaniments |
| `["Dessert"]` | Desserts, sweets, confections |
| `["Breakfast"]` | Breakfast and brunch |
| `["Bread"]` | Breads, flatbreads, rolls, muffins, quick breads |
| `["Snack"]` | Snacks, party foods |
| `["Appetizer"]` | Starters, appetizers |
| `["Condiment"]` | Sauces, dressings, spice blends, crusts, frostings |
| `["Beverage"]` | Drinks |

**`tags`** — Title Case, quoted array. Describe ingredients, cuisine, dietary properties, and cooking characteristics. Keep tags specific and reusable across recipes.

- Dietary: `Vegan`, `Vegetarian`, `Gluten-Free`, `Dairy-Free`, `Vegan Adaptable`
- Cuisine: `Indian`, `Korean`, `Italian`, `Chinese`, `Sri Lankan`, etc.
- Character: `Spicy`, `Comfort Food`, `Quick`, `Weeknight`, `One-Pot`
- Ingredient: `Mushrooms`, `Lentils`, `Pasta`, `Tofu`, etc.

**`methods`** — Title Case, quoted array. Cooking method(s) used:
`Stove-Top`, `Baked`, `Grilled`, `Roasted`, `Slow Cooker`, `No-Cook`

**`themes`** — Title Case, quoted array. Broader dietary/cultural themes:
`Vegetarian`, `Vegan`, `Indian`, `Thai`, `Fusion`, `Thanksgiving`, `Holiday`, etc.

**`prep_time` / `cook_time` / `total_time`** — Format: `"X minutes"` or `"X hours Y minutes"`. Include passive time (soaking, chilling, resting) in `total_time` when it materially affects when the dish is ready.

**`servings`** — Integer.

---

## Measurements

### Weights
Grams first, ounces in parentheses. Use 1 oz = 28g (round to nearest whole gram).

```
200g (7oz)
454g (1 lb)
1.1kg (2.5 lbs)
```

Weights under ~14g (½ oz) do not need an imperial equivalent.

### Volume — large (cups and above)
Millilitres first, cups in parentheses.

| Imperial | Metric |
|----------|--------|
| ¼ cup | 60ml |
| ⅓ cup | 80ml |
| ½ cup | 120ml |
| ¾ cup | 180ml |
| 1 cup | 240ml |
| 1½ cups | 360ml |
| 2 cups | 480ml |

```
480ml (2 cups) vegetable stock
120ml (½ cup) cashews
```

### Volume — small (tablespoons and teaspoons)
Use `tbsp` and `tsp` as-is. No metric conversion.

```
1 tbsp olive oil
½ tsp ground cumin
```

### Temperatures
Leave as-is (°F / °C as originally written).

---

## Instruction Formatting

### Instructions: numbered lists
All procedural steps use numbered lists.

```markdown
## Instructions

1. Heat oil in a heavy skillet over medium heat.
2. Add onions and cook until softened, about 8 minutes.
3. Stir in garlic and cook for 1 minute more.
```

### Ingredients: bullet lists
Ingredient lists always use bullets.

```markdown
## Ingredients

- 2 tbsp olive oil
- 1 large onion, diced
- 4 cloves garlic, minced
```

### Equipment, notes, tips, variations, options: bullet lists
Non-procedural content stays as bullets.

### Sub-lists within steps
When a step contains an inline ingredient grouping or option list, keep those as nested bullets.

```markdown
1. Whisk together in a bowl:
   - 2 eggs
   - 120ml (½ cup) milk
   - ½ tsp salt
2. Pour into the pan.
```

---

## Section Structure

Recommended section order. Not all sections are required for every recipe.

```
## Notes / Special Equipment (if needed before ingredients)
## Ingredients
## Instructions
## Notes (if after the recipe)
## Variations
## Storage
```

For complex recipes with multiple components, use sub-sections under `## Ingredients` and `## Instructions`:

```markdown
## Ingredients

### For the Sauce
- …

### For the Base
- …

## Instructions

### Make the Sauce
1. …

### Assemble
1. …
```

---

## Internal Links

Use Hugo `ref` shortcodes with kebab-case paths matching the filename:

```markdown
[Pâte Brisée]({{< ref "/recipes/pate-brisee" >}})
[Moroccan Seasoning]({{< ref "/recipes/moroccan-seasoning" >}})
```

---

## Tags — canonical values

Prefer these established tags for consistency. Add new tags only when no existing tag fits.

**Dietary**
`Vegan`, `Vegetarian`, `Gluten-Free`, `Dairy-Free`, `Vegan Adaptable`

**Meal type**
`Main Course`, `Side Dish`, `Appetizer`, `Snack`, `Breakfast`

**Character**
`Comfort Food`, `Quick`, `Weeknight`, `Leftovers`, `One-Pot`, `Spicy`, `Hot`, `Numbing`

**Cuisine**
`Indian`, `Chinese`, `Korean`, `Italian`, `Thai`, `Fusion`, `Sri Lankan`, `Punjabi`, `Gujarati`, `Parsi`, `Goan`, `Indonesian`, `Turkish`

**Common ingredients**
`Lentils`, `Beans`, `Chickpeas`, `Mushrooms`, `Potatoes`, `Tofu`, `Pasta`, `Eggs`, `Cauliflower`

---

*Last updated: 2026-03-23*
