"use client";

import { Sparkles } from "lucide-react";

export default function BrandLogo({ size = "default", className = "" }) {
  const isFooter = size === "footer";
  const isLarge = size === "large";

  return (
    <div className={`inline-flex flex-col group select-none transition-transform duration-300 hover:scale-[1.01] ${className}`}>
      {/* Primary Logotype Container */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Subtle Luxury Sparkle Icon */}
        <span className="text-[var(--accent-rose)] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110 shrink-0">
          <Sparkles className={isFooter || isLarge ? "w-4 h-4 sm:w-5 sm:h-5" : "w-3 h-3 sm:w-3.5 sm:h-3.5"} />
        </span>

        {/* Main Wordmark */}
        <span
          className={`font-editorial font-light tracking-[0.18em] sm:tracking-[0.22em] uppercase transition-colors duration-300 leading-none whitespace-nowrap ${
            isFooter
              ? "text-xl sm:text-2xl md:text-3xl text-[var(--text-primary)] group-hover:text-[var(--accent-blush)]"
              : isLarge
              ? "text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent-blush)]"
              : "text-base sm:text-lg lg:text-base xl:text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-blush)]"
          }`}
          style={{
            textShadow: "0 0 15px var(--shadow-accent)",
          }}
        >
          BEAUTYBYKRIMSE
        </span>
      </div>

      {/* Subtitle / Location Tagline with High-Contrast Themed Styling */}
      <div className="flex items-center gap-1.5 mt-1 pl-4 sm:pl-5">
        <span
          className={`font-sans uppercase tracking-[0.28em] sm:tracking-[0.32em] font-medium leading-none transition-colors whitespace-nowrap ${
            isFooter
              ? "text-[8.5px] sm:text-[9.5px] text-[var(--accent-rose)]"
              : "text-[7px] sm:text-[7.5px] lg:text-[6.5px] xl:text-[8px] text-[var(--accent-rose)]"
          }`}
        >
          Luxury Bridal Artistry
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--accent-gold)] opacity-70 shrink-0 hidden sm:inline" />
        <span
          className={`font-sans uppercase tracking-[0.24em] font-light leading-none text-[var(--text-faint)] hidden sm:inline whitespace-nowrap ${
            isFooter ? "text-[7.5px]" : "text-[6.5px] xl:text-[7.5px]"
          }`}
        >
          Toronto
        </span>
      </div>
    </div>
  );
}
