
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    title: "Boundary Breaking AI",
    description: "Push the limits of what's possible with our advanced AI solutions",
  },
  {
    title: "Custom Solutions",
    description: "Tailored approaches to meet your unique challenges",
  },
  {
    title: "Industry Leading",
    description: "Stay ahead with cutting-edge technology",
  },
  {
    title: "Collaborative Growth",
    description: "Partner with experts to achieve your goals",
  },
];

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section relative bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
                Welcome to GenAI Ventures
              </span>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
                <span className="text-reveal">
                  <span>Breaking Boundaries</span>
                </span>
                <br />
                <span className="text-reveal" style={{ animationDelay: "0.1s" }}>
                  <span>with AI Solutions</span>
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
                Enabling unprecedented success through innovative AI solutions that tackle
                your most challenging problems.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <button className="px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20 animate-on-scroll">
            <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
              Features
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Transform Your Business
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass p-8 rounded-2xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Generation Section */}
      <section className="section bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
                Try It Out
              </span>
              <h2 className="mt-6 text-4xl font-bold text-gray-900">
                Experience AI in Action
              </h2>
            </div>
            <div className="space-y-6">
              <Textarea
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] text-lg"
              />
              <div className="flex justify-center">
                <Button
                  onClick={handleGenerate}
                  className="px-8 py-6 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Generate Response"}
                </Button>
              </div>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 rounded-2xl glass"
                >
                  <h3 className="text-xl font-semibold mb-4">AI Response:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-gradient-to-t from-rose-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
              Get Started
            </span>
            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Ready to Transform Your Future?
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              Contact us today to discover how our AI solutions can help you achieve
              unprecedented success.
            </p>
            <button className="mt-10 px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
