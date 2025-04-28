
import React, { useState } from "react";
import { extendedComparisons, UserRole } from "@/pages/UseCases/components/Demo/comparisonsData";
import ComparisonTabs from "@/pages/UseCases/components/Demo/ComparisonTabs";
import ComparisonTable from "@/pages/UseCases/components/Demo/ComparisonTable";
import RoleFilter from "@/pages/UseCases/components/Demo/RoleFilter";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Filter for company and social media comparisons
const socialMediaComparisons = extendedComparisons.filter(
  comp => comp.id === "ev-comparison" || 
          comp.id === "social-media-1" || 
          comp.id === "social-media-2" || 
          comp.id === "social-media-3"
);

const CompareCompanies = () => {
  const [activeTab, setActiveTab] = useState(socialMediaComparisons[0]?.id || "");
  const [selectedRole, setSelectedRole] = useState<UserRole>("all");
  
  const activeComparison = socialMediaComparisons.find(c => c.id === activeTab) || socialMediaComparisons[0];
  
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
          comparisons={socialMediaComparisons}
        />
        
        {activeComparison && (
          <ComparisonTable 
            activeComparison={activeComparison} 
            selectedRole={selectedRole}
          />
        )}
        
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">AI Executive Summary</h3>
          <p className="text-gray-700">{activeComparison?.aiSummary || "No summary available."}</p>
        </div>
      </div>
    </div>
  );
};

export default CompareCompanies;
