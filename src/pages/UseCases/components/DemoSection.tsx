
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Link } from "lucide-react";

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

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState(comparisons[0].id);
  const activeComparison = comparisons.find(c => c.id === activeTab) || comparisons[0];
  
  return (
    <div className="bg-gray-50 py-16 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">See a live demo</h2>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-2 border-b border-gray-200 mb-8 min-w-max">
            {comparisons.map((comparison) => (
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
              <TableRow className="bg-rose-50">
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
                  <TableCell key={`name-${platforms[platformIndex].id}`} className="p-4 border">
                    {platforms[platformIndex].name}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="p-4 border font-medium">Link</TableCell>
                {activeComparison.platforms.map((platformIndex) => (
                  <TableCell key={`link-${platforms[platformIndex].id}`} className="p-4 border text-blue-600 hover:underline">
                    <a href={platforms[platformIndex].link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
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
              <TableRow className="bg-rose-50">
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
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md"
          >
            Open demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
