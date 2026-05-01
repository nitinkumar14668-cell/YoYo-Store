"use client";

import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../context/StoreContext';
import { Upload, Plus, Edit, Trash2, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', downloads: 4000, revenue: 2400 },
  { name: 'Tue', downloads: 3000, revenue: 1398 },
  { name: 'Wed', downloads: 2000, revenue: 9800 },
  { name: 'Thu', downloads: 2780, revenue: 3908 },
  { name: 'Fri', downloads: 1890, revenue: 4800 },
  { name: 'Sat', downloads: 2390, revenue: 3800 },
  { name: 'Sun', downloads: 3490, revenue: 4300 },
];

export default function DeveloperDashboard() {
  const { apps } = useStore();
  const devApps = apps.filter(a => a.developer === 'Google LLC' || a.developer === 'Instagram'); // Mocking logged in as Google LLC
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Developer Console</h1>
          <p className="text-zinc-500">Welcome back, Yoyo Studios</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="w-5 h-5" /> New App
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Total Downloads</p>
              <h3 className="text-3xl font-bold">54.2M</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Active Users (30d)</p>
              <h3 className="text-3xl font-bold">12.8M</h3>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm">
          <div className="flex flex-col justify-center h-full">
             <p className="text-sm text-zinc-500 mb-2">Total Storage Used</p>
             <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 mb-2">
               <div className="bg-blue-500 h-3 rounded-full w-[45%]"></div>
             </div>
             <p className="text-sm font-medium">45GB / 100GB Free</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-sm mb-12">
        <h3 className="text-lg font-bold mb-6">Download Analytics (Global)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', border: 'none', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="downloads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6">Your Applications</h2>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">App</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Downloads</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {devApps.map(app => (
                 <tr key={app.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <img src={app.iconUrl} alt="" className="w-10 h-10 rounded-xl" />
                       <div>
                         <p className="font-medium">{app.title}</p>
                         <p className="text-xs text-zinc-500">v{app.version}</p>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                       Published
                     </span>
                   </td>
                   <td className="px-6 py-4 font-medium">
                     {app.price === 0 ? 'Free' : `$${app.price}`}
                   </td>
                   <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                     {app.downloads.toLocaleString()}
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="w-8 h-8"><Edit className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"><Trash2 className="w-4 h-4" /></Button>
                     </div>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-6">List New Application</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">App Name</label>
                  <input type="text" className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Games</option>
                      <option>Productivity</option>
                      <option>Social</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price ($)</label>
                    <input type="number" defaultValue="0.00" className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea rows={4} className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div>
                   <label className="block text-sm font-medium mb-2">App Icon & Screenshots</label>
                   <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                     <Upload className="w-8 h-8 mb-2" />
                     <p>Click to upload or drag and drop</p>
                     <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                   </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button onClick={() => setShowAddForm(false)}>Submit Listing</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
