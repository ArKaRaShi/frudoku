import { useEffect, useState } from "react";
import { THEMES } from "src/lib/themes";
import type { Theme } from "src/lib/types";
import { EmojiPicker } from "./EmojiPicker";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  customFruits: string[];
  onThemeChange: (theme: Theme) => void;
  onCustomFruitsChange: (fruits: string[]) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  currentTheme,
  customFruits,
  onThemeChange,
  onCustomFruitsChange,
}: SettingsModalProps) {
  // Local state for pending changes (not applied until Save is clicked)
  const [pendingTheme, setPendingTheme] = useState<Theme>(currentTheme);
  const [pendingFruits, setPendingFruits] = useState<string[]>(customFruits);

  // Reset pending values when modal opens
  useEffect(() => {
    if (isOpen) {
      setPendingTheme(currentTheme);
      setPendingFruits(customFruits);
    }
  }, [isOpen, currentTheme, customFruits]);

  if (!isOpen) return null;

  // Check if custom theme has all 9 fruits filled
  const isCustomComplete =
    pendingTheme !== "custom" ||
    pendingFruits.filter((f) => f !== "").length === 9;

  const handleSave = () => {
    if (!isCustomComplete) return;
    // Only apply changes when Save is clicked
    onThemeChange(pendingTheme);
    onCustomFruitsChange(pendingFruits);
    onClose();
  };

  const handleClose = () => {
    // Don't apply changes, just close
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 safe-top safe-bottom"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-zinc-50">
          ตั้งค่า
        </h2>

        <div className="flex flex-col gap-6">
          {/* Theme Selector */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              โหมดผลไม้
            </label>
            <div className="flex flex-col gap-2">
              {(Object.keys(THEMES) as Theme[]).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setPendingTheme(theme)}
                  className={`flex flex-col sm:flex-row items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    pendingTheme === theme
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  <div
                    className={`flex flex-wrap justify-center gap-1 text-base sm:text-lg ${pendingTheme === theme ? "opacity-100" : "opacity-70"}`}
                  >
                    {THEMES[theme].fruits.map((fruit) => (
                      <span key={fruit}>{fruit}</span>
                    ))}
                  </div>
                  <span className="text-sm sm:text-base">{THEMES[theme].nameTh}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Fruit Picker - only show when custom theme is selected */}
          {pendingTheme === "custom" && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                เลือกผลไม้ของคุณ
              </label>
              <EmojiPicker
                selected={pendingFruits}
                onChange={setPendingFruits}
              />
              {!isCustomComplete && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center">
                  กรุณาเลือกผลไม้ครบ 9 ชนิด
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              ปิด
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isCustomComplete}
              className={`px-6 py-2 rounded-full transition-colors ${
                isCustomComplete
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-zinc-300 text-zinc-500 cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-500"
              }`}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
