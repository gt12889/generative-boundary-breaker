
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChartLine } from 'lucide-react';

interface UsageChartProps {
  data: Array<{
    date: string;
    visitors: number;
    comparisons: number;
    webTraffic: number;
  }>;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const UsageChart = ({ data, timeRange, onTimeRangeChange }: UsageChartProps) => {
  const [showSource, setShowSource] = useState(false);
  
  const source = {
    name: "Google Trends",
    url: "https://trends.google.com/trends/",
    description: "Data represents relative search interest for selected company/product"
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ChartLine className="h-5 w-5" />
              Web Traffic & Usage
            </CardTitle>
            <CardDescription>Website traffic and platform usage metrics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={timeRange === "week" ? "default" : "outline"} 
              size="sm"
              onClick={() => onTimeRangeChange("week")}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === "month" ? "default" : "outline"} 
              size="sm"
              onClick={() => onTimeRangeChange("month")}
            >
              Month
            </Button>
            <Button 
              variant={timeRange === "year" ? "default" : "outline"} 
              size="sm"
              onClick={() => onTimeRangeChange("year")}
            >
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border shadow rounded">
                        <p className="font-medium">{label}</p>
                        <p className="text-blue-600">Visitors: {payload[0].value}</p>
                        <p className="text-violet-600">Comparisons: {payload[1].value}</p>
                        <p className="text-green-600">Web Traffic: {payload[2].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="visitors" name="Platform Visitors" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="comparisons" name="Product Comparisons" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="webTraffic" name="Web Traffic" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {showSource && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
            <h4 className="font-medium text-gray-800">Data Source: {source.name}</h4>
            <p className="text-gray-600 mt-1">{source.description}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 text-xs"
          onClick={() => setShowSource(!showSource)}
        >
          {showSource ? 'Hide Source' : 'View Source'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-xs ml-2"
          asChild
        >
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            Visit Google Trends <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UsageChart;
