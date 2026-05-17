import { HabitType } from "../../habits/types/habit.type";

type TaskListItemProps = {
  habit: HabitType;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function HabitListItem({
  habit,
  onToggleTask,
  onDeleteTask,
}: TaskListItemProps) {
  return (
    <div className="rounded-2xl border border-black bg-white p-4 mt-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">

          <div className="text-sm font-semibold text-black">
            {habit.HabitName}
          </div>

          <div className="mt-1 text-xs text-black">
            شروع از: {habit.HabitStartDate}
          </div>
          <div className="mt-1 text-xs text-black">نوع: {habit.HabitType}</div>
          <div className="mt-1 text-xs text-black">
            تعداد در هفته: {habit.HabitFrequency}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            // onClick={() => onToggleTask(habit.id)}
            className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs text-black transition hover:bg-emerald-500/25"
          >
            تغییر وضعیت
          </button>

          <button
            type="button"
            // onClick={() => onDeleteTask(habit.id)}
            className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs text-black transition hover:bg-rose-500/25"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
