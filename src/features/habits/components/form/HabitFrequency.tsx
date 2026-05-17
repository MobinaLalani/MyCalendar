"use client";

import { useFormikContext } from "formik";
import AutoComplete from "@/src/components/ui/autoComplete/AutoComplete";
import { FormValuesType } from "../../types/habit.types";

export default function HabitFrequency() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValuesType>();

  const FrequencyOptions = [
    {
      label: "یک روز در هفته",
      value: 1,
    },
    {
      label: "دو روز در هفته",
      value: 2,
    },
    {
      label: "سه روز در هفته",
      value: 3,
    },
    {
      label: "چهار روز در هفته ",
      value: 4,
    },
    {
      label: "فقط روز های فرد",
      value: 5,
    },
    {
      label: "فقط روز های زوج",
      value: 6,
    },
  ];

  return (
    <AutoComplete
      onChange={handleChange}
      value={values}
      name="HabitFrequency"
      innerClassName="border border-gray-700 rounded-2xl px-5 "
      label="تعداد تکرار عادت"
      placeholder=" تعداد تکرار عادت را مشخص کنید"
      options={FrequencyOptions}
    />
  );
}
