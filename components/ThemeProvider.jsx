"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved preference or system preference
    const saved = localStorage.getItem("bbk-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bbk-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    // Enable smooth transition
    document.documentElement.classList.add("theme-transitioning");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 350);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
