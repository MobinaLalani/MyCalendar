import React from "react";
import { ScheduleItem } from "../../types/day-sheet.types";

interface UpcomingPanelProps {
  items: ScheduleItem[];
}

const UpcomingPanel: React.FC<UpcomingPanelProps> = ({ items }) => {
  const now = new Date();

  const upcoming = items
    .filter((i) => new Date(i.startDate) > now)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div>
      <h3 className="text-sm font-semibold text-(--text-foreground) mb-3">آیتم‌های بعدی</h3>
      {upcoming.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-4 text-sm text-slate-400 text-center">
          آیتمی در راه نیست
        </div>
      ) : (
        <div className="space-y-2">
          {upcoming.map((i) => (
            <div
              key={i.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <span className="text-sm text-(--text-foreground) truncate">{i.title}</span>
              <span className="text-xs text-slate-400 shrink-0 ml-2">
                {new Date(i.startDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingPanel;
