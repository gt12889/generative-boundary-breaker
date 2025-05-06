
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ChartLine, Plus, X } from 'lucide-react';

interface TrafficSource {
  name: string;
  url: string;
  description: string;
}

interface IntegratedUsageChartProps {
  usageData: Array<{
    date: string;
    visitors: number;
    comparisons: number;
    webTraffic: number;
  }>;
  productTrendData: Record<string, Array<{ date: string; interest: number }>>;
  productColors: Record<string, string>;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  trafficSource: TrafficSource;
}

const IntegratedUsageChart = ({ 
  usageData, 
  productTrendData, 
  productColors, 
  timeRange, 
  onTimeRangeChange, 
  trafficSource 
}: IntegratedUsageChartProps) => {
  const [selectedTab, setSelectedTab] = useState("usage");
  const [showSource, setShowSource] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(Object.keys(productTrendData)[0]);
  const [newProduct, setNewProduct] = useState("");
  const [customProducts, setCustomProducts] = useState<string[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<string[]>(Object.keys(productTrendData).slice(0, 2));
  
  // Combine all available products (predefined + custom)
  const allProducts = [...Object.keys(productTrendData), ...customProducts];

  const handleAddProduct = () => {
    if (newProduct && !customProducts.includes(newProduct) && !Object.keys(productTrendData).includes(newProduct)) {
      setCustomProducts([...customProducts, newProduct]);
      setDisplayedProducts([...displayedProducts, newProduct]);
      setNewProduct("");
    }
  };

  const handleRemoveProduct = (product: string) => {
    setDisplayedProducts(displayedProducts.filter(p => p !== product));
    if (customProducts.includes(product)) {
      setCustomProducts(customProducts.filter(p => p !== product));
    }
    if (selectedProduct === product) {
      setSelectedProduct(displayedProducts[0] !== product ? displayedProducts[0] : displayedProducts[1] || Object.keys(productTrendData)[0]);
    }
  };

  const toggleProductDisplay = (product: string) => {
    if (displayedProducts.includes(product)) {
      if (displayedProducts.length > 1) {
        handleRemoveProduct(product);
      }
    } else {
      setDisplayedProducts([...displayedProducts, product]);
    }
  };

  const getProductColor = (productName: string) => {
    return productColors[productName as keyof typeof productColors] || productColors.default;
  };
  
  // Generate mock data for custom products if they don't exist in productTrendData
  const getProductData = (productName: string) => {
    if (productName in productTrendData) {
      return productTrendData[productName];
    }
    
    // Generate random data for custom products
    return [
      { date: 'Jan', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Feb', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Mar', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Apr', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'May', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Jun', interest: Math.floor(Math.random() * 50) + 30 },
    ];
  };

  // Combine data for comparison chart
  const combinedData = (() => {
    const result: Record<string, any>[] = [];
    const dates = productTrendData[Object.keys(productTrendData)[0]].map(item => item.date);
    
    dates.forEach(date => {
      const dataPoint: Record<string, any> = { date };
      
      displayedProducts.forEach(product => {
        const productItems = getProductData(product);
        const item = productItems.find(i => i.date === date);
        if (item) {
          dataPoint[product] = item.interest;
        }
      });
      
      result.push(dataPoint);
    });
    
    return result;
  })();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ChartLine className="h-5 w-5" />
              Web Traffic & Product Interest Trends
            </CardTitle>
            <CardDescription>Website traffic metrics and search interest trends for products</CardDescription>
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
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="usage">Web Traffic & Usage</TabsTrigger>
            <TabsTrigger value="products">Product Trends</TabsTrigger>
            <TabsTrigger value="comparison">Product Comparison</TabsTrigger>
          </TabsList>
          
          {/* Web Traffic & Usage Tab */}
          <TabsContent value="usage">
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
          </TabsContent>
          
          {/* Individual Product Trends Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {allProducts.map(product => (
                <Button 
                  key={product}
                  variant={selectedProduct === product ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProduct(product)}
                  style={{ borderColor: getProductColor(product), borderWidth: selectedProduct === product ? 0 : 1 }}
                >
                  {product}
                </Button>
              ))}
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getProductData(selectedProduct)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border shadow rounded">
                            <p className="font-medium">{label}</p>
                            <p style={{ color: getProductColor(selectedProduct) }}>
                              {selectedProduct}: {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="interest" 
                    name={selectedProduct} 
                    stroke={getProductColor(selectedProduct)} 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          {/* Product Comparison Tab */}
          <TabsContent value="comparison">
            <div className="flex flex-wrap gap-2 mb-4">
              {allProducts.map(product => (
                <Button 
                  key={product}
                  variant={displayedProducts.includes(product) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleProductDisplay(product)}
                  style={{ 
                    backgroundColor: displayedProducts.includes(product) ? getProductColor(product) : 'transparent',
                    color: displayedProducts.includes(product) ? 'white' : undefined,
                  }}
                >
                  {product}
                  {displayedProducts.includes(product) && displayedProducts.length > 1 && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border shadow rounded">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }}>
                                {entry.name}: {entry.value}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  {displayedProducts.map(product => (
                    <Line 
                      key={product}
                      type="monotone" 
                      dataKey={product} 
                      name={product} 
                      stroke={getProductColor(product)} 
                      strokeWidth={2} 
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center gap-2 mt-6">
          <Input 
            placeholder="Add new product..." 
            value={newProduct} 
            onChange={(e) => setNewProduct(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddProduct()}
            className="max-w-xs"
          />
          <Button onClick={handleAddProduct} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {showSource && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
            <h4 className="font-medium text-gray-800">Data Source: {trafficSource.name}</h4>
            <p className="text-gray-600 mt-1">{trafficSource.description}</p>
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
          <a href={trafficSource.url} target="_blank" rel="noopener noreferrer">
            Visit Google Trends <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegratedUsageChart;
