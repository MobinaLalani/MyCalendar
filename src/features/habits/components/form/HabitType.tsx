"use client";

import { useFormikContext } from "formik";
import AutoComplete from "@/src/components/ui/autoComplete/AutoComplete";
import { FormValuesType } from "../../types/habit.types";


export default function HabitType() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValuesType>();

  const cityOptions = [
    {
      label: "ورزشی",
      value: 1,
    },
    {
      label: "هنری",
      value: 2,
    },
    {
      label: "مطالعه",
      value: 3,
    },
  ];

  return (
    <AutoComplete
      onChange={handleChange}
      value={values}
      name="HabitType"
      innerClassName="border border-gray-700 rounded-2xl px-5 "
      label="نوع عادت"
      placeholder="نوع عادت را مشخص کنید"
      options={cityOptions}
    />
  );
}
