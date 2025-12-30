import type { Difficulty } from "src/lib/types";

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "ง่าย",
  medium: "ปานกลาง",
  hard: "ยาก",
};

interface LandingPageProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStart: () => void;
  onSettings: () => void;
  currentFruits: string[];
  mounted?: boolean;
}

export function LandingPage({
  selectedDifficulty,
  onDifficultyChange,
  onStart,
  onSettings,
  currentFruits,
  mounted = true,
}: LandingPageProps) {
  return (
    <div className="flex flex-col items-center gap-8 max-w-md text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-zinc-50">
          ซูโดกุผลไม้
        </h1>
        {/* Show current theme fruits */}
        {mounted && (
          <div className="flex justify-center gap-1 text-2xl">
            {currentFruits.map((fruit) => (
              <span key={fruit}>{fruit}</span>
            ))}
          </div>
        )}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
          ซูโดกุคลาสสิกที่ใช้ผลไม้แทนตัวเลข เติมแต่ละแถว คอลัมน์ และกล่อง 3×3 ด้วยผลไม้ทั้ง 9 ชนิด
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            เลือกระดับความยาก:
          </span>
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onDifficultyChange(d)}
                className={`px-4 sm:px-6 py-2 text-base sm:text-lg rounded-full transition-colors ${
                  selectedDifficulty === d
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {DIFFICULTY_LABELS[d]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-500">
          <span>ง่าย: 40 คำใบ้</span>
          <span>•</span>
          <span>ปานกลาง: 31 คำใบ้</span>
          <span>•</span>
          <span>ยาก: 21 คำใบ้</span>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-4 px-10 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
        >
          เริ่มเกม
        </button>

        <button
          type="button"
          onClick={onSettings}
          className="px-4 py-2 text-sm rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
        >
          ตั้งค่า
        </button>
      </div>
    </div>
  );
}
