
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoCompetitorViewProps {
  onAddCompetitor: () => void;
}

const NoCompetitorView = ({ onAddCompetitor }: NoCompetitorViewProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-8 text-center shadow-sm">
      <h3 className="text-lg font-medium mb-2">No Competitors Added</h3>
      <p className="text-muted-foreground mb-4">
        Click the "Add Competitor" button to add products for comparison.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onAddCompetitor}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Competitor
      </Button>
    </div>
  );
};

export default NoCompetitorView;
