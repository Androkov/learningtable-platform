export const saveReadingProgress = (contentId, progressData) => {
  try {
    const key = `reading_progress_${contentId}`;
    const data = {
      ...progressData,
      lastReadDate: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving reading progress:', error);
  }
};

export const getReadingProgress = (contentId) => {
  try {
    const key = `reading_progress_${contentId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error getting reading progress:', error);
    return null;
  }
};
