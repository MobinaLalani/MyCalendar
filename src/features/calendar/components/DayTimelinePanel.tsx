import { useMemo } from "react";
import { motion } from "framer-motion";
import type {
  PersianDateParts,
  PlannerTask,
} from "../types/calendar.types";
import type { HabitType } from "../../habits/types/habit.type";

type DayTimelinePanelProps = {
  selectedDateParts: PersianDateParts;
  tasks: PlannerTask[];
  habits: HabitType[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

function getHourLabel(hour: number) {
  return new Intl.NumberFormat("fa-IR", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(hour);
}

function getTaskHour(task: PlannerTask) {
  const parsedHour = Number.parseInt(task.time.slice(0, 2), 10);

  if (Number.isNaN(parsedHour) || parsedHour < 0 || parsedHour > 23) {
    return null;
  }

  return parsedHour;
}

export default function DayTimelinePanel({
  selectedDateParts,
  tasks,
  habits,
  onToggleTask,
  onDeleteTask,
}: DayTimelinePanelProps) {
  const hourlyTasks = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      label: `${getHourLabel(hour)}:00`,
      tasks: tasks.filter((task) => getTaskHour(task) === hour),
    }));
  }, [tasks]);

  return (
    <motion.section
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 28 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="min-h-full rounded-3xl border border-gray-600 bg-white/5 p-4 backdrop-blur sm:p-5"
    >
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-lg font-semibold text-(--text-foreground)">
          نمای ساعتی روز
        </h2>
        <p className="mt-1 text-sm text-slate-400">{selectedDateParts.fullLabel}</p>
      </div>

      <div className="mt-4 space-y-4">
        <section className="rounded-3xl border border-black bg-[#cfc8ba] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-semibold text-black">عادت های روز</h3>
            <span className="inline-flex items-center rounded-full bg-violet-500/15 px-3 py-1 text-xs text-black">
              {new Intl.NumberFormat("fa-IR").format(habits.length)} عادت
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {habits.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/20 bg-white/70 px-4 py-5 text-sm text-slate-600">
                برای این روز عادتی ثبت نشده است.
              </div>
            ) : null}

            {habits.map((habit) => (
              <div
                key={habit.id}
                className="rounded-2xl border border-black bg-white p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-black">
                    {habit.HabitName}
                  </h4>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {new Intl.NumberFormat("fa-IR").format(habit.HabitFrequency)} بار
                    در هفته
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    شروع: {habit.HabitStartDate}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    نوع: {new Intl.NumberFormat("fa-IR").format(habit.HabitType)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-black bg-[#cfc8ba] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-semibold text-black">تایم لاین روز</h3>
            <span className="inline-flex items-center rounded-full bg-violet-500/15 px-3 py-1 text-xs text-black">
              {new Intl.NumberFormat("fa-IR").format(tasks.length)} تسک
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {hourlyTasks.map((slot) => (
              <div
                key={slot.hour}
                className="grid gap-3 rounded-2xl border border-black/20 bg-white/70 p-3 lg:grid-cols-[5.5rem_minmax(0,1fr)]"
              >
                <div className="flex items-start">
                  <span className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs text-white">
                    {slot.label}
                  </span>
                </div>

                <div className="space-y-2">
                  {slot.tasks.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-black/10 px-4 py-3 text-sm text-slate-500">
                      بدون برنامه
                    </div>
                  ) : null}

                  {slot.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl border border-black bg-white p-3"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div
                            className={`text-sm font-semibold ${
                              task.completed
                                ? "text-emerald-600 line-through"
                                : "text-black"
                            }`}
                          >
                            {task.title}
                          </div>
                          <div className="mt-1 text-xs text-black">
                            {task.time}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => onToggleTask(task.id)}
                            className={`rounded-xl px-3 py-2 text-xs transition ${
                              task.completed
                                ? "bg-amber-500/15 text-black hover:bg-amber-500/25"
                                : "bg-emerald-500/15 text-black hover:bg-emerald-500/25"
                            }`}
                          >
                            {task.completed ? "ناتمام" : "انجام شد"}
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteTask(task.id)}
                            className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs text-black transition hover:bg-rose-500/25"
                          >
                            حذف
                          </button>
                        </div>
                      </div>

                      {task.description ? (
                        <p className="mt-3 text-sm leading-7 text-black">
                          {task.description}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.section>
  );
}
