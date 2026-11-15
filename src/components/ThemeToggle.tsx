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
      document.documentElement.classList.add(Theme.Dark);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
      document.documentElement.classList.remove(Theme.Dark);
      localStorage.setItem("theme", Theme.Light);
    } else {
      setTheme(Theme.Dark);
      document.documentElement.classList.add(Theme.Dark);
      localStorage.setItem("theme", Theme.Dark);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {theme === Theme.Dark ? "☀️" : "🌙"}
    </Button>
  );
}
