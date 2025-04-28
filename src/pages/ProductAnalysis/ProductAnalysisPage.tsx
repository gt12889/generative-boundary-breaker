
import React from "react";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";
import ProductSearch from "./components/ProductSearch";
import ProductConfirmation from "./components/ProductConfirmation";
import ProductDetails from "./components/ProductDetails";
import { useState } from "react";

const ProductAnalysisPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [competitiveProducts, setCompetitiveProducts] = useState<any[]>([]);

  const handleReset = () => {
    setSelectedProduct(null);
    setIsConfirmed(false);
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
    <div className="container mx-auto px-4 py-12">
      <DemoNavigation />
      
      <div className="min-h-screen py-12">
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
          />
        )}
      </div>
    </div>
  );
};

export default ProductAnalysisPage;
