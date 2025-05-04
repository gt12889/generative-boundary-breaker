
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UsageChartProps {
  data: Array<{
    date: string;
    visitors: number;
    comparisons: number;
  }>;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const UsageChart = ({ data, timeRange, onTimeRangeChange }: UsageChartProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usage Over Time</CardTitle>
            <CardDescription>Number of visitors and comparisons</CardDescription>
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
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="comparisons" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageChart;
