export interface AppModel {
  id: string; // appId
  title: string;
  developer: string;
  developerId?: string;
  category: string;
  description: string;
  iconUrl: string;
  screenshots: string[];
  rating: number;
  reviewsCount: number;
  downloads: number | string;
  size: number | string; // bytes
  price: number; // 0 for free
  hasInAppPurchases: boolean;
  version: string;
  lastUpdated: string;
  featured?: boolean;
  reviews?: any[]; // For simplicity
}

const mapApp = (app: any): AppModel => {
  return {
    id: app.appId || app.id || Math.random().toString(),
    title: app.title || "",
    developer: app.developer || "Unknown Developer",
    developerId: app.developerId,
    category: (app.genreId && app.genreId.includes('GAME')) ? 'Games' : (app.genre || "Apps"),
    description: app.descriptionHTML || app.description || app.summary || "",
    iconUrl: app.icon || "https://via.placeholder.com/256",
    screenshots: app.screenshots || [],
    rating: app.score || 0,
    reviewsCount: app.reviews || 0,
    downloads: app.installs || app.minInstalls || 0,
    size: app.size || "Varies with device",
    price: app.price || 0,
    hasInAppPurchases: app.offersIAP || false,
    version: app.version || "Varies",
    lastUpdated: app.updated ? new Date(app.updated).toLocaleDateString() : "Recently",
    featured: app.editorsChoice || false,
    reviews: [] // can fetch later by wrapping gplay.reviews
  };
};

export const fetchTopApps = async (collection?: string, category?: string, num = 30): Promise<AppModel[]> => {
  const url = new URL("/api/apps", window.location.origin);
  if (collection) url.searchParams.append("collection", collection);
  if (category) url.searchParams.append("category", category);
  url.searchParams.append("num", num.toString());
  
  const res = await fetch(url.toString());
  const data = await res.json();
  return Array.isArray(data) ? data.map(mapApp) : [];
};

export const searchApps = async (query: string, num = 30): Promise<AppModel[]> => {
  const url = new URL("/api/search", window.location.origin);
  url.searchParams.append("q", query);
  url.searchParams.append("num", num.toString());
  
  const res = await fetch(url.toString());
  const data = await res.json();
  return Array.isArray(data) ? data.map(mapApp) : [];
};

export const fetchAppDetails = async (id: string): Promise<AppModel | null> => {
  const url = new URL("/api/app", window.location.origin);
  url.searchParams.append("id", id);
  
  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  return mapApp(data);
};
