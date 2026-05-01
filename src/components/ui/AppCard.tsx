import React from 'react';
import { motion } from 'motion/react';
import { Star, Download, HardDrive } from 'lucide-react';
import { AppModel } from '../../lib/api';
import { formatDownloads, formatSize } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface AppCardProps {
  app: AppModel;
  featured?: boolean;
}

export const AppCard = ({ app, featured }: AppCardProps) => {
  if (featured) {
    return (
      <Link to={`/app/${app.id}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 shadow-xl group"
        >
          <div className="aspect-[2/1] w-full overflow-hidden">
            <img 
              src={app.screenshots[0] || app.iconUrl} 
              alt={app.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6">
            <img 
              src={app.iconUrl} 
              alt="icon" 
              className="w-20 h-20 rounded-2xl shadow-lg ring-2 ring-white/20"
            />
            <div className="flex-1 text-white">
              <h3 className="text-2xl font-bold line-clamp-1">{app.title}</h3>
              <p className="text-zinc-300 text-sm">{app.developer}</p>
              <div className="mt-2 flex items-center gap-3 text-xs font-medium text-zinc-300 flex-wrap">
                <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full backdrop-blur-md">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {app.rating.toFixed(1)}
                </span>
                <span className="bg-white/10 px-2 py-1 rounded-full backdrop-blur-md">
                  {formatDownloads(app.downloads)}
                </span>
                <span className="bg-blue-500/80 text-white px-2 py-1 rounded-full backdrop-blur-md">
                  {app.price === 0 ? 'Free' : `$${app.price}`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/app/${app.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="flex flex-col gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 hover:shadow-xl dark:hover:shadow-black/50 transition-all cursor-pointer h-full"
      >
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-2 bg-zinc-100 dark:bg-zinc-800">
          <img src={app.iconUrl} alt={app.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col flex-1">
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">{app.title}</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mb-2">{app.developer}</p>
          <div className="mt-auto flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>{app.rating.toFixed(1)}</span>
            </div>
            <div className="font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
              {app.price === 0 ? 'Free' : `$${app.price}`}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
