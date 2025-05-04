
import React, { useState, useEffect } from "react";
import { extendedComparisons } from "@/pages/UseCases/components/Demo/comparisonsData";
import { UserRole } from "@/pages/UseCases/components/Demo/types";
import ComparisonTabs from "@/pages/UseCases/components/Demo/ComparisonTabs";
import ComparisonTable from "@/pages/UseCases/components/Demo/ComparisonTable";
import RoleFilter from "@/pages/UseCases/components/Demo/RoleFilter";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

// Display all available comparisons instead of filtering
const availableComparisons = extendedComparisons;

const CompareCompanies = () => {
  // Use the first comparison as default, or empty string if no comparisons exist
  const defaultTabId = availableComparisons.length > 0 ? availableComparisons[0].id : "";
  const [activeTab, setActiveTab] = useState(defaultTabId);
  const [selectedRole, setSelectedRole] = useState<UserRole>("all");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Find the active comparison or fallback to the first one, with additional safety checks
  const activeComparison = availableComparisons.find(c => c.id === activeTab) || 
                          (availableComparisons.length > 0 ? availableComparisons[0] : undefined);
  
  // Simulate loading process
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress((prev) => {
            const increment = Math.floor(Math.random() * 20) + 10;
            const newProgress = Math.min(prev + increment, 100);
            if (newProgress === 100) {
              setTimeout(() => setLoading(false), 300);
            }
            return newProgress;
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading, progress]);

  // Reset loading state when changing tabs
  useEffect(() => {
    setLoading(true);
    setProgress(0);
  }, [activeTab, selectedRole]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Company Analysis</h1>
      
      <DemoNavigation />
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <RoleFilter selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={18} />
            Download Full Report
          </Button>
        </div>
        
        <ComparisonTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          comparisons={availableComparisons}
        />
        
        {loading ? (
          <div className="my-8 space-y-4">
            <Progress value={progress} className="h-2 w-full" />
            <p className="text-sm text-muted-foreground text-center">
              {progress < 100 ? "Loading comparison data..." : "Finalizing..."}
            </p>
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          activeComparison ? (
            <>
              <ComparisonTable 
                activeComparison={activeComparison} 
                selectedRole={selectedRole}
              />
              
              <div className="mt-8 bg-gray-50 border border-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">AI Executive Summary</h3>
                <p className="text-gray-700">{activeComparison.aiSummary || "No summary available."}</p>
              </div>
            </>
          ) : (
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-amber-800">No comparison data available.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CompareCompanies;
