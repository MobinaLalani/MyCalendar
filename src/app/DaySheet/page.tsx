import React from "react";
import DaySheetPage from "@/src/features/daySheet";

type DaySheetRouteProps = {
  searchParams: Promise<{
    date?: string | string[] | undefined;
  }>;
};

export default async function Page({ searchParams }: DaySheetRouteProps) {
  const query = await searchParams;
  const selectedDateKey = Array.isArray(query.date) ? query.date[0] : query.date;

  return <DaySheetPage selectedDateKey={selectedDateKey} />;
}
