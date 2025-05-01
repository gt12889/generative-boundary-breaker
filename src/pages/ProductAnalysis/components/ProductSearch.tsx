
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { mockProducts } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";

interface ProductSearchProps {
  onSelectProduct: (product: any) => void;
}

const ProductSearch = ({ onSelectProduct }: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [featuredCategories, setFeaturedCategories] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get unique categories for featured sections
    const uniqueCategories = Array.from(
      new Set(mockProducts.map(product => product.category))
    ).slice(0, 4);
    setFeaturedCategories(uniqueCategories);
    
    if (searchQuery.length > 1) {
      setFilteredProducts(
        mockProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Product Analysis</h1>
        <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
          Enter a product name to analyze its features, compare with competitors, and get AI-powered recommendations for your next purchase decision.
        </p>
      </div>
      
      <div className="relative" ref={searchRef}>
        <div className="flex items-center relative">
          <Input
            type="text"
            placeholder="What product would you like to analyze?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg shadow-sm"
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
                        className="flex items-center gap-3 px-3 py-3 cursor-pointer"
                      >
                        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 border border-border">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{product.name}</span>
                            <Badge variant="outline" className="text-xs">${product.price}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{product.category}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{product.brand}</span>
                          </div>
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

      {/* Featured categories */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredCategories.map((category, idx) => {
            const productsInCategory = mockProducts.filter(p => p.category === category).slice(0, 3);
            return (
              <div key={idx} className="border border-border rounded-lg p-4 bg-card shadow-sm">
                <h3 className="font-medium mb-3">{category}</h3>
                <div className="space-y-3">
                  {productsInCategory.map(product => (
                    <div 
                      key={product.id} 
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <div className="h-10 w-10 rounded overflow-hidden border border-border/50">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSearch;
