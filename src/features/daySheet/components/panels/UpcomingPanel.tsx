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
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        در پیش رو
      </h3>
      {upcoming.length === 0 ? (
        <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-white/10 px-4 py-5 text-center">
          <span className="text-xl">🎉</span>
          <span className="text-xs text-slate-500">
            هیچ موردی در پیش رو نیست
          </span>
        </div>
      ) : (
        <div className="space-y-2">
          {upcoming.map((i) => (
            <div
              key={i.id}
              className="group flex items-center gap-3 rounded-3xl border border-black bg-white/3 px-3 py-4 transition-all duration-200 hover:scale-[1.02]"
            >
              {/* <div
                className="h-7 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: i.color || "#6366f1" }}
              /> */}
              <span className="flex-1 truncate text-sm text-black transition-colors ">
                {i.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-(--muted-foreground)">
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
