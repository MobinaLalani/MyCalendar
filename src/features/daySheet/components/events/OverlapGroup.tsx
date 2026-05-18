import React from "react";
import { PositionedEvent } from "../../types/timeline.types";
import TimelineEvent from "../timeline/TimelineEvent";

interface OverlapGroupProps {
  events: PositionedEvent[];
}

const OverlapGroup: React.FC<OverlapGroupProps> = ({ events }) => {
  return (
    <>
      {events.map((event) => (
        <TimelineEvent key={event.id} event={event} />
      ))}
    </>
  );
};

export default OverlapGroup;
