import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  // Initialize states from localStorage
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('highContrast');
    return saved === 'true';
  });

  const [dyslexiaFont, setDyslexiaFont] = useState(() => {
    const saved = localStorage.getItem('dyslexiaFont');
    return saved === 'true';
  });

  const [reduceMotion, setReduceMotion] = useState(() => {
    // Check both localStorage and system preference
    const saved = localStorage.getItem('reduceMotion');
    if (saved !== null) {
      return saved === 'true';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast);
  }, [highContrast]);

  // Apply dyslexia font
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
      // Load the font if not already loaded
      if (!document.getElementById('atkinson-font')) {
        const link = document.createElement('link');
        link.id = 'atkinson-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';
        document.head.appendChild(link);
      }
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    localStorage.setItem('dyslexiaFont', dyslexiaFont);
  }, [dyslexiaFont]);

  // Apply reduce motion
  useEffect(() => {
    if (reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    localStorage.setItem('reduceMotion', reduceMotion);
  }, [reduceMotion]);

  // Listen to system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      // Only auto-update if user hasn't set a preference
      const userPreference = localStorage.getItem('reduceMotion');
      if (userPreference === null) {
        setReduceMotion(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleDyslexiaFont = () => setDyslexiaFont(prev => !prev);
  const toggleReduceMotion = () => setReduceMotion(prev => !prev);

  const value = {
    highContrast,
    dyslexiaFont,
    reduceMotion,
    toggleHighContrast,
    toggleDyslexiaFont,
    toggleReduceMotion
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
