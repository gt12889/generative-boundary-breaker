
import React, { useState, useEffect } from "react";
import ProductSummary from "./ProductSummary";
import ProductFeatures from "./ProductFeatures";
import ProductInsights from "./ProductInsights";
import ProductComparison from "./ProductComparison";
import CompetitorSearch from "./CompetitorSearch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Download, BookmarkPlus, Check, Plus, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ProductDetailsProps {
  product: any;
  competitiveProducts: any[];
  onAddCompetitor: (competitor: any) => void;
  onRemoveCompetitor: (competitorId: string) => void;
  onReset: () => void;
}

const ProductDetails = ({
  product,
  competitiveProducts,
  onAddCompetitor,
  onRemoveCompetitor,
  onReset
}: ProductDetailsProps) => {
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  
  // Generate AI summary when products change
  useEffect(() => {
    if (competitiveProducts.length > 0) {
      generateAiSummary();
    } else {
      setAiSummary("");
    }
  }, [competitiveProducts.length]);
  
  const handleShare = () => {
    // Mock share functionality
    toast.success("Share link copied to clipboard!");
  };

  const handleDownload = () => {
    // Mock download functionality
    toast.success("Analysis report is being downloaded!");
  };

  const handleSave = () => {
    // Mock save functionality
    toast.success("Analysis saved to your bookmarks!");
  };

  const generateAiSummary = async () => {
    try {
      setIsGeneratingSummary(true);
      
      // Create a summary prompt based on product and competitors
      const featuresDiff = product.features.map((feature: any) => {
        const competitorFeatures = competitiveProducts
          .map((comp) => {
            const matchingFeature = comp.features.find((f: any) => f.name === feature.name);
            if (matchingFeature) {
              return `${comp.name}: ${matchingFeature.score}/10`;
            }
            return null;
          })
          .filter(Boolean)
          .join(", ");

        return `${feature.name}: ${product.name} (${feature.score}/10) vs ${competitorFeatures}`;
      }).join("; ");

      const prompt = `
        Provide a brief, insightful summary (max 3 sentences) of the key differences between ${product.name} and its competitors (${competitiveProducts.map(c => c.name).join(", ")}).
        Focus on standout features and competitive advantages based on this data:
        Price: ${product.name}: $${product.price} vs ${competitiveProducts.map(c => `${c.name}: $${c.price}`).join(", ")}.
        Features comparison: ${featuresDiff}.
        Be concise, objective, and highlight the most significant differences.
      `;

      // Fetch the AI-generated summary
      const response = await fetch('/api/generate-with-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI summary');
      }

      const data = await response.json();
      setAiSummary(data.generatedText || "");
    } catch (error) {
      console.error('Error generating AI summary:', error);
      toast.error("Could not generate AI summary. Please try again.");
      setAiSummary("");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10 py-2 px-2 rounded-lg border border-border"
      >
        <Button 
          variant="ghost" 
          className="flex items-center gap-2" 
          onClick={onReset}
        >
          <ArrowLeft className="h-4 w-4" />
          New Analysis
        </Button>
        <h2 className="text-xl font-semibold text-center">{product.name} Analysis</h2>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleSave}>
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList className="justify-start mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingCompetitor(true)}
              className="flex items-center gap-2 mb-6"
            >
              <Plus className="h-4 w-4" />
              Add Competitor
            </Button>
          </div>
          
          <TabsContent value="overview">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* AI Summary Section - New Addition */}
              {competitiveProducts.length > 0 && (
                <div className="mb-6">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">AI Comparative Analysis</h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={generateAiSummary}
                        disabled={isGeneratingSummary}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className={`h-4 w-4 ${isGeneratingSummary ? "animate-spin" : ""}`} />
                        Regenerate
                      </Button>
                    </div>
                    
                    {isGeneratingSummary ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <p>Generating summary...</p>
                        </div>
                      </div>
                    ) : aiSummary ? (
                      <Alert className="bg-muted/40">
                        <AlertDescription className="text-foreground">
                          {aiSummary}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert>
                        <AlertDescription>
                          Click "Regenerate" to create an AI-powered comparison summary.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <ProductSummary product={product} />
                <div className="md:col-span-9">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm h-full">
                    <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
                    <p className="text-muted-foreground mb-6">
                      {product.description || `The ${product.name} is a premium ${product.category} device from ${product.brand}, 
                      featuring cutting-edge technology and exceptional design. It offers outstanding performance and value for its price point of $${product.price}.`}
                    </p>
                    
                    <h3 className="font-semibold mb-2">Key Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {product.specifications?.map((spec: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{spec.name}</p>
                            <p className="text-xs text-muted-foreground">{spec.value}</p>
                          </div>
                        </div>
                      )) || (
                        <>
                          <div className="flex items-start gap-2">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Performance</p>
                              <p className="text-xs text-muted-foreground">Top-tier processing power</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Display</p>
                              <p className="text-xs text-muted-foreground">High-resolution screen with vibrant colors</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Battery Life</p>
                              <p className="text-xs text-muted-foreground">Long-lasting with fast charging</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Build Quality</p>
                              <p className="text-xs text-muted-foreground">Premium materials and craftsmanship</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-2">Target Audience</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.targetAudience?.map((audience: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{audience}</Badge>
                      )) || (
                        <>
                          <Badge variant="secondary">Professionals</Badge>
                          <Badge variant="secondary">Enthusiasts</Badge>
                          <Badge variant="secondary">Content Creators</Badge>
                        </>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-2">Market Position</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.marketPosition || `The ${product.name} positions itself as a premium offering in the ${product.category} market, 
                      competing directly with high-end alternatives while providing distinctive features that set it apart 
                      from the competition.`}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Competitive Analysis in Overview Tab */}
              {competitiveProducts.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Quick Competitive Comparison</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[product, ...competitiveProducts].map((item) => (
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
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="features">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductFeatures
                product={product}
                competitiveProducts={competitiveProducts}
                onAddCompetitor={onAddCompetitor}
                onRemoveCompetitor={onRemoveCompetitor}
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {competitiveProducts.length > 0 ? (
                <ProductComparison 
                  mainProduct={product} 
                  competitors={competitiveProducts} 
                />
              ) : (
                <div className="bg-card border border-border rounded-lg p-8 text-center shadow-sm">
                  <h3 className="text-lg font-medium mb-2">No Competitors Added</h3>
                  <p className="text-muted-foreground mb-4">
                    Click the "Add Competitor" button to add products for comparison.
                  </p>
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
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="insights">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductInsights 
                product={product} 
                competitors={competitiveProducts.length > 0 ? competitiveProducts : undefined}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* CompetitorSearch modal */}
      <AnimatePresence>
        {isAddingCompetitor && (
          <CompetitorSearch
            selectedProductId={product.id}
            onClose={() => setIsAddingCompetitor(false)}
            onAddCompetitor={onAddCompetitor}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
