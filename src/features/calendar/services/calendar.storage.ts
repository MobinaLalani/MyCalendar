import type { PlannerTask } from "../types/calendar.types";
import { safeStorage } from "@/src/utils/storage";




export function loadPlannerTasks(): PlannerTask[] {
  return safeStorage.get<PlannerTask[]>("mobina-calendar-planner-tasks", []);
}


export function savePlannerTasks(tasks: PlannerTask[]) {
  safeStorage.set("mobina-calendar-planner-tasks", tasks);
}