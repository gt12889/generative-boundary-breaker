
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ComparisonStatsProps {
  title: string;
  description: string;
  data: Array<{
    name: string;
    count: number;
  }>;
  barColor?: string;
}

const ComparisonStats = ({ 
  title, 
  description, 
  data,
  barColor = "#8884d8"
}: ComparisonStatsProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border shadow rounded">
                        <p>{`${payload[0].payload.name}: ${payload[0].value} comparisons`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonStats;
