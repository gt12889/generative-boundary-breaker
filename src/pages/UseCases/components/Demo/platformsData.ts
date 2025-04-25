import { Platform } from './types';

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
    },
    roleSpecificUseCase: {
      startup: ["Team collaboration setup", "Knowledge management system"],
      'data-scientist': ["Data documentation", "Research organization"],
      enterprise: ["Company-wide wiki", "Process documentation"]
    },
    roleSpecificStrengths: {
      startup: ["Quick setup", "Flexible workspace"],
      'data-scientist': ["Data organization", "Integration capabilities"],
      enterprise: ["Scalable permissions", "Enterprise security"]
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
    },
    roleSpecificUseCase: {
      startup: ["Quick note capture", "Document organization"],
      'data-scientist': ["Research collection", "OCR data extraction"],
      enterprise: ["Corporate knowledge base", "Document compliance"]
    },
    roleSpecificStrengths: {
      startup: ["Easy adoption", "Mobile-first"],
      'data-scientist': ["OCR capabilities", "Search functionality"],
      enterprise: ["Enterprise security", "Team collaboration"]
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
    },
    roleSpecificUseCase: {
      startup: ["Quick store setup", "Multi-channel selling"],
      'data-scientist': ["Analytics integration", "Customer data analysis"],
      enterprise: ["Large-scale commerce", "Multi-store management"]
    },
    roleSpecificStrengths: {
      startup: ["Fast launch", "Built-in marketing"],
      'data-scientist': ["Rich analytics", "Data export options"],
      enterprise: ["High availability", "Enterprise support"]
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
    },
    roleSpecificUseCase: {
      startup: ["Cost-effective launch", "Content marketing focus"],
      'data-scientist': ["Custom reporting", "Data ownership"],
      enterprise: ["Self-hosted solution", "Complete customization"]
    },
    roleSpecificStrengths: {
      startup: ["Low initial cost", "WordPress ecosystem"],
      'data-scientist': ["Full data control", "Custom analytics"],
      enterprise: ["Complete ownership", "Unlimited customization"]
    }
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    icon: "📱",
    link: "https://www.apple.com/iphone-15-pro/",
    tagline: "Titanium. So strong. So light. So Pro.",
    description: "The iPhone 15 Pro features a groundbreaking design with aerospace-grade titanium, the A17 Pro chip, and a pro camera system.",
    useCases: [
      "Professional mobile photography",
      "High-performance mobile gaming",
      "Vision Pro-ready spatial video recording"
    ],
    keyFeatures: [
      "6.1\" Super Retina XDR OLED, 120Hz ProMotion",
      "A17 Pro (3nm) chip with 8GB RAM",
      "48MP Main + 12MP Ultra-Wide + 12MP Telephoto",
      "Titanium frame with Ceramic Shield",
      "20W wired, 15W MagSafe wireless charging"
    ],
    scores: {
      ux: 95,
      scalability: 85,
      ecosystem: 98,
      cost: 70,
      aiSupport: 85
    },
    roleSpecificUseCase: {
      startup: ["Quick content creation", "Business video calls", "Mobile productivity"],
      'data-scientist': ["On-device ML processing", "Data visualization", "Mobile analytics"],
      enterprise: ["Secure communications", "Corporate device management", "Digital ID and access"]
    },
    roleSpecificStrengths: {
      startup: ["Reliable performance", "Premium build quality", "Ecosystem integration"],
      'data-scientist': ["Neural Engine capabilities", "Processing power", "Security features"],
      enterprise: ["MDM support", "Long software support", "Data protection"]
    }
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    icon: "📱",
    link: "https://www.samsung.com/galaxy-s24-ultra/",
    tagline: "The ultimate Galaxy AI phone",
    description: "The Galaxy S24 Ultra combines powerful AI capabilities with professional-grade camera features and S Pen functionality.",
    useCases: [
      "AI-powered photography and editing",
      "Professional mobile productivity",
      "Creative digital art with S Pen"
    ],
    keyFeatures: [
      "6.8\" QHD+ Dynamic AMOLED 2X, 120Hz",
      "Snapdragon 8 Gen 3 with 12GB RAM",
      "200MP Main + 12MP Ultra-Wide + Dual Telephoto",
      "45W fast charging support",
      "Built-in S Pen with Air Command"
    ],
    scores: {
      ux: 90,
      scalability: 88,
      ecosystem: 85,
      cost: 65,
      aiSupport: 95
    },
    roleSpecificUseCase: {
      startup: ["AI-powered productivity", "Multi-tasking workflow", "Professional presentations"],
      'data-scientist': ["AI model testing", "Large screen data analysis", "Mobile development"],
      enterprise: ["Document scanning & editing", "Video conferencing", "Digital signatures"]
    },
    roleSpecificStrengths: {
      startup: ["Advanced AI features", "Multitasking capability", "S Pen productivity"],
      'data-scientist': ["AI processing power", "Large display", "DeX desktop mode"],
      enterprise: ["Knox security", "7-year updates", "Enterprise solutions"]
    }
  },
  {
    id: "nike-af1",
    name: "Nike Air Force 1",
    icon: "👟",
    link: "https://nike.com",
    tagline: "Iconic streetwear staple with endless style potential",
    description: "A legendary basketball shoe turned streetwear icon, known for its versatile style and durability.",
    useCases: ["Casual wear", "Streetwear", "Fashion statements", "Everyday use"],
    keyFeatures: [
      "Premium leather upper",
      "Durable rubber outsole",
      "Air cushioning",
      "Wide range of colorways",
      "Roomier fit for comfort"
    ],
    scores: {
      ux: 90,
      scalability: 85,
      ecosystem: 95,
      cost: 75,
      aiSupport: 80
    },
    roleSpecificUseCase: {
      startup: ["Brand building", "Team uniforms"],
      "data-scientist": ["Trend analysis"],
      enterprise: ["Corporate casual"]
    },
    roleSpecificStrengths: {
      startup: ["Versatile", "Recognizable"],
      "data-scientist": ["Consistent", "Reliable"],
      enterprise: ["Professional", "Comfortable"]
    }
  },
  {
    id: "adidas-stan-smith",
    name: "Adidas Stan Smith",
    icon: "👟",
    link: "https://adidas.com",
    tagline: "Minimalist design meets timeless style",
    description: "A versatile tennis shoe that became a fashion staple, known for its clean design and adaptability.",
    useCases: ["Casual wear", "Semi-formal", "Fashion", "Daily use"],
    keyFeatures: [
      "Full-grain leather upper",
      "Rubber cupsole",
      "Classic design",
      "Structured fit",
      "Iconic colorways"
    ],
    scores: {
      ux: 85,
      scalability: 80,
      ecosystem: 90,
      cost: 85,
      aiSupport: 75
    },
    roleSpecificUseCase: {
      startup: ["Office wear", "Casual meetings"],
      "data-scientist": ["Comfort for long hours"],
      enterprise: ["Business casual"]
    },
    roleSpecificStrengths: {
      startup: ["Clean look", "Affordable"],
      "data-scientist": ["Comfortable", "Durable"],
      enterprise: ["Professional", "Versatile"]
    }
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    icon: "🎧",
    link: "https://sony.com",
    tagline: "Industry-leading noise cancellation and sound quality",
    description: "Premium wireless headphones with exceptional noise cancellation and long battery life.",
    useCases: ["Travel", "Work", "Music", "Calls"],
    keyFeatures: [
      "30-hour battery life",
      "Industry-leading ANC",
      "Lightweight design",
      "Multi-device pairing",
      "Touch controls"
    ],
    scores: {
      ux: 95,
      scalability: 90,
      ecosystem: 85,
      cost: 70,
      aiSupport: 95
    },
    roleSpecificUseCase: {
      startup: ["Remote work", "Travel"],
      "data-scientist": ["Focus work", "Long sessions"],
      enterprise: ["Business travel", "Virtual meetings"]
    },
    roleSpecificStrengths: {
      startup: ["Portable", "Versatile"],
      "data-scientist": ["Noise isolation", "Comfort"],
      enterprise: ["Professional", "Reliable"]
    }
  },
  {
    id: "bose-700",
    name: "Bose 700",
    icon: "🎧",
    link: "https://bose.com",
    tagline: "Crystal clear calls and premium comfort",
    description: "Premium noise-cancelling headphones with exceptional call quality and modern design.",
    useCases: ["Calls", "Work", "Travel", "Music"],
    keyFeatures: [
      "20-hour battery life",
      "11 ANC levels",
      "Premium build quality",
      "Touch controls",
      "Superior call clarity"
    ],
    scores: {
      ux: 90,
      scalability: 85,
      ecosystem: 80,
      cost: 75,
      aiSupport: 90
    },
    roleSpecificUseCase: {
      startup: ["Remote meetings", "Office use"],
      "data-scientist": ["Concentration work", "Analysis"],
      enterprise: ["Conference calls", "Business travel"]
    },
    roleSpecificStrengths: {
      startup: ["Professional", "Clear communication"],
      "data-scientist": ["Focus", "Comfort"],
      enterprise: ["Call quality", "Build quality"]
    }
  },
  {
    id: "apple-watch",
    name: "Apple Watch Series 9",
    icon: "⌚",
    link: "https://apple.com",
    tagline: "The ultimate iPhone companion",
    description: "Advanced smartwatch with comprehensive health tracking and seamless iOS integration.",
    useCases: ["Health tracking", "Notifications", "Fitness", "Communication"],
    keyFeatures: [
      "Always-On Retina display",
      "Comprehensive health tracking",
      "iOS integration",
      "18-hour battery life",
      "Emergency features"
    ],
    scores: {
      ux: 95,
      scalability: 85,
      ecosystem: 100,
      cost: 70,
      aiSupport: 90
    },
    roleSpecificUseCase: {
      startup: ["Task management", "Health monitoring"],
      "data-scientist": ["Data collection", "Health metrics"],
      enterprise: ["Communication", "Calendar management"]
    },
    roleSpecificStrengths: {
      startup: ["Connected", "Efficient"],
      "data-scientist": ["Data rich", "Analytical"],
      enterprise: ["Professional", "Productive"]
    }
  },
  {
    id: "garmin-venu",
    name: "Garmin Venu 3",
    icon: "⌚",
    link: "https://garmin.com",
    tagline: "Advanced fitness tracking with exceptional battery life",
    description: "Premium fitness smartwatch with comprehensive sports analytics and long battery life.",
    useCases: ["Sports tracking", "Health monitoring", "Training", "Navigation"],
    keyFeatures: [
      "14-day battery life",
      "Advanced sports metrics",
      "AMOLED display",
      "GPS navigation",
      "Sleep tracking"
    ],
    scores: {
      ux: 85,
      scalability: 90,
      ecosystem: 80,
      cost: 75,
      aiSupport: 85
    },
    roleSpecificUseCase: {
      startup: ["Activity tracking", "Wellness programs"],
      "data-scientist": ["Data analysis", "Performance metrics"],
      enterprise: ["Health initiatives", "Team activities"]
    },
    roleSpecificStrengths: {
      startup: ["Durable", "Feature-rich"],
      "data-scientist": ["Detailed metrics", "Data export"],
      enterprise: ["Reliable", "Long-lasting"]
    }
  }
];
