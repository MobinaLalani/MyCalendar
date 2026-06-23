import { useState } from "react";
import type { PlannerTaskInput, TaskPriority, TaskRepeat } from "../types/calendar.types";
import TaskColorPicker from "@/src/components/ui/colorPicker/TaskColorPicker";
import { Input } from "@/src/components/ui/form/Input";
import { FormField } from "@/src/components/ui/form/FormField";
import { Textarea } from "@/src/components/ui/form/Textarea";
import Button from "@/src/components/ui/Button";
import CloseIcon from "../../../components/icons/closeRedIcon.svg";

type TaskFormProps = {
  onSubmit: (input: PlannerTaskInput) => boolean;
  onCancel?: () => void;
};

const initialFormState: PlannerTaskInput = {
  title: "",
  startTime: "",
  endTime: "",
  description: "",
  color: "#60A5FA",
  priority: "medium",
  repeat: "none",
};

const PRIORITY_OPTIONS: { value: TaskPriority; label: string; activeClass: string }[] = [
  { value: "high", label: "🔴 بالا", activeClass: "border-red-400 bg-red-400/10 text-red-600" },
  { value: "medium", label: "🟡 متوسط", activeClass: "border-amber-400 bg-amber-400/10 text-amber-700" },
  { value: "low", label: "🟢 پایین", activeClass: "border-emerald-400 bg-emerald-400/10 text-emerald-700" },
];

const REPEAT_OPTIONS: { value: TaskRepeat; label: string }[] = [
  { value: "none", label: "بدون تکرار" },
  { value: "daily", label: "روزانه (۹۰ روز)" },
  { value: "weekly", label: "هفتگی (۱۲ هفته)" },
  { value: "monthly", label: "ماهانه (۱۲ ماه)" },
];

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [formState, setFormState] = useState<PlannerTaskInput>(initialFormState);

  const handleChange =
    (key: keyof PlannerTaskInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormState((s) => ({ ...s, [key]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.title || !formState.startTime || !formState.endTime) return;
    const isAdded = onSubmit(formState);
    if (isAdded) setFormState(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="عنوان برنامه" htmlFor="task-title">
        <Input
          id="task-title"
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="مثلا جلسه کاری یا ورزش"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="ساعت شروع" htmlFor="task-start-time">
          <Input
            id="task-start-time"
            type="time"
            value={formState.startTime}
            onChange={handleChange("startTime")}
            step="60"
          />
        </FormField>
        <FormField label="ساعت پایان" htmlFor="task-end-time">
          <Input
            id="task-end-time"
            type="time"
            value={formState.endTime}
            onChange={handleChange("endTime")}
            step="60"
          />
        </FormField>
      </div>

      <FormField label="اولویت" htmlFor="task-priority">
        <div className="flex gap-2">
          {PRIORITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFormState((s) => ({ ...s, priority: opt.value }))}
              className={`flex-1 rounded-xl border py-2 text-xs font-medium transition ${
                formState.priority === opt.value
                  ? opt.activeClass
                  : "border-black/10 text-slate-500 hover:border-black/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FormField>

      <FormField label="تکرار" htmlFor="task-repeat">
        <select
          id="task-repeat"
          value={formState.repeat}
          onChange={handleChange("repeat")}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-black/30 focus:outline-none"
        >
          {REPEAT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="توضیحات" htmlFor="task-description">
        <Textarea
          id="task-description"
          rows={3}
          value={formState.description}
          onChange={handleChange("description")}
        />
      </FormField>

      <FormField label="رنگ برنامه" htmlFor="task-color">
        <TaskColorPicker
          value={formState.color}
          onChange={(color) => setFormState((s) => ({ ...s, color }))}
        />
      </FormField>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="flex-1 text-slate-950">
          ثبت برنامه
        </Button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black bg-[#eb7171] text-slate-200 transition hover:bg-white/10"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </form>
  );
}
