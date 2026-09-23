// Visual centerpiece of the Potion Lab: an animated "bottle" that reflects the current brew state.
export default function PotionBottle({ state = "idle", resultIcon }) {
  const glow = {
    idle: "shadow-none",
    brewing: "shadow-glow animate-flicker",
    success: "shadow-goldGlow",
    failed: "shadow-none opacity-60",
  }[state];

  return (
    <div className={`flex h-40 w-40 items-center justify-center rounded-full border-4 border-potion-purple/40 bg-cauldron-800 text-7xl transition-all ${glow}`}>
      {state === "success" && resultIcon ? resultIcon : state === "failed" ? "💨" : "⚗️"}
    </div>
  );
}
