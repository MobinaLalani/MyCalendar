import type { PersianDateParts, PlannerTask } from "../types/calendar.types";
import { getRelativeLabel } from "../utils/jalali";
import { formatPersianNumber } from "../utils/tasks";
import TaskForm from "./TaskForm";

type TaskListProps = {
  selectedDate: Date;
  selectedDateParts: PersianDateParts;
  tasks: PlannerTask[];
  onAddTask: (input: { title: string; time: string; description: string }) => boolean;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function TaskList({
  selectedDate,
  selectedDateParts,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <>
      <div className="rounded-3xl  border border-white/10  p-5 backdrop-blur ">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">روز انتخاب شده</h2>
            <p className="mt-1 text-sm text-slate-400">
              {selectedDateParts.fullLabel}
            </p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
            {getRelativeLabel(selectedDate)}
          </span>
        </div>

        <TaskForm onSubmit={onAddTask} />
      </div>

      <div className=" rounded-3xl border bg-(--surface-muted) mx-4 p-5 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-(--text-foreground) leading-none">
            برنامه های این روز
          </h2>

          <span className="inline-flex items-center rounded-full bg-violet-500/15 px-3 py-1 text-xs leading-none text-(--text-foreground)">
            {formatPersianNumber(tasks.length)} مورد
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-400">
              هنوز برنامه ای برای این روز ثبت نشده است.
            </div>
          ) : null}

          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      </div>
    </>
  );
}

type TaskListItemProps = {
  task: PlannerTask;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

function TaskListItem({ task, onToggleTask, onDeleteTask }: TaskListItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div
            className={`text-sm font-semibold ${
              task.completed ? "text-emerald-300 line-through" : "text-white"
            }`}
          >
            {task.title}
          </div>
          <div className="mt-1 text-xs text-slate-400">{task.time}</div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onToggleTask(task.id)}
            className={`rounded-xl px-3 py-2 text-xs transition ${
              task.completed
                ? "bg-amber-500/15 text-amber-100 hover:bg-amber-500/25"
                : "bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25"
            }`}
          >
            {task.completed ? "ناتمام" : "انجام شد"}
          </button>
          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs text-rose-100 transition hover:bg-rose-500/25"
          >
            حذف
          </button>
        </div>
      </div>

      {task.description ? (
        <p className="mt-3 text-sm leading-7 text-slate-300">{task.description}</p>
      ) : null}
    </div>
  );
}
