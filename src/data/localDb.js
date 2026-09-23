// A tiny fake "backend" that lives entirely in localStorage. It mirrors the shapes and
// behavior of the real Express API (see backend/routes/*.js in the full-stack version)
// closely enough that the Redux slices and components don't need to know the difference.
import { ingredientsRaw, potionsRaw, artifactsRaw, spellbooksRaw, recipesRaw } from "./catalogData.js";

const DB_KEY = "potionlab_local_db";

const buildComboKey = (slugs) => [...slugs].sort().join("+");

const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

function buildInitialProducts() {
  const withType = (arr, type) => arr.map((p) => ({ ...p, type, _id: p.slug }));
  return [
    ...withType(ingredientsRaw, "ingredient"),
    ...withType(potionsRaw, "potion"),
    ...withType(artifactsRaw, "artifact"),
    ...withType(spellbooksRaw, "spellbook"),
  ].map((p) => ({
    stock: 50,
    ratingAverage: 4.5,
    ratingCount: 0,
    featured: false,
    duration: "",
    effect: "",
    description: p.effect || `${p.name} — a curious item from the Potion Lab.`,
    ingredients: [],
    createdAt: new Date().toISOString(),
    ...p,
  }));
}

function buildInitialRecipes(products) {
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p._id]));
  return recipesRaw.map((r) => ({
    _id: buildComboKey(r.ingredientSlugs),
    name: r.name,
    ingredientSlugs: r.ingredientSlugs,
    comboKey: buildComboKey(r.ingredientSlugs),
    result: bySlug[r.resultSlug],
    xpReward: r.xpReward,
    hint: r.hint,
  }));
}

function seedDemoUser() {
  return {
    _id: "demo-user",
    username: "Youssef",
    email: "demo@potionlab.dev",
    password: "potionlab123",
    isAdmin: false,
    gold: 2000,
    alchemyLevel: 1,
    xp: 0,
    cart: [],
    wishlist: [],
    inventory: [],
    discoveredRecipes: [],
  };
}

function freshDb() {
  const products = buildInitialProducts();
  return {
    products,
    recipes: buildInitialRecipes(products),
    users: [seedDemoUser()],
    orders: [],
  };
}

export function getDb() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const db = freshDb();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const db = freshDb();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    return db;
  }
}

export function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDb() {
  localStorage.removeItem(DB_KEY);
  return getDb();
}

export const helpers = { buildComboKey, uid };

export function addXp(user, amount) {
  user.xp += amount;
  const xpForNextLevel = user.alchemyLevel * 100;
  if (user.xp >= xpForNextLevel) {
    user.xp -= xpForNextLevel;
    user.alchemyLevel += 1;
  }
}

export function sanitizeUser(user) {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    gold: user.gold,
    alchemyLevel: user.alchemyLevel,
    xp: user.xp,
  };
}

export function populateProduct(db, id) {
  return db.products.find((p) => p._id === id) || null;
}

export function populateCart(db, user) {
  return user.cart
    .map((item) => ({ product: populateProduct(db, item.product), quantity: item.quantity }))
    .filter((i) => i.product);
}

export function populateWishlist(db, user) {
  return user.wishlist.map((id) => populateProduct(db, id)).filter(Boolean);
}
