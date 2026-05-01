import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { AppCard } from '../components/ui/AppCard';
import { Button } from '../components/ui/Button';

export const CategoryPage = () => {
  const { catName } = useParams<{ catName?: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const { apps, loadMoreApps } = useStore();

  let filteredApps = apps;
  let title = 'All Apps and Games';

  if (catName && catName !== 'All') {
    filteredApps = apps.filter(a => a.category.toLowerCase() === catName.toLowerCase() || (catName === 'Games' && a.category === 'Games') || (catName === 'Apps' && a.category !== 'Games'));
    title = catName;
  }
  
  if (query) {
    filteredApps = apps.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.developer.toLowerCase().includes(query.toLowerCase()));
    title = `Search Results for "${query}"`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">{title}</h1>
      
      {filteredApps.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-xl mb-4">No apps found matching your criteria.</p>
          <Button onClick={() => loadMoreApps(catName)} variant="outline">Search Deep Database</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
             <Button onClick={() => loadMoreApps(catName)} size="lg" variant="secondary">Load More</Button>
          </div>
        </>
      )}
    </div>
  );
};
