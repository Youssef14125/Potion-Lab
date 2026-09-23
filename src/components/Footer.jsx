export default function Footer() {
  return (
    <footer className="mt-20 border-t border-potion-purple/20 bg-cauldron-950">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-stone-500 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-display text-stone-300">🧪 POTION LAB</p>
          <p>Est. by an apprentice alchemist, somewhere beneath Cairo.</p>
          <p>© {new Date().getFullYear()} Potion Lab.</p>
        </div>
      </div>
    </footer>
  );
}
