
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ComparisonTabs from "./ComparisonTabs";
import ComparisonTable from "./ComparisonTable";
import DemoDialog from "./DemoDialog";
import { extendedComparisons } from "./data";

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState(extendedComparisons[0].id);
  const activeComparison = extendedComparisons.find(c => c.id === activeTab) || extendedComparisons[0];
  
  return (
    <div className="bg-white py-16 rounded-lg border border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">See a live demo</h2>
        
        <ComparisonTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          comparisons={extendedComparisons} 
        />
        
        <ComparisonTable activeComparison={activeComparison} />
        
        <div className="mt-10 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md gap-2"
              >
                Open demo
                <ExternalLink size={18} />
              </Button>
            </DialogTrigger>
            <DemoDialog activeComparison={activeComparison} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
