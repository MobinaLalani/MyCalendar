"use client";
import { useEffect, useState } from "react";
import { convertMinutesToPixels } from "../utils/event-position";

export function useCurrentTime() {
  const [top, setTop] = useState(0);

  useEffect(() => {
    function update() {
      const now = new Date();

      const minutes = now.getHours() * 60 + now.getMinutes();

      setTop(convertMinutesToPixels(minutes));
    }

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    top,
  };
}
