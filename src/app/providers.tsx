'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeName } from '@/lib/theme';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('normal');

  useEffect(() => {
    // Carregar tema do localStorage
    const savedTheme = localStorage.getItem('siteTheme') as ThemeName;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    // Aplicar classe no body
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}
