
import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CompetitorSearchProps {
  selectedProductId: string;
  onClose: () => void;
  onAddCompetitor: (competitor: any) => void;
}

const CompetitorSearch = ({ selectedProductId, onClose, onAddCompetitor }: CompetitorSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  // Filter out the currently selected product
  useEffect(() => {
    const eligibleProducts = mockProducts.filter(p => p.id !== selectedProductId);
    
    if (!searchTerm) {
      setFilteredProducts(eligibleProducts);
      return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = eligibleProducts.filter(product =>
      product.name.toLowerCase().includes(lowerSearchTerm) ||
      product.brand.toLowerCase().includes(lowerSearchTerm) ||
      product.category.toLowerCase().includes(lowerSearchTerm)
    );
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedProductId]);

  const handleAddCompetitor = (competitor: any) => {
    onAddCompetitor(competitor);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-card rounded-lg shadow-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-medium">Add Competitor</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search competitors by name, brand, or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="overflow-y-auto max-h-[50vh]">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">No matching competitors found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center border border-border/50 rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleAddCompetitor(product)}
                  >
                    <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0 border border-border/50 mr-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                        <span className="truncate">{product.brand}</span>
                        <span className="mx-1">•</span>
                        <span className="truncate">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-border flex justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompetitorSearch;
