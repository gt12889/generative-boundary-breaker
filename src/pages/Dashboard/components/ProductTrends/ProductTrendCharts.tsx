
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ChartLine, Plus } from 'lucide-react';
import { TrafficSource } from '../../data/usageData';
import ProductSelector from './ProductSelector';
import SingleProductChart from './SingleProductChart';
import ProductComparisonChart from './ProductComparisonChart';
import ProductSourceInfo from './ProductSourceInfo';

interface ProductTrendChartsProps {
  productData: Record<string, Array<{ date: string; interest: number }>>;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  trafficSource: TrafficSource;
}

const ProductTrendCharts = ({ 
  productData, 
  timeRange, 
  onTimeRangeChange,
  trafficSource
}: ProductTrendChartsProps) => {
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
              <ProductSelector 
                products={allProducts}
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                getProductData={productData}
              />
              <SingleProductChart 
                productData={productData} 
                selectedProduct={selectedProduct} 
              />
            </TabsContent>
            
            <TabsContent value="comparison">
              <ProductSelector 
                products={allProducts}
                selectedProducts={displayedProducts}
                onToggleProduct={toggleProductDisplay}
                onRemoveProduct={handleRemoveProduct}
                multiSelect={true}
              />
              <ProductComparisonChart 
                productData={productData} 
                displayedProducts={displayedProducts} 
              />
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
          <ProductSourceInfo trafficSource={trafficSource} />
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
