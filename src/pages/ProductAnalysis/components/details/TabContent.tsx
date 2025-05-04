
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import AISummary from "./AISummary";
import ProductOverview from "./ProductOverview";
import QuickComparison from "./QuickComparison";
import ProductFeatures from "../ProductFeatures";
import ProductComparison from "../ProductComparison";
import ProductInsights from "../ProductInsights";
import NoCompetitorView from "./NoCompetitorView";

interface TabContentProps {
  product: any;
  competitiveProducts: any[];
  aiSummary: string;
  isGeneratingSummary: boolean;
  onGenerateSummary: () => void;
  onAddCompetitor: () => void;
  onRemoveCompetitor: (competitorId: string) => void;
}

const TabContent = ({
  product,
  competitiveProducts,
  aiSummary,
  isGeneratingSummary,
  onGenerateSummary,
  onAddCompetitor,
  onRemoveCompetitor
}: TabContentProps) => {
  return (
    <AnimatePresence mode="wait">
      <TabsContent value="overview">
        <AISummary 
          aiSummary={aiSummary}
          isGeneratingSummary={isGeneratingSummary}
          onGenerateSummary={onGenerateSummary}
          competitiveProducts={competitiveProducts}
        />
        <ProductOverview 
          product={product} 
          competitiveProducts={competitiveProducts}
        />
        <QuickComparison 
          product={product}
          competitiveProducts={competitiveProducts}
        />
      </TabsContent>
      
      <TabsContent value="features">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProductFeatures
            product={product}
            competitiveProducts={competitiveProducts}
            onAddCompetitor={onAddCompetitor}
            onRemoveCompetitor={onRemoveCompetitor}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="comparison">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {competitiveProducts.length > 0 ? (
            <ProductComparison 
              mainProduct={product} 
              competitors={competitiveProducts} 
            />
          ) : (
            <NoCompetitorView onAddCompetitor={onAddCompetitor} />
          )}
        </motion.div>
      </TabsContent>
      
      <TabsContent value="insights">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProductInsights 
            product={product} 
            competitors={competitiveProducts.length > 0 ? competitiveProducts : undefined}
          />
        </motion.div>
      </TabsContent>
    </AnimatePresence>
  );
};

export default TabContent;
