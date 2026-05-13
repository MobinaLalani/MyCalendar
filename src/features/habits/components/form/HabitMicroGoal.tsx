
"use client";

import TextField from "../../../../components/ui/textField/TextField";
import { useFormikContext } from "formik";
import { FormValuesType } from "../../types/habit.types";

export default function HabitMicroGoal() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValuesType>();

  return (
    <div>
      <TextField
        type="text"
        value={values.HabitName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='هدفت اینه حداقل چند روز انجامش بدی؟'
        name="HabitMicroGoal"
        label="هدف"
      />
    </div>
  );
}
