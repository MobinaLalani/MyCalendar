import type { PlannerTask } from "../types/calendar.types";
import { formatPersianNumber } from "../utils/tasks";

type PlannerSummaryProps = {
  todayTasks: PlannerTask[];
  tomorrowTasks: PlannerTask[];
};

export default function PlannerSummary({
  todayTasks,
  tomorrowTasks,
}: PlannerSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SummaryCard
        title="امروز"
        emptyMessage="برای امروز برنامه ای نداری."
        tasks={todayTasks}
      />
      <SummaryCard
        title="فردا"
        emptyMessage="برای فردا هنوز چیزی ثبت نشده."
        tasks={tomorrowTasks}
      />
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  tasks: PlannerTask[];
  emptyMessage: string;
};

function SummaryCard({ title, tasks, emptyMessage }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{formatPersianNumber(tasks.length)}</div>
      <div className="mt-3 space-y-2">
        {tasks.slice(0, 3).map((task) => (
          <div key={task.id} className="rounded-2xl bg-slate-900/80 px-3 py-2 text-sm">
            {task.time} - {task.title}
          </div>
        ))}

        {tasks.length === 0 ? <div className="text-sm text-slate-500">{emptyMessage}</div> : null}
      </div>
    </div>
  );
}
