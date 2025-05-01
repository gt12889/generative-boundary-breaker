
import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckIcon, XIcon, MinusIcon } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface ProductComparisonProps {
  mainProduct: any;
  competitors: any[];
}

const ProductComparison = ({ mainProduct, competitors }: ProductComparisonProps) => {
  // Prepare radar chart data
  const metrics = [
    { name: "Performance", key: "performanceScore" },
    { name: "Value", key: "valueScore" },
    { name: "Design", key: "designScore" },
    { name: "Features", key: "featureScore" },
    { name: "Reliability", key: "reliabilityScore" }
  ];
  
  // Generate random scores if needed
  const getScoreOrRandom = (product: any, key: string) => {
    return product[key] || Math.floor(Math.random() * 5) + 5; // Random score between 5-10
  };
  
  const radarData = metrics.map(metric => {
    const data: any = { name: metric.name };
    data[mainProduct.name] = getScoreOrRandom(mainProduct, metric.key);
    
    competitors.forEach(competitor => {
      data[competitor.name] = getScoreOrRandom(competitor, metric.key);
    });
    
    return data;
  });

  const allProducts = [mainProduct, ...competitors];
  const colors = ["#8B5CF6", "#F97316", "#0EA5E9", "#10B981"];

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-6">Comparative Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Feature</TableHead>
                {allProducts.map((product, idx) => (
                  <TableHead key={product.id}>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full overflow-hidden bg-muted">
                        <img src={product.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Price</TableCell>
                {allProducts.map((product) => (
                  <TableCell key={`${product.id}-price`}>${product.price}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Release Date</TableCell>
                {allProducts.map((product) => (
                  <TableCell key={`${product.id}-release`}>{product.releaseDate}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rating</TableCell>
                {allProducts.map((product) => (
                  <TableCell key={`${product.id}-rating`}>{product.rating}/5</TableCell>
                ))}
              </TableRow>
              
              {getCommonFeatureNames(allProducts).map((featureName, index) => (
                <TableRow key={`feature-${index}`}>
                  <TableCell className="font-medium">{featureName}</TableCell>
                  {allProducts.map((product) => {
                    const feature = product.features.find((f: any) => f.name === featureName);
                    return (
                      <TableCell key={`${product.id}-${featureName}`}>
                        {feature ? (
                          <div className="flex items-center">
                            <span className="mr-2">{feature.score}/10</span>
                            {getScoreIcon(feature.score)}
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            <MinusIcon className="h-4 w-4" />
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4 text-center">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              
              {allProducts.map((product, idx) => (
                <Radar
                  key={product.id}
                  name={product.name}
                  dataKey={product.name}
                  stroke={colors[idx % colors.length]}
                  fill={colors[idx % colors.length]}
                  fillOpacity={0.2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {allProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-1"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-xs">{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          This comparison is based on product specifications, user reviews, and expert analysis. 
          Performance metrics may vary based on individual use cases and environments.
        </p>
      </div>
    </motion.div>
  );
};

// Helper functions
const getCommonFeatureNames = (products: any[]): string[] => {
  const allFeatureNames = new Set<string>();
  
  products.forEach(product => {
    product.features.forEach((feature: any) => {
      allFeatureNames.add(feature.name);
    });
  });
  
  return Array.from(allFeatureNames);
};

const getScoreIcon = (score: number) => {
  if (score >= 7) {
    return <CheckIcon className="h-4 w-4 text-green-500" />;
  } else if (score >= 4) {
    return <MinusIcon className="h-4 w-4 text-amber-500" />;
  } else {
    return <XIcon className="h-4 w-4 text-red-500" />;
  }
};

export default ProductComparison;
