
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { productColors } from '../../data/usageData';

interface ProductSelectorProps {
  products: string[];
  selectedProduct?: string;
  selectedProducts?: string[];
  onSelectProduct?: (product: string) => void;
  onToggleProduct?: (product: string) => void;
  onRemoveProduct?: (product: string) => void;
  multiSelect?: boolean;
  getProductData?: Record<string, any>;
}

const ProductSelector = ({ 
  products, 
  selectedProduct, 
  selectedProducts,
  onSelectProduct,
  onToggleProduct,
  onRemoveProduct,
  multiSelect = false,
  getProductData
}: ProductSelectorProps) => {
  
  const getProductColor = (productName: string) => {
    return productColors[productName as keyof typeof productColors] || productColors.default;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {products.map(product => {
        if (multiSelect && selectedProducts) {
          return (
            <Button 
              key={product}
              variant={selectedProducts.includes(product) ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleProduct && onToggleProduct(product)}
              style={{ 
                backgroundColor: selectedProducts.includes(product) ? getProductColor(product) : 'transparent',
                color: selectedProducts.includes(product) ? 'white' : undefined,
              }}
            >
              {product}
              {selectedProducts.includes(product) && selectedProducts.length > 1 && onRemoveProduct && (
                <X className="h-3 w-3 ml-1" onClick={(e) => {
                  e.stopPropagation();
                  onRemoveProduct(product);
                }} />
              )}
            </Button>
          );
        } else if (onSelectProduct && selectedProduct) {
          return (
            <Button 
              key={product}
              variant={selectedProduct === product ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectProduct(product)}
              style={{ 
                borderColor: getProductColor(product), 
                borderWidth: selectedProduct === product ? 0 : 1 
              }}
            >
              {product}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ProductSelector;
