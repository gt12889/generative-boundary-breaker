
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CompetitorSearch from "./CompetitorSearch";

interface ProductFeaturesProps {
  product: any;
  competitiveProducts: any[];
  onAddCompetitor: (competitor: any) => void;
  onRemoveCompetitor: (competitorId: string) => void;
}

const ProductFeatures = ({ 
  product,
  competitiveProducts,
  onAddCompetitor,
  onRemoveCompetitor
}: ProductFeaturesProps) => {
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);

  return (
    <motion.div 
      className="md:col-span-5 bg-muted/10 border border-border rounded-lg p-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Feature Breakdown</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingCompetitor(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Competitor
        </Button>
      </div>

      <div className="space-y-4">
        {product.features.map((feature: any, index: number) => (
          <div key={index} className="bg-muted/10 rounded-lg p-4">
            <h3 className="font-medium mb-2">{feature.name}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
            
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Score</span>
                <span className="text-xs text-muted-foreground">{feature.score}/10</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${feature.score * 10}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {competitiveProducts.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium mb-3">Competitive Analysis</h3>
          {competitiveProducts.map((competitor) => (
            <div key={competitor.id} className="bg-muted/10 rounded-lg p-4 relative">
              <button
                onClick={() => onRemoveCompetitor(competitor.id)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={competitor.image}
                  alt={competitor.name}
                  className="h-10 w-10 rounded object-cover"
                />
                <div>
                  <h4 className="font-medium">{competitor.name}</h4>
                  <p className="text-sm text-muted-foreground">{competitor.category}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {competitor.features.map((feature: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{feature.name}</span>
                      <span className="text-muted-foreground">{feature.score}/10</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${feature.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddingCompetitor && (
        <CompetitorSearch
          selectedProductId={product.id}
          onClose={() => setIsAddingCompetitor(false)}
          onAddCompetitor={onAddCompetitor}
        />
      )}
    </motion.div>
  );
};

export default ProductFeatures;
