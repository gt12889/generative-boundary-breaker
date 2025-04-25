
// Mock product database for product analysis
export const mockProducts = [
  {
    id: "001",
    name: "Nike Air Max 270",
    category: "Shoes",
    brand: "Nike",
    price: 150,
    releaseDate: "2023-05-15",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: [
      {
        name: "Comfort",
        description: "Features React foam for a responsive, cushioned feel with every step.",
        score: 8.5
      },
      {
        name: "Durability",
        description: "Reinforced mesh upper and rubber outsole provide excellent longevity.",
        score: 9.0
      },
      {
        name: "Style",
        description: "Modern, trendy design with various colorways available.",
        score: 9.5
      },
      {
        name: "Breathability",
        description: "Engineered mesh allows for good airflow around the foot.",
        score: 7.5
      }
    ],
    competitors: [
      {
        name: "Adidas Ultraboost",
        comparisonScore: 7.8,
        comparisonNote: "More comfortable but less stylish and more expensive."
      },
      {
        name: "New Balance 990",
        comparisonScore: 4.5,
        comparisonNote: "Better quality materials but less trendy design."
      }
    ],
    aiSummary: "The Nike Air Max 270 stands out in the athletic footwear market with its exceptional blend of style, comfort, and versatility. The distinctive air bubble heel offers excellent impact protection while maintaining a fashionable silhouette. The shoe performs admirably for casual wear and light fitness activities but isn't designed for serious running or athletic performance.",
    bestFor: [
      "Casual everyday wear",
      "Streetwear fashion enthusiasts",
      "People who stand for long periods",
      "Urban environments"
    ],
    notRecommendedFor: [
      "Serious athletic training",
      "Long-distance running",
      "Trail hiking",
      "People with wide feet"
    ],
    alternatives: [
      {
        name: "Nike Air Force 1",
        reason: "If you prefer a more classic, versatile design."
      },
      {
        name: "Adidas NMD",
        reason: "If you want similar style with different cushioning technology."
      },
      {
        name: "Nike ZoomX Vaporfly",
        reason: "If you need a shoe specifically designed for running performance."
      }
    ]
  },
  {
    id: "002",
    name: "MacBook Air M3",
    category: "Laptops",
    brand: "Apple",
    price: 1199,
    releaseDate: "2023-11-07",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: [
      {
        name: "Performance",
        description: "M3 chip delivers exceptional speed and efficiency for everyday tasks.",
        score: 9.0
      },
      {
        name: "Battery Life",
        description: "Up to 18 hours of battery life with mixed usage.",
        score: 9.5
      },
      {
        name: "Display",
        description: "13.6-inch Liquid Retina display with P3 wide color.",
        score: 8.5
      },
      {
        name: "Portability",
        description: "Lightweight design at just 2.7 pounds with thin profile.",
        score: 9.8
      }
    ],
    competitors: [
      {
        name: "Dell XPS 13",
        comparisonScore: 3.5,
        comparisonNote: "Windows alternative with similar build quality but lower battery life."
      },
      {
        name: "Microsoft Surface Laptop 5",
        comparisonScore: 4.0,
        comparisonNote: "Touchscreen advantage but less powerful processor and ecosystem."
      }
    ],
    aiSummary: "The MacBook Air M3 represents Apple's most balanced laptop, offering remarkable performance in an ultra-portable design. The custom M3 silicon delivers exceptional power efficiency, allowing for intensive tasks without compromising battery life. The fanless design ensures silent operation, though it may limit sustained performance under extreme workloads. It excels as a premium everyday computer for professionals, students, and content creators who prioritize portability.",
    bestFor: [
      "Students and professionals on the go",
      "Apple ecosystem users",
      "Content creation like photo editing and video editing",
      "Long battery life requirements"
    ],
    notRecommendedFor: [
      "Intensive gaming",
      "Advanced 3D rendering and animation",
      "Users who need many ports without dongles",
      "Budget-conscious buyers"
    ],
    alternatives: [
      {
        name: "MacBook Pro",
        reason: "If you need more performance and don't mind the extra weight."
      },
      {
        name: "iPad Pro with Magic Keyboard",
        reason: "If you want even more portability and touchscreen functionality."
      },
      {
        name: "Asus ZenBook",
        reason: "If you prefer Windows and want similar portability at a lower price."
      }
    ]
  },
  {
    id: "003",
    name: "Sony WH-1000XM5",
    category: "Headphones",
    brand: "Sony",
    price: 399,
    releaseDate: "2022-05-20",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: [
      {
        name: "Noise Cancellation",
        description: "Industry-leading ANC with 8 microphones and dual processors.",
        score: 9.8
      },
      {
        name: "Sound Quality",
        description: "30mm drivers deliver rich, detailed audio across all frequencies.",
        score: 9.5
      },
      {
        name: "Battery Life",
        description: "Up to 30 hours of playback with ANC enabled.",
        score: 9.0
      },
      {
        name: "Comfort",
        description: "Lightweight design with plush ear cushions for extended wear.",
        score: 8.5
      }
    ],
    competitors: [
      {
        name: "Bose 700",
        comparisonScore: 4.5,
        comparisonNote: "Better microphone quality for calls but less impressive noise cancellation."
      },
      {
        name: "Apple AirPods Max",
        comparisonScore: 3.8,
        comparisonNote: "Better integration with Apple devices but higher price and less battery life."
      }
    ],
    aiSummary: "The Sony WH-1000XM5 headphones represent the pinnacle of wireless noise-canceling technology. With best-in-class ANC performance and exceptional sound quality, they excel in virtually all listening environments. The improved design offers better comfort for long sessions, while the upgraded microphone array delivers clearer calls in noisy environments. The intuitive touch controls and excellent companion app provide a premium user experience.",
    bestFor: [
      "Frequent travelers",
      "Office workers in noisy environments",
      "Audiophiles who appreciate detailed sound",
      "Long listening sessions"
    ],
    notRecommendedFor: [
      "Budget-conscious buyers",
      "Users who prioritize compact storage (they don't fold flat)",
      "Gaming (due to latency)",
      "Intense workout sessions"
    ],
    alternatives: [
      {
        name: "Sony WF-1000XM4",
        reason: "If you prefer true wireless earbuds with similar sound quality."
      },
      {
        name: "Bose QuietComfort Ultra",
        reason: "If call quality is your primary concern."
      },
      {
        name: "Apple AirPods Pro 2",
        reason: "If you're deep in the Apple ecosystem and prefer in-ear design."
      }
    ]
  },
  {
    id: "004",
    name: "iPhone 15 Pro",
    category: "Smartphones",
    brand: "Apple",
    price: 999,
    releaseDate: "2023-09-22",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1680262088802-8135fc655810?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: [
      {
        name: "Camera System",
        description: "Pro camera system with 48MP main, ultrawide, and telephoto lenses.",
        score: 9.7
      },
      {
        name: "Performance",
        description: "A17 Pro chip delivers desktop-class performance and efficiency.",
        score: 9.8
      },
      {
        name: "Design",
        description: "Titanium frame with matte glass back and Dynamic Island display.",
        score: 9.5
      },
      {
        name: "Ecosystem Integration",
        description: "Seamless integration with other Apple devices and services.",
        score: 10.0
      }
    ],
    competitors: [
      {
        name: "Samsung Galaxy S24 Ultra",
        comparisonScore: 6.5,
        comparisonNote: "Better zoom capabilities and customization but less refined ecosystem."
      },
      {
        name: "Google Pixel 8 Pro",
        comparisonScore: 4.8,
        comparisonNote: "Superior AI features but less powerful hardware and app ecosystem."
      }
    ],
    aiSummary: "The iPhone 15 Pro represents Apple's most refined smartphone to date, combining cutting-edge hardware with the company's tightly integrated software ecosystem. The A17 Pro chip delivers exceptional performance for both everyday tasks and demanding applications, while the camera system captures stunning photos and videos in virtually any lighting condition. The titanium frame reduces weight while improving durability, and the Dynamic Island provides an elegant solution for housing sensors while displaying contextual information.",
    bestFor: [
      "Apple ecosystem users",
      "Mobile photographers and videographers",
      "Power users who need reliable performance",
      "Those who value long-term software support"
    ],
    notRecommendedFor: [
      "Budget-conscious buyers",
      "Those who prefer extreme customization",
      "Users who need expandable storage",
      "People who prefer larger displays"
    ],
    alternatives: [
      {
        name: "iPhone 15",
        reason: "If you want most key features at a lower price point."
      },
      {
        name: "Samsung Galaxy S24+",
        reason: "If you prefer Android with a similar premium build quality."
      },
      {
        name: "Google Pixel 8",
        reason: "If you prioritize AI features and clean Android experience."
      }
    ]
  },
  {
    id: "005",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    brand: "Samsung",
    price: 1199,
    releaseDate: "2024-01-19",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    features: [
      {
        name: "S Pen Integration",
        description: "Built-in stylus with low latency and advanced features.",
        score: 9.8
      },
      {
        name: "Camera System",
        description: "Versatile quad camera with 200MP main sensor and 10x optical zoom.",
        score: 9.5
      },
      {
        name: "Display",
        description: "6.8-inch QHD+ Dynamic AMOLED 2X with adaptive 120Hz.",
        score: 9.7
      },
      {
        name: "AI Features",
        description: "Galaxy AI suite for productivity, creativity, and communication.",
        score: 9.0
      }
    ],
    competitors: [
      {
        name: "iPhone 15 Pro Max",
        comparisonScore: 5.5,
        comparisonNote: "Better video quality and ecosystem but less versatile hardware features."
      },
      {
        name: "Google Pixel 8 Pro",
        comparisonScore: 4.0,
        comparisonNote: "Better computational photography but less impressive hardware specs."
      }
    ],
    aiSummary: "The Samsung Galaxy S24 Ultra stands as the definitive Android powerhouse, combining versatile hardware with innovative AI-powered features. The titanium frame provides exceptional durability while maintaining a premium feel, and the integrated S Pen transforms productivity possibilities. The impressive camera system offers unmatched versatility with its 200MP main sensor and 10x optical zoom, while the Snapdragon 8 Gen 3 processor delivers blazing performance for any task.",
    bestFor: [
      "Power users who demand top specifications",
      "Mobile photographers who need versatile camera options",
      "Note-takers and creative professionals",
      "Users who multitask heavily on their devices"
    ],
    notRecommendedFor: [
      "Budget-conscious buyers",
      "Those who prefer compact phones",
      "Users who prefer simpler interfaces",
      "Apple ecosystem users"
    ],
    alternatives: [
      {
        name: "Samsung Galaxy S24+",
        reason: "If you want a similar experience without the S Pen and at a lower price."
      },
      {
        name: "iPhone 15 Pro Max",
        reason: "If you prefer iOS and the Apple ecosystem."
      },
      {
        name: "Google Pixel 8 Pro",
        reason: "If you want cleaner software and focus on AI photography."
      }
    ]
  }
];
