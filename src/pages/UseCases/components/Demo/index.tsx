
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import ComparisonTabs from "./ComparisonTabs";
import ComparisonTable from "./ComparisonTable";
import DemoDialog from "./DemoDialog";
import DemoNavigation from "./DemoNavigation";
import { extendedComparisons } from "./data";
import { UserRole } from "./types";

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState(extendedComparisons[0].id);
  const [selectedRole, setSelectedRole] = useState<UserRole>("all");
  const activeComparison = extendedComparisons.find(c => c.id === activeTab) || extendedComparisons[0];
  
  return (
    <div className="bg-white py-16 rounded-lg border border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">See a live demo</h2>
        
        <DemoNavigation />
        
        <ComparisonTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          comparisons={extendedComparisons} 
        />
        
        <ComparisonTable 
          activeComparison={activeComparison}
          selectedRole={selectedRole}
        />
        
        <div className="mt-10 text-center flex justify-center gap-4">
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
          
          <Button asChild variant="outline" className="px-6 py-3 gap-2">
            <Link to="/compare/companies">
              Go to full analysis
              <ExternalLink size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
