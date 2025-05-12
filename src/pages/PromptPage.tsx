
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle, Sparkles, List, LayoutGrid } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("summary");
  const [priorityFactor, setPriorityFactor] = useState("balanced");
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
        body: JSON.stringify({ 
          prompt,
          priority: priorityFactor 
        }),
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  Back to Home
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Return to homepage
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <ThemeToggle />
        </div>
        
        <div className="text-center mb-12">
          <span className="text-rose-600 font-medium tracking-wider text-sm uppercase animate-fade-in">
            AI Prompt
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl font-heading">
            Experience AI in Action
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Enter your prompt below and let our AI generate a response for you.
          </p>
        </div>
        
        <div className="space-y-8">
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] text-lg rounded-2xl border-gray-200 focus:border-rose-500 transition-all duration-300 shadow-sm hover:shadow"
            disabled={isLoading}
          />
          
          <div className="space-y-4 bg-white p-6 rounded-2xl shadow-soft">
            <h3 className="font-medium text-lg font-heading">Priority Factor</h3>
            <RadioGroup 
              value={priorityFactor} 
              onValueChange={setPriorityFactor}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="speed" id="r1" className="text-rose-500" />
                <label htmlFor="r1" className="text-sm font-medium">Speed</label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="balanced" id="r2" className="text-rose-500" />
                <label htmlFor="r2" className="text-sm font-medium">Balanced</label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="quality" id="r3" className="text-rose-500" />
                <label htmlFor="r3" className="text-sm font-medium">Quality</label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleGenerate}
              className="px-8 py-6 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Response
                  <Sparkles className="ml-2 h-4 w-4 transition-all duration-300 group-hover:rotate-12" />
                </>
              )}
            </Button>
          </div>
          
          {aiResponse && (
            <div className="mt-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold font-heading">AI Response:</h3>
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)} className="bg-gray-100 p-1 rounded-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ToggleGroupItem value="summary" aria-label="Toggle summary view" className="transition-all duration-300 data-[state=on]:bg-white data-[state=on]:shadow-sm rounded-full">
                          <List className="h-4 w-4" />
                        </ToggleGroupItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        Summary View
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ToggleGroupItem value="detailed" aria-label="Toggle detailed view" className="transition-all duration-300 data-[state=on]:bg-white data-[state=on]:shadow-sm rounded-full">
                          <LayoutGrid className="h-4 w-4" />
                        </ToggleGroupItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        Detailed View
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </ToggleGroup>
              </div>
              
              <div className="p-8 rounded-2xl bg-white shadow-soft">
                {viewMode === "summary" ? (
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge variant="pro" className="animate-slide-in">Key Point 1</Badge>
                      <Badge variant="pro" className="animate-slide-in" style={{ animationDelay: "0.1s" }}>Key Point 2</Badge>
                      <Badge variant="con" className="animate-slide-in" style={{ animationDelay: "0.2s" }}>Consideration</Badge>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <h4 className="font-medium mb-3 font-heading">Related Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="neutral" className="animate-slide-in">Topic 1</Badge>
                        <Badge variant="neutral" className="animate-slide-in" style={{ animationDelay: "0.1s" }}>Topic 2</Badge>
                        <Badge variant="neutral" className="animate-slide-in" style={{ animationDelay: "0.2s" }}>Topic 3</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {isLoading && !aiResponse && (
            <div className="mt-8 p-8 rounded-2xl bg-white shadow-soft animate-pulse">
              <h3 className="text-xl font-semibold font-heading mb-6">Generating response...</h3>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
