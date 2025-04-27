import React, { useState, useRef, useEffect } from "react";
import { Search, Check, X, BookmarkPlus, ArrowRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { platforms, extendedComparisons } from "@/pages/UseCases/components/Demo/data";
import DemoNavigation from "@/pages/UseCases/components/Demo/DemoNavigation";
import { mockProducts } from "@/data/mockProducts";

const ProductAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [competitiveProducts, setCompetitiveProducts] = useState<any[]>([]);
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);
  const [competitorSearchQuery, setCompetitorSearchQuery] = useState("");
  const [filteredCompetitors, setFilteredCompetitors] = useState<any[]>([]);
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

  useEffect(() => {
    if (competitorSearchQuery.length > 1) {
      setFilteredCompetitors(
        mockProducts.filter(product => 
          product.name.toLowerCase().includes(competitorSearchQuery.toLowerCase()) &&
          product.id !== selectedProduct?.id
        )
      );
    }
  }, [competitorSearchQuery, selectedProduct]);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    setSearchQuery(product.name);
    setIsSearching(false);
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setIsConfirmed(false);
    setSearchQuery("");
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleAddCompetitor = (competitor: any) => {
    setCompetitiveProducts(prev => [...prev, competitor]);
    setIsAddingCompetitor(false);
    setCompetitorSearchQuery("");
  };

  const handleRemoveCompetitor = (competitorId: string) => {
    setCompetitiveProducts(prev => prev.filter(p => p.id !== competitorId));
  };

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

  const renderProductAnalysis = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
    >
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
      
      <motion.div 
        className="md:col-span-5 bg-muted/10 border border-border rounded-lg p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Feature Breakdown</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingCompetitor(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Competitor
          </Button>
        </div>

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
        
        {competitiveProducts.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium mb-3">Competitive Analysis</h3>
            {competitiveProducts.map((competitor) => (
              <div key={competitor.id} className="bg-muted/10 rounded-lg p-4 relative">
                <button
                  onClick={() => handleRemoveCompetitor(competitor.id)}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={competitor.image}
                    alt={competitor.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{competitor.name}</h4>
                    <p className="text-sm text-muted-foreground">{competitor.category}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {competitor.features.map((feature: any, idx: number) => (
                    <div key={idx} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>{feature.name}</span>
                        <span className="text-muted-foreground">{feature.score}/10</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${feature.score * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      
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

  const renderCompetitorSearch = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-md p-6 rounded-lg shadow-lg border relative">
        <button
          onClick={() => {
            setIsAddingCompetitor(false);
            setCompetitorSearchQuery("");
          }}
          className="absolute top-4 right-4"
        >
          <X className="h-4 w-4" />
        </button>
        
        <h3 className="text-lg font-semibold mb-4">Add Competitive Product</h3>
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a product to compare..."
            value={competitorSearchQuery}
            onChange={(e) => setCompetitorSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        {competitorSearchQuery.length > 1 && (
          <div className="mt-2 max-h-64 overflow-y-auto">
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup heading="Products">
                  {filteredCompetitors.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => handleAddCompetitor(product)}
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

  return (
    <div className="container mx-auto px-4 py-12">
      <DemoNavigation />
      
      <div className="min-h-screen py-12">
        {!selectedProduct && renderSearchStep()}
        {selectedProduct && !isConfirmed && renderConfirmationCard()}
        {selectedProduct && isConfirmed && renderProductAnalysis()}
        {isAddingCompetitor && renderCompetitorSearch()}
      </div>
    </div>
  );
};

export default ProductAnalysis;
