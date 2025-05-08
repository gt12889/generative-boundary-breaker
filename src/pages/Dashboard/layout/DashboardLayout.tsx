
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ExportOptions } from "@/components/ExportOptions";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-heading">Analytics Dashboard</h1>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ThemeToggle />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Toggle dark mode
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ExportOptions contentRef={contentRef} title="Analytics Dashboard" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Export dashboard
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="flex items-center gap-2 btn-hover-effect"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                      Back to Home
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Return to homepage
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div ref={contentRef} className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
