import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Moon, Sun, Bell, LayoutDashboard, Library } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { useStore } from '../../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { searchHistory, addSearchRecord, clearSearchHistory } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addSearchRecord(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Games', path: '/category/Games' },
    { name: 'Apps', path: '/category/Apps' },
    { name: 'Categories', path: '/categories' },
    { name: 'For Developers', path: '/developer' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                Yoyo Store
              </span>
            </Link>
            
            <div className="hidden md:flex gap-6">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-64 lg:w-80 relative">
              <form onSubmit={handleSearch}>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search apps & games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                    className="w-full bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:bg-white dark:focus:bg-zinc-950 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-full py-2 pl-10 pr-4 text-sm outline-none transition-all dark:text-white"
                  />
                </div>
              </form>

              {/* Search History Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-2">
                      <div className="flex justify-between items-center px-3 py-2">
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Recent</span>
                        <button onClick={clearSearchHistory} className="text-xs text-blue-500 hover:underline">Clear</button>
                      </div>
                      {searchHistory.map((query, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl cursor-pointer text-sm text-zinc-700 dark:text-zinc-300"
                          onClick={() => {
                            setSearchQuery(query);
                            navigate(`/search?q=${encodeURIComponent(query)}`);
                          }}
                        >
                          <Search className="w-3.5 h-3.5 text-zinc-400" />
                          {query}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button variant="primary" size="sm" className="hidden sm:flex rounded-full">
              Sign In
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl py-3 pl-10 pr-4 text-sm outline-none dark:text-white"
                  />
                </div>
              </form>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium text-zinc-800 dark:text-zinc-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
