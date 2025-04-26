
import React, { useState, useRef, useEffect } from "react";
import { Search, Check, X, BookmarkPlus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { platforms, extendedComparisons } from "@/pages/UseCases/components/Demo/data";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";

// Mock product database
import { mockProducts } from "@/data/mockProducts";

const ProductAnalysis = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search input change
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

  // Handle click outside of search
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

  // Select a product from search results
  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setSearchQuery(product.name);
    setIsSearching(false);
  };

  // Reset the selection
  const handleReset = () => {
    setSelectedProduct(null);
    setIsConfirmed(false);
    setSearchQuery("");
  };

  // Confirm the selected product
  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  // Toggle bookmark status
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Render the search step
  const renderSearchStep = () => (
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
            className="pl-10 py-6 text-lg shadow-lg"
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
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );

  // Render the confirmation card
  const renderConfirmationCard = () => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="max-w-md mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Confirm Selection</CardTitle>
            <CardDescription>Is this the product you want to analyze?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted/10">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedProduct.category}</p>
                <p className="text-sm text-muted-foreground">ID: {selectedProduct.id}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline"
              onClick={handleReset}
            >
              <X className="mr-2 h-4 w-4" />
              Choose Different
            </Button>
            <Button 
              onClick={handleConfirm}
            >
              <Check className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );

  // Render the product analysis panels
  const renderProductAnalysis = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
    >
      {/* Left panel - Product overview */}
      <motion.div 
        className="md:col-span-3 bg-muted/10 border border-border rounded-lg p-6"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative mb-4">
          <div className="h-48 w-full rounded-lg overflow-hidden bg-muted/10">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="object-cover h-full w-full"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className={`absolute top-2 right-2 ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={handleBookmark}
          >
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>
        
        <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
        <div className="text-muted-foreground mb-4">
          <p className="text-sm">Category: {selectedProduct.category}</p>
          <p className="text-sm">Brand: {selectedProduct.brand}</p>
          <p className="text-sm">Price: ${selectedProduct.price}</p>
        </div>
        
        <div className="space-y-2">
          <div className="bg-muted/10 rounded p-2">
            <p className="text-sm text-muted-foreground">Release Date: {selectedProduct.releaseDate}</p>
          </div>
          <div className="bg-muted/10 rounded p-2">
            <p className="text-sm text-muted-foreground">Rating: {selectedProduct.rating}/5</p>
          </div>
        </div>
      </motion.div>
      
      {/* Middle panel - Feature breakdown */}
      <motion.div 
        className="md:col-span-5 bg-muted/10 border border-border rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4">Feature Breakdown</h2>
        
        <div className="space-y-4">
          {selectedProduct.features.map((feature: any, index: number) => (
            <div key={index} className="bg-muted/10 rounded-lg p-4">
              <h3 className="font-medium mb-2">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Score</span>
                  <span className="text-xs text-muted-foreground">{feature.score}/10</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${feature.score * 10}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Competitive Comparison</h3>
          
          {selectedProduct.competitors.map((competitor: any, index: number) => (
            <div key={index} className="bg-muted/10 rounded-lg p-4 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span>{competitor.name}</span>
                <span className={`text-sm ${competitor.comparisonScore > 5 ? 'text-green-500' : 'text-destructive'}`}>
                  {competitor.comparisonScore > 5 ? 'Better' : 'Worse'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{competitor.comparisonNote}</p>
              <div className="w-full bg-muted/20 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${competitor.comparisonScore > 5 ? 'bg-green-500' : 'bg-destructive'}`}
                  style={{ width: `${competitor.comparisonScore * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Right panel - AI summary */}
      <motion.div 
        className="md:col-span-4 bg-muted/10 border border-border rounded-lg p-6"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">AI-Powered Insights</h2>
        
        <div className="bg-muted/20 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-primary mb-2">Summary</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{selectedProduct.aiSummary}</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-muted/20 rounded-lg p-4">
            <h3 className="text-lg font-medium text-primary mb-2">Best For</h3>
            <ul className="text-muted-foreground text-sm space-y-2">
              {selectedProduct.bestFor.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-4">
            <h3 className="text-lg font-medium text-primary mb-2">Not Recommended For</h3>
            <ul className="text-muted-foreground text-sm space-y-2">
              {selectedProduct.notRecommendedFor.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <X className="h-4 w-4 mr-2 mt-0.5 text-destructive" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-4">
            <h3 className="text-lg font-medium text-primary mb-2">Alternative Suggestions</h3>
            <ul className="text-muted-foreground text-sm space-y-3">
              {selectedProduct.alternatives.map((item: any, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="font-medium mr-1">{item.name}:</span>
                  <span>{item.reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <DemoNavigation />
      
      <div className="min-h-screen py-12">
        {!selectedProduct && renderSearchStep()}
        {selectedProduct && !isConfirmed && renderConfirmationCard()}
        {selectedProduct && isConfirmed && renderProductAnalysis()}
      </div>
    </div>
  );
};

export default ProductAnalysis;
