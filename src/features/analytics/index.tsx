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

type StatCardProps = { label: string; value: string; sub?: string; color: "violet" | "emerald" | "amber" | "sky" };

function StatCard({ label, value, sub, color }: StatCardProps) {
  const colorMap = {
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-300",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-300",
    amber: "from-amber-400/20 to-amber-400/5 border-amber-400/20 text-amber-300",
    sky: "from-sky-500/20 to-sky-500/5 border-sky-500/20 text-sky-300",
  };
  return (
    <div className={`rounded-3xl border bg-linear-to-br p-5 ${colorMap[color]}`}>
      <div className="text-2xl font-bold text-(--text-foreground)">{value}</div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
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
    <section className="mx-auto flex min-h-screen w-full flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-(--text-foreground)">گزارش‌ها و تحلیل</h1>
        <p className="mt-1 text-sm text-slate-400">نمای کلی عملکرد شما</p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="تسک این هفته" value={String(weekTasks.length)} color="violet" />
        <StatCard label="تکمیل‌شده" value={String(weekCompleted)} sub={`از ${weekTasks.length} مورد`} color="emerald" />
        <StatCard label="امتیاز هفته" value={`${weekScore}%`} color="amber" />
        <StatCard label="کل انجام‌شده" value={String(totalCompleted)} sub="از ابتدا" color="sky" />
      </div>

      {/* 14-day productivity bar chart */}
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="mb-5 text-sm font-semibold text-(--text-foreground)">عملکرد ۱۴ روز اخیر</h2>
        <div className="flex h-36 items-end gap-1.5">
          {last14.map((day) => (
            <div key={day.dateKey} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    day.isToday ? "bg-amber-400" : day.score > 0 ? "bg-white/30" : "bg-white/8"
                  }`}
                  style={{ height: `${Math.max((day.score / maxScore) * 100, day.total > 0 ? 6 : 2)}%` }}
                  title={`${day.score}% — ${day.completed}/${day.total}`}
                />
              </div>
              <span className={`text-[9px] ${day.isToday ? "text-amber-400" : "text-slate-600"}`}>
                {day.persian.day}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-600">
          <span>۱۴ روز پیش</span>
          <span>امروز</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Habit stats */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="mb-4 text-sm font-semibold text-(--text-foreground)">وضعیت عادت‌ها</h2>
          {habitStats.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">هیچ عادتی ثبت نشده</div>
          ) : (
            <div className="space-y-3">
              {habitStats.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-(--text-foreground)">{habit.HabitName}</div>
                    <div className="mt-0.5 text-xs text-slate-400">{habit.totalCompleted} بار انجام شده</div>
                  </div>
                  <div className="shrink-0 text-right">
                    {habit.streak > 0 ? (
                      <span className="font-bold text-amber-400">🔥 {habit.streak} روز</span>
                    ) : (
                      <span className="text-xs text-slate-600">بدون streak</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority breakdown */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="mb-4 text-sm font-semibold text-(--text-foreground)">توزیع اولویت تسک‌ها</h2>
          <div className="space-y-3">
            {[
              { label: "اولویت بالا", count: priorityBreakdown.high, color: "bg-red-500", textColor: "text-red-400" },
              { label: "اولویت متوسط", count: priorityBreakdown.medium, color: "bg-amber-400", textColor: "text-amber-400" },
              { label: "اولویت پایین", count: priorityBreakdown.low, color: "bg-emerald-500", textColor: "text-emerald-400" },
            ].map((item) => {
              const total = tasks.length || 1;
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-400">{item.label}</span>
                    <span className={item.textColor}>{item.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-2xl font-bold text-(--text-foreground)">{tasks.length}</div>
            <div className="mt-1 text-xs text-slate-400">کل تسک‌های ثبت‌شده</div>
          </div>
        </div>
      </div>
    </section>
  );
}
