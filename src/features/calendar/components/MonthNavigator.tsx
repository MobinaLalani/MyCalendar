type MonthNavigatorProps = {
  monthLabel: string;
  onPrevious: () => void;
  onToday: () => void;
  onNext: () => void;
};

export default function MonthNavigator({
  monthLabel,
  onPrevious,
  onToday,
  onNext,
}: MonthNavigatorProps) {
  return (
    <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-(--text-foreground)">
      <div>
        <h2 className="text-xl font-semibold">{monthLabel}</h2>
        <p className="mt-1 text-sm ">
          برای انتخاب روز روی هر خانه کلیک کن و برنامه ی همان روز را ثبت کن.
        </p>
      </div>

      <div className="flex gap-3 ">
        <button
          type="button"
          onClick={onPrevious}
          className="rounded-2xl border border-(--text-foreground) bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          ماه قبل
        </button>
        <button
          type="button"
          onClick={onToday}
          className="rounded-2xl border border-(--text-foreground) bg-cyan-400/10 px-4 py-2 text-sm  transition hover:bg-cyan-400/20"
        >
          امروز
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-2xl border border-(--text-foreground) bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          ماه بعد
        </button>
      </div>
    </div>
  );
}
