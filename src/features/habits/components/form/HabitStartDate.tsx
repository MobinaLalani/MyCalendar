"use client";

import { useFormikContext } from "formik";
import MultiDatePicker from "@/src/components/ui/datepicker/MultiDatePicker";
import { FormValuesType } from "../../types/habit.types";

export default function HabitStartDate() {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    useFormikContext<FormValuesType>();

  return (
    <MultiDatePicker
      label="از کی شروع کنیم؟"
      name="HabitStartDate"
      placeholder="تاریخ شروع عادت رو ثبت کن"
      value={values.HabitStartDate}
      setFieldValue={setFieldValue}
      // error={touched.registrationDate && errors.registrationDate}
    />
    // <AutoComplete
    //   onChange={handleChange}
    //   value={values}
    //   name="HabitType"
    //   innerClassName="border border-gray-700 rounded-2xl px-5 "
    //   label="زمان شروع "
    //   placeholder="از کی میخوای شروع کنی؟"
    //   options={cityOptions}
    // />
  );
}
