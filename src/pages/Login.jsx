import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((s) => s.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate(location.state?.from?.pathname || "/");
    }
  };

  const fillDemo = () => setForm({ email: "demo@potionlab.dev", password: "potionlab123" });

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6">
      <span className="text-5xl">🧙</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Welcome Back, Alchemist</h1>

      <form onSubmit={handleSubmit} className="mt-8 w-full card-surface rounded-lg p-6">
        <label className="text-xs uppercase tracking-wide text-stone-500">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-field mt-1"
        />
        <label className="mt-4 block text-xs uppercase tracking-wide text-stone-500">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input-field mt-1"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={status === "loading"} className="btn-primary mt-6 w-full">
          {status === "loading" ? "Signing in..." : "Sign In"}
        </button>

        <button type="button" onClick={fillDemo} className="mt-3 w-full text-xs text-stone-500 underline hover:text-potion-purple">
          Use demo account (demo@potionlab.dev)
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-500">
        New to the Lab?{" "}
        <Link to="/register" className="text-potion-purple hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
