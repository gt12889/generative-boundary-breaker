
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { mockProducts } from "@/data/mockProducts";

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
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a product to compare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        {searchQuery.length > 1 && (
          <div className="mt-2 max-h-64 overflow-y-auto">
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup heading="Products">
                  {filteredCompetitors.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => {
                        onAddCompetitor(product);
                        onClose();
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="h-8 w-8 mr-2 rounded object-cover"
                      />
                      <span>{product.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitorSearch;
