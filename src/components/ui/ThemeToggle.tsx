import { Moon, Sun } from "lucide-react";

export function ThemeToggle({
  mounted,
  theme,
  onToggle,
}: {
  mounted: boolean;
  theme: string;
  onToggle: () => void;
}) {
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
      aria-label={theme === "dark" ? "โหมดสว่าง" : "โหมดมืด"}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
