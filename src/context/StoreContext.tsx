"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppModel, fetchTopApps, searchApps } from '../lib/api';

interface DownloadState {
  progress: number;
  status: 'idle' | 'downloading' | 'installing' | 'completed' | 'error';
}

interface StoreContextType {
  apps: AppModel[];
  featuredApps: AppModel[];
  searchHistory: string[];
  downloads: Record<string, DownloadState>;
  addSearchRecord: (query: string) => void;
  clearSearchHistory: () => void;
  startDownload: (appId: string, app: AppModel) => void; // Need app to be passed in to mock download since we don't have full list matching sometimes
  getAppById: (id: string) => AppModel | undefined;
  loadMoreApps: (category?: string) => Promise<void>;
  isLoading: boolean;
  searchStore: (query: string) => Promise<AppModel[]>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<AppModel[]>([]);
  const [featuredApps, setFeaturedApps] = useState<AppModel[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<Record<string, DownloadState>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Since apps might not contain everything (e.g. searching), we want to store them by ID too.
  const [appCache, setAppCache] = useState<Record<string, AppModel>>({});

  useEffect(() => {
    const hist = localStorage.getItem('yoyo_search_history');
    if (hist) {
      try {
        setSearchHistory(JSON.parse(hist));
      } catch (e) {}
    }

    // Initial Load
    const loadInitial = async () => {
      setIsLoading(true);
      try {
        const topAll = await fetchTopApps('TOP_FREE', 'APPLICATION', 24);
        const topGames = await fetchTopApps('TOP_FREE', 'GAME', 12);
        
        const allFetched = [...topAll, ...topGames];
        
        // Remove duplicates and save
        const unique = Array.from(new Map(allFetched.map(item => [item.id, item])).values());
        
        setApps(unique);
        setFeaturedApps(unique.slice(0, 5).map(a => ({...a, featured: true})));

        const newCache = { ...appCache };
        unique.forEach(a => newCache[a.id] = a);
        setAppCache(newCache);
      } catch (e) {
        console.error("Failed to load initial apps", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitial();
  }, []);

  const addSearchRecord = (query: string) => {
    if (!query.trim()) return;
    const newHist = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
    setSearchHistory(newHist);
    localStorage.setItem('yoyo_search_history', JSON.stringify(newHist));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('yoyo_search_history');
  };

  const startDownload = (appId: string, app: AppModel) => {
    if (downloads[appId]?.status === 'downloading') return;
    
    setDownloads(prev => ({ ...prev, [appId]: { progress: 0, status: 'downloading' } }));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloads(prev => ({ ...prev, [appId]: { progress: 100, status: 'installing' } }));
        
        // Mock install delay
        setTimeout(() => {
          setDownloads(prev => ({ ...prev, [appId]: { progress: 100, status: 'completed' } }));
          // Mock save file to user's disk
          if (app) {
            const blob = new Blob([`Dummy data for ${app.title} app installation package.`], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${app.title.replace(/\\s+/g, '_')}_v${app.version}.apk`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, 1500);
      } else {
        setDownloads(prev => ({ ...prev, [appId]: { progress, status: 'downloading' } }));
      }
    }, 400);
  };

  const getAppById = (id: string) => appCache[id];

  const loadMoreApps = async (category?: string) => {
    setIsLoading(true);
    let newApps: AppModel[] = [];
    if (category === 'Games') {
      newApps = await fetchTopApps('NEW_FREE', 'GAME', 30);
    } else if (category === 'Apps') {
      newApps = await fetchTopApps('NEW_FREE', 'APPLICATION', 30);
    } else {
      newApps = await fetchTopApps('TOP_FREE', undefined, 30);
    }
    
    setApps(prev => {
      const combined = [...prev, ...newApps];
      return Array.from(new Map(combined.map(item => [item.id, item])).values());
    });

    const newCache = { ...appCache };
    newApps.forEach(a => newCache[a.id] = a);
    setAppCache(newCache);
    setIsLoading(false);
  };

  const searchStore = async (query: string) => {
    setIsLoading(true);
    const results = await searchApps(query, 20);
    const newCache = { ...appCache };
    results.forEach(a => newCache[a.id] = a);
    setAppCache(newCache);
    setIsLoading(false);
    return results;
  };

  return (
    <StoreContext.Provider value={{
      apps,
      featuredApps,
      searchHistory,
      downloads,
      addSearchRecord,
      clearSearchHistory,
      startDownload,
      getAppById,
      loadMoreApps,
      isLoading,
      searchStore
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
