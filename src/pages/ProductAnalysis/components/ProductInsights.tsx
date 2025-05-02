
import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ProductInsightsProps {
  product: any;
  competitors?: any[];
}

const ProductInsights = ({ product, competitors }: ProductInsightsProps) => {
  // Generate market share data
  const marketShareData = generateMarketShareData(product, competitors);
  
  // Generate sentiment analysis data
  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ];
  
  // Colors for pie chart
  const COLORS = ["#10B981", "#6B7280", "#EF4444"];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Price Comparison</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={generatePriceComparisonData(product, competitors)}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`$${value}`, 'Price']} />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Feature Comparison</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={generateFeatureComparisonData(product, competitors)}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 10]} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" name={product.name} fill="#8884d8" />
              {competitors && competitors.length > 0 && (
                <Bar dataKey="competitorAvg" name="Competitor Avg" fill="#82ca9d" />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Estimated Market Share</h3>
        <div className="h-[350px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {marketShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getMarketShareColor(index, marketShareData.length)} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Customer Sentiment Analysis</h3>
        <div className="h-[350px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Reviews']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
        <ul className="space-y-4">
          <li className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-1">Price Positioning</h4>
            <p className="text-sm text-muted-foreground">
              {generatePriceInsight(product, competitors)}
            </p>
          </li>
          <li className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-1">Performance Analysis</h4>
            <p className="text-sm text-muted-foreground">
              {product.name} demonstrates {getRandomPerformanceLevel()} performance in key technical benchmarks
              {competitors && competitors.length > 0 ? `, outperforming ${getOutperformedCount(product, competitors)} competitors in overall specifications.` : '.'}
            </p>
          </li>
          <li className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-1">Market Trends</h4>
            <p className="text-sm text-muted-foreground">
              This product category is seeing growing demand, with an estimated annual growth of 12%. New technology adoption is expected to drive further innovation in the next 6-12 months.
            </p>
          </li>
          <li className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-1">Customer Feedback</h4>
            <p className="text-sm text-muted-foreground">
              Customer reviews highlight {product.name}'s strengths in {getRandomStrengths()}. The most common criticism is related to {getRandomCriticism()}.
            </p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

// Helper functions
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const generatePriceComparisonData = (product: any, competitors?: any[]) => {
  let data = [{ name: product.name, price: product.price }];
  
  if (competitors && competitors.length > 0) {
    data = [...data, ...competitors.map(c => ({ name: c.name, price: c.price }))];
  } else {
    // Generate fake competitors if none provided
    data = [
      ...data,
      { name: "Competitor A", price: Math.round(product.price * 0.9) },
      { name: "Competitor B", price: Math.round(product.price * 1.1) },
      { name: "Competitor C", price: Math.round(product.price * 0.85) }
    ];
  }
  
  return data;
};

const generateFeatureComparisonData = (product: any, competitors?: any[]) => {
  // Use actual product features
  return product.features.map((feature: any) => {
    const competitorScores = competitors?.map(c => {
      const matchingFeature = c.features.find((f: any) => f.name === feature.name);
      return matchingFeature ? matchingFeature.score : 0;
    }) || [];
    
    const competitorAvg = competitorScores.length > 0 
      ? competitorScores.reduce((a, b) => a + b, 0) / competitorScores.length 
      : 0;
      
    return {
      name: feature.name,
      score: feature.score,
      competitorAvg: Number(competitorAvg.toFixed(1))
    };
  });
};

const generateMarketShareData = (product: any, competitors?: any[]) => {
  if (competitors && competitors.length > 0) {
    // Generate somewhat realistic market share based on price and ratings
    const totalProducts = competitors.length + 1;
    const baseShare = 100 / (totalProducts * 1.5); // Base share smaller than equal distribution
    
    // Calculate weighted scores based on rating and inverse of price (lower price = higher score)
    const productScore = (product.rating / product.price) * 1000;
    const competitorScores = competitors.map(c => (c.rating / c.price) * 1000);
    const totalScore = productScore + competitorScores.reduce((a, b) => a + b, 0);
    
    // Calculate shares based on scores
    const productShare = Math.round((productScore / totalScore) * 100);
    const competitorShares = competitorScores.map(score => Math.round((score / totalScore) * 100));
    
    // Adjust to ensure total is 100%
    let total = productShare + competitorShares.reduce((a, b) => a + b, 0);
    let adjustment = 100 - total;
    
    // Apply adjustment to product share (could be positive or negative)
    const adjustedProductShare = productShare + adjustment;
    
    const result = [
      { name: product.name, value: adjustedProductShare },
      ...competitors.map((c, i) => ({ name: c.name, value: competitorShares[i] }))
    ];
    
    return result;
  }
  
  // Default market share if no competitors
  return [
    { name: product.name, value: 42 },
    { name: "Competitor A", value: 28 },
    { name: "Competitor B", value: 18 },
    { name: "Others", value: 12 },
  ];
};

const getMarketShareColor = (index: number, total: number) => {
  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", 
    "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
  ];
  
  return colors[index % colors.length];
};

const getRandomPerformanceLevel = () => {
  const levels = ["exceptional", "above-average", "competitive", "strong", "remarkable"];
  return levels[Math.floor(Math.random() * levels.length)];
};

const getRandomStrengths = () => {
  const strengths = [
    "design and build quality", 
    "performance and speed", 
    "reliability and durability",
    "user interface and experience",
    "value for money"
  ];
  return strengths[Math.floor(Math.random() * strengths.length)];
};

const getRandomCriticism = () => {
  const criticisms = [
    "battery life", 
    "price point", 
    "customer support",
    "software updates",
    "accessory compatibility"
  ];
  return criticisms[Math.floor(Math.random() * criticisms.length)];
};

const getOutperformedCount = (product: any, competitors: any[]) => {
  // Check how many competitors have lower average feature scores
  const productAvgScore = product.features.reduce((sum: number, f: any) => sum + f.score, 0) / product.features.length;
  
  const outperformedCount = competitors.filter(competitor => {
    const competitorAvgScore = competitor.features.reduce((sum: number, f: any) => sum + f.score, 0) / competitor.features.length;
    return productAvgScore > competitorAvgScore;
  }).length;
  
  return outperformedCount;
};

const generatePriceInsight = (product: any, competitors?: any[]) => {
  if (!competitors || competitors.length === 0) {
    return `At $${product.price}, ${product.name} is positioned as a ${product.price > 500 ? 'premium' : 'mid-range'} option in the market.`;
  }
  
  const avgCompetitorPrice = competitors.reduce((sum, c) => sum + c.price, 0) / competitors.length;
  const priceDiff = ((product.price - avgCompetitorPrice) / avgCompetitorPrice) * 100;
  
  if (Math.abs(priceDiff) < 5) {
    return `${product.name} is priced competitively, at a similar price point to the market average for comparable products.`;
  } else if (priceDiff > 0) {
    return `${product.name} is priced ${Math.round(priceDiff)}% higher than the average competitor, positioning it as a premium option.`;
  } else {
    return `${product.name} is priced ${Math.round(Math.abs(priceDiff))}% lower than the average competitor, offering potentially better value.`;
  }
};

export default ProductInsights;
