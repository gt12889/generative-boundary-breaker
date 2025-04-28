
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { mockProducts } from "@/data/mockProducts";

interface ProductSearchProps {
  onSelectProduct: (product: any) => void;
}

const ProductSearch = ({ onSelectProduct }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      setFilteredProducts(
        mockProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSelectProduct = (product: any) => {
    onSelectProduct(product);
    setSearchQuery(product.name);
    setIsSearching(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto text-center"
    >
      <h1 className="text-4xl font-bold mb-6 text-foreground">Product Analysis</h1>
      <p className="text-lg mb-8 text-muted-foreground">
        Enter a product name to analyze its features, compare with competitors, and get AI-powered recommendations.
      </p>
      
      <div className="relative" ref={searchRef}>
        <div className="flex items-center relative">
          <Input
            type="text"
            placeholder="What product would you like to analyze?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        
        {isSearching && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-1 w-full z-50"
            >
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Search products..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Products">
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => handleSelectProduct(product)}
                        className="flex items-center gap-2 px-2 py-2 cursor-pointer"
                      >
                        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 border border-border">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs text-muted-foreground">{product.category}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default ProductSearch;
