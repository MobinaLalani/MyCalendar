"use client";

import React from "react";
import TimeGrid from "../timeline/TimeGrid";


const DaySheetLayout: React.FC = () => {

  return (
    <div className="flex max-w-full h-[95vh]  mx-16">
      <div className="flex-1 relative ">
        <TimeGrid>
        
        </TimeGrid>
      </div>

    </div>
  );
};

export default DaySheetLayout;
