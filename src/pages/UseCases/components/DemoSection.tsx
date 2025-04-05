
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Link, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const platforms = [
  {
    id: "platform1",
    name: "AI Assistant Pro",
    icon: "🤖",
    link: "https://example.com/ai-assistant",
    tagline: "Intelligent automation for your business processes",
    description: "AI Assistant Pro is a comprehensive platform that helps businesses automate repetitive tasks and extract insights from data. It features natural language processing, computer vision, and predictive analytics capabilities.",
    useCases: [
      "Customer Service Automation",
      "Data Analysis",
      "Document Processing",
      "Knowledge Management",
      "Predictive Maintenance"
    ],
    keyFeatures: [
      "Natural Language Understanding",
      "Machine Learning Models",
      "API Integrations",
      "Custom Training",
      "Analytics Dashboard"
    ]
  },
  {
    id: "platform2",
    name: "SmartAI",
    icon: "🧠",
    link: "https://example.com/smartai",
    tagline: "Transform your data into actionable insights",
    description: "SmartAI is an enterprise-grade platform for creating and deploying AI models at scale. It provides tools for data scientists and business users to collaborate on AI projects and implement solutions quickly.",
    useCases: [
      "Predictive Analytics",
      "Recommendation Systems",
      "Fraud Detection",
      "Text Classification",
      "Image Recognition"
    ],
    keyFeatures: [
      "Automated Machine Learning",
      "Model Management",
      "Data Pipeline Automation",
      "Explainable AI",
      "Deployment Tooling"
    ]
  },
  {
    id: "platform3",
    name: "Cognitive Cloud",
    icon: "☁️",
    link: "https://example.com/cognitive-cloud",
    tagline: "AI-powered cloud services for modern enterprises",
    description: "Cognitive Cloud provides a suite of AI services on a cloud-native platform. It enables organizations to build, train, and deploy machine learning models with minimal infrastructure management.",
    useCases: [
      "Business Process Automation",
      "Content Management",
      "Customer Experience",
      "Risk Analysis",
      "Supply Chain Optimization"
    ],
    keyFeatures: [
      "Cloud-native Architecture",
      "Serverless Functions",
      "Pre-trained Models",
      "Continuous Learning",
      "Enterprise Security"
    ]
  },
  {
    id: "platform4",
    name: "InsightEngine",
    icon: "💡",
    link: "https://example.com/insightengine",
    tagline: "Turn complex data into simple insights",
    description: "InsightEngine specializes in transforming complex data from multiple sources into actionable business insights. It uses advanced analytics and AI to identify patterns, anomalies, and opportunities.",
    useCases: [
      "Business Intelligence",
      "Market Research",
      "Competitive Analysis",
      "Customer Segmentation",
      "Performance Monitoring"
    ],
    keyFeatures: [
      "Data Visualization",
      "Anomaly Detection",
      "Trend Analysis",
      "Automated Reporting",
      "Multi-source Integration"
    ]
  }
];

const comparisons = [
  {
    id: "ai-assistants",
    label: "AI Assistant Pro vs SmartAI",
    platforms: [0, 1]
  },
  {
    id: "cloud-platforms",
    label: "Cognitive Cloud vs InsightEngine",
    platforms: [2, 3]
  },
  {
    id: "enterprise-solutions",
    label: "AI Assistant Pro vs Cognitive Cloud",
    platforms: [0, 2]
  },
  {
    id: "analysis-tools",
    label: "SmartAI vs InsightEngine",
    platforms: [1, 3]
  }
];

