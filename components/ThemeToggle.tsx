"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === Theme.Dark) {
      setTheme(Theme.Dark);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme(Theme.Light);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme(Theme.Dark);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}
