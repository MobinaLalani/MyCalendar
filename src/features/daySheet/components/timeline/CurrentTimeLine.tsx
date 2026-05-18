import React from "react";
import { useCurrentTime } from "../../hooks/useCurrentTime";

const CurrentTimeLine: React.FC = () => {
  const { top } = useCurrentTime();

  return (
    <div
      className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
      style={{ top: `${top}px` }}
    />
  );
};

export default CurrentTimeLine;
