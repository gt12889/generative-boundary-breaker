
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { mockProducts } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";

interface CompetitorSearchProps {
  selectedProductId: string;
  onClose: () => void;
  onAddCompetitor: (competitor: any) => void;
}

const CompetitorSearch = ({ selectedProductId, onClose, onAddCompetitor }: CompetitorSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompetitors, setFilteredCompetitors] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setFilteredCompetitors(
        mockProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          product.id !== selectedProductId
        )
      );
    } else {
      // When no search query, show related products from same category
      const selectedProduct = mockProducts.find(p => p.id === selectedProductId);
      if (selectedProduct) {
        setFilteredCompetitors(
          mockProducts.filter(product => 
            product.category === selectedProduct.category &&
            product.id !== selectedProductId
          ).slice(0, 5)
        );
      }
    }
  }, [searchQuery, selectedProductId]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-md p-6 rounded-lg shadow-lg border relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X className="h-4 w-4" />
        </button>
        
        <h3 className="text-lg font-semibold mb-4">Add Competitive Product</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Search for a product to compare or select from suggested competitors
        </p>
        
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search for a product to compare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          <Command className="rounded-lg border shadow-md">
            <CommandList>
              <CommandEmpty>No products found.</CommandEmpty>
              <CommandGroup heading={searchQuery ? "Search Results" : "Suggested Competitors"}>
                {filteredCompetitors.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => {
                      onAddCompetitor(product);
                      onClose();
                    }}
                    className="flex items-center cursor-pointer p-2"
                  >
                    <div className="h-10 w-10 rounded overflow-hidden mr-3 border border-border">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{product.category}</span>
                        <Badge variant="outline" className="text-xs">
                          ${product.price}
                        </Badge>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
};

export default CompetitorSearch;
