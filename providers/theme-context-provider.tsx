"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  primary: string;
  setPrimary: (color: string) => void;
};

const DEFAULT_PRIMARY = "64.8% 0.2 131.684";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeColor = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContextProvider missing");
  }

  return context;
};

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [primary, setPrimaryState] = useState<string>(DEFAULT_PRIMARY);

  useEffect(() => {
    const saved = localStorage.getItem("theme-primary");
    if (saved) {
      setPrimaryState(saved);
      document.documentElement.style.setProperty(
        "--primary",
        `oklch(${saved})`,
      );
      document.documentElement.style.setProperty(
        "--sidebar-primary",
        `oklch(${saved})`,
      );
    } else {
      setPrimaryState(DEFAULT_PRIMARY);
      document.documentElement.style.setProperty(
        "--primary",
        `oklch(${DEFAULT_PRIMARY})`,
      );
      document.documentElement.style.setProperty(
        "--sidebar-primary",
        `oklch(${DEFAULT_PRIMARY})`,
      );
    }
  }, []);

  const setPrimary = (color: string) => {
    setPrimaryState(color);
    document.documentElement.style.setProperty("--primary", `oklch(${color})`);
    document.documentElement.style.setProperty(
      "--sidebar-primary",
      `oklch(${color})`,
    );
    localStorage.setItem("theme-primary", color);
  };

  return (
    <ThemeContext.Provider value={{ primary, setPrimary }}>
      {children}
    </ThemeContext.Provider>
  );
}
