"use client";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  CircleHalfIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useThemeColor } from "@/providers/theme-context-provider";

const COLOR_OPTIONS = [
  { id: "lime", name: "Lime", value: "64.8% 0.2 131.684" },
  { id: "blue", name: "Blue", value: "0.55 0.22 285" },
  { id: "green", name: "Green", value: "0.40 0.15 150" },
  { id: "orange", name: "Orange", value: "0.55 0.18 35" },
  { id: "olive", name: "Olive", value: "0.35 0.08 80" },
  { id: "teal", name: "Teal", value: "0.40 0.12 175" },
];

export default function ToggleThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { primary, setPrimary } = useThemeColor();

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          title={`Current: ${
            theme === "system"
              ? "Auto (System)"
              : theme === "dark"
              ? "Dark"
              : "Light"
          }`}
        >
          {resolvedTheme === "dark" ? (
            <SunIcon />
          ) : resolvedTheme === "light" ? (
            <MoonIcon />
          ) : (
            <CircleHalfIcon />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Theme Setting</SheetTitle>
          <SheetDescription>Make changes to your theme here</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <div>Theme Mode</div>
            <ToggleGroup
              type="single"
              value={theme}
              onValueChange={setTheme}
              variant="outline"
              className="@[767px]/card:flex"
            >
              <ToggleGroupItem value="system">
                <CircleHalfIcon /> System
              </ToggleGroupItem>
              <ToggleGroupItem value="light">
                <MoonIcon /> Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark">
                <SunIcon /> Dark
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid gap-3">
            <div>Theme Color</div>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((color) => (
                <Button
                  key={color.id}
                  variant="default"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setPrimary(color.value)}
                  title={color.name}
                  style={{
                    backgroundColor: `oklch(${color.value})`,
                  }}
                >
                  {primary === color.value && (
                    <CheckIcon className="text-white" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
