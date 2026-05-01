import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Star, Download, ShieldCheck, Share, ArrowLeft, HardDrive, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatDownloads, formatSize } from '../lib/utils';

export const AppDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAppById, startDownload, downloads } = useStore();
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  const app = getAppById(id || '');

  if (!app) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">App not found</h2>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    );
  }

  const downloadState = downloads[app.id];
  const isDownloading = downloadState?.status === 'downloading';
  const isInstalling = downloadState?.status === 'installing';
  const isCompleted = downloadState?.status === 'completed';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <motion.img 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={app.iconUrl} 
          alt={app.title} 
          className="w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-zinc-200 dark:ring-zinc-800"
        />
        <div className="flex-1">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-2">{app.title}</h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">{app.developer}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
              <div className="flex flex-col items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-6">
                <span className="flex items-center gap-1 font-bold text-lg text-zinc-900 dark:text-white">
                  {app.rating.toFixed(1)} <Star className="w-4 h-4 fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white" />
                </span>
                <span>{app.reviewsCount.toLocaleString()} reviews</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-6">
                <span className="font-bold text-lg text-zinc-900 dark:text-white">{formatDownloads(app.downloads)}+</span>
                <span>Downloads</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-lg text-zinc-900 dark:text-white">{app.category}</span>
                <span>Category</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isCompleted ? (
                <Button size="lg" className="w-48 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20">
                  Open App
                </Button>
              ) : isDownloading || isInstalling ? (
                <div className="w-48 h-14 relative bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center p-1">
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-blue-600/20" 
                    style={{ width: `${downloadState.progress}%`, transition: 'width 0.3s ease' }} 
                  />
                  <span className="relative z-10 font-bold text-sm text-blue-600 dark:text-blue-400">
                    {isInstalling ? 'Installing...' : `${Math.round(downloadState.progress)}%`}
                  </span>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="w-48 group relative overflow-hidden" 
                  onClick={() => startDownload(app.id)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {app.price === 0 ? 'Install' : `Buy $${app.price}`}
                  </span>
                </Button>
              )}
              
              <Button variant="secondary" size="icon" className="rounded-full w-14 h-14 shrink-0">
                <Share className="w-5 h-5" />
              </Button>
              {app.hasInAppPurchases && (
                <p className="text-xs text-zinc-500 hidden sm:block">Offers In-App<br/>Purchases</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-4 w-max">
          {app.screenshots.map((src, idx) => (
            <motion.img 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              key={idx} 
              src={src} 
              alt={`Screenshot ${idx + 1}`} 
              className="h-64 md:h-96 w-auto rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 object-cover bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 mb-8 flex gap-8">
        <button 
          className={`pb-4 font-medium text-lg relative ${activeTab === 'details' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
          onClick={() => setActiveTab('details')}
        >
          Details
          {activeTab === 'details' && (
             <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
          )}
        </button>
        <button 
          className={`pb-4 font-medium text-lg relative ${activeTab === 'reviews' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews & Ratings
          {activeTab === 'reviews' && (
             <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'details' ? (
          <motion.div 
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">About this {app.category === 'Games' ? 'Game' : 'App'}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">{app.description}</p>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-500">Provider</span>
                    <span className="font-medium text-right">{app.developer}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-500">Size</span>
                    <span className="font-medium">{formatSize(app.size)}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-500">Version</span>
                    <span className="font-medium">{app.version}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-zinc-500">Updated</span>
                    <span className="font-medium">{app.lastUpdated}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                <p className="text-xs text-zinc-500 leading-relaxed">
                  This app has passed internal security tests for viruses, malware and other malicious attacks and doesn't contain any threats.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="reviews"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col md:flex-row gap-12 mb-12">
              <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 w-full md:w-64">
                <span className="text-6xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">{app.rating.toFixed(1)}</span>
                <div className="flex items-center gap-1 my-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-5 h-5 ${s <= app.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-300 text-zinc-300 dark:fill-zinc-700 dark:text-zinc-700'}`} />
                  ))}
                </div>
                <span className="text-sm text-zinc-500">{app.reviewsCount.toLocaleString()} Total</span>
              </div>
              
              <div className="flex flex-col justify-center flex-1 space-y-3">
                 {[5, 4, 3, 2, 1].map((rating) => {
                    const percent = rating === 5 ? 75 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 3 : 2;
                    return (
                      <div key={rating} className="flex items-center gap-4">
                        <span className="w-2 font-medium">{rating}</span>
                        <div className="flex-1 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                 })}
              </div>
            </div>

            <div className="space-y-6">
              {app.reviews.map((review) => (
                <div key={review.id} className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-zinc-200" />
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <p className="text-xs text-zinc-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-current' : 'fill-none text-zinc-300 dark:text-zinc-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button variant="secondary" className="w-full">Load More Reviews</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
