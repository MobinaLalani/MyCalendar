"use client";

import { useFocusTimer } from "../hooks/useFocusTimer";

const PHASE_CONFIG = {
  idle:  { color: "#f4d35e", label: "آماده" },
  focus: { color: "#f4d35e", label: "تمرکز" },
  break: { color: "#34d399", label: "استراحت" },
  done:  { color: "#a78bfa", label: "تمام شد" },
};

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function FocusTimer() {
  const { phase, timeLabel, progress, isRunning, completedPomodoros, start, pause, reset, startBreak } =
    useFocusTimer();

  const cfg = PHASE_CONFIG[phase];
  const strokeOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-(--text-foreground)">تایمر تمرکز</h3>
        {completedPomodoros > 0 && (
          <span className="text-xs text-amber-400">
            🍅 × {completedPomodoros}
          </span>
        )}
      </div>

      {/* Circular ring */}
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="7"
            />
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke={cfg.color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-(--text-foreground)">{timeLabel}</span>
            <span className="text-[11px] text-slate-400">{cfg.label}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {phase === "idle" && (
          <button
            onClick={start}
            className="flex-1 rounded-xl bg-amber-400 py-2 text-sm font-medium text-black transition hover:bg-amber-300"
          >
            شروع
          </button>
        )}

        {(phase === "focus" || (phase === "break" && isRunning)) && (
          <>
            <button
              onClick={pause}
              className="flex-1 rounded-xl bg-amber-400/20 py-2 text-sm font-medium text-amber-400 transition hover:bg-amber-400/30"
            >
              {isRunning ? "توقف" : "ادامه"}
            </button>
            <button
              onClick={reset}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/10"
            >
              ↺
            </button>
          </>
        )}

        {phase === "break" && !isRunning && (
          <>
            <button
              onClick={startBreak}
              className="flex-1 rounded-xl bg-emerald-500/20 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/30"
            >
              شروع استراحت
            </button>
            <button
              onClick={reset}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/10"
            >
              ↺
            </button>
          </>
        )}

        {phase === "done" && (
          <button
            onClick={reset}
            className="flex-1 rounded-xl bg-white/10 py-2 text-sm font-medium text-(--text-foreground) transition hover:bg-white/20"
          >
            مجدد
          </button>
        )}
      </div>
    </div>
  );
}
