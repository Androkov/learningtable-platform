import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = ({ showBack = false, title = '' }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBack && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Back to Library</span>
              </motion.button>
            )}
            {!showBack && (
              <div className="flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Learning Table</h1>
              </div>
            )}
          </div>
          {title && (
            <h2 className="hidden md:block text-lg font-medium text-slate-700 dark:text-slate-300 truncate max-w-md">
              {title}
            </h2>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
