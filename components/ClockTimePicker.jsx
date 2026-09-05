"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Clock, Check, ChevronDown, Sun, Moon, SlidersHorizontal, Sparkles } from "lucide-react";

// Categorized quick-pick times for bridal & event preparation
const MORNING_SLOTS = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
];

const AFTERNOON_SLOTS = [
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "06:00 PM",
];

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES = ["00", "15", "30", "45", "05", "10", "20", "25", "35", "40", "50", "55"];

function parseTimeString(str) {
  if (!str) return { hour: 7, minute: 0, period: "AM" };
  const match = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (match) {
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const p = match[3] ? match[3].toUpperCase() : h >= 12 ? "PM" : "AM";
    if (h > 12) h = h - 12;
    if (h === 0) h = 12;
    return { hour: h, minute: m, period: p };
  }
  return { hour: 7, minute: 0, period: "AM" };
}

function formatTimeString(hour, minute, period) {
  const h = String(hour).padStart(2, "0");
  const m = String(minute).padStart(2, "0");
  return `${h}:${m} ${period}`;
}

export default function ClockTimePicker({
  value = "",
  onChange,
  error,
  placeholder = "Select ready-by time",
  id = "ready-by-time",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const initial = useMemo(() => parseTimeString(value), [value]);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);
  const [viewTab, setViewTab] = useState("morning"); // "morning" | "afternoon" | "custom"

  // Sync state if external value changes
  useEffect(() => {
    if (value) {
      const parsed = parseTimeString(value);
      setHour(parsed.hour);
      setMinute(parsed.minute);
      setPeriod(parsed.period);
      if (parsed.period === "PM") {
        setViewTab("afternoon");
      } else {
        setViewTab("morning");
      }
    }
  }, [value]);

  const handleSlotPick = (slot) => {
    const parsed = parseTimeString(slot);
    setHour(parsed.hour);
    setMinute(parsed.minute);
    setPeriod(parsed.period);
    if (onChange) onChange(slot);
    setIsOpen(false);
  };

  const handleCustomHour = (h) => {
    setHour(h);
    const formatted = formatTimeString(h, minute, period);
    if (onChange) onChange(formatted);
  };

  const handleCustomMinute = (m) => {
    const mNum = parseInt(m, 10);
    setMinute(mNum);
    const formatted = formatTimeString(hour, mNum, period);
    if (onChange) onChange(formatted);
  };

  const handleCustomPeriod = (p) => {
    setPeriod(p);
    const formatted = formatTimeString(hour, minute, p);
    if (onChange) onChange(formatted);
  };

  const handleConfirm = () => {
    const formatted = formatTimeString(hour, minute, period);
    if (onChange) onChange(formatted);
    setIsOpen(false);
  };

  // Clock hand angles for visual analog clock preview
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;

  const displayTime = value || (hour ? formatTimeString(hour, minute, period) : "");

  return (
    <div ref={containerRef} className="w-full space-y-2">
      {/* Trigger Button / Display Bar */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`w-full form-input flex items-center justify-between text-left cursor-pointer transition-all duration-300 group ${
          isOpen ? "border-[var(--accent-rose)] ring-2 ring-[var(--accent-rose)]/20 shadow-md bg-[var(--bg-input-focus)]" : ""
        } ${error ? "border-red-500/80 ring-1 ring-red-500/30" : ""}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5 text-[var(--accent-rose)]" />
          </div>

          <div className="flex flex-col">
            <span
              className={`text-sm ${
                displayTime ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-muted)] font-light"
              }`}
            >
              {displayTime || placeholder}
            </span>
            <span className="text-[10px] text-[var(--text-faint)] font-light">
              {isOpen ? "Click to close time picker" : "Click to select or change ready-by time"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {displayTime && (
            <span className="text-[10.5px] uppercase tracking-wider text-[var(--accent-blush)] font-semibold px-2.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)]">
              {displayTime}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[var(--accent-rose)]" : ""
            }`}
          />
        </div>
      </button>

      {/* Fully Visible Inline Expandable Time Picker */}
      {isOpen && (
        <div className="w-full bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden animate-fade-in-up">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-radial from-[var(--accent-rose)]/15 via-[var(--accent-blush)]/5 to-transparent blur-3xl pointer-events-none" />

          {/* 1. Header: Live Mini Analog Clock + Selected Time Readout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[var(--bg-input)] rounded-2xl p-4 border border-[var(--border)] mb-5 relative z-10">
            <div className="flex items-center gap-3.5">
              {/* Mini Visual Analog Clock */}
              <div className="relative w-14 h-14 rounded-full bg-[#121212] border-2 border-[var(--border-accent)] flex items-center justify-center shadow-inner shrink-0">
                {/* 12, 3, 6, 9 Dot Marks */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-rose)]" />
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-rose)]" />
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--accent-rose)]" />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--accent-rose)]" />

                {/* Center Pivot */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--accent-rose)] z-20 shadow-md ring-1 ring-white/30" />

                {/* Hour Hand */}
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 h-4 -translate-x-1/2 -translate-y-full origin-bottom rounded-full bg-[var(--accent-blush)] z-10 transition-transform duration-300"
                  style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
                />

                {/* Minute Hand */}
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 h-5 -translate-x-1/2 -translate-y-full origin-bottom rounded-full bg-[var(--accent-rose)] z-10 transition-transform duration-300"
                  style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--accent-blush)] font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
                  <span>Selected Ready-By Time</span>
                </p>
                <p className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-normal tracking-wide">
                  {formatTimeString(hour, minute, period)}
                </p>
              </div>
            </div>

            {/* AM / PM Toggle Badge */}
            <div className="flex items-center p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-xs font-semibold self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleCustomPeriod("AM")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  period === "AM"
                    ? "bg-[var(--accent-rose)] text-white shadow-sm font-bold"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => handleCustomPeriod("PM")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  period === "PM"
                    ? "bg-[var(--accent-rose)] text-white shadow-sm font-bold"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                PM
              </button>
            </div>
          </div>

          {/* 2. Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 bg-[var(--bg-input)] p-1.5 rounded-2xl border border-[var(--border)] mb-5 text-xs font-medium relative z-10">
            <button
              type="button"
              onClick={() => {
                setViewTab("morning");
                setPeriod("AM");
              }}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewTab === "morning"
                  ? "bg-[var(--bg-card)] text-[var(--accent-blush)] border border-[var(--border)] shadow-sm font-semibold"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Morning Prep</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewTab("afternoon");
                setPeriod("PM");
              }}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewTab === "afternoon"
                  ? "bg-[var(--bg-card)] text-[var(--accent-blush)] border border-[var(--border)] shadow-sm font-semibold"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[var(--accent-rose)]" />
              <span>Afternoon / Eve</span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab("custom")}
              className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewTab === "custom"
                  ? "bg-[var(--bg-card)] text-[var(--accent-blush)] border border-[var(--border)] shadow-sm font-semibold"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Custom Time</span>
            </button>
          </div>

          {/* 3. Tab Content */}

          {/* Morning Slots (One-Click Convenience) */}
          {viewTab === "morning" && (
            <div className="space-y-2.5 relative z-10">
              <p className="text-xs text-[var(--text-muted)] font-light">
                Click any standard morning ceremony & getting-ready time:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {MORNING_SLOTS.map((slot) => {
                  const isCurrent = displayTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotPick(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? "bg-[var(--accent-rose)] text-white font-bold shadow-md scale-102 ring-2 ring-white/30"
                          : "bg-[var(--bg-input)] hover:bg-[var(--badge-bg)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)]"
                      }`}
                    >
                      <span>{slot}</span>
                      {isCurrent && <Check className="w-3 h-3 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Afternoon / Evening Slots (One-Click Convenience) */}
          {viewTab === "afternoon" && (
            <div className="space-y-2.5 relative z-10">
              <p className="text-xs text-[var(--text-muted)] font-light">
                Click any standard afternoon, cocktail & reception getting-ready time:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {AFTERNOON_SLOTS.map((slot) => {
                  const isCurrent = displayTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotPick(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? "bg-[var(--accent-rose)] text-white font-bold shadow-md scale-102 ring-2 ring-white/30"
                          : "bg-[var(--bg-input)] hover:bg-[var(--badge-bg)] text-[var(--text-secondary)] hover:text-white border border-[var(--border)]"
                      }`}
                    >
                      <span>{slot}</span>
                      {isCurrent && <Check className="w-3 h-3 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom Time Selector (Side-by-Side Hours & Minutes) */}
          {viewTab === "custom" && (
            <div className="space-y-3 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                {/* Hours Column */}
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--accent-blush)] font-medium mb-2 text-center">
                    Select Hour
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-2 bg-[var(--bg-input)] rounded-2xl border border-[var(--border)]">
                    {HOURS.map((h) => {
                      const isSelected = hour === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => handleCustomHour(h)}
                          className={`py-2 rounded-xl text-xs font-editorial font-medium transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-[var(--accent-rose)] text-white font-bold shadow-sm ring-1 ring-white/40"
                              : "hover:bg-[var(--badge-bg)] text-[var(--text-secondary)] hover:text-white"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Minutes Column */}
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--accent-blush)] font-medium mb-2 text-center">
                    Select Minute
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-2 bg-[var(--bg-input)] rounded-2xl border border-[var(--border)]">
                    {MINUTES.map((m) => {
                      const mNum = parseInt(m, 10);
                      const isSelected = minute === mNum;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleCustomMinute(m)}
                          className={`py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer text-center ${
                            isSelected
                              ? "bg-[var(--accent-rose)] text-white font-bold shadow-sm ring-1 ring-white/40"
                              : "hover:bg-[var(--badge-bg)] text-[var(--text-secondary)] hover:text-white"
                          }`}
                        >
                          :{m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Footer Actions */}
          <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3 relative z-10">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent-rose)] hover:bg-[var(--accent-blush)] text-white hover:text-[#0D0D0D] text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm Time</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
