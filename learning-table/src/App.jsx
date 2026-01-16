import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ContentProvider } from '@/context/ContentContext';
import HomePage from '@/pages/HomePage';
import ReadingPage from '@/pages/ReadingPage';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/read/:contentId" element={<ReadingPage />} />
          </Routes>
          <Toaster />
        </Router>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;
