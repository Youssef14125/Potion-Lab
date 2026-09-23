import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { selectCartCount } from "../features/cart/cartSlice.js";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-display uppercase tracking-wide transition-colors ${
    isActive ? "text-potion-gold" : "text-stone-300 hover:text-potion-purple"
  }`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-potion-purple/20 bg-cauldron-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <span className="text-2xl animate-bubble">🧪</span>
          POTION <span className="text-potion-gold">LAB</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
          <NavLink to="/potion-lab" className={navLinkClass}>Potion Lab</NavLink>
          <NavLink to="/recipes" className={navLinkClass}>Recipe Book</NavLink>
          {user && <NavLink to="/inventory" className={navLinkClass}>Inventory</NavLink>}
        </nav>

        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden items-center gap-1 rounded-full border border-potion-gold/40 px-3 py-1 text-sm text-potion-gold sm:flex">
              🪙 {user.gold?.toLocaleString()}
            </span>
          )}

          <Link to="/wishlist" className="relative p-2 text-stone-300 hover:text-potion-purple" aria-label="Wishlist">
            ♥
          </Link>

          <Link to="/cart" className="relative p-2 text-stone-300 hover:text-potion-purple" aria-label="Cart">
            🎒
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-potion-ember text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/profile" className="text-sm text-stone-300 hover:text-potion-purple">
                {user.username}
              </Link>
              <button onClick={handleLogout} className="btn-secondary !px-3 !py-1.5 text-xs">
                Log out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !px-4 !py-1.5 text-xs hidden sm:inline-flex">
              Sign in
            </Link>
          )}

          <button
            className="p-2 text-stone-300 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-potion-purple/20 bg-cauldron-950 px-4 py-3 md:hidden">
          <NavLink to="/shop" className={navLinkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/potion-lab" className={navLinkClass} onClick={() => setMenuOpen(false)}>Potion Lab</NavLink>
          <NavLink to="/recipes" className={navLinkClass} onClick={() => setMenuOpen(false)}>Recipe Book</NavLink>
          {user ? (
            <>
              <NavLink to="/inventory" className={navLinkClass} onClick={() => setMenuOpen(false)}>Inventory</NavLink>
              <NavLink to="/profile" className={navLinkClass} onClick={() => setMenuOpen(false)}>Profile ({user.username})</NavLink>
              <button onClick={handleLogout} className="btn-secondary mt-2 w-full">Log out</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary mt-2 w-full" onClick={() => setMenuOpen(false)}>Sign in</Link>
          )}
        </nav>
      )}
    </header>
  );
}
