import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import ContentCard from '@/components/ContentCard';
import Navigation from '@/components/Navigation';

const HomePage = () => {
  const {
    getFilteredContents,
    getCategories,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter
  } = useContent();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filteredContents = getFilteredContents();
  const categories = getCategories();

  return (
    <>
      <Helmet>
        <title>Learning Table - Your Immersive Reading Library</title>
        <meta name="description" content="Discover and read curated content in an immersive, distraction-free environment. Your personal library for deep focus and learning." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navigation />

        {/* Hero Section */}
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden mb-12"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1554900773-fc4c7ccbe0fd"
                  alt="Books and reading"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
              </div>
              <div className="relative px-8 sm:px-12 py-16 sm:py-20">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
                >
                  Learning Table
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl text-slate-200 max-w-2xl"
                >
                  Immerse yourself in curated content designed for deep focus and meaningful learning
                </motion.p>
              </div>
            </motion.div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title, author, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-200"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-200 text-slate-700 dark:text-slate-300"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="capitalize">{categoryFilter}</span>
                  </button>

                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden z-10"
                    >
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setCategoryFilter(category);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 capitalize hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-200 ${
                            categoryFilter === category
                              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-medium'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            {filteredContents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContents.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ContentCard content={content} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                  No content found
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
