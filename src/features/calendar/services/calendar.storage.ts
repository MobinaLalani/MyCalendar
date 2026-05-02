import type { PlannerTask } from "../types/calendar.types";

const STORAGE_KEY = "mobina-calendar-planner-tasks";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadPlannerTasks(): PlannerTask[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue) as unknown;
    return Array.isArray(parsedValue) ? (parsedValue as PlannerTask[]) : [];
  } catch {
    return [];
  }
}

export function savePlannerTasks(tasks: PlannerTask[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
