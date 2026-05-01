import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppModel, defaultApps, generateApps } from '../data/mockData';

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
  startDownload: (appId: string) => void;
  getAppById: (id: string) => AppModel | undefined;
  loadMoreApps: (category?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<AppModel[]>(defaultApps);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<Record<string, DownloadState>>({});

  useEffect(() => {
    const hist = localStorage.getItem('nexus_search_history');
    if (hist) {
      try {
        setSearchHistory(JSON.parse(hist));
      } catch (e) {}
    }
  }, []);

  const addSearchRecord = (query: string) => {
    if (!query.trim()) return;
    const newHist = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
    setSearchHistory(newHist);
    localStorage.setItem('nexus_search_history', JSON.stringify(newHist));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('nexus_search_history');
  };

  const startDownload = (appId: string) => {
    if (downloads[appId]?.status === 'downloading') return;
    
    setDownloads(prev => ({ ...prev, [appId]: { progress: 0, status: 'downloading' } }));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloads(prev => ({ ...prev, [appId]: { progress: 100, status: 'installing' } }));
        
        // Mock install delay
        setTimeout(() => {
          setDownloads(prev => ({ ...prev, [appId]: { progress: 100, status: 'completed' } }));
          // Mock save file to user's disk
          const app = apps.find(a => a.id === appId);
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
    }, 300);
  };

  const getAppById = (id: string) => apps.find(a => a.id === id);

  const loadMoreApps = (category?: string) => {
    const newApps = generateApps(12, category);
    setApps(prev => [...prev, ...newApps]);
  };

  return (
    <StoreContext.Provider value={{
      apps,
      featuredApps: apps.filter(a => a.featured),
      searchHistory,
      downloads,
      addSearchRecord,
      clearSearchHistory,
      startDownload,
      getAppById,
      loadMoreApps
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
