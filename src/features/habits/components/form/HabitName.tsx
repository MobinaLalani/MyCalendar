"use client";

import TextField from "../../../../components/ui/textField/TextField";
import { useFormikContext } from "formik";
import { FormValuesType } from "../../types/habit.types";

export default function HabitName() {
    const { values, handleChange, handleBlur, errors, touched } =
      useFormikContext<FormValuesType>();

  return (
    <div>
      <TextField
        type="text"
        value={values.HabitName}
        onChange={handleChange}
        onBlur={handleBlur}
        name="HabitName"
        label="نام عادت"
      />

    </div>
  );
}
