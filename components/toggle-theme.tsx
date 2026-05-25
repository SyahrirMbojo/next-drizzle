"use client";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, CircleHalfIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function ToggleThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <SunIcon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={cycleTheme}
      title={`Current: ${theme === "system" ? "Auto (System)" : theme === "dark" ? "Dark" : "Light"}`}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : resolvedTheme === "light" ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <CircleHalfIcon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}