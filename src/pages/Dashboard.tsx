
import { useState } from "react";
import DashboardLayout from "./Dashboard/layout/DashboardLayout";
import StatsCards from "./Dashboard/components/StatsCards";
import ComparisonStats from "./Dashboard/components/ComparisonStats";
import IntegratedUsageChart from "./Dashboard/components/IntegratedUsageChart";
import FeedbackTrends from "./Dashboard/components/FeedbackTrends";

// Mock data
import { usageData, productTrendData, trafficSource, productColors } from "./Dashboard/data/usageData";
import { feedbackData } from "./Dashboard/data/feedbackData";
import { companyData, productData } from "./Dashboard/data/comparisonData";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <DashboardLayout>
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
        <IntegratedUsageChart 
          usageData={usageData}
          productTrendData={productTrendData}
          productColors={productColors}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          trafficSource={trafficSource}
        />

        <FeedbackTrends data={feedbackData} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
