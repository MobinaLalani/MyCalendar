"use client";

import { useState } from "react";
import {
  Formik,
  Form,
  type FormikErrors,
  type FormikTouched,
  type FormikHelpers,
} from "formik";
import StepOne from "./components/form/HabitName";
import StepTwo from "./components/form/HabitType";
import StepNavigation from "./components/form/StepNavigation";
import HabitFrequency from "./components/form/HabitFrequency";
import { useFormStore } from "./store/Store";
import type { HabitItem } from "./store/Store";
import { FormValuesType } from "./types/habit.types";
import HabitStartDate from "./components/form/HabitStartDate";
import HabitCard from "./components/HabitCard";

export default function Index() {
  const [step, setStep] = useState<number>(1);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    saveHabit,
    updateHabit,
    resetForm,
    data,
    setField,
    setFields,
    habits,
    removeHabit,
  } = useFormStore();

  const totalSteps = 4;

  const stepLabels = ["نام عادت", "نوع", "تکرار", "تاریخ شروع"];

  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 1: return <StepOne />;
      case 2: return <StepTwo />;
      case 3: return <HabitFrequency />;
      case 4: return <HabitStartDate />;
      default: return null;
    }
  };

  const handleNext = async (
    validateForm: () => Promise<FormikErrors<FormValuesType>>,
    setTouched: (
      touched: FormikTouched<FormValuesType>,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<FormValuesType>>,
    values: FormValuesType,
  ) => {
    const errors = await validateForm();
    const currentFields: Record<number, Array<keyof FormValuesType>> = {
      1: ["HabitName"],
      2: ["HabitType"],
      3: ["HabitFrequency"],
      4: ["HabitStartDate"],
    };
    const fields = currentFields[step];
    const stepErrors = fields.some((field) => Boolean(errors[field]));
    const touchedFields = fields.reduce<FormikTouched<FormValuesType>>(
      (acc, field) => { acc[field] = true; return acc; },
      {},
    );
    await setTouched(touchedFields, true);
    if (!stepErrors) {
      fields.forEach((field) => setField(field, values[field]));
      if (step < totalSteps) setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (
    values: FormValuesType,
    helpers: FormikHelpers<FormValuesType>,
  ) => {
    if (editingId) {
      updateHabit(editingId, values);
      setEditingId(null);
    } else {
      saveHabit();
    }
    resetForm();
    setStep(1);
    helpers.setSubmitting(false);
  };

  const handleEdit = (habit: HabitItem) => {
    setFields({
      HabitName: habit.HabitName,
      HabitType: habit.HabitType,
      HabitFrequency: habit.HabitFrequency,
      HabitStartDate: habit.HabitStartDate,
    });
    setEditingId(habit.id);
    setStep(1);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
    setStep(1);
  };

  return (
    <div className="mx-4 flex min-h-[95vh] max-w-full flex-col gap-5 py-5 lg:mx-8">
      {/* Header */}
      <div className="relative border border-black  px-6 py-5 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="h-1.5 w-6 rounded-full bg-linear-to-r from-yellow-400 to-amber-400" />
              <span className="text-xs font-medium tracking-widest text-black uppercase">
                مدیریت عادت‌ها
              </span>
            </div>
            <h1 className="text-2xl font-bold text-black">عادت‌های من</h1>
          </div>
          <div className="border border-black rounded-full bg-(--yellow) px-4 py-2">
            <span className="text-sm font-bold text-black">
              {habits.length} عادت
            </span>
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-5 lg:flex-row">
        {/* Form Panel */}
        <div className="lg:w-104 overflow-hidden rounded-3xl border border-black ">
          {/* Form Header */}
          <div className="border border-black bg-(--yellow) m-3 rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
                <h2 className="font-bold text-black">
                  {editingId ? "ویرایش عادت" : "ثبت عادت جدید"}
                </h2>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-black hover:text-black border border-black rounded-3xl px-2 py-1 transition-all duration-200"
                >
                  انصراف
                </button>
              )}
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex gap-1.5 px-5 pt-4 pb-1">
            {stepLabels.map((label, i) => {
              const isVisited = i < step - 1;
              const isCurrent = i === step - 1;
              return (
                <div
                  key={i}
                  onClick={() => isVisited && setStep(i + 1)}
                  className={`flex flex-1 flex-col items-center gap-1 ${isVisited ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className={`h-1 w-full rounded-full transition-all duration-300 ${
                      i <= step - 1 ? "bg-(--yellow)" : "bg-white/10"
                    }`}
                  />
                  <span
                    className={`text-[15px] font-semibold transition-colors ${
                      isCurrent ? "text-black" : isVisited ? "text-black/70 hover:text-black" : "text-slate-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <Formik<FormValuesType>
            initialValues={data}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ validateForm, setTouched, values, submitForm }) => (
              <Form className="p-5">
                <div className="min-h-[160px] rounded-2xl border border-black/15 bg-white/3 p-4">
                  {renderStep(step)}
                </div>
                <StepNavigation
                  currentStep={step}
                  totalSteps={totalSteps}
                  onPrev={handlePrev}
                  onNext={async () => {
                    if (step === totalSteps) {
                      await submitForm();
                    } else {
                      await handleNext(validateForm, setTouched, values);
                    }
                  }}
                  isLastStep={step === totalSteps}
                />
              </Form>
            )}
          </Formik>
        </div>

        {/* Habits List Panel */}
        <div className="flex-1 overflow-hidden rounded-3xl border border-black ">
          <div className="border border-black bg-(--yellow) m-3 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-black" />
              <h2 className="font-bold text-black">لیست عادت‌ها</h2>
            </div>
          </div>

          <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-4 space-y-3">
            {habits.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 px-4 py-16 text-center">
                <span className="text-4xl">📋</span>
                <span className="text-sm text-slate-400">
                  هنوز عادتی ثبت نشده
                </span>
                <span className="text-xs text-slate-600">
                  با فرم سمت چپ اولین عادتت رو ثبت کن
                </span>
              </div>
            ) : (
              habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  isEditing={editingId === habit.id}
                  onEdit={handleEdit}
                  onDelete={removeHabit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
