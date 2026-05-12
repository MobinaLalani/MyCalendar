"use client";

type Props = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLastStep?: boolean;
};

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLastStep,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="px-4 py-2 bg-(--yellow-color) rounded-2xl text-(--text-foreground) disabled:opacity-50 border border-gray-700"
      >
        قبلی
      </button>

      <span>
        مرحله {currentStep} / {totalSteps}
      </span>

      <button
        type="button"
        onClick={onNext}
        className="px-4 py-1 bg-(--yellow-color) text-(--text-foreground) rounded-2xl border border-gray-700"
      >
        {isLastStep ? "ثبت اطلاعات" : "بعدی"}
      </button>
    </div>
  );
}
