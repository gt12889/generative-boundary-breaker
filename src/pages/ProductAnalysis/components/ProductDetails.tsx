
import React from "react";
import ProductSummary from "./ProductSummary";
import ProductFeatures from "./ProductFeatures";
import ProductInsights from "./ProductInsights";

interface ProductDetailsProps {
  product: any;
  competitiveProducts: any[];
  onAddCompetitor: (competitor: any) => void;
  onRemoveCompetitor: (competitorId: string) => void;
}

const ProductDetails = ({
  product,
  competitiveProducts,
  onAddCompetitor,
  onRemoveCompetitor
}: ProductDetailsProps) => {
  return (
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
  );
};

export default ProductDetails;
