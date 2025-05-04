
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import DashboardHeader from "./Dashboard/components/DashboardHeader";
import StatsCards from "./Dashboard/components/StatsCards";
import ComparisonStats from "./Dashboard/components/ComparisonStats";
import UsageChart from "./Dashboard/components/UsageChart";
import FeedbackTrends from "./Dashboard/components/FeedbackTrends";

// Mock data
import { usageData } from "./Dashboard/data/usageData";
import { feedbackData } from "./Dashboard/data/feedbackData";
import { companyData, productData } from "./Dashboard/data/comparisonData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ChevronsLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <StatsCards />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ComparisonStats 
            title="Most Compared Companies"
            description="Top 5 most compared companies in the platform"
            data={companyData}
            barColor="#8884d8"
          />
          
          <ComparisonStats 
            title="Most Compared Products"
            description="Top 5 most compared products in the platform"
            data={productData}
            barColor="#82ca9d"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <UsageChart 
            data={usageData} 
            timeRange={timeRange} 
            onTimeRangeChange={setTimeRange} 
          />

          <FeedbackTrends data={feedbackData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
