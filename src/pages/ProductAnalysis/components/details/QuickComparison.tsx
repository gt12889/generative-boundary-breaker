
import React from "react";

interface QuickComparisonProps {
  product: any;
  competitiveProducts: any[];
}

const QuickComparison = ({ product, competitiveProducts }: QuickComparisonProps) => {
  if (competitiveProducts.length === 0) return null;
  
  const allProducts = [product, ...competitiveProducts];
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Quick Competitive Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {allProducts.map((item) => (
          <div 
            key={item.id} 
            className={`bg-card border rounded-lg p-4 ${item.id === product.id ? 'border-primary/50 shadow-md' : 'border-border'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded overflow-hidden border border-border/50 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.brand}</p>
              </div>
            </div>
            
            <div className="space-y-2 mt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">${item.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating:</span>
                <span className="font-medium">{item.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Released:</span>
                <span className="font-medium">{item.releaseDate}</span>
              </div>
            </div>
            
            {item.id === product.id && (
              <div className="mt-2 text-xs text-primary font-medium text-center pt-2 border-t border-border/50">
                Current Selection
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickComparison;
