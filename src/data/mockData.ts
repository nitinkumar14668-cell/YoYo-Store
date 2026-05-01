export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface AppModel {
  id: string;
  title: string;
  developer: string;
  category: string;
  description: string;
  iconUrl: string;
  screenshots: string[];
  rating: number;
  reviewsCount: number;
  downloads: number;
  size: number; // bytes
  price: number; // 0 for free
  hasInAppPurchases: boolean;
  version: string;
  lastUpdated: string;
  featured?: boolean;
  reviews: Review[];
}

const generateMockReviews = (count: number): Review[] => {
  const reviews: Review[] = [];
  const comments = [
    "Amazing app, really useful!",
    "Great graphics, but crashes sometimes.",
    "Worth the premium price.",
    "Best in its category.",
    "Needs more features.",
    "Absolutely love it!",
    "Not bad, but ads are annoying.",
    "Smooth and fast experience."
  ];
  const users = ["Alex", "Nitin", "Samantha", "JohnDoe", "Gamer99", "TechEnthusiast", "Sarah"];
  
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `rev_${Math.random().toString(36).substr(2, 9)}`,
      user: users[Math.floor(Math.random() * users.length)],
      rating: Math.max(1, Math.floor(Math.random() * 5) + 1),
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
    });
  }
  return reviews;
};

export const categories = [
  "Games", "Productivity", "Social", "Entertainment", "Education", "Health & Fitness", "Photography", "Utilities"
];

const mockAppsBase: AppModel[] = [
  {
    id: "app_1",
    title: "Cyber Strike: Neon Battle",
    developer: "Nexus Studios",
    category: "Games",
    description: "Immerse yourself in a neon-lit cyberpunk world. High-paced action, multiplayer arenas, and character customization.",
    iconUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=256&h=256",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200"
    ],
    rating: 4.8,
    reviewsCount: 1250040,
    downloads: 54000000,
    size: 2147483648, // 2GB
    price: 0,
    hasInAppPurchases: true,
    version: "2.5.1",
    lastUpdated: "2026-04-15",
    featured: true,
    reviews: generateMockReviews(3)
  },
  {
    id: "app_2",
    title: "ProTaskify",
    developer: "Workflow Dynamics",
    category: "Productivity",
    description: "The ultimate team productivity and task management suite. Manage projects, collaborate in real-time, and track progress.",
    iconUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=256&h=256",
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
    ],
    rating: 4.5,
    reviewsCount: 85400,
    downloads: 2500000,
    size: 52428800, // 50MB
    price: 4.99,
    hasInAppPurchases: false,
    version: "1.2.0",
    lastUpdated: "2026-03-20",
    featured: true,
    reviews: generateMockReviews(3)
  },
  {
    id: "app_3",
    title: "SocialVibe",
    developer: "Vibe Inc.",
    category: "Social",
    description: "Connect with friends, share updates, and discover new communities. A truly immersive social media experience without the noise.",
    iconUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=256&h=256",
    screenshots: [
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=1200"
    ],
    rating: 4.2,
    reviewsCount: 3500000,
    downloads: 150000000,
    size: 85000000,
    price: 0,
    hasInAppPurchases: true,
    version: "5.10.3",
    lastUpdated: "2026-05-01",
    featured: false,
    reviews: generateMockReviews(4)
  },
  {
    id: "app_4",
    title: "Zenith Photo Editor",
    developer: "PixelCrafters",
    category: "Photography",
    description: "Professional-grade photo editing on your device. Advanced filters, AI object removal, and raw file processing.",
    iconUrl: "https://images.unsplash.com/photo-1554046920-90dcac82410a?auto=format&fit=crop&q=80&w=256&h=256",
    screenshots: [
      "https://images.unsplash.com/photo-1554046920-90dcac82410a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200"
    ],
    rating: 4.9,
    reviewsCount: 120500,
    downloads: 8000000,
    size: 150000000,
    price: 0,
    hasInAppPurchases: true,
    version: "3.4.2",
    lastUpdated: "2026-04-28",
    featured: true,
    reviews: generateMockReviews(5)
  },
  {
    id: "app_5",
    title: "BrainBoost Math",
    developer: "EduMind",
    category: "Education",
    description: "Learn math through gamified challenges. Suited for all ages, featuring competitive leaderboards and daily puzzles.",
    iconUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=256&h=256",
    screenshots: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=1200"
    ],
    rating: 4.6,
    reviewsCount: 45000,
    downloads: 1200000,
    size: 45000000,
    price: 1.99,
    hasInAppPurchases: false,
    version: "2.0.1",
    lastUpdated: "2026-02-14",
    featured: false,
    reviews: generateMockReviews(3)
  }
];

// Generate fake massive library representation
export const generateApps = (count: number, categoryMask?: string): AppModel[] => {
  const generated: AppModel[] = [];
  const developers = ["NovaTech", "GlobalSoft", "IndieX", "FutureApps", "Nexus Studios", "PixelCrafters"];
  const words = ["Pro", "Max", "Ultra", "Lite", "Plus", "Connect", "Master", "Hub", "Zone", "Flow"];
  const icons = [
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1607252656733-fd7455822ce0?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1579389083046-d3ce19b88dbb?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=256&h=256",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=256&h=256"
  ];
  
  for (let i = 0; i < count; i++) {
    const category = categoryMask || categories[Math.floor(Math.random() * categories.length)];
    const isPremium = Math.random() > 0.8;
    const hasIAP = Math.random() > 0.5;
    
    generated.push({
      id: `gen_app_${Math.random().toString(36).substr(2, 9)}_${i}`,
      title: `${category} ${words[Math.floor(Math.random() * words.length)]} ${Math.floor(Math.random() * 100)}`,
      developer: developers[Math.floor(Math.random() * developers.length)],
      category: category,
      description: `A fantastic new ${category.toLowerCase()} app to enhance your daily experience. Featuring amazing design and solid performance.`,
      iconUrl: icons[Math.floor(Math.random() * icons.length)],
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=1200"
      ],
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      reviewsCount: Math.floor(Math.random() * 100000),
      downloads: Math.floor(Math.random() * 5000000) + 1000,
      size: Math.floor(Math.random() * 1073741824) + 10485760, // 10MB to 1.1GB
      price: isPremium ? Number((Math.random() * 9 + 0.99).toFixed(2)) : 0,
      hasInAppPurchases: hasIAP,
      version: `1.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      lastUpdated: new Date(Date.now() - Math.random() * 31536000000).toISOString().split('T')[0],
      featured: Math.random() > 0.95,
      reviews: generateMockReviews(Math.floor(Math.random() * 3) + 1)
    });
  }
  return generated;
};

export const defaultApps = [...mockAppsBase, ...generateApps(20)];
