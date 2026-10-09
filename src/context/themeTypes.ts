import { createContext } from 'react';

export type Theme = 'dark' | 'light';
export type ThemeMode = 'dark' | 'light' | 'system';

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const STORAGE_KEY = 'portfolio-theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
