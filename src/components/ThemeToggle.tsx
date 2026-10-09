import React from 'react';
import { useTheme } from '../context';
import { SunIcon, MoonIcon, MonitorIcon } from './Icons';

interface ThemeToggleProps {
  variant?: 'icon' | 'pill' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
}) => {
  const { theme, themeMode, toggleTheme, setThemeMode } = useTheme();

  if (variant === 'segmented') {
    return (
      <div className={`theme-segmented-group ${className}`} role="radiogroup" aria-label="Select color theme">
        <button
          type="button"
          role="radio"
          aria-checked={themeMode === 'light'}
          className={`theme-segment-btn ${themeMode === 'light' ? 'active' : ''}`}
          onClick={() => setThemeMode('light')}
          title="Light theme"
        >
          <SunIcon size={14} />
          <span>Light</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={themeMode === 'dark'}
          className={`theme-segment-btn ${themeMode === 'dark' ? 'active' : ''}`}
          onClick={() => setThemeMode('dark')}
          title="Dark theme"
        >
          <MoonIcon size={14} />
          <span>Dark</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={themeMode === 'system'}
          className={`theme-segment-btn ${themeMode === 'system' ? 'active' : ''}`}
          onClick={() => setThemeMode('system')}
          title="System preference"
        >
          <MonitorIcon size={14} />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        className={`theme-toggle-pill ${className}`}
        onClick={toggleTheme}
        aria-label={`Current theme: ${theme}. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      >
        <div className={`theme-icon-rotator ${theme}`}>
          {theme === 'dark' ? <SunIcon size={15} /> : <MoonIcon size={15} />}
        </div>
        <span className="theme-toggle-label">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>
    );
  }

  // Default compact icon button for Header
  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode (currently ${theme})`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      <div className={`theme-icon-rotator ${theme}`}>
        {theme === 'dark' ? (
          <SunIcon size={16} className="theme-sun-icon" />
        ) : (
          <MoonIcon size={16} className="theme-moon-icon" />
        )}
      </div>
    </button>
  );
};
