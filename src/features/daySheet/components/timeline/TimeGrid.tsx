// TimeGrid.tsx
import React from "react";
import Task from "./Task";
import HourRow from "./HourRow";
import type { PlannerTask } from "@/src/features/calendar/types/calendar.types";

interface TimeGridProps {
  tasks: PlannerTask[];
  totalHoursToShow?: number;
  hourHeightPx?: number;
  startHour?: number;
}

interface TaskData {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
}

interface PositionedTask extends TaskData {
  left: number;
  width: number;
}

const generateHours = (start = 8, end = 20): string[] => {
  const hours = [];

  for (let i = start; i < end; i++) {
    hours.push(`${String(i).padStart(2, "0")}:00`);
  }

  return hours;
};

const timeToMinutes = (time: string): number => {
  if (!time || !time.includes(":")) {
    return 0;
  }

  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }

  return hours * 60 + minutes;
};

const addMinutesToTime = (time: string, minutesToAdd: number): string => {
  const totalMinutes = timeToMinutes(time) + minutesToAdd;
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const isValidPlannerTaskTime = (
  task: PlannerTask,
): task is PlannerTask & { startTime: string } => {
  return typeof task.startTime === "string" && task.startTime.includes(":");
};

const mapPlannerTaskToTimelineTask = (task: PlannerTask): TaskData => {
  return {
    id: task.id,
    title: task.title,
    startTime: task.startTime,
    endTime: task.endTime || addMinutesToTime(task.startTime, 60),
    color: task.color || (task.completed ? "#10b981" : "#3498db"),
  };
};

const isOverlapping = (a: TaskData, b: TaskData) => {
  return (
    timeToMinutes(a.startTime) < timeToMinutes(b.endTime) &&
    timeToMinutes(a.endTime) > timeToMinutes(b.startTime)
  );
};

const calculateTaskPositions = (tasks: TaskData[]): PositionedTask[] => {
  const sortedTasks = [...tasks].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );

  const result: PositionedTask[] = [];

  const groups: TaskData[][] = [];

  sortedTasks.forEach((task) => {
    let addedToGroup = false;

    for (const group of groups) {
      const hasOverlap = group.some((groupTask) =>
        isOverlapping(task, groupTask),
      );

      if (hasOverlap) {
        group.push(task);
        addedToGroup = true;
        break;
      }
    }

    if (!addedToGroup) {
      groups.push([task]);
    }
  });

  groups.forEach((group) => {
    const width = 100 / group.length;

    group.forEach((task, index) => {
      result.push({
        ...task,
        width,
        left: index * width,
      });
    });
  });

  return result;
};

const TimeGrid: React.FC<TimeGridProps> = ({
  tasks,
  totalHoursToShow = 24,
  hourHeightPx = 60,
  startHour = 0,
}) => {
  const hours = generateHours(startHour, startHour + totalHoursToShow);
  const totalGridHeight = totalHoursToShow * hourHeightPx;

  const pixelsPerMinute = hourHeightPx / 60;
  const timelineTasks = tasks
    .filter(isValidPlannerTaskTime)
    .map(mapPlannerTaskToTimelineTask);

  const positionedTasks = calculateTaskPositions(timelineTasks);

  return (
    <div
      className="relative w-full border-l border-white/8 bg-transparent"
      style={{
        height: `${totalGridHeight}px`,
      }}
    >
      {/* Hour Rows */}
      {hours.map((hour) => (
        <HourRow key={hour} hour={hour} height={hourHeightPx} />
      ))}

      {/* Tasks */}
      {positionedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          startHour={startHour}
          hourHeightPx={hourHeightPx}
          pixelsPerMinute={pixelsPerMinute}
          left={task.left}
          width={task.width}
        />
      ))}
    </div>
  );
};

export default TimeGrid;
