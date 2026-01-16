import React from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';

const ReadingHeader = ({ 
  content, 
  currentPage, 
  totalPages,
  onSettingsClick 
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const progressPercentage = totalPages > 0 ? Math.round(((currentPage) / totalPages) * 100) : 0;

  return (
    <>
      {/* Desktop & Mobile Top Bar: Navigation + Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <Navigation showBack={true} title={content?.title} />
        
        {/* Progress Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-amber-500"
          />
        </div>

        {/* Desktop Controls (Hidden on Mobile) */}
        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 items-center gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="Reading Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Bar (Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-3 pb-safe">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {currentPage} / {totalPages}
          </span>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-lg active:bg-slate-100 dark:active:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg active:bg-slate-100 dark:active:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadingHeader;
