import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl">🌀</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Lost in the Astral Plane</h1>
      <p className="mt-2 text-stone-400">This page doesn't exist in our grimoire.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Return Home</Link>
    </div>
  );
}
