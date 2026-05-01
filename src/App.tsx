import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/ui/Navbar';
import { Home } from './pages/Home';
import { AppDetails } from './pages/AppDetails';
import { CategoryPage } from './pages/Categories';
import { DeveloperDashboard } from './pages/DeveloperDashboard';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <StoreProvider>
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/app/:id" element={<AppDetails />} />
                <Route path="/category/:catName" element={<CategoryPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/search" element={<CategoryPage />} />
                <Route path="/developer" element={<DeveloperDashboard />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </StoreProvider>
    </ThemeProvider>
  );
}
