"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("taskflow-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;

    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("taskflow-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("taskflow-theme", "light");
    }

    setIsDark(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-xl border border-slate-300 bg-white p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}