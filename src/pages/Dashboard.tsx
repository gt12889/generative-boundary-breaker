
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ChartBarIcon, 
  ChartLineUp, 
  Users, 
  Calendar, 
  ChevronsLeft 
} from "lucide-react";
import DashboardHeader from "./Dashboard/components/DashboardHeader";
import ComparisonStats from "./Dashboard/components/ComparisonStats";
import UsageChart from "./Dashboard/components/UsageChart";
import FeedbackTrends from "./Dashboard/components/FeedbackTrends";

// Mock data for our dashboard
const usageData = [
  { date: 'Jan', visitors: 120, comparisons: 85 },
  { date: 'Feb', visitors: 170, comparisons: 130 },
  { date: 'Mar', visitors: 210, comparisons: 180 },
  { date: 'Apr', visitors: 235, comparisons: 205 },
  { date: 'May', visitors: 280, comparisons: 250 },
];

const feedbackData = [
  { period: 'Week 1', positive: 80, neutral: 15, negative: 5 },
  { period: 'Week 2', positive: 75, neutral: 20, negative: 5 },
  { period: 'Week 3', positive: 65, neutral: 25, negative: 10 },
  { period: 'Week 4', positive: 85, neutral: 10, negative: 5 },
];

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Overview cards */}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Most Compared Companies</CardTitle>
              <CardDescription>Top 5 most compared companies in the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Apple', count: 145 },
                    { name: 'Google', count: 130 },
                    { name: 'Amazon', count: 110 },
                    { name: 'Microsoft', count: 95 },
                    { name: 'Facebook', count: 80 },
                  ]}>
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
                    <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Most Compared Products</CardTitle>
              <CardDescription>Top 5 most compared products in the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'iPhone 15', count: 180 },
                    { name: 'Galaxy S23', count: 142 },
                    { name: 'MacBook Air', count: 114 },
                    { name: 'iPad Pro', count: 89 },
                    { name: 'Apple Watch', count: 75 },
                  ]}>
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
                    <Bar dataKey="count" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
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
                    onClick={() => setTimeRange("week")}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={timeRange === "month" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange("month")}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={timeRange === "year" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setTimeRange("year")}
                  >
                    Year
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
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

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Feedback Trends</CardTitle>
              <CardDescription>User feedback sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={feedbackData}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
