"use client";

  import { useEffect, useMemo, useState } from "react";
  import { loadHabit } from "../services/habit.storage";
  import {
    addDays,
    buildCalendarMonth,
    getNextPersianMonth,
    getPersianDateParts,
    getPreviousPersianMonth,
    parseDateKey,
    toDateKey,
  } from "../../../utils/jalali";
  import { HabitType } from "../types/habit.type";
  
  import { getHabitsForDate } from "../utils/habits";

  function useHabit() {
      const today = useMemo(() => new Date(), []);
      const todayKey = useMemo(() => toDateKey(today), [today]);
      const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
      const [habits, setHabits] = useState<HabitType[]>(loadHabit());  
      const [visibleMonthAnchor, setVisibleMonthAnchor] = useState(today);

      const goToToday = () => {
        setVisibleMonthAnchor(today);
        setSelectedDateKey(todayKey);
      };
      
      const selectedHabit = useMemo(
        () => getHabitsForDate(habits, selectedDateKey),
        [selectedDateKey, habits],
      );
      
       const selectedDate = useMemo(
        () => parseDateKey(selectedDateKey),
        [selectedDateKey],
      );
    return {
      habits,
      setHabits,
      selectedHabit,
      selectedDate,
      selectDate: setSelectedDateKey,
      goToToday,
    };
  }

  export default useHabit;
