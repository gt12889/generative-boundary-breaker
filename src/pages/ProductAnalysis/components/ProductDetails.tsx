
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CompetitorSearch from "./CompetitorSearch";
import DetailHeader from "./details/DetailHeader";
import TabNavigation from "./details/TabNavigation";
import TabContent from "./details/TabContent";
import { useAISummary } from "../hooks/useAISummary";

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
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);
  const { aiSummary, isGeneratingSummary, generateSummary } = useAISummary(product, competitiveProducts);
  
  const handleAddCompetitor = () => {
    setIsAddingCompetitor(true);
  };

  return (
    <div className="space-y-8">
      <DetailHeader productName={product.name} onReset={onReset} />

      <div className="flex justify-between items-center mb-4">
        <TabNavigation onAddCompetitor={handleAddCompetitor}>
          <TabContent 
            product={product}
            competitiveProducts={competitiveProducts}
            aiSummary={aiSummary}
            isGeneratingSummary={isGeneratingSummary}
            onGenerateSummary={generateSummary}
            onAddCompetitor={handleAddCompetitor}
            onRemoveCompetitor={onRemoveCompetitor}
          />
        </TabNavigation>
      </div>
      
      {/* CompetitorSearch modal */}
      <AnimatePresence>
        {isAddingCompetitor && (
          <CompetitorSearch
            selectedProductId={product.id}
            onClose={() => setIsAddingCompetitor(false)}
            onAddCompetitor={onAddCompetitor}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
