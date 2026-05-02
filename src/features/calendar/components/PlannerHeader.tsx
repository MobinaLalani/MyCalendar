type PlannerHeaderProps = {
  monthLabel: string;
  totalMonthTasks: number;
  completedTodayCount: number;
  formatNumber: (value: number) => string;
};

export default function PlannerHeader({
  monthLabel,
  totalMonthTasks,
  completedTodayCount,
  formatNumber,
}: PlannerHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-200">
          پلنر روزانه و ماهانه
        </span>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">تقویم برنامه ریزی فارسی</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            روزهای ماه شمسی را ببین، برای هر روز ساعت مشخص کن و تسک های شخصی ات را ثبت و
            پیگیری کن.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="ماه جاری" value={monthLabel} />
        <StatCard label="برنامه های این ماه" value={formatNumber(totalMonthTasks)} />
        <StatCard label="انجام شده های امروز" value={formatNumber(completedTodayCount)} />
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900/80 px-4 py-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
