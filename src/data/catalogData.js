// Ported from the full-stack version's backend/seed/seedData.js so both versions
// show the exact same catalog and recipes.

export const ingredientsRaw = [
  { name: "Moonleaf", slug: "moonleaf", icon: "🌿", price: 15, rarity: "Common", element: "Nature", effect: "A pale herb that glows faintly under moonlight.", stock: 200 },
  { name: "Fire Root", slug: "fire-root", icon: "🌶️", price: 20, rarity: "Common", element: "Fire", effect: "A gnarled root that's always warm to the touch.", stock: 200 },
  { name: "Dragon's Blood", slug: "dragons-blood", icon: "🐉", price: 90, rarity: "Rare", element: "Fire", effect: "A single vial, thick and slow-moving, said to still remember flight.", stock: 40 },
  { name: "Shadow Mushroom", slug: "shadow-mushroom", icon: "🍄", price: 35, rarity: "Uncommon", element: "Shadow", effect: "Grows only where light has never touched the soil.", stock: 120 },
  { name: "Phoenix Ash", slug: "phoenix-ash", icon: "🔥", price: 150, rarity: "Legendary", element: "Fire", effect: "Warm ash that never fully cools. Faintly hums.", stock: 15 },
  { name: "Spring Water", slug: "spring-water", icon: "💧", price: 5, rarity: "Common", element: "Water", effect: "Clean water drawn from a sacred spring.", stock: 300 },
  { name: "Crystal Dust", slug: "crystal-dust", icon: "✨", price: 45, rarity: "Uncommon", element: "Arcane", effect: "Ground quartz that shimmers with latent mana.", stock: 100 },
  { name: "Griffin Feather", slug: "griffin-feather", icon: "🪶", price: 60, rarity: "Rare", element: "Air", effect: "Impossibly light, it never quite touches the ground.", stock: 60 },
  { name: "Basilisk Scale", slug: "basilisk-scale", icon: "🐍", price: 110, rarity: "Rare", element: "Earth", effect: "A single scale, cool and heavy, that never seems to warm.", stock: 30 },
  { name: "Starlight Petal", slug: "starlight-petal", icon: "🌸", price: 70, rarity: "Rare", element: "Light", effect: "Blooms only once a year, under a clear night sky.", stock: 45 },
  { name: "Nightshade", slug: "nightshade", icon: "🌑", price: 25, rarity: "Uncommon", element: "Shadow", effect: "Dangerous in raw form; alchemists know how to tame it.", stock: 90 },
  { name: "Honeycomb", slug: "honeycomb", icon: "🍯", price: 10, rarity: "Common", element: "Nature", effect: "Sweet enough to mask even the bitterest brew.", stock: 200 },
];

export const potionsRaw = [
  { name: "Minor Healing Potion", slug: "minor-healing-potion", icon: "🧪", price: 50, rarity: "Common", element: "Nature", effect: "Restores 25 Health", duration: "Instant", ingredients: ["Moonleaf", "Spring Water"], featured: false },
  { name: "Mana Elixir", slug: "mana-elixir", icon: "🔵", price: 75, rarity: "Uncommon", element: "Arcane", effect: "Restores 40 Mana", duration: "Instant", ingredients: ["Crystal Dust", "Spring Water"], featured: true },
  { name: "Fire Resistance Elixir", slug: "fire-resistance-elixir", icon: "🔥", price: 120, rarity: "Rare", element: "Fire", effect: "+50% Fire Resistance", duration: "10 minutes", ingredients: ["Dragon's Blood", "Fire Root"], featured: true },
  { name: "Invisibility Potion", slug: "invisibility-potion", icon: "🌫️", price: 200, rarity: "Epic", element: "Shadow", effect: "Turn invisible", duration: "3 minutes", ingredients: ["Moonleaf", "Shadow Mushroom"], featured: true },
  { name: "Phoenix Elixir", slug: "phoenix-elixir", icon: "🧯", price: 450, rarity: "Legendary", element: "Fire", effect: "+50% Fire Resistance & self-revive once", duration: "30 minutes", ingredients: ["Phoenix Ash", "Dragon's Blood", "Moonleaf"], featured: true },
  { name: "Featherfall Draught", slug: "featherfall-draught", icon: "🕊️", price: 90, rarity: "Uncommon", element: "Air", effect: "Negate fall damage", duration: "5 minutes", ingredients: ["Griffin Feather", "Spring Water"], featured: false },
  { name: "Stoneskin Tonic", slug: "stoneskin-tonic", icon: "🪨", price: 140, rarity: "Rare", element: "Earth", effect: "+30% Physical Defense", duration: "10 minutes", ingredients: ["Basilisk Scale", "Honeycomb"], featured: false },
  { name: "Starlight Serum", slug: "starlight-serum", icon: "🌟", price: 260, rarity: "Epic", element: "Light", effect: "Cure all ailments & +20% Light damage", duration: "15 minutes", ingredients: ["Starlight Petal", "Crystal Dust"], featured: false },
  { name: "Venomcraft Brew", slug: "venomcraft-brew", icon: "☠️", price: 95, rarity: "Uncommon", element: "Shadow", effect: "Weapons apply poison", duration: "5 minutes", ingredients: ["Nightshade", "Fire Root"], featured: false },
  { name: "Honeyed Calm", slug: "honeyed-calm", icon: "🍵", price: 30, rarity: "Common", element: "Nature", effect: "Removes fear & panic effects", duration: "5 minutes", ingredients: ["Honeycomb", "Moonleaf"], featured: false },
];

