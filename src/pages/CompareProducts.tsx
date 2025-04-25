
import React, { useState } from "react";
import { platforms, extendedComparisons, UserRole } from "@/pages/UseCases/components/Demo/data";
import ComparisonTabs from "@/pages/UseCases/components/Demo/ComparisonTabs";
import ComparisonTable from "@/pages/UseCases/components/Demo/ComparisonTable";
import RoleFilter from "@/pages/UseCases/components/Demo/RoleFilter";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";

// Filter product comparisons (phones, note-taking, ecommerce, sneakers, headphones, wearables)
const productComparisons = extendedComparisons.filter(
  comp => comp.id === "phones" || 
          comp.id === "note-taking" || 
          comp.id === "ecommerce" || 
          comp.id === "sneakers" || 
          comp.id === "headphones" || 
          comp.id === "wearables"
);

const CompareProducts = () => {
  const [activeTab, setActiveTab] = useState(productComparisons[0]?.id || "");
  const [selectedRole, setSelectedRole] = useState<UserRole>("all");
  
  const activeComparison = productComparisons.find(c => c.id === activeTab) || productComparisons[0];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Analysis</h1>
      
      <DemoNavigation />
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="mb-6">
          <RoleFilter selectedRole={selectedRole} onRoleChange={setSelectedRole} />
        </div>
        
        <ComparisonTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          comparisons={productComparisons}
        />
        
        {activeComparison && (
          <ComparisonTable 
            activeComparison={activeComparison} 
            selectedRole={selectedRole}
          />
        )}
        
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">AI-Powered "Best For" Summary</h3>
          <p className="text-gray-700">{activeComparison?.aiSummary || "No summary available."}</p>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
