
import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import ProductSummary from "../ProductSummary";

interface ProductOverviewProps {
  product: any;
  competitiveProducts: any[];
}

const ProductOverview = ({ product, competitiveProducts }: ProductOverviewProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ProductSummary product={product} />
        <div className="md:col-span-9">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm h-full">
            <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
            <p className="text-muted-foreground mb-6">
              {product.description || `The ${product.name} is a premium ${product.category} device from ${product.brand}, 
              featuring cutting-edge technology and exceptional design. It offers outstanding performance and value for its price point of $${product.price}.`}
            </p>
            
            <h3 className="font-semibold mb-2">Key Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {product.specifications?.map((spec: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{spec.name}</p>
                    <p className="text-xs text-muted-foreground">{spec.value}</p>
                  </div>
                </div>
              )) || (
                <>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Performance</p>
                      <p className="text-xs text-muted-foreground">Top-tier processing power</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Display</p>
                      <p className="text-xs text-muted-foreground">High-resolution screen with vibrant colors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Battery Life</p>
                      <p className="text-xs text-muted-foreground">Long-lasting with fast charging</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Build Quality</p>
                      <p className="text-xs text-muted-foreground">Premium materials and craftsmanship</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <h3 className="font-semibold mb-2">Target Audience</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.targetAudience?.map((audience: string, idx: number) => (
                <Badge key={idx} variant="secondary">{audience}</Badge>
              )) || (
                <>
                  <Badge variant="secondary">Professionals</Badge>
                  <Badge variant="secondary">Enthusiasts</Badge>
                  <Badge variant="secondary">Content Creators</Badge>
                </>
              )}
            </div>
            
            <h3 className="font-semibold mb-2">Market Position</h3>
            <p className="text-sm text-muted-foreground">
              {product.marketPosition || `The ${product.name} positions itself as a premium offering in the ${product.category} market, 
              competing directly with high-end alternatives while providing distinctive features that set it apart 
              from the competition.`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductOverview;
