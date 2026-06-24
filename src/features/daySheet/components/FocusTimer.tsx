"use client";

import { useFocusTimer } from "../hooks/useFocusTimer";

const PHASE_CONFIG = {
  idle: {
    color: "#818cf8",
    trackColor: "rgba(99,102,241,0.12)",
    label: "آماده برای تمرکز",
    gradientFrom: "from-indigo-500/10",
    accentClass: "from-indigo-400 to-violet-400",
  },
  focus: {
    color: "#f4d35e",
    trackColor: "rgba(244,211,94,0.12)",
    label: "در حال تمرکز",
    gradientFrom: "from-amber-500/10",
    accentClass: "from-amber-400 to-yellow-400",
  },
  break: {
    color: "#34d399",
    trackColor: "rgba(52,211,153,0.12)",
    label: "زمان استراحت",
    gradientFrom: "from-emerald-500/10",
    accentClass: "from-emerald-400 to-teal-400",
  },
  done: {
    color: "#a78bfa",
    trackColor: "rgba(167,139,250,0.12)",
    label: "آفرین! تمام شد 🎉",
    gradientFrom: "from-violet-500/10",
    accentClass: "from-violet-400 to-purple-400",
  },
};

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function FocusTimer() {
  const {
    phase,
    timeLabel,
    progress,
    isRunning,
    completedPomodoros,
    start,
    pause,
    reset,
    startBreak,
  } = useFocusTimer();

  const cfg = PHASE_CONFIG[phase];
  const strokeOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div
      className={`overflow-hidden rounded-3xl  border border-black shadow-xl backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="border-b border-white/8 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-4 rounded-full bg-linear-to-r ${cfg.accentClass}`} />
            <h3 className="text-sm font-semibold text-black">تایمر تمرکز</h3>
          </div>
          {completedPomodoros > 0 && (
            <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/15 px-2.5 py-1">
              <span className="text-[11px] font-medium text-amber-300">
                🍅 {completedPomodoros} پومودورو
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        {/* Circular progress */}
        <div className="mb-5 flex justify-center">
          <div className="relative">
            <svg width="148" height="148" viewBox="0 0 110 110" className="-rotate-90">
              <defs>
                <filter id="timer-glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="55"
                cy="55"
                r={RADIUS}
                fill="none"
                stroke={cfg.trackColor}
                strokeWidth="7"
              />
              <circle
                cx="55"
                cy="55"
                r={RADIUS}
                fill="none"
                stroke={cfg.color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
                filter="url(#timer-glow)"
                style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.5s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-2xl font-bold tracking-tight text-black">
                {timeLabel}
              </span>
              <span className="mt-0.5 text-[11px] font-medium" style={{ color: cfg.color }}>
                {cfg.label}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {phase === "idle" && (
            <button
              onClick={start}
              className="flex-1 rounded-xl bg-(--sidebar) py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:bg-indigo-400"
            >
              ▶ شروع تمرکز
            </button>
          )}

          {(phase === "focus" || (phase === "break" && isRunning)) && (
            <>
              <button
                onClick={pause}
                className="flex-1 rounded-xl border border-amber-400/20 bg-amber-500/15 py-2.5 text-sm font-semibold text-amber-300 transition-all duration-200 hover:bg-amber-500/25"
              >
                {isRunning ? "⏸ توقف" : "▶ ادامه"}
              </button>
              <button
                onClick={reset}
                className="rounded-xl border border-white/10 bg-white/6 px-4 py-2.5 text-sm text-slate-400 transition-all duration-200 hover:bg-white/12"
              >
                ↺
              </button>
            </>
          )}

          {phase === "break" && !isRunning && (
            <>
              <button
                onClick={startBreak}
                className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-500/15 py-2.5 text-sm font-semibold text-emerald-300 transition-all duration-200 hover:bg-emerald-500/25"
              >
                ▶ شروع استراحت
              </button>
              <button
                onClick={reset}
                className="rounded-xl border border-white/10 bg-white/6 px-4 py-2.5 text-sm text-slate-400 transition-all duration-200 hover:bg-white/12"
              >
                ↺
              </button>
            </>
          )}

          {phase === "done" && (
            <button
              onClick={reset}
              className="flex-1 rounded-xl border border-violet-500/20 bg-violet-500/15 py-2.5 text-sm font-semibold text-violet-300 transition-all duration-200 hover:bg-violet-500/25"
            >
              🔄 شروع مجدد
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
