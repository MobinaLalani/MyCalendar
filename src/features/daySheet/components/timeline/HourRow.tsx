// HourRow.tsx
import React from "react";

interface HourRowProps {
  hour: string;
  height: number;
}

const HourRow: React.FC<HourRowProps> = ({ hour, height }) => {
  return (
    <div
      className="relative w-full border-b border-white/5"
      style={{ height: `${height}px` }}
    >
      <span className="absolute -left-14 top-0 text-xs text-slate-500 select-none">
        {hour}
      </span>
      <div
        className="absolute left-0 right-0 border-b border-dashed border-white/5"
        style={{ top: "50%" }}
      />
    </div>
  );
};

export default HourRow;
