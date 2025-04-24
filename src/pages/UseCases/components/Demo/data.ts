export interface Platform {
  id: string;
  name: string;
  icon: string;
  link: string;
  tagline: string;
  description: string;
  useCases: string[];
  keyFeatures: string[];
  scores: {
    ux: number;
    scalability: number;
    cost: number;
    ecosystem: number;
    aiSupport: number;
  };
  roleSpecificUseCase: {
    startup: string[];
    'data-scientist': string[];
    enterprise: string[];
  };
  roleSpecificStrengths: {
    startup: string[];
    'data-scientist': string[];
    enterprise: string[];
  };
}

export interface Comparison {
  id: string;
  label: string;
  platforms: number[];
  aiSummary: string;
}

export const platforms: Platform[] = [
  {
    id: "tesla",
    name: "Tesla Inc.",
    icon: "🚗",
    link: "https://tesla.com",
    tagline: "Accelerating the world's transition to sustainable energy",
    description: "Industry leader in EVs with global reach, diverse product line, and vertically integrated supply chain.",
    useCases: [
      "EV Fleet Deployment",
      "AI-Driven Autopilot",
      "Energy Grid Integration"
    ],
    keyFeatures: [
      "Advanced battery technology",
      "Autonomous driving software",
      "Global infrastructure (Gigafactories)",
      "Strong brand recognition"
    ],
    scores: {
      ux: 90,
      scalability: 85,
      cost: 40,
      ecosystem: 75,
      aiSupport: 95
    },
    roleSpecificUseCase: {
      startup: ["Quick market entry with established charging network", "Access to proven EV technology"],
      'data-scientist': ["Rich autonomous driving data analysis", "Battery performance optimization"],
      enterprise: ["Large-scale fleet management", "Predictable maintenance schedules"]
    },
    roleSpecificStrengths: {
      startup: ["Strong brand association", "Established market presence"],
      'data-scientist': ["Advanced AI capabilities", "Rich telemetry data"],
      enterprise: ["Proven scalability", "Comprehensive service network"]
    }
  },
  {
    id: "rivian",
    name: "Rivian Automotive Inc.",
    icon: "🌲",
    link: "https://rivian.com",
    tagline: "Keep the world adventurous forever",
    description: "Electric truck startup focused on off-road vehicles with emphasis on sustainability and tech innovation.",
    useCases: [
      "Adventure EVs",
      "Eco-Conscious Consumer Mobility",
      "Commercial Delivery Fleets"
    ],
    keyFeatures: [
      "Unique market focus (trucks/SUVs)",
      "Environmental branding",
      "Amazon partnership",
      "Agile startup culture"
    ],
    scores: {
      ux: 85,
      scalability: 60,
      cost: 45,
      ecosystem: 65,
      aiSupport: 80
    },
    roleSpecificUseCase: {
      startup: ["Niche market targeting", "Early adopter appeal"],
      'data-scientist': ["EV performance analytics", "Usage pattern analysis"],
      enterprise: ["Custom fleet solutions", "Sustainable transport initiatives"]
    },
    roleSpecificStrengths: {
      startup: ["Innovation-first approach", "Strong sustainability story"],
      'data-scientist': ["Modern data architecture", "Advanced analytics platform"],
      enterprise: ["Flexible fleet customization", "Direct manufacturer relationship"]
    }
  },
  {
    id: "notion",
    name: "Notion",
    icon: "🧱",
    link: "https://notion.so",
    tagline: "All-in-one workspace for notes, docs, and collaboration",
    description: "A flexible tool combining docs, wikis, databases, and task management — popular with startups and remote teams.",
    useCases: [
      "Remote Team Wiki",
      "Personal Productivity Hub",
      "Startup Knowledge Base"
    ],
    keyFeatures: [
      "Customizable templates",
      "Integrates docs, tasks, and databases",
      "Sleek design",
      "Strong user community"
    ],
    scores: {
      ux: 85,
      scalability: 80,
      cost: 75,
      ecosystem: 90,
      aiSupport: 85
    }
  },
  {
    id: "evernote",
    name: "Evernote",
    icon: "🐘",
    link: "https://evernote.com",
    tagline: "Remember everything, organize anything",
    description: "A pioneer in note-taking with strong OCR and tagging capabilities — geared toward individual and enterprise productivity.",
    useCases: [
      "Research Notes",
      "Document Archiving",
      "Enterprise Knowledge Capture"
    ],
    keyFeatures: [
      "Advanced search with OCR",
      "Mature mobile experience",
      "Long-term data reliability",
      "Scalable for enterprises"
    ],
    scores: {
      ux: 75,
      scalability: 85,
      cost: 65,
      ecosystem: 70,
      aiSupport: 70
    }
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: "🛍️",
    link: "https://shopify.com",
    tagline: "The platform commerce is built on",
    description: "Hosted all-in-one ecommerce solution known for ease of use, scalability, and rapid deployment.",
    useCases: [
      "DTC Brands",
      "Subscription Products",
      "Multichannel Retail"
    ],
    keyFeatures: [
      "Plug-and-play simplicity",
      "Powerful app ecosystem",
      "Excellent uptime and security",
      "Fast global checkout"
    ],
    scores: {
      ux: 95,
      scalability: 90,
      cost: 60,
      ecosystem: 95,
      aiSupport: 85
    }
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    icon: "🔌",
    link: "https://woocommerce.com",
    tagline: "The customizable, open-source eCommerce platform built on WordPress",
    description: "WordPress plugin offering open-source flexibility, ideal for content-first businesses and developers.",
    useCases: [
      "Small Businesses",
      "Content-Driven Stores",
      "Customizable Marketplaces"
    ],
    keyFeatures: [
      "Fully open-source",
      "Tight WordPress integration",
      "More control over customization",
      "No monthly fees"
    ],
    scores: {
      ux: 70,
      scalability: 85,
      cost: 90,
      ecosystem: 85,
      aiSupport: 65
    }
  }
];

export const extendedComparisons: Comparison[] = [
  {
    id: "ev-comparison",
    label: "Tesla vs. Rivian",
    platforms: [0, 1],
    aiSummary: "Tesla leads in technology maturity and global presence, with superior AI capabilities and established infrastructure. Rivian offers a compelling alternative with a focused niche in adventure vehicles and strong environmental credentials, though it faces scaling challenges. Tesla's edge in autonomous driving and battery tech makes it the safer choice for mass-market EVs, while Rivian appeals to outdoor enthusiasts and those seeking a fresh approach to sustainable transport."
  },
  {
    id: "note-taking",
    label: "Notion vs. Evernote",
    platforms: [2, 3],
    aiSummary: "Notion excels in modern collaboration features and flexibility, making it ideal for teams and project management. Evernote maintains an edge in personal note-taking and document scanning with superior OCR capabilities. While Notion offers more customization and better team features, Evernote provides a more straightforward, reliable experience for individual users focused on pure note-taking and research."
  },
  {
    id: "ecommerce",
    label: "Shopify vs. WooCommerce",
    platforms: [4, 5],
    aiSummary: "Shopify offers a more polished, all-in-one solution ideal for businesses wanting a quick start and managed hosting. WooCommerce provides greater customization and cost-effectiveness but requires more technical expertise. For most non-technical merchants, Shopify's ease of use and integrated features make it the better choice, while developers and cost-conscious owners may prefer WooCommerce's flexibility."
  }
];