export const artifactsRaw = [
  { name: "Shadow Dagger", slug: "shadow-dagger", icon: "🗡️", price: 320, rarity: "Epic", element: "Shadow", effect: "+15% Critical Strike Chance", duration: "Permanent", featured: true },
  { name: "Amulet of Warding", slug: "amulet-of-warding", icon: "🧿", price: 280, rarity: "Rare", element: "Light", effect: "Absorbs the first hit each battle", duration: "Permanent" },
  { name: "Ring of the Alchemist", slug: "ring-of-the-alchemist", icon: "💍", price: 500, rarity: "Legendary", element: "Arcane", effect: "+25% Potion Effectiveness", duration: "Permanent", featured: true },
  { name: "Cloak of Whispers", slug: "cloak-of-whispers", icon: "🧥", price: 210, rarity: "Rare", element: "Shadow", effect: "+20% Stealth", duration: "Permanent" },
  { name: "Griffin Talon Charm", slug: "griffin-talon-charm", icon: "🦅", price: 150, rarity: "Uncommon", element: "Air", effect: "+10% Movement Speed", duration: "Permanent" },
  { name: "Orb of Frostfire", slug: "orb-of-frostfire", icon: "🔮", price: 600, rarity: "Legendary", element: "Fire", effect: "Casts random Fire or Frost bolt", duration: "Permanent", featured: true },
];

export const spellbooksRaw = [
  { name: "Tome of Minor Flames", slug: "tome-of-minor-flames", icon: "📕", price: 180, rarity: "Uncommon", element: "Fire", effect: "Unlocks Firebolt spell", duration: "Permanent" },
  { name: "Grimoire of Shadows", slug: "grimoire-of-shadows", icon: "📓", price: 340, rarity: "Rare", element: "Shadow", effect: "Unlocks Shadow Step spell", duration: "Permanent" },
  { name: "Codex of Light", slug: "codex-of-light", icon: "📘", price: 400, rarity: "Epic", element: "Light", effect: "Unlocks Healing Word spell", duration: "Permanent" },
  { name: "Forbidden Necronomicon", slug: "forbidden-necronomicon", icon: "📙", price: 950, rarity: "Legendary", element: "Shadow", effect: "Unlocks Raise Skeleton spell", duration: "Permanent", featured: true },
  { name: "Primer of Arcane Basics", slug: "primer-of-arcane-basics", icon: "📗", price: 60, rarity: "Common", element: "Arcane", effect: "Unlocks Magic Missile spell", duration: "Permanent" },
];

export const recipesRaw = [
  { name: "Minor Healing Potion", ingredientSlugs: ["moonleaf", "spring-water"], resultSlug: "minor-healing-potion", xpReward: 15, hint: "A common herb, plus something to drink." },
  { name: "Mana Elixir", ingredientSlugs: ["crystal-dust", "spring-water"], resultSlug: "mana-elixir", xpReward: 20, hint: "Shimmering dust dissolved in something pure." },
  { name: "Fire Resistance Elixir", ingredientSlugs: ["dragons-blood", "fire-root"], resultSlug: "fire-resistance-elixir", xpReward: 35, hint: "Something that remembers flying, and something that's always warm." },
  { name: "Invisibility Potion", ingredientSlugs: ["moonleaf", "shadow-mushroom"], resultSlug: "invisibility-potion", xpReward: 50, hint: "A pale herb meets something grown in total darkness." },
  { name: "Phoenix Elixir", ingredientSlugs: ["phoenix-ash", "dragons-blood", "moonleaf"], resultSlug: "phoenix-elixir", xpReward: 120, hint: "Ash that never cools, blood that remembers flight, and a common herb." },
  { name: "Featherfall Draught", ingredientSlugs: ["griffin-feather", "spring-water"], resultSlug: "featherfall-draught", xpReward: 25, hint: "Something weightless, dissolved in something pure." },
  { name: "Stoneskin Tonic", ingredientSlugs: ["basilisk-scale", "honeycomb"], resultSlug: "stoneskin-tonic", xpReward: 40, hint: "A heavy scale, sweetened." },
  { name: "Starlight Serum", ingredientSlugs: ["starlight-petal", "crystal-dust"], resultSlug: "starlight-serum", xpReward: 70, hint: "A once-a-year bloom, empowered by shimmering dust." },
  { name: "Venomcraft Brew", ingredientSlugs: ["nightshade", "fire-root"], resultSlug: "venomcraft-brew", xpReward: 30, hint: "Something dangerous, tempered by something warm." },
  { name: "Honeyed Calm", ingredientSlugs: ["honeycomb", "moonleaf"], resultSlug: "honeyed-calm", xpReward: 10, hint: "Something sweet and something common." },
];
