
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeedbackTrendsProps {
  data: Array<{
    period: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const FeedbackTrends = ({ data }: FeedbackTrendsProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Feedback Trends</CardTitle>
        <CardDescription>User feedback sentiment analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border shadow rounded">
                        <p className="font-medium">{label}</p>
                        <p className="text-green-600">Positive: {payload[0].value}%</p>
                        <p className="text-gray-500">Neutral: {payload[1].value}%</p>
                        <p className="text-red-500">Negative: {payload[2].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#4ade80" fill="#4ade8080" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#9ca3af" fill="#9ca3af80" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#f87171" fill="#f8717180" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackTrends;
