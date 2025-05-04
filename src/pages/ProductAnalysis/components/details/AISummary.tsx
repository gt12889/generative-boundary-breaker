
import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AISummaryProps {
  aiSummary: string;
  isGeneratingSummary: boolean;
  onGenerateSummary: () => void;
  competitiveProducts: any[];
}

const AISummary = ({ 
  aiSummary, 
  isGeneratingSummary, 
  onGenerateSummary,
  competitiveProducts 
}: AISummaryProps) => {
  if (competitiveProducts.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">AI Comparative Analysis</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onGenerateSummary}
            disabled={isGeneratingSummary}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isGeneratingSummary ? "animate-spin" : ""}`} />
            Regenerate
          </Button>
        </div>
        
        {isGeneratingSummary ? (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <p>Generating summary...</p>
            </div>
          </div>
        ) : aiSummary ? (
          <Alert className="bg-muted/40">
            <AlertDescription className="text-foreground">
              {aiSummary}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertDescription>
              Click "Regenerate" to create an AI-powered comparison summary.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AISummary;
