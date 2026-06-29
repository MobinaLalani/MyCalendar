"use client";

import { useMemo } from "react";
import { loadPlannerTasks } from "../calendar/services/calendar.storage";
import { loadHabit } from "../habits/services/habit.storage";
import { addDays, getPersianDateParts, getTodayDateKey, toDateKey } from "../../utils/jalali";

function calculateStreak(completedDates: string[]): number {
  let streak = 0;
  const today = new Date();
  while (streak < 365 && completedDates.includes(toDateKey(addDays(today, -streak)))) {
    streak++;
  }
  return streak;
}

type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
  bg: "yellow" | "blue" | "white";
};

function StatCard({ label, value, sub, bg }: StatCardProps) {
  const bgClass =
    bg === "yellow" ? "bg-(--yellow)" : bg === "blue" ? "bg-(--lightBlue)" : "bg-white";
  return (
    <div className={`rounded-3xl border border-black ${bgClass} p-5`}>
      <div className="text-3xl font-bold text-black">{value}</div>
      <div className="mt-1 text-sm font-semibold text-black">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-black/50">{sub}</div>}
    </div>
  );
}

export default function AnalyticsPage() {
  const tasks = useMemo(() => loadPlannerTasks(), []);
  const habits = useMemo(() => loadHabit(), []);
  const todayKey = getTodayDateKey();

  const last14 = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const date = addDays(new Date(), -(13 - i));
      const dateKey = toDateKey(date);
      const dayTasks = tasks.filter((t) => t.dateKey === dateKey);
      const completed = dayTasks.filter((t) => t.completed).length;
      const total = dayTasks.length;
      const score = total === 0 ? 0 : Math.round((completed / total) * 100);
      return { dateKey, persian: getPersianDateParts(date), total, completed, score, isToday: dateKey === todayKey };
    });
  }, [tasks, todayKey]);

  const habitStats = useMemo(() => {
    return habits
      .map((habit) => {
        const completedDates = habit.completedDates ?? [];
        const streak = calculateStreak(completedDates);
        return { ...habit, streak, totalCompleted: completedDates.length };
      })
      .sort((a, b) => b.streak - a.streak);
  }, [habits]);

  const weekTasks = useMemo(
    () => tasks.filter((t) => new Date(t.dateKey) >= addDays(new Date(), -7)),
    [tasks],
  );
  const weekCompleted = weekTasks.filter((t) => t.completed).length;
  const weekScore = weekTasks.length === 0 ? 0 : Math.round((weekCompleted / weekTasks.length) * 100);
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const maxScore = Math.max(...last14.map((d) => d.score), 1);

  const priorityBreakdown = useMemo(() => {
    const high = tasks.filter((t) => t.priority === "high").length;
    const medium = tasks.filter((t) => !t.priority || t.priority === "medium").length;
    const low = tasks.filter((t) => t.priority === "low").length;
    return { high, medium, low };
  }, [tasks]);

  return (
    <div className="mx-4 flex min-h-[95vh] max-w-full flex-col gap-5 py-5 lg:mx-8">
      {/* Header */}
      <div className="relative border border-black px-6 py-5 rounded-3xl bg-[#a2abab]">
        <div className="mb-1 flex items-center gap-2">
          <div className="h-1.5 w-6 rounded-full bg-linear-to-r from-yellow-400 to-amber-400" />
          <span className="text-xs font-medium tracking-widest text-black uppercase">
            آمار و تحلیل
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">گزارش‌ها</h1>
            <p className="mt-1 text-sm text-black/60">نمای کلی عملکرد شما</p>
          </div>
          <div className="rounded-full border border-black bg-(--yellow) px-4 py-2">
            <span className="text-sm font-bold text-black">{tasks.length} تسک</span>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="تسک این هفته" value={String(weekTasks.length)} bg="yellow" />
        <StatCard label="تکمیل‌شده" value={String(weekCompleted)} sub={`از ${weekTasks.length} مورد`} bg="blue" />
        <StatCard label="امتیاز هفته" value={`${weekScore}%`} bg="yellow" />
        <StatCard label="کل انجام‌شده" value={String(totalCompleted)} sub="از ابتدا" bg="blue" />
      </div>

      {/* 14-day bar chart */}
      <div className="rounded-3xl border border-black bg-white p-5">
        {/* panel header */}
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-black bg-(--yellow) px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-black" />
          <h2 className="font-bold text-black">عملکرد ۱۴ روز اخیر</h2>
        </div>

        <div className="flex h-40 items-end gap-1.5 px-1">
          {last14.map((day) => (
            <div key={day.dateKey} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-t-lg border-x border-t transition-all ${
                    day.isToday
                      ? "border-black bg-black"
                      : day.score > 0
                        ? "border-black/30 bg-(--yellow)"
                        : "border-black/10 bg-black/6"
                  }`}
                  style={{ height: `${Math.max((day.score / maxScore) * 100, day.total > 0 ? 8 : 3)}%` }}
                  title={`${day.score}% — ${day.completed}/${day.total}`}
                />
              </div>
              <span className={`text-[9px] font-medium ${day.isToday ? "text-black font-bold" : "text-black/40"}`}>
                {day.persian.day}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between border-t border-black/10 pt-2 text-[10px] text-black/40">
          <span>۱۴ روز پیش</span>
          <span>امروز</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Habit stats */}
        <div className="rounded-3xl border border-black bg-white p-4">
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-black bg-(--lightBlue) px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-black" />
            <h2 className="font-bold text-black">وضعیت عادت‌ها</h2>
          </div>

          {habitStats.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-black/20 py-10 text-center">
              <span className="text-2xl">📋</span>
              <span className="text-sm text-black/40">هیچ عادتی ثبت نشده</span>
            </div>
          ) : (
            <div className="space-y-2">
              {habitStats.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between rounded-2xl border border-black bg-white px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-black">{habit.HabitName}</div>
                    <div className="mt-0.5 text-xs text-black/40">{habit.totalCompleted} بار انجام شده</div>
                  </div>
                  <div className="shrink-0">
                    {habit.streak > 0 ? (
                      <span className="rounded-full border border-black bg-(--yellow) px-2.5 py-1 text-xs font-bold text-black">
                        🔥 {habit.streak} روز
                      </span>
                    ) : (
                      <span className="rounded-full border border-black/15 bg-black/5 px-2 py-1 text-xs text-black/30">
                        بدون streak
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority breakdown */}
        <div className="rounded-3xl border border-black bg-white p-4">
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-black bg-(--yellow) px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-black" />
            <h2 className="font-bold text-black">توزیع اولویت تسک‌ها</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: "اولویت بالا", count: priorityBreakdown.high, bar: "bg-red-500" },
              { label: "اولویت متوسط", count: priorityBreakdown.medium, bar: "bg-(--yellow)" },
              { label: "اولویت پایین", count: priorityBreakdown.low, bar: "bg-emerald-500" },
            ].map((item) => {
              const total = tasks.length || 1;
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium text-black">{item.label}</span>
                    <span className="font-bold text-black">
                      {item.count}
                      <span className="mr-1 font-normal text-black/40">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full border border-black/20 bg-black/5">
                    <div
                      className={`h-3 rounded-full transition-all ${item.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-black bg-(--lightBlue) p-4 text-center">
            <div className="text-3xl font-bold text-black">{tasks.length}</div>
            <div className="mt-1 text-xs font-medium text-black/60">کل تسک‌های ثبت‌شده</div>
          </div>
        </div>
      </div>
    </div>
  );
}
