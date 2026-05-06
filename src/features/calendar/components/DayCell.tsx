import { motion } from "framer-motion";
import type { CalendarDay, PlannerTask } from "../types/calendar.types";
import { formatPersianNumber } from "../utils/tasks";

type DayCellProps = {
  day: CalendarDay;
  tasks: PlannerTask[];
  onSelect: (dateKey: string) => void;
  onQuickAdd: (dateKey: string) => void;
};

export default function DayCell({
  day,
  tasks,
  onSelect,
  onQuickAdd,
}: DayCellProps) {
  const hasTasks = tasks.length > 0;

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={`group relative min-h-28 overflow-hidden rounded-3xl border p-3 text-right transition ${
        day.isToday
          ? "bg-[#bfcfcd] border-gray-600 shadow-lg" // رنگ پس زمینه امروز
          : day.isSelected
            ? "border-gray-600 bg-[#f5cbe2] shadow-lg"
            : hasTasks
              ? "border-gray-600 bg-[#F7D66C]"
              : "border-gray-600 hover:bg-white/10"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(day.dateKey)}
        className="flex h-full w-full flex-col justify-between text-right"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-black">
              {formatPersianNumber(day.persian.day)}
            </span>
            <span className="text-xs text-(--text-foreground)">
              {day.persian.weekdayName}
            </span>
          </div>
          <span className="rounded-full bg-slate-900/80 px-2 py-1 text-xs text-slate-300">
            {day.gregorianDay}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <span
            className={`text-xs font-medium ${
              hasTasks ? "text-(--text-foreground)" : "text-slate-500"
            }`}
          >
            {hasTasks ? `${formatPersianNumber(tasks.length)} تسک` : ""}
          </span>

          {hasTasks ? (
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          ) : null}
        </div>
      </button>

      <motion.button
        type="button"
        variants={{
          rest: { y: 40, opacity: 0 },
          hover: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(event) => {
          event.stopPropagation();
          onQuickAdd(day.dateKey);
        }}
        className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white shadow-lg focus:opacity-100"
      >
        +
      </motion.button>
    </motion.div>
  );
}
