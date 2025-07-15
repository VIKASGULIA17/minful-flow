import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [ambientSound, setAmbientSound] = useState(null);
  const [calmMode, setCalmMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedCalmMode = localStorage.getItem('calmMode');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (savedCalmMode) {
      setCalmMode(JSON.parse(savedCalmMode));
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('calmMode', JSON.stringify(calmMode));
  }, [calmMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleCalmMode = () => {
    setCalmMode(prev => !prev);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    ambientSound,
    setAmbientSound,
    calmMode,
    setCalmMode,
    toggleCalmMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};