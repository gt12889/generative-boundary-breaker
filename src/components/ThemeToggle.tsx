
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      pressed={theme === "dark"}
      onPressedChange={toggleTheme} 
      aria-label="Toggle dark mode" 
      className="flex items-center gap-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 animate-pulse" />
      ) : (
        <Sun className="h-4 w-4 animate-spin-slow" />
      )}
      <span className="sr-only md:not-sr-only text-sm">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </Toggle>
  );
}
