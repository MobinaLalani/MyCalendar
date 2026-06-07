import type { CalendarDay, PlannerTask } from "../types/calendar.types";

export function formatPersianNumber(value: number) {
  return value.toLocaleString("fa-IR");
}

function getTaskStartTime(task: PlannerTask) {
  return task.startTime ?? "";
}

export function sortPlannerTasks(tasks: PlannerTask[]) {
  return [...tasks].sort((left, right) => {
    const leftStartTime = getTaskStartTime(left);
    const rightStartTime = getTaskStartTime(right);

    if (leftStartTime === rightStartTime) {
      return right.createdAt.localeCompare(left.createdAt);
    }

    if (!leftStartTime) {
      return 1;
    }

    if (!rightStartTime) {
      return -1;
    }

    return leftStartTime.localeCompare(rightStartTime);
  });
}

export function getTasksForDate(tasks: PlannerTask[], dateKey: string) {
  return sortPlannerTasks(tasks.filter((task) => task.dateKey === dateKey));
}

export function countTasksInMonth(tasks: PlannerTask[], days: CalendarDay[]) {
  const validDateKeys = new Set(days.map((day) => day.dateKey));
  return tasks.filter((task) => validDateKeys.has(task.dateKey)).length;
}
