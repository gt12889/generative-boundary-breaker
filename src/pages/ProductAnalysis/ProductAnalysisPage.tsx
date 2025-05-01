
import React from "react";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";
import ProductSearch from "./components/ProductSearch";
import ProductConfirmation from "./components/ProductConfirmation";
import ProductDetails from "./components/ProductDetails";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductAnalysisPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [competitiveProducts, setCompetitiveProducts] = useState<any[]>([]);

  const handleReset = () => {
    setSelectedProduct(null);
    setIsConfirmed(false);
    setCompetitiveProducts([]);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleAddCompetitor = (competitor: any) => {
    setCompetitiveProducts(prev => [...prev, competitor]);
  };

  const handleRemoveCompetitor = (competitorId: string) => {
    setCompetitiveProducts(prev => prev.filter(p => p.id !== competitorId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Product Analysis</h1>
        <p className="text-center text-muted-foreground mb-6">
          Compare features, specifications, and user experiences for popular products
        </p>
        <DemoNavigation />
      </motion.div>
      
      <div className="min-h-screen pb-12">
        {!selectedProduct && (
          <ProductSearch onSelectProduct={setSelectedProduct} />
        )}
        {selectedProduct && !isConfirmed && (
          <ProductConfirmation
            product={selectedProduct}
            onConfirm={handleConfirm}
            onReset={handleReset}
          />
        )}
        {selectedProduct && isConfirmed && (
          <ProductDetails
            product={selectedProduct}
            competitiveProducts={competitiveProducts}
            onAddCompetitor={handleAddCompetitor}
            onRemoveCompetitor={handleRemoveCompetitor}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default ProductAnalysisPage;
