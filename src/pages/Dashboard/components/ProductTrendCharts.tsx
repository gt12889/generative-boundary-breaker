
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ChartLine, Plus, X } from 'lucide-react';
import { trafficSource, productColors } from '../data/usageData';

interface ProductTrendChartsProps {
  productData: Record<string, Array<{ date: string; interest: number }>>;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const ProductTrendCharts = ({ productData, timeRange, onTimeRangeChange }: ProductTrendChartsProps) => {
  const [selectedTab, setSelectedTab] = useState("single");
  const [selectedProduct, setSelectedProduct] = useState(Object.keys(productData)[0]);
  const [showSource, setShowSource] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [customProducts, setCustomProducts] = useState<string[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<string[]>(Object.keys(productData).slice(0, 2));
  
  // Combine all available products (predefined + custom)
  const allProducts = [...Object.keys(productData), ...customProducts];

  const handleAddProduct = () => {
    if (newProduct && !customProducts.includes(newProduct) && !Object.keys(productData).includes(newProduct)) {
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
      setSelectedProduct(displayedProducts[0] !== product ? displayedProducts[0] : displayedProducts[1] || Object.keys(productData)[0]);
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
  
  // Generate mock data for custom products if they don't exist in productData
  const getProductData = (productName: string) => {
    if (productName in productData) {
      return productData[productName];
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
    const dates = productData[Object.keys(productData)[0]].map(item => item.date);
    
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
              Product Interest Trends
            </CardTitle>
            <CardDescription>Search interest trends for products over time</CardDescription>
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
        <div className="mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="single">Individual Products</TabsTrigger>
              <TabsTrigger value="comparison">Comparison View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="space-y-4">
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
        </div>
        
        <div className="flex items-center gap-2 my-4">
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

export default ProductTrendCharts;
