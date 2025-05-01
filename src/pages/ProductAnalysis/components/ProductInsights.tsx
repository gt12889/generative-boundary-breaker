
import React from "react";
import { ArrowRight, X, Info, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProductInsightsProps {
  product: any;
}

const ProductInsights = ({ product }: ProductInsightsProps) => {
  return (
    <motion.div 
      className="md:col-span-4 bg-card border border-border rounded-lg p-6 shadow-sm"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">AI-Powered Insights</h2>
        <Badge variant="outline" className="bg-primary/10">
          <TrendingUp className="h-3 w-3 mr-1" />
          Market Analysis
        </Badge>
      </div>
      
      <div className="bg-muted/20 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-primary mb-2">Executive Summary</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{product.aiSummary}</p>
      </div>
      
      <div className="space-y-5">
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-primary mb-3">Best For</h3>
          <ul className="text-muted-foreground text-sm space-y-2.5">
            {product.bestFor.map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-primary shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-destructive mb-3">Not Recommended For</h3>
          <ul className="text-muted-foreground text-sm space-y-2.5">
            {product.notRecommendedFor.map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <X className="h-4 w-4 mr-2 mt-0.5 text-destructive shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-medium text-primary">Alternative Suggestions</h3>
            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
          </div>
          
          <ul className="text-muted-foreground text-sm space-y-3">
            {product.alternatives.map((item: any, index: number) => (
              <li key={index} className="flex items-start p-2 rounded bg-background/50 border border-border/50">
                <div className="mr-3">
                  {item.better ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline" className="text-xs bg-muted/30">
                      ${item.price || '???'}
                    </Badge>
                  </div>
                  <span className="text-xs">{item.reason}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-medium mb-2">Market Trends</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Data updated: {new Date().toLocaleDateString()}</span>
          <Badge variant="outline" className="text-xs">AI Powered</Badge>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductInsights;
