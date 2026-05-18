import React from "react";
import { PositionedEvent } from "../../types/timeline.types";

interface TimelineEventProps {
  event: PositionedEvent;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
  return (
    <div
      className="absolute rounded-md p-1 text-white text-xs cursor-pointer overflow-hidden"
      style={{
        top: event.top,
        left: event.left,
        width: event.width,
        height: event.height,
        backgroundColor: event.color || "#4F46E5",
        zIndex: event.zIndex || 10,
      }}
      title={event.title}
    >
      <div className="font-bold truncate">{event.title}</div>
      <div className="truncate text-gray-200 text-[10px]">
        {new Date(event.startDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {new Date(event.endDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default TimelineEvent;
