"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodayDateKey } from "../utils/jalali";

type ShortcutHandlers = {
  onSearch: () => void;
};

const IGNORED_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function useKeyboardShortcuts({ onSearch }: ShortcutHandlers) {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inInput = IGNORED_TAGS.has(target.tagName) || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearch();
        return;
      }

      if (inInput) return;

      if (e.key === "t" || e.key === "T") {
        router.push(`/DaySheet?date=${getTodayDateKey()}`);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSearch, router]);
}
