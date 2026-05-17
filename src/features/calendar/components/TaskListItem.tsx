import { PlannerTask } from "../types/calendar.types";

type TaskListItemProps = {
  task: PlannerTask;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

 export  default function TaskListItem({ task, onToggleTask, onDeleteTask }: TaskListItemProps) {
  return (
    <div className="rounded-2xl border border-black bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div
            className={`text-sm font-semibold ${
              task.completed ? "text-emerald-300 line-through" : "text-black"
            }`}
          >
            {task.title}
          </div>
          <div className="mt-1 text-xs text-black">{task.time}</div>
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
        <p className="mt-3 text-sm leading-7 text-black">{task.description}</p>
      ) : null}
    </div>
  );
}
