
import React from "react";
import ProductSummary from "./ProductSummary";
import ProductFeatures from "./ProductFeatures";
import ProductInsights from "./ProductInsights";
import ProductComparison from "./ProductComparison";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ProductDetailsProps {
  product: any;
  competitiveProducts: any[];
  onAddCompetitor: (competitor: any) => void;
  onRemoveCompetitor: (competitorId: string) => void;
  onReset: () => void;
}

const ProductDetails = ({
  product,
  competitiveProducts,
  onAddCompetitor,
  onRemoveCompetitor,
  onReset
}: ProductDetailsProps) => {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <Button 
          variant="ghost" 
          className="flex items-center gap-2" 
          onClick={onReset}
        >
          <ArrowLeft className="h-4 w-4" />
          New Analysis
        </Button>
        <h2 className="text-xl font-semibold text-center">{product.name} Analysis</h2>
        <div className="w-[100px]"></div> {/* Spacer for centering */}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ProductSummary product={product} />
        <ProductFeatures
          product={product}
          competitiveProducts={competitiveProducts}
          onAddCompetitor={onAddCompetitor}
          onRemoveCompetitor={onRemoveCompetitor}
        />
        <ProductInsights product={product} />
      </div>

      {competitiveProducts.length > 0 && (
        <ProductComparison 
          mainProduct={product} 
          competitors={competitiveProducts} 
        />
      )}
    </div>
  );
};

export default ProductDetails;
