import React from 'react';
import { useStore } from '../context/StoreContext';
import { AppCard } from '../components/ui/AppCard';
import { Button } from '../components/ui/Button';
import { ChevronRight, Gamepad2, Smartphone, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const Home = () => {
  const { apps, featuredApps, isLoading } = useStore();

  const games = apps.filter(a => a.category === 'Games').slice(0, 8);
  const newReleases = [...apps].sort((a, b) => {
    // If they don't have lastUpdated, preserve order or let them fall
    const timeA = new Date(a.lastUpdated || 0).getTime();
    const timeB = new Date(b.lastUpdated || 0).getTime();
    return timeB - timeA;
  }).slice(0, 12);

  if (isLoading && apps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Featured</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredApps.slice(0, 3).map((app, i) => (
              <motion.div 
                key={app.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <AppCard app={app} featured={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games */}
      <section className="py-8 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/10 text-orange-600 dark:text-orange-400 p-2 rounded-xl">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Top Games</h2>
            </div>
            <Link to="/category/Games">
              <Button variant="ghost" className="hidden sm:flex gap-2">
                See All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.map((app, i) => (
              <motion.div key={app.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <AppCard app={app} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">New & Trending</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newReleases.map((app, i) => (
              <Link key={app.id} to={`/app/${app.id}`}>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group cursor-pointer"
                >
                  <span className="text-xl font-bold text-zinc-300 dark:text-zinc-700 w-6 text-center">{i + 1}</span>
                  <img src={app.iconUrl} className="w-16 h-16 rounded-2xl shadow-sm group-hover:scale-105 transition-transform" alt="" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{app.title}</h4>
                    <p className="text-sm text-zinc-500 truncate">{app.category}</p>
                    <div className="text-sm font-medium mt-1">
                       {app.price === 0 ? 'Free' : `$${app.price}`}
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="rounded-full rounded-2xl shrink-0">Get</Button>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
