"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface UndoRedoControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export function UndoRedoControls({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: UndoRedoControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className={`p-2 rounded-lg transition-colors ${
          canUndo
            ? "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            : "opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
        }`}
        aria-label="ย้อนกลับ"
        title="ย้อนกลับ"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        type="button"
        onClick={onRedo}
        disabled={!canRedo}
        className={`p-2 rounded-lg transition-colors ${
          canRedo
            ? "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            : "opacity-50 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
        }`}
        aria-label="ทำซ้ำ"
        title="ทำซ้ำ"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
