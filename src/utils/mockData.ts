import type { PlannerTask } from "../features/calendar/types/calendar.types";
import type { HabitType } from "../features/habits/types/habit.type";
import { savePlannerTasks, loadPlannerTasks } from "../features/calendar/services/calendar.storage";
import { saveHabit } from "../features/habits/services/habit.storage";
import { addDays, toDateKey } from "./jalali";

let _seed = 1;
function uid(prefix = "mock") {
  return `${prefix}-${++_seed}-${Date.now().toString(36)}`;
}

const TASK_POOL: Array<{
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  priority: "high" | "medium" | "low";
}> = [
  { title: "جلسه تیمی", startTime: "09:00", endTime: "10:00", color: "#60a5fa", priority: "high" },
  { title: "مطالعه کتاب", startTime: "21:00", endTime: "22:00", color: "#a78bfa", priority: "low" },
  { title: "ورزش صبحگاهی", startTime: "07:00", endTime: "07:45", color: "#34d399", priority: "medium" },
  { title: "کار روی پروژه", startTime: "11:00", endTime: "13:00", color: "#f59e0b", priority: "high" },
  { title: "تماس با مشتری", startTime: "14:00", endTime: "14:30", color: "#f87171", priority: "high" },
  { title: "مرور ایمیل‌ها", startTime: "08:30", endTime: "09:00", color: "#94a3b8", priority: "low" },
  { title: "برنامه‌ریزی هفتگی", startTime: "17:00", endTime: "18:00", color: "#fbbf24", priority: "medium" },
  { title: "یادگیری زبان", startTime: "20:00", endTime: "20:30", color: "#6ee7b7", priority: "medium" },
  { title: "دیزاین ماکاپ", startTime: "10:30", endTime: "12:00", color: "#c084fc", priority: "high" },
  { title: "نوشتن گزارش", startTime: "15:00", endTime: "16:00", color: "#fb923c", priority: "medium" },
  { title: "مرور کد", startTime: "13:00", endTime: "14:00", color: "#38bdf8", priority: "medium" },
  { title: "پیاده‌روی عصر", startTime: "18:30", endTime: "19:00", color: "#4ade80", priority: "low" },
];

/**
 * Generates mock PlannerTask[] centered around `center` date.
 * Covers [center - before] to [center + after] days.
 */
export function generateMockTasks(
  center: Date = new Date(),
  before = 4,
  after = 4
): PlannerTask[] {
  const tasks: PlannerTask[] = [];
  const now = new Date().toISOString();

  for (let offset = -before; offset <= after; offset++) {
    const day = addDays(center, offset);
    const dateKey = toDateKey(day);
    const taskCount = offset === 0 ? 3 : 1 + (Math.abs(offset) % 3);

    for (let i = 0; i < taskCount; i++) {
      const t = TASK_POOL[(Math.abs(offset * 3 + i)) % TASK_POOL.length];
      tasks.push({
        id: uid("task"),
        dateKey,
        title: t.title,
        startTime: t.startTime,
        endTime: t.endTime,
        description: "",
        completed: offset < -1 && i === 0,
        createdAt: now,
        color: t.color,
        priority: t.priority,
      });
    }
  }

  return tasks;
}

/**
 * Generates mock HabitType[] with completion history relative to `center`.
 */
export function generateMockHabits(center: Date = new Date()): HabitType[] {
  const now = new Date().toISOString();
  const past = (n: number) => toDateKey(addDays(center, -n));
  const today = toDateKey(center);

  return [
    {
      id: uid("habit"),
      HabitName: "آب خوردن",
      HabitType: 1,
      HabitFrequency: 7,
      HabitStartDate: past(14),
      createdAt: now,
      completedDates: [past(6), past(5), past(3), past(2), past(1), today],
    },
    {
      id: uid("habit"),
      HabitName: "مدیتیشن",
      HabitType: 2,
      HabitFrequency: 5,
      HabitStartDate: past(10),
      createdAt: now,
      completedDates: [past(4), past(3), past(1)],
    },
    {
      id: uid("habit"),
      HabitName: "ورزش",
      HabitType: 1,
      HabitFrequency: 3,
      HabitStartDate: past(21),
      createdAt: now,
      completedDates: [past(7), past(4), past(2), today],
    },
    {
      id: uid("habit"),
      HabitName: "مطالعه",
      HabitType: 1,
      HabitFrequency: 7,
      HabitStartDate: past(30),
      createdAt: now,
      completedDates: [past(5), past(4), past(2), past(1), today],
    },
    {
      id: uid("habit"),
      HabitName: "نوشتن روزانه",
      HabitType: 2,
      HabitFrequency: 5,
      HabitStartDate: past(15),
      createdAt: now,
      completedDates: [past(3), past(2), today],
    },
  ];
}

/**
 * Seeds mock data into localStorage only if tasks storage is empty.
 * Call once on app init (e.g. useEffect in layout).
 */
export function seedMockData(center: Date = new Date()) {
  const existing = loadPlannerTasks();
  if (existing.length > 0) return;
  savePlannerTasks(generateMockTasks(center));
  saveHabit(generateMockHabits(center));
}
