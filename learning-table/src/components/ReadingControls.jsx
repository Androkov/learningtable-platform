import React from 'react';
import { X, ZoomIn, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReadingControls = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const zoomLevels = [
    { label: '100%', value: 1.0 },
    { label: '125%', value: 1.25 },
    { label: '150%', value: 1.5 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-24 md:w-80 bg-white dark:bg-slate-900 rounded-t-2xl md:rounded-2xl shadow-2xl z-[70] border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Reading Settings</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Zoom Level */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <ZoomIn className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Zoom Level</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {zoomLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => onSettingsChange('zoom', level.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        settings.zoom === level.value
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brightness (Dark Mode Only) */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Brightness</h3>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={settings.brightness}
                  onChange={(e) => onSettingsChange('brightness', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>Dim</span>
                  <span>Bright</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReadingControls;
