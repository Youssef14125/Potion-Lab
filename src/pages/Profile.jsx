import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice.js";
import api from "../api/axiosClient.js";

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user?.username || "");
  const [saved, setSaved] = useState(false);

  const xpForNext = (user?.alchemyLevel || 1) * 100;
  const xpPct = Math.min(100, ((user?.xp || 0) / xpForNext) * 100);

  const handleSave = async (e) => {
    e.preventDefault();
    const { data } = await api.put("/users/profile", { username });
    dispatch(updateProfile(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="card-surface rounded-lg p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cauldron-800 text-4xl">🧙</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">Welcome, {user?.username}</h1>

        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-stone-500">Alchemy Level</p>
            <p className="font-display text-xl font-bold text-potion-purple">{user?.alchemyLevel}</p>
          </div>
          <div>
            <p className="text-stone-500">Gold</p>
            <p className="font-display text-xl font-bold text-potion-gold">🪙 {user?.gold}</p>
          </div>
          <div>
            <p className="text-stone-500">Email</p>
            <p className="truncate text-stone-300">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-stone-500">
            <span>XP</span><span>{user?.xp} / {xpForNext}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-cauldron-800">
            <div className="h-full bg-gradient-to-r from-potion-purple to-potion-teal" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="card-surface mt-6 rounded-lg p-6">
        <h2 className="font-display font-semibold text-stone-200">Update Username</h2>
        <div className="mt-3 flex gap-3">
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="input-field flex-1" />
          <button type="submit" className="btn-primary">Save</button>
        </div>
        {saved && <p className="mt-2 text-sm text-potion-teal">Saved!</p>}
      </form>
    </div>
  );
}
