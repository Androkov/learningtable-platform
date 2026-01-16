import React, { createContext, useContext, useState, useEffect } from 'react';
import contentsData from '@/data/contents.json';
import { saveReadingProgress, getReadingProgress } from '@/utils/readingProgress';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [contents, setContents] = useState([]);
  const [currentContent, setCurrentContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 1-based index for PDF
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Load contents from JSON
  useEffect(() => {
    setContents(contentsData);
  }, []);

  const setContent = (content) => {
    setCurrentContent(content);
    const saved = getReadingProgress(content.id);
    if (saved) {
      setCurrentPage(saved.currentPage || 1);
      setTotalPages(saved.totalPages || 0);
    } else {
      setCurrentPage(1);
      setTotalPages(0);
    }
  };

  const updateProgress = (page, total) => {
    if (!currentContent) return;
    
    const percentage = total > 0 ? (page / total) * 100 : 0;
    saveReadingProgress(currentContent.id, {
      currentPage: page,
      totalPages: total,
      percentageComplete: percentage
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateProgress(newPage, totalPages);
      return true;
    }
    return false;
  };

  const previousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateProgress(newPage, totalPages);
      return true;
    }
    return false;
  };

  const getFilteredContents = () => {
    return contents.filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          content.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || content.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const getCategories = () => {
    const categories = new Set(contents.map(c => c.category));
    return ['all', ...Array.from(categories)];
  };

  const calculateReadingTime = (content) => {
     // Placeholder: If we had page count we could estimate
     // PDF renderer might update this dynamically later
     return 5; 
  };
  
  const getProgress = (contentId) => {
     const p = getReadingProgress(contentId);
     return p ? p.currentPage : 0;
  };

  return (
    <ContentContext.Provider value={{
      contents,
      currentContent,
      currentPage,
      setCurrentPage,
      totalPages,
      setTotalPages,
      setContent,
      nextPage,
      previousPage,
      getProgress,
      searchQuery,
      setSearchQuery,
      categoryFilter,
      setCategoryFilter,
      getFilteredContents,
      getCategories,
      calculateReadingTime
    }}>
      {children}
    </ContentContext.Provider>
  );
};
