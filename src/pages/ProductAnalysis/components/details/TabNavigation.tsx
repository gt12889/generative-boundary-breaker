
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  children: React.ReactNode;
  onAddCompetitor: () => void;
}

const TabNavigation = ({ children, onAddCompetitor }: TabNavigationProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="flex justify-between items-center">
        <TabsList className="justify-start mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddCompetitor}
          className="flex items-center gap-2 mb-6"
        >
          <Plus className="h-4 w-4" />
          Add Competitor
        </Button>
      </div>
      
      {children}
    </Tabs>
  );
};

export default TabNavigation;
