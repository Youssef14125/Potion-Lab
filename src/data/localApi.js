import { getDb, saveDb, addXp, sanitizeUser, populateCart, populateWishlist, helpers } from "./localDb.js";

// Simulates network latency so loading states are visible, just like a real API.
const LATENCY = 250;
const wait = (ms = LATENCY) => new Promise((resolve) => setTimeout(resolve, ms));

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.response = { status, data: { message } };
  }
}

let getToken = () => null;
let onUnauthorized = () => {};
export const configureApiAuth = (tokenGetter, unauthorizedHandler) => {
  getToken = tokenGetter;
  if (unauthorizedHandler) onUnauthorized = unauthorizedHandler;
};

function requireUser(db) {
  const token = getToken();
  const user = token && db.users.find((u) => u._id === token);
  if (!user) {
    onUnauthorized(); // e.g. localStorage was cleared mid-session but Redux still has a token
    throw new ApiError(401, "Not authorized. Please log in.");
  }
  return user;
}

function matchQuery(product, params) {
  if (params.type && product.type !== params.type) return false;
  if (params.rarity && product.rarity !== params.rarity) return false;
  if (params.element && product.element !== params.element) return false;
  if (params.minPrice && product.price < Number(params.minPrice)) return false;
  if (params.maxPrice && product.price > Number(params.maxPrice)) return false;
  if (params.search) {
    const q = params.search.toLowerCase();
    const hay = `${product.name} ${product.description} ${product.effect}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

const SORTERS = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rarity: (a, b) => {
    const order = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
    return order.indexOf(b.rarity) - order.indexOf(a.rarity);
  },
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  rating: (a, b) => b.ratingAverage - a.ratingAverage,
};

async function handle(method, url, body, config = {}) {
  await wait();
  const db = getDb();
  const params = config.params || {};
  const [path, ] = url.split("?");
  const segments = path.split("/").filter(Boolean); // e.g. ["cart", "abc123"]

  // ---------- AUTH ----------
  if (path === "/auth/register" && method === "post") {
    const { username, email, password } = body;
    if (!username || !email || !password) throw new ApiError(400, "Username, email and password are all required.");
    if (db.users.some((u) => u.email === email.toLowerCase())) {
      throw new ApiError(400, "An account with that email already exists.");
    }
    const user = {
      _id: helpers.uid("user"), username, email: email.toLowerCase(), password,
      isAdmin: false, gold: 500, alchemyLevel: 1, xp: 0,
      cart: [], wishlist: [], inventory: [], discoveredRecipes: [],
    };
    db.users.push(user);
    saveDb(db);
    return { data: { ...sanitizeUser(user), token: user._id } };
  }

  if (path === "/auth/login" && method === "post") {
    const { email, password } = body;
    const user = db.users.find((u) => u.email === email?.toLowerCase() && u.password === password);
    if (!user) throw new ApiError(401, "Invalid email or password.");
    return { data: { ...sanitizeUser(user), token: user._id } };
  }

  if (path === "/auth/me" && method === "get") {
    const user = requireUser(db);
    return { data: sanitizeUser(user) };
  }

  // ---------- PRODUCTS ----------
  if (path === "/products/featured" && method === "get") {
    return { data: db.products.filter((p) => p.featured).slice(0, 8) };
  }

  if (path === "/products" && method === "get") {
    let items = db.products.filter((p) => matchQuery(p, params));
    items = params.sort && SORTERS[params.sort] ? items.slice().sort(SORTERS[params.sort]) : items.slice().sort((a, b) => b.featured - a.featured);
    const page = Math.max(parseInt(params.page) || 1, 1);
    const limit = Math.min(parseInt(params.limit) || 12, 48);
    const total = items.length;
    const paged = items.slice((page - 1) * limit, page * limit);
    return { data: { items: paged, page, pages: Math.max(Math.ceil(total / limit), 1), total } };
  }

  if (segments[0] === "products" && segments[1] && method === "get") {
    const idOrSlug = segments[1];
    const product = db.products.find((p) => p._id === idOrSlug || p.slug === idOrSlug);
    if (!product) throw new ApiError(404, "This item doesn't exist in the Lab's catalog.");
    return { data: product };
  }

  // ---------- CART ----------
  if (path === "/cart" && method === "get") {
    const user = requireUser(db);
    return { data: populateCart(db, user) };
  }
  if (path === "/cart" && method === "post") {
    const user = requireUser(db);
    const { productId, quantity = 1 } = body;
    if (!db.products.some((p) => p._id === productId)) throw new ApiError(404, "That item doesn't exist.");
    const existing = user.cart.find((i) => i.product === productId);
    if (existing) existing.quantity += Number(quantity);
    else user.cart.push({ product: productId, quantity: Number(quantity) });
    saveDb(db);
    return { data: populateCart(db, user) };
  }
  if (segments[0] === "cart" && segments[1] && method === "put") {
    const user = requireUser(db);
    const item = user.cart.find((i) => i.product === segments[1]);
    if (!item) throw new ApiError(404, "That item isn't in your satchel.");
    item.quantity = Math.max(1, Number(body.quantity));
    saveDb(db);
    return { data: populateCart(db, user) };
  }
  if (segments[0] === "cart" && segments[1] && method === "delete") {
    const user = requireUser(db);
    user.cart = user.cart.filter((i) => i.product !== segments[1]);
    saveDb(db);
    return { data: populateCart(db, user) };
  }
  if (path === "/cart" && method === "delete") {
    const user = requireUser(db);
    user.cart = [];
    saveDb(db);
    return { data: [] };
  }

  // ---------- WISHLIST ----------
  if (path === "/wishlist" && method === "get") {
    const user = requireUser(db);
    return { data: populateWishlist(db, user) };
  }
  if (segments[0] === "wishlist" && segments[1] && method === "post") {
    const user = requireUser(db);
    if (!user.wishlist.includes(segments[1])) user.wishlist.push(segments[1]);
    saveDb(db);
    return { data: populateWishlist(db, user) };
  }
  if (segments[0] === "wishlist" && segments[1] && method === "delete") {
    const user = requireUser(db);
    user.wishlist = user.wishlist.filter((id) => id !== segments[1]);
    saveDb(db);
    return { data: populateWishlist(db, user) };
  }

  // ---------- POTIONS ----------
  if (path === "/potions/ingredients" && method === "get") {
    return { data: db.products.filter((p) => p.type === "ingredient").sort((a, b) => a.name.localeCompare(b.name)) };
  }
  if (path === "/potions/recipes" && method === "get") {
    const user = requireUser(db);
    const discovered = new Set(user.discoveredRecipes);
    const shaped = db.recipes.map((r) => {
      const isDiscovered = discovered.has(r._id);
      return {
        _id: r._id,
        discovered: isDiscovered,
        ingredientSlugs: isDiscovered ? r.ingredientSlugs : [],
        name: isDiscovered ? r.name : "???",
        hint: isDiscovered ? "" : r.hint,
        result: isDiscovered ? db.products.find((p) => p._id === r.result) : null,
      };
    });
    return { data: { recipes: shaped, discoveredCount: discovered.size, totalCount: db.recipes.length } };
  }
  if (path === "/potions/brew" && method === "post") {
    const user = requireUser(db);
    const { ingredientSlugs } = body;
    if (!Array.isArray(ingredientSlugs) || ingredientSlugs.length < 2) {
      throw new ApiError(400, "Choose at least two ingredients to brew with.");
    }
    const comboKey = helpers.buildComboKey(ingredientSlugs);
    const recipe = db.recipes.find((r) => r.comboKey === comboKey);
    const wasDiscovered = recipe && user.discoveredRecipes.includes(recipe._id);

    if (!recipe) {
      addXp(user, 5);
      saveDb(db);
      return { data: { success: false, message: "The mixture fizzles and evaporates. Nothing happens... this time.", xpGained: 5 } };
    }

    const result = db.products.find((p) => p._id === recipe.result);
    const invEntry = user.inventory.find((i) => i.product === result._id);
    if (invEntry) invEntry.quantity += 1;
    else user.inventory.push({ product: result._id, quantity: 1 });

    if (!wasDiscovered) user.discoveredRecipes.push(recipe._id);
    const xpGained = wasDiscovered ? Math.round(recipe.xpReward / 4) : recipe.xpReward;
    addXp(user, xpGained);
    saveDb(db);

    return {
      data: {
        success: true,
        message: wasDiscovered ? `You brew another ${result.name}.` : `✨ New discovery! You've successfully brewed ${result.name}!`,
        newlyDiscovered: !wasDiscovered,
        result, xpGained, alchemyLevel: user.alchemyLevel,
      },
    };
  }

  // ---------- ORDERS ----------
  const TAX_RATE = 0.05;
  if (path === "/orders" && method === "post") {
    const user = requireUser(db);
    const cart = populateCart(db, user);
    if (cart.length === 0) throw new ApiError(400, "Your satchel is empty. Add something before checking out.");

    const items = cart.map((i) => ({ product: i.product._id, name: i.product.name, icon: i.product.icon, price: i.product.price, quantity: i.quantity }));
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;
    if (user.gold < total) throw new ApiError(400, `Not enough Gold. You need ${total} but only have ${user.gold}.`);

    const order = { _id: helpers.uid("order"), user: user._id, items, subtotal, tax, total, status: "Pending", createdAt: new Date().toISOString() };
    db.orders.push(order);

    user.gold -= total;
    items.forEach((i) => {
      const entry = user.inventory.find((e) => e.product === i.product);
      if (entry) entry.quantity += i.quantity;
      else user.inventory.push({ product: i.product, quantity: i.quantity });
    });
    user.cart = [];
    addXp(user, 10);
    saveDb(db);
    return { data: order };
  }
  if (path === "/orders/mine" && method === "get") {
    const user = requireUser(db);
    return { data: db.orders.filter((o) => o.user === user._id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) };
  }
  if (segments[0] === "orders" && segments[1] && method === "get") {
    const user = requireUser(db);
    const order = db.orders.find((o) => o._id === segments[1] && o.user === user._id);
    if (!order) throw new ApiError(404, "Order not found.");
    return { data: order };
  }

  // ---------- USERS ----------
  if (path === "/users/inventory" && method === "get") {
    const user = requireUser(db);
    const grouped = { potion: [], ingredient: [], artifact: [], spellbook: [] };
    user.inventory.filter((i) => i.quantity > 0).forEach((i) => {
      const product = db.products.find((p) => p._id === i.product);
      if (product) grouped[product.type]?.push({ product, quantity: i.quantity });
    });
    return { data: grouped };
  }
  if (path === "/users/profile" && method === "put") {
    const user = requireUser(db);
    if (body.username) user.username = body.username;
    saveDb(db);
    return { data: sanitizeUser(user) };
  }

  throw new ApiError(404, `No mock route for ${method.toUpperCase()} ${path}`);
}

const api = {
  get: (url, config) => handle("get", url, null, config),
  post: (url, body, config) => handle("post", url, body, config),
  put: (url, body, config) => handle("put", url, body, config),
  delete: (url, config) => handle("delete", url, null, config),
};

export default api;
