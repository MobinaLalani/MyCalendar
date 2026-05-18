import React from "react";

interface HourRowProps {
  hour: string;
}

const HourRow: React.FC<HourRowProps> = ({ hour }) => {
  return (
    <div
      className="relative h-18 border-b border-gray-200"
      style={{ minHeight: "72px" }}
    >
      <span className="absolute -left-12 top-1 text-gray-400 text-sm">
        {hour}
      </span>
    </div>
  );
};

export default HourRow;
