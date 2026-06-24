import React from "react";

interface TaskData {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
}

interface TaskProps {
  task: TaskData;
  startHour: number;
  hourHeightPx: number;
  pixelsPerMinute: number;
  left?: number;
  width?: number;
}

const timeToMinutes = (timeStr: string): number => {
  if (!timeStr || !timeStr.includes(":")) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;
  return hours * 60 + minutes;
};

const Task: React.FC<TaskProps> = ({
  task,
  startHour,
  pixelsPerMinute,
  left = 0,
  width = 100,
}) => {
  const { title, startTime, endTime, color } = task;
  const accent = color || "#6366f1";

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const gridStartMinutes = startHour * 60;
  const topPosition = (startMinutes - gridStartMinutes) * pixelsPerMinute;
  const taskHeight = Math.max((endMinutes - startMinutes) * pixelsPerMinute, 22);

  return (
    <div
      className="absolute cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
      style={{
        top: `${topPosition}px`,
        left: `calc(${left}% + 2px)`,
        width: `calc(${width}% - 6px)`,
        height: `${taskHeight}px`,
        backgroundColor: `${accent}18`,
        borderLeft: `3px solid ${accent}`,
        borderTop: `1px solid ${accent}30`,
        zIndex: 10,
      }}
    >
      {/* Subtle inner glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${accent}10, transparent)`,
        }}
      />

      <div className="relative px-2.5 py-1.5">
        <div className="truncate text-xs font-semibold leading-tight text-white">
          {title}
        </div>
        {taskHeight > 28 && (
          <div
            className="mt-0.5 font-mono text-[10px]"
            style={{ color: `${accent}cc` }}
          >
            {startTime} – {endTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
