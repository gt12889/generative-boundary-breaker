
export interface Platform {
  id: string;
  name: string;
  icon: string;
  link: string;
  tagline: string;
  description: string;
  useCases: string[];
  keyFeatures: string[];
}

export interface Comparison {
  id: string;
  label: string;
  platforms: number[];
}

export const platforms: Platform[] = [
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

const comparisons: Comparison[] = [
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
export const extendedComparisons: Comparison[] = [
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
