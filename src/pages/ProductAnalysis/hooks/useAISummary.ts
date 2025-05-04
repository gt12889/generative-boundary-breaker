
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useAISummary = (product: any, competitiveProducts: any[]) => {
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  
  useEffect(() => {
    if (competitiveProducts.length > 0) {
      generateSummary();
    } else {
      setAiSummary("");
    }
  }, [competitiveProducts.length]);

  const generateSummary = async () => {
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

  return {
    aiSummary,
    isGeneratingSummary,
    generateSummary
  };
};
