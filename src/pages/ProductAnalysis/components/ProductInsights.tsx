
import React from "react";
import { ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";

interface ProductInsightsProps {
  product: any;
}

const ProductInsights = ({ product }: ProductInsightsProps) => {
  return (
    <motion.div 
      className="md:col-span-4 bg-muted/10 border border-border rounded-lg p-6"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-4">AI-Powered Insights</h2>
      
      <div className="bg-muted/20 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-primary mb-2">Summary</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{product.aiSummary}</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-primary mb-2">Best For</h3>
          <ul className="text-muted-foreground text-sm space-y-2">
            {product.bestFor.map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-primary mb-2">Not Recommended For</h3>
          <ul className="text-muted-foreground text-sm space-y-2">
            {product.notRecommendedFor.map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <X className="h-4 w-4 mr-2 mt-0.5 text-destructive" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-primary mb-2">Alternative Suggestions</h3>
          <ul className="text-muted-foreground text-sm space-y-3">
            {product.alternatives.map((item: any, index: number) => (
              <li key={index} className="flex items-start">
                <span className="font-medium mr-1">{item.name}:</span>
                <span>{item.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductInsights;
