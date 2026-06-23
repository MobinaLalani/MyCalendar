"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { loadPlannerTasks } from "../../features/calendar/services/calendar.storage";
import { loadHabit } from "../../features/habits/services/habit.storage";
import { getPersianDateParts, parseDateKey } from "../../utils/jalali";

type SearchItem = {
  id: string;
  type: "task" | "habit";
  title: string;
  subtitle: string;
  dateKey?: string;
  color?: string;
};

type SearchPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo<SearchItem[]>(() => {
    if (!isOpen) return [];
    const tasks = loadPlannerTasks().map((t) => ({
      id: t.id,
      type: "task" as const,
      title: t.title,
      subtitle: `${getPersianDateParts(parseDateKey(t.dateKey)).fullLabel}  •  ${t.startTime || "—"}`,
      dateKey: t.dateKey,
      color: t.color,
    }));
    const habits = loadHabit().map((h) => ({
      id: h.id,
      type: "habit" as const,
      title: h.HabitName,
      subtitle: `عادت  •  شروع: ${h.HabitStartDate}`,
    }));
    return [...tasks, ...habits];
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 8);
    return allItems
      .filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, allItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results.length]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      const timer = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelect = (item: SearchItem) => {
    if (item.dateKey) router.push(`/DaySheet?date=${item.dateKey}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (results[selectedIndex]) handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-20 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-[#111111] shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="جستجو در تسک‌ها و عادت‌ها..."
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
              />
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-600">
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-1.5">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-slate-600">نتیجه‌ای پیدا نشد</div>
              ) : (
                results.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-right transition ${
                      i === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color || (item.type === "habit" ? "#a78bfa" : "#60a5fa") }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-white">{item.title}</div>
                      <div className="truncate text-xs text-slate-600">{item.subtitle}</div>
                    </div>
                    <span className="shrink-0 text-[10px] text-slate-700">
                      {item.type === "task" ? "تسک" : "عادت"}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="flex gap-4 border-t border-white/10 px-4 py-2 text-[10px] text-slate-700">
              <span>↑↓ ناوبری</span>
              <span>↵ انتخاب</span>
              <span>Esc بستن</span>
              <span className="mr-auto">Ctrl+K برای باز کردن</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
