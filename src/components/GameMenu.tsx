"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { AlertCircle, Check, Home, RotateCw } from "lucide-react";
import * as React from "react";

interface GameMenuProps {
  difficulty: string;
  showConflicts: boolean;
  onNewGame: () => void;
  onToggleConflicts: () => void;
  onHome: () => void;
}

export function GameMenu({
  difficulty,
  showConflicts,
  onNewGame,
  onToggleConflicts,
  onHome,
}: GameMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          <span className="text-base">≡</span>
          <span className="hidden sm:inline">เมนู</span>
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={8}
          className="min-w-[200px] bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <DropdownMenuPrimitive.Item
            onClick={onNewGame}
            className="w-full px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3 outline-none cursor-pointer"
          >
            <RotateCw size={16} />
            <span>เกมใหม่</span>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={onToggleConflicts}
            onSelect={(event) => event.preventDefault()}
            className={`w-full px-4 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3 outline-none cursor-pointer ${
              showConflicts
                ? "text-red-700 dark:text-red-300"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {showConflicts ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{showConflicts ? "ซ่อนผลไม้ชนกัน" : "แสดงผลไม้ชนกัน"}</span>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={onHome}
            className="w-full px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-3 outline-none cursor-pointer"
          >
            <Home size={16} />
            <span>หน้าหลัก</span>
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
