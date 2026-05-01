"use client";

import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useStore } from '../../../context/StoreContext';
import { AppCard } from '../../../components/ui/AppCard';
import { Button } from '../../../components/ui/Button';
import { AppModel } from '../../../lib/api';

export default function CategoryPage() {
  return (
    <React.Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CategoryPageContent />
    </React.Suspense>
  );
}

function CategoryPageContent() {
  const params = useParams();
  const catName = params?.catName as string | undefined;
  
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const { apps, loadMoreApps, searchStore, isLoading } = useStore();
  const [displayApps, setDisplayApps] = React.useState<AppModel[]>([]);

  useEffect(() => {
    if (query) {
      searchStore(query).then(setDisplayApps);
    } else {
      let filtered = apps;
      if (catName && catName !== 'All') {
        filtered = apps.filter(a => a.category?.toLowerCase().includes(catName.toLowerCase()) || 
                          (catName === 'Games' && a.category?.toLowerCase() === 'game') || 
                          (catName === 'Apps' && a.category?.toLowerCase() === 'application'));
      }
      setDisplayApps(filtered);
    }
  }, [query, catName, apps, searchStore]);

  let title = 'All Apps and Games';
  if (catName && catName !== 'All') title = catName;
  if (query) title = `Search Results for "${query}"`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">{title}</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : displayApps.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-xl mb-4">No apps found matching your criteria.</p>
          {!query && <Button onClick={() => loadMoreApps(catName)} variant="outline">Search Deep Database</Button>}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {displayApps.map((app, i) => (
              <AppCard key={app.id + i} app={app} />
            ))}
          </div>
          {!query && (
            <div className="mt-12 flex justify-center">
              <Button onClick={() => loadMoreApps(catName)} size="lg" variant="secondary">Load More</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
