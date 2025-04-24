"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
  
    // Wait until the component is mounted before rendering
    React.useEffect(() => {
      setMounted(true);
    }, []);
  
    // If not mounted, return nothing (this avoids hydration issues)
    if (!mounted) return null;
  
    // Toggle between dark and light themes
    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };
  
    return (
        <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        className="w-9 p-0 h-9 relative group cursor-pointer transition-colors"
        name="Theme Toggle Button"
      >
        <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Theme Toggle </span>
      </Button>
    );
}
