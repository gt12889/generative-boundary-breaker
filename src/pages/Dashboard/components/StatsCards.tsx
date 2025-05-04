
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBarIcon, Users, Calendar } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Total Comparisons</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">1,248</div>
            <div className="p-2 bg-green-100 rounded-full">
              <ChartBarIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium mt-2">+12.5% from last month</div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Active Users</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">845</div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-sm text-blue-600 font-medium mt-2">+8.2% from last month</div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Avg. Session Time</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">4:32</div>
            <div className="p-2 bg-orange-100 rounded-full">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="text-sm text-orange-600 font-medium mt-2">+2.1% from last month</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
