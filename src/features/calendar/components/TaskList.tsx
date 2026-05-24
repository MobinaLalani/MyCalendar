import { AnimatePresence, motion } from "framer-motion";
import type { PersianDateParts, PlannerTask } from "../types/calendar.types";
import TaskListItem from "./TaskListItem";
import HabitListItem from "./HabitListItem";
import Tooltip from "@/src/components/ui/Tooltip";
import { getRelativeLabel } from "../../../utils/jalali";
import PlusIcon from "../../..//components/icons/addIcon.svg";
import { formatPersianNumber } from "../utils/tasks";
import TaskForm from "./TaskForm";
import { HabitType } from "../../habits/types/habit.type";

type TaskListProps = {
  isOpen: boolean;
  isCreateMode: boolean;
  isDetailsOpen: boolean;
  selectedDate: Date;
  selectedDateParts: PersianDateParts;
  habits: HabitType[];
  tasks: PlannerTask[];
  onAddTask: (input: {
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    color:string;
  }) => boolean;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onClose: () => void;
  onStartCreate: () => void;
  onCancelCreate: () => void;
  onToggleDetails: () => void;
};

export default function TaskList({
  isOpen,
  isCreateMode,
  isDetailsOpen,
  selectedDate,
  selectedDateParts,
  habits,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onClose,
  onStartCreate,
  onCancelCreate,
  onToggleDetails,
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
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      // onClick={onToggleDetails}
                      className={`rounded-2xl border px-3 py-2 text-xs font-medium transition ${
                        isDetailsOpen
                          ? "border-violet-500/50 bg-violet-500/15 text-black"
                          : "border-black/20 bg-white/60 text-black hover:bg-white"
                      }`}
                    >
                      {isDetailsOpen ? "بستن جزئیات" : " جزئیات"}
                    </button>

                    <Tooltip content="افزودن تسک جدید" position="top">
                      <button
                        type="button"
                        onClick={onStartCreate}
                        className="px-2 py-2 text-sm font-medium text-slate-950 transition"
                      >
                        <PlusIcon className="h-6 w-6" />
                      </button>
                    </Tooltip>
                  </div>
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
              {habits.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-500">
                  هنوز عادتی برای این روز پیدا نشد.
                </div>
              ) : null}

              {habits.map((habit) => (
                <HabitListItem
                  key={habit.id}
                  habit={habit}
                  onToggleTask={onToggleTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </section>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