// Adding more comparisons to match the image better
const extendedComparisons = [
  ...comparisons,
  {
    id: "assistant-vs-engine",
    label: "AI Assistant Pro vs InsightEngine",
    platforms: [0, 3]
  },
  {
    id: "smart-vs-cognitive",
    label: "SmartAI vs Cognitive Cloud",
    platforms: [1, 2]
  },
  {
    id: "all-platforms",
    label: "All AI Platforms",
    platforms: [0, 1, 2, 3]
  }
];

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState(extendedComparisons[0].id);
  const activeComparison = extendedComparisons.find(c => c.id === activeTab) || extendedComparisons[0];
  
  return (
    <div className="bg-white py-16 rounded-lg border border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">See a live demo</h2>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-2 mb-8 min-w-max border-b overflow-x-auto whitespace-nowrap">
            {extendedComparisons.map((comparison) => (
              <button
                key={comparison.id}
                onClick={() => setActiveTab(comparison.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === comparison.id
                    ? "text-rose-600 border-b-2 border-rose-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {comparison.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table className="border-collapse w-full">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-left p-4 font-semibold text-gray-700 w-1/6">Overview</TableHead>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableHead key={platforms[platformIndex].id} className="text-left p-4 font-semibold text-gray-700">
                    {platforms[platformIndex].name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-4 border font-medium">Icon</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`icon-${platforms[platformIndex].id}`} className="p-4 border text-3xl">
                    {platforms[platformIndex].icon}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Name</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`name-${platforms[platformIndex].id}`} className="p-4 border font-medium">
                    {platforms[platformIndex].name}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Link</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`link-${platforms[platformIndex].id}`} className="p-4 border text-blue-600">
                    <a href={platforms[platformIndex].link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                      {platforms[platformIndex].link.replace('https://', '')}
                      <Link size={14} />
                    </a>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Tagline</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`tagline-${platforms[platformIndex].id}`} className="p-4 border">
                    {platforms[platformIndex].tagline}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Description</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`desc-${platforms[platformIndex].id}`} className="p-4 border">
                    {platforms[platformIndex].description}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-left p-4 font-semibold text-gray-700">Product</TableHead>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableHead key={`product-${platforms[platformIndex].id}`} className="text-left p-4 font-semibold text-gray-700">
                    {platforms[platformIndex].name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-4 border font-medium">Name</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`product-name-${platforms[platformIndex].id}`} className="p-4 border">
                    {platforms[platformIndex].name}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Link</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`product-link-${platforms[platformIndex].id}`} className="p-4 border text-blue-600">
                    <a href={platforms[platformIndex].link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                      {platforms[platformIndex].link.replace('https://', '')}
                      <Link size={14} />
                    </a>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Use Cases</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`usecase-${platforms[platformIndex].id}`} className="p-4 border">
                    <ul className="list-disc pl-5 space-y-1">
                      {platforms[platformIndex].useCases.map((useCase, i) => (
                        <li key={i}>{useCase}</li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Key Features</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`features-${platforms[platformIndex].id}`} className="p-4 border">
                    <ul className="list-disc pl-5 space-y-1">
                      {platforms[platformIndex].keyFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-10 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md gap-2"
              >
                Open demo
                <ExternalLink size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>AI Platform Comparison Demo</DialogTitle>
                <DialogDescription>
                  Interactive demo of AI platform features and capabilities
                </DialogDescription>
              </DialogHeader>
              <div className="py-6">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeComparison.platforms.map((platformIndex) => (
                      <div key={platforms[platformIndex].id} className="border p-6 rounded-lg bg-gray-50">
                        <div className="text-3xl mb-4">{platforms[platformIndex].icon}</div>
                        <h3 className="text-xl font-bold mb-2">{platforms[platformIndex].name}</h3>
                        <p className="text-gray-600 mb-4">{platforms[platformIndex].tagline}</p>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Key Features:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {platforms[platformIndex].keyFeatures.slice(0, 3).map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <a 
                          href={platforms[platformIndex].link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-rose-600 hover:text-rose-800 flex items-center gap-1"
                        >
                          Visit website <ExternalLink size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-rose-50 rounded-lg">
                    <p className="text-center text-gray-700">
                      This is an interactive demo of our comparison tool. In a real implementation,
                      you would be able to explore detailed features, pricing, and customer reviews.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
