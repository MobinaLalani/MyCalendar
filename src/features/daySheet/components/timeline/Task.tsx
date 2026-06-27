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
      className="absolute cursor-pointer overflow-hidden rounded-xl border border-black transition-opacity duration-200 hover:opacity-80"
      style={{
        top: `${topPosition}px`,
        left: `calc(${left}% + 2px)`,
        width: `calc(${width}% - 6px)`,
        height: `${taskHeight}px`,
        backgroundColor: `${accent}22`,
        borderLeft: `3px solid ${accent}`,
        zIndex: 10,
      }}
    >
      <div className="px-2.5 py-1.5">
        <div className="truncate text-xs font-semibold leading-tight text-black">
          {title}
        </div>
        {taskHeight > 28 && (
          <div className="mt-0.5 font-mono text-[10px] text-slate-400">
            {startTime} – {endTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
