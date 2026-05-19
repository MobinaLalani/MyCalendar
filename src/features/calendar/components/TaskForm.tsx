import { useState } from "react";
import type { PlannerTaskInput } from "../types/calendar.types";
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
};

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [formState, setFormState] =
    useState<PlannerTaskInput>(initialFormState);

  const handleChange =
    (key: keyof PlannerTaskInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((currentState) => ({
        ...currentState,
        [key]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.title || !formState.startTime || !formState.endTime) {
      return;
    }
    console.log("formState", formState);
    const isAdded = onSubmit(formState);
    console.log('isAdded' ,isAdded)
    if (isAdded) {
      setFormState(initialFormState);
    }
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

      {/* START TIME */}
      <FormField label="ساعت شروع" htmlFor="task-start-time">
        <Input
          id="task-start-time"
          type="time"
          value={formState.startTime}
          onChange={handleChange("startTime")}
          step="60"
        />
      </FormField>

      {/* END TIME */}
      <FormField label="ساعت پایان" htmlFor="task-end-time">
        <Input
          id="task-end-time"
          type="time"
          value={formState.endTime}
          onChange={handleChange("endTime")}
          step="60"
        />
      </FormField>

      <FormField label="توضیحات" htmlFor="task-description">
        <Textarea
          id="task-description"
          rows={4}
          value={formState.description}
          onChange={handleChange("description")}
        />
      </FormField>
      <FormField label="رنگ برنامه" htmlFor="task-color">
        <TaskColorPicker
          value={formState.color}
          onChange={(color) =>
            setFormState((currentState) => ({
              ...currentState,
              color,
            }))
          }
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
