"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/data";

export default function BrandLogo({ size = "default", className = "" }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme === "dark";

  const sizeClasses = {
    small: "h-12 sm:h-14",
    default: "h-16 sm:h-20",
    footer: "h-20 sm:h-24 md:h-28",
    large: "h-28 sm:h-32 md:h-40",
  };

  const heightClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`inline-flex items-center group select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}>
      <img
        src={isDark ? "/logo-white.png" : "/logo.png"}
        alt={siteConfig.name || "Beauty By Krimse"}
        className={`${heightClass} w-auto object-contain transition-opacity duration-300`}
      />
    </div>
  );
}
