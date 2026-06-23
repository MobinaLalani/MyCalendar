"use client";

import { useState, useEffect, useCallback } from "react";

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export type TimerPhase = "idle" | "focus" | "break" | "done";

export function useFocusTimer() {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (phase === "focus") {
            setCompletedPomodoros((n) => n + 1);
            setPhase("break");
            return BREAK_DURATION;
          } else {
            setPhase("done");
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, phase]);

  const start = useCallback(() => {
    setPhase("focus");
    setSecondsLeft(FOCUS_DURATION);
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => setIsRunning((p) => !p), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setPhase("idle");
    setSecondsLeft(FOCUS_DURATION);
  }, []);

  const startBreak = useCallback(() => {
    setPhase("break");
    setSecondsLeft(BREAK_DURATION);
    setIsRunning(true);
  }, []);

  const totalDuration = phase === "break" ? BREAK_DURATION : FOCUS_DURATION;
  const elapsed = totalDuration - secondsLeft;
  const progress = phase === "idle" || phase === "done" ? 0 : (elapsed / totalDuration) * 100;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return { phase, timeLabel, progress, isRunning, completedPomodoros, start, pause, reset, startBreak };
}
