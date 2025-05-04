
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "The prompt cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-with-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      setAiResponse(data.generatedText);
      toast({
        title: "Success",
        description: "AI response generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-8">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="mb-8"
      >
        Back to Home
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
            AI Prompt
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Experience AI in Action
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Enter your prompt below and let our AI generate a response for you.
          </p>
        </div>
        
        <div className="space-y-6">
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] text-lg"
            disabled={isLoading}
          />
          <div className="flex justify-center">
            <Button
              onClick={handleGenerate}
              className="px-8 py-6 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Response"
              )}
            </Button>
          </div>
          
          {isLoading && !aiResponse && (
            <div className="mt-8 p-6 rounded-2xl bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Generating response...</h3>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
            </div>
          )}
          
          {aiResponse && (
            <div className="mt-8 p-6 rounded-2xl bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">AI Response:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
