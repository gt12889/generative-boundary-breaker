
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
      className="flex items-center gap-1 p-2"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only md:not-sr-only text-sm">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </Toggle>
  );
}
