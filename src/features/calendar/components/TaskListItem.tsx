import { PlannerTask, TaskPriority } from "../types/calendar.types";

type TaskListItemProps = {
  task: PlannerTask;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteGroup?: (repeatGroupId: string) => void;
};

const PRIORITY_BADGE: Record<TaskPriority, { label: string; className: string }> = {
  high: { label: "بالا", className: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "متوسط", className: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "پایین", className: "bg-sky-100 text-sky-700 border-sky-200" },
};

export default function TaskListItem({ task, onToggleTask, onDeleteTask, onDeleteGroup }: TaskListItemProps) {
  const priority = task.priority ?? "medium";
  const isRecurring = task.repeat && task.repeat !== "none";

  return (
    <div
      className="rounded-2xl border border-black bg-white p-4 transition hover:shadow-sm"
      style={{ borderLeftWidth: 4, borderLeftColor: task.color || "#60a5fa" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className={`text-sm font-semibold ${task.completed ? "text-emerald-600 line-through" : "text-black"}`}>
            {task.title}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {task.startTime} – {task.endTime}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${PRIORITY_BADGE[priority].className}`}>
              {PRIORITY_BADGE[priority].label}
            </span>
            {isRecurring && (
              <span className="rounded-full border border-violet-200 bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                🔄 تکراری
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggleTask(task.id)}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
              task.completed
                ? "bg-amber-500/15 text-amber-800 hover:bg-amber-500/25"
                : "bg-emerald-500/15 text-emerald-800 hover:bg-emerald-500/25"
            }`}
          >
            {task.completed ? "ناتمام" : "انجام شد"}
          </button>
          {isRecurring && onDeleteGroup && task.repeatGroupId ? (
            <button
              type="button"
              onClick={() => onDeleteGroup(task.repeatGroupId!)}
              className="rounded-xl bg-rose-500/10 px-3 py-2 text-xs text-rose-700 transition hover:bg-rose-500/20"
              title="حذف همه تکرارها"
            >
              حذف همه
            </button>
          ) : null}
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
        <p className="mt-3 text-sm leading-7 text-slate-600">{task.description}</p>
      ) : null}
    </div>
  );
}
