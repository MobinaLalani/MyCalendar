import React from "react";
import { useDaySheetStore } from "../../store/useDaySheetStore";

const CreateEventModal: React.FC = () => {
  const { isCreateModalOpen, closeCreateModal } = useDaySheetStore();

  if (!isCreateModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-3">Create Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          className="w-full p-2 border rounded mb-3"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeCreateModal}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Cancel
          </button>
          <button className="px-3 py-1 rounded bg-blue-500 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
