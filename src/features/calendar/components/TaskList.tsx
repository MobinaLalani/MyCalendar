import { AnimatePresence, motion } from "framer-motion";
import type { PersianDateParts, PlannerTask } from "../types/calendar.types";
import Tooltip from "@/src/components/ui/Tooltip";
import { getRelativeLabel } from "../utils/jalali";
import PlusIcon from '../../..//components/icons/addIcon.svg';
import { formatPersianNumber } from "../utils/tasks";
import TaskForm from "./TaskForm";

type TaskListProps = {
  isOpen: boolean;
  isCreateMode: boolean;
  selectedDate: Date;
  selectedDateParts: PersianDateParts;
  tasks: PlannerTask[];
  onAddTask: (input: {
    title: string;
    time: string;
    description: string;
  }) => boolean;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onClose: () => void;
  onStartCreate: () => void;
  onCancelCreate: () => void;
};

export default function TaskList({
  isOpen,
  isCreateMode,
  selectedDate,
  selectedDateParts,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onClose,
  onStartCreate,
  onCancelCreate,
}: TaskListProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.aside
          key="task-panel"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="h-full rounded-3xl border  border-gray-600 p-4 backdrop-blur sm:p-5"
        >
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-(--text-foreground)">
                {isCreateMode ? "افزودن برنامه" : "برنامه های این روز"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {selectedDateParts.fullLabel}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-(--text-foreground)">
                {getRelativeLabel(selectedDate)}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center  justify-center rounded-full border border-white/10 bg-white/5 text-(--text-foreground)transition hover:bg-white/10"
                aria-label="بستن پنل"
              >
                ×
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <AnimatePresence initial={false}>
              {isCreateMode ? (
                <motion.div
                  key="task-form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4"
                >
                  <TaskForm onSubmit={onAddTask} onCancel={onCancelCreate} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <section className="rounded-3xl border border-black bg-[#cfc8ba] p-4"> 

              
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-black">
                    لیست تسک های روز
                  </h3>
                  <span className="inline-flex items-center rounded-full bg-violet-500/15 px-3 py-1 text-xs text-black">
                    {formatPersianNumber(tasks.length)} مورد
                  </span>
                </div>

                {!isCreateMode ? (
                  <Tooltip content="افزودن تسک جدید" position="top">
                    <button
                      type="button"
                      onClick={onStartCreate}
                      className="px-2 py-2 text-sm font-medium text-slate-950 transition"
                    >
                      <PlusIcon className="w-6 h-6 " />
                    </button>
                  </Tooltip>
                ) : null}
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
            </section>
            <section className="rounded-3xl border border-black bg-[#cfc8ba] p-4">
              dgdcxfgzsdfdgv
            </section>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

type TaskListItemProps = {
  task: PlannerTask;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

function TaskListItem({ task, onToggleTask, onDeleteTask }: TaskListItemProps) {
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
