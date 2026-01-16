import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from './context/ContentContext';
import ReadingHeader from './components/ReadingHeader';
import ReadingControls from './components/ReadingControls';
import PDFRenderer from './components/PDFRenderer';

const ReadingPage = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const { 
    contents, 
    currentContent, 
    currentPage, 
    setCurrentPage,
    totalPages, 
    setTotalPages,
    setContent, 
    nextPage, 
    previousPage 
  } = useContent();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('readingSettings');
    return saved ? JSON.parse(saved) : {
      zoom: 1.0,
      brightness: 100
    };
  });

  useEffect(() => {
    const content = contents.find(c => c.id === contentId);
    if (content) {
      setContent(content);
    } else {
      navigate('/');
    }
  }, [contentId, contents, setContent, navigate]);

  useEffect(() => {
    localStorage.setItem('readingSettings', JSON.stringify(settings));
  }, [settings]);

  // Handle PDF Load
  const handleDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    // If current page is 0 or out of bounds (from bad storage), reset to 1
    if (currentPage === 0 || currentPage > numPages) {
       setCurrentPage(1);
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        previousPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextPage, previousPage]);

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!currentContent) return null;

  return (
    <>
      <Helmet>
        <title>{currentContent.title} - Learning Table</title>
        <meta name="description" content={currentContent.description} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300" style={{ filter: `brightness(${settings.brightness}%)` }}>
        <ReadingHeader
          content={currentContent}
          currentPage={currentPage}
          totalPages={totalPages}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

        {/* Main Reading Area */}
        <div className="pt-24 pb-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-[60vh] flex justify-center"
            >
              <PDFRenderer 
                pdfUrl={currentContent.pdfUrl}
                pageNumber={currentPage}
                scale={settings.zoom}
                onDocumentLoadSuccess={handleDocumentLoadSuccess}
              />
            </motion.div>

            {/* Desktop Page Navigation (Bottom) */}
            <div className="hidden md:flex items-center justify-center gap-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={previousPage}
                disabled={currentPage <= 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage > 1
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextPage}
                disabled={currentPage >= totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage < totalPages
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
             {/* Mobile Page Navigation (Floating FAB style or bottom area above bar) */}
             <div className="md:hidden flex justify-between px-4 mt-8 mb-4">
                 <button 
                   onClick={previousPage}
                   disabled={currentPage <= 1}
                   className={`p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-800 ${
                     currentPage > 1 ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                   }`}
                 >
                   <ChevronLeft className="w-6 h-6" />
                 </button>
                 
                 <button 
                   onClick={nextPage}
                   disabled={currentPage >= totalPages}
                   className={`p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-800 ${
                     currentPage < totalPages ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                   }`}
                 >
                   <ChevronRight className="w-6 h-6" />
                 </button>
             </div>
          </div>
        </div>

        <ReadingControls
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </>
  );
};

export default ReadingPage;
