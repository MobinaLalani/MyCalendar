import React from "react";
import DaySheetLayout from "./components/layout/DaySheetLayout";

type DaySheetPageProps = {
  selectedDateKey?: string;
};

const DaySheetPage: React.FC<DaySheetPageProps> = ({ selectedDateKey }) => {
  
  return <DaySheetLayout selectedDateKey={selectedDateKey} />;
};

export default DaySheetPage;
