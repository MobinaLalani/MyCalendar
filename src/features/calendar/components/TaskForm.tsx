import { useState } from "react";
import type { PlannerTaskInput } from "../types/calendar.types";
import { Input  } from "@/src/components/ui/form/Input";
import { FormField } from "@/src/components/ui/form/FormField";
import { Textarea } from "@/src/components/ui/form/Textarea";
import Button from "@/src/components/ui/Button";
import CloseIcon from '../../../components/icons/closeRedIcon.svg';
type TaskFormProps = {
  onSubmit: (input: PlannerTaskInput) => boolean;
  onCancel?: () => void;
};

const initialFormState: PlannerTaskInput = {
  title: "",
  time: "",
  description: "",
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

    const isAdded = onSubmit(formState);

    if (isAdded) {
      setFormState(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <FormField label="عنوان برنامه" htmlFor="task-title">
        <Input
          id="task-title"
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="مثلا جلسه کاری یا ورزش"
        />
      </FormField>

      <FormField label="ساعت" htmlFor="task-time">
        <Input
          id="task-time"
          type="time"
          value={formState.time}
          onChange={handleChange("time")}
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

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* دکمه بزرگ */}
        <Button
          type="submit"
          className="flex-1  text-slate-950 "
        >
          ثبت برنامه
        </Button>

        {/* دکمه کوچک قرمز */}
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl border border-black bg-[#eb7171] text-slate-200 transition hover:bg-white/10"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
};

