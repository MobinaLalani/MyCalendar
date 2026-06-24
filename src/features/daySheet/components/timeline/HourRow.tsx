import React from "react";

interface HourRowProps {
  hour: string;
  height: number;
}

const HourRow: React.FC<HourRowProps> = ({ hour, height }) => {
  const isNoon = hour === "12:00";

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      {/* Main hour line */}
      <div
        className={`absolute left-0 right-0 border-b ${
          isNoon ? "border-white/20" : "border-white/6"
        }`}
      />

      {/* Hour label */}
      <span
        className={`absolute -left-14 top-0 -translate-y-1.5 select-none font-mono text-[11px] ${
          isNoon ? "font-semibold text-slate-300" : "text-slate-500"
        }`}
      >
        {hour}
      </span>

      {/* Half-hour dashed marker */}
      <div
        className="absolute left-0 right-0 border-b border-dashed border-white/4"
        style={{ top: "50%" }}
      />
    </div>
  );
};

export default HourRow;
