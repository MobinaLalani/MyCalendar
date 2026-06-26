import React from "react";
import { useDaySheetStore } from "../../store/useDaySheetStore";

const EventDetailsModal: React.FC<{ title?: string }> = ({ title }) => {
  const { selectedEventId, closeCreateModal } = useDaySheetStore();

  if (!selectedEventId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      
      <div className="bg-white p-5 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-3">
          {title || "Event Details"}
        </h2>
        <p>More info about the event here...</p>
        <div className="flex justify-end mt-3">
          <button
            onClick={closeCreateModal}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
