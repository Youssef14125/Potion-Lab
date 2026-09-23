import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice.js";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((s) => s.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(form));
    if (result.meta.requestStatus === "fulfilled") navigate("/");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6">
      <span className="text-5xl">✨</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Begin Your Apprenticeship</h1>

      <form onSubmit={handleSubmit} className="mt-8 w-full card-surface rounded-lg p-6">
        <label className="text-xs uppercase tracking-wide text-stone-500">Username</label>
        <input
          required minLength={3}
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="input-field mt-1"
        />
        <label className="mt-4 block text-xs uppercase tracking-wide text-stone-500">Email</label>
        <input
          type="email" required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-field mt-1"
        />
        <label className="mt-4 block text-xs uppercase tracking-wide text-stone-500">Password</label>
        <input
          type="password" required minLength={6}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input-field mt-1"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full">
          {status === "loading" ? "Creating account..." : "Create Account"}
        </button>
        <p className="mt-3 text-center text-xs text-stone-500">Starts you with 500 Gold to spend.</p>
      </form>

      <p className="mt-6 text-sm text-stone-500">
        Already an alchemist?{" "}
        <Link to="/login" className="text-potion-purple hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
