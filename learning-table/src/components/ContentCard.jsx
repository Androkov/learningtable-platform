import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Lock, BookOpen, Unlock } from 'lucide-react';
import { getReadingProgress } from '@/utils/readingProgress';

const ContentCard = ({ content }) => {
  const navigate = useNavigate();
  const savedProgress = getReadingProgress(content.id);
  const progressPercentage = savedProgress?.percentageComplete || 0;
  
  // Estimate reading time (assuming ~1 min per page for PDF)
  const readingTime = savedProgress?.totalPages ? savedProgress.totalPages * 1.5 : 5;

  const handleClick = () => {
    navigate(`/read/${content.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img
            src={content.coverImage}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Access Status */}
          <div className="absolute top-3 right-3">
            {content.accessLevel === 'premium' || content.accessLevel === 'locked' ? (
              <div className="bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
                <Lock className="w-3 h-3" />
                Premium
              </div>
            ) : (
              <div className="bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
                <Unlock className="w-3 h-3" />
                Free
              </div>
            )}
          </div>

          {/* Progress Badge */}
          {progressPercentage > 0 && (
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm border border-white/20">
              {Math.round(progressPercentage)}% complete
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-block bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">
              {content.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
            {content.title}
          </h3>

          {/* Author */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            by {content.author}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
            {content.description}
          </p>

          {/* Reading Progress Bar (if started) */}
          {progressPercentage > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              <span>~{Math.round(readingTime)} min</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <BookOpen className="w-4 h-4" />
              <span>PDF</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
