"use client";

import React from "react";
import TimeGrid from "../timeline/TimeGrid";
import CurrentTimeLine from "../timeline/CurrentTimeLine";
import TimelineEvent from "../timeline/TimelineEvent";
import { useTimeline } from "../../hooks/useTimeline";
import { useDaySheet } from "../../hooks/useDaySheet";
import OverlapGroup from "../events/OverlapGroup";
import DaySummary from "../panels/DaySummary";
import ProductivityScore from "../panels/ProductivityScore";
import UpcomingPanel from "../panels/UpcomingPanel";
import { useDaySheetStore } from "../../store/useDaySheetStore";
import CreateEventModal from "../modals/CreateEventModal";
import EventDetailsModal from "../modals/EventDetailsModal";

const DaySheetLayout: React.FC = () => {
  const { items } = useDaySheet(); // حالا توی کلاینت درست اجرا میشه
  const { events } = useTimeline(items);
  const { openCreateModal, selectedEventId } = useDaySheetStore();

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <div className="flex-1 relative overflow-y-auto">
        <TimeGrid>
          <CurrentTimeLine />
          <OverlapGroup events={events} />
        </TimeGrid>
      </div>
      <div className="w-80 p-4 border-l border-gray-200 overflow-y-auto bg-white">
        <button
          onClick={openCreateModal}
          className="w-full py-2 mb-3 bg-blue-500 text-white rounded-md"
        >
          + Add Event
        </button>

        <DaySummary items={items} />
        <ProductivityScore items={items} />
        <UpcomingPanel items={items} />
      </div>

      <CreateEventModal />
      {selectedEventId && <EventDetailsModal />}
    </div>
  );
};

export default DaySheetLayout;
