import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';
import { fetchPortfolioProjects } from '../TS/Fetcg';
import { useTheme } from '../context';
import {
  CommandIcon,
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  CopyIcon,
  CheckIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  FileTextIcon,
  SearchIcon,
} from './Icons';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Case Studies' | 'Actions' | 'Social';
  title: string;
  subtitle?: string;
  keywords?: string[];
  icon: React.ReactNode;
  action: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [liveProjects, setLiveProjects] = useState<Project[]>(PORTFOLIO_DATA.projects);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isKeyboardNavRef = useRef(false);
  const navigate = useNavigate();
  const { theme, themeMode, toggleTheme, setTheme, setThemeMode } = useTheme();

  useEffect(() => {
    fetchPortfolioProjects().then(setLiveProjects).catch(() => {});
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSearch('');
        setSelectedIndex(0);
        if (listRef.current) {
          listRef.current.scrollTop = 0;
        }
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navigateTo = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Go to Overview (Home)',
      subtitle: 'Hero, interactive console, and portfolio gateway',
      icon: <ArrowRightIcon size={14} />,
      action: () => navigateTo('/')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Go to Projects',
      subtitle: `View ${liveProjects.length} production-grade engineering projects`,
      keywords: ['work', 'code', 'portfolio', 'apps', 'repos'],
      icon: <ArrowRightIcon size={14} />,
      action: () => navigateTo('/projects')
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Go to Skills & Tools',
      subtitle: 'Frontend, Backend, Programming, UI/UX, Tools',
      icon: <ArrowRightIcon size={14} />,
      action: () => navigateTo('/skills')
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Go to Experience & Education',
      subtitle: 'Roles, training, and milestones timeline',
      icon: <ArrowRightIcon size={14} />,
      action: () => navigateTo('/experience')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Go to About & Philosophy',
      subtitle: 'Background, principles, and focus pillars',
      icon: <ArrowRightIcon size={14} />,
      action: () => navigateTo('/about')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Go to Contact',
      subtitle: 'Send a direct inquiry or collaboration proposal',
      icon: <ArrowRightIcon size={14} />,
      action: () => navigateTo('/contact')
    },
    // Case Studies
    ...liveProjects.map((project) => ({
      id: `case-${project.id}`,
      category: 'Case Studies' as const,
      title: `Case Study: ${project.name}`,
      subtitle: project.tagline,
      icon: <ArrowRightIcon size={14} />,
      action: () => {
        onClose();
        navigate(`/projects/${project.id}`);
      }
    })),
    // Actions & Social
    {
      id: 'act-search-projects',
      category: 'Actions',
      title: 'Search & Filter Engineering Projects',
      subtitle: `Explore ${liveProjects.length} repositories with live search, tech stack tags, and matrix view`,
      keywords: ['projects', 'search', 'filter', 'matrix', 'tech', 'stack', 'repos'],
      icon: <SearchIcon size={14} />,
      action: () => {
        navigateTo('/projects');
        onClose();
      }
    },
    {
      id: 'act-toggle-theme',
      category: 'Actions',
      title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: `Currently active: ${theme === 'dark' ? 'Dark' : 'Light'} theme (click to switch)`,
      icon: theme === 'dark' ? <SunIcon size={14} /> : <MoonIcon size={14} />,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'act-theme-light',
      category: 'Actions',
      title: 'Set Theme: Light Mode',
      subtitle: 'Crisp, high-contrast Linear light theme',
      icon: <SunIcon size={14} />,
      action: () => {
        setTheme('light');
        onClose();
      }
    },
    {
      id: 'act-theme-dark',
      category: 'Actions',
      title: 'Set Theme: Dark Mode',
      subtitle: 'Sleek, deep Linear dark theme',
      icon: <MoonIcon size={14} />,
      action: () => {
        setTheme('dark');
        onClose();
      }
    },
    {
      id: 'act-theme-system',
      category: 'Actions',
      title: 'Set Theme: System Preference',
      subtitle: `Automatically match OS display settings (${themeMode === 'system' ? 'currently active' : 'inactive'})`,
      icon: <MonitorIcon size={14} />,
      action: () => {
        setThemeMode('system');
        onClose();
      }
    },
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: copiedEmail ? 'Email Copied!' : 'Copy Direct Email Address',
      subtitle: PORTFOLIO_DATA.personal.email,
      icon: copiedEmail ? <CheckIcon size={14} /> : <CopyIcon size={14} />,
      action: handleCopyEmail
    },
    {
      id: 'act-github',
      category: 'Social',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/moaazelshazly',
      icon: <GithubIcon size={14} />,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.github, '_blank');
        onClose();
      }
    },
    {
      id: 'act-linkedin',
      category: 'Social',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/moaaz-elshazly',
      icon: <LinkedinIcon size={14} />,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'act-resume',
      category: 'Social',
      title: 'See My Resume',
      subtitle: 'Google Drive Document · CV / Resume',
      keywords: ['cv', 'resume', 'drive', 'pdf', 'experience', 'hire'],
      icon: <FileTextIcon size={14} />,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.resumeUrl, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    (c.subtitle && c.subtitle.toLowerCase().includes(search.toLowerCase())) ||
    (c.keywords && c.keywords.some(k => k.toLowerCase().includes(search.toLowerCase())))
  );

  // Scroll selected command into view during keyboard navigation
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    if (selectedIndex === 0) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const selectedItem = container.querySelector<HTMLElement>('.cmd-item.selected');
    if (!selectedItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();

    const padding = 10;
    if (itemRect.top < containerRect.top) {
      const targetTop = container.scrollTop - (containerRect.top - itemRect.top + padding);
      container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    } else if (itemRect.bottom > containerRect.bottom) {
      const targetTop = container.scrollTop + (itemRect.bottom - containerRect.bottom + padding);
      container.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      isKeyboardNavRef.current = true;
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      isKeyboardNavRef.current = true;
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      isKeyboardNavRef.current = true;
      setSelectedIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      isKeyboardNavRef.current = true;
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      isKeyboardNavRef.current = true;
      setSelectedIndex((prev) => Math.min(filteredCommands.length - 1, prev + 5));
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      isKeyboardNavRef.current = true;
      setSelectedIndex((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command Menu">
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="cmd-input-bar">
          <CommandIcon size={16} className="cmd-icon-left" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command, project, or section..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
              if (listRef.current) {
                listRef.current.scrollTop = 0;
              }
            }}
            onKeyDown={handleKeyDown}
          />
          {search && (
            <button
              type="button"
              className="cmd-input-clear-btn"
              onClick={() => {
                setSearch('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              title="Clear search"
            >
              <CloseIcon size={14} />
            </button>
          )}
          <button type="button" className="cmd-close-btn" onClick={onClose} aria-label="Close menu">
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="cmd-results-list"
          role="listbox"
          onMouseMove={() => {
            isKeyboardNavRef.current = false;
          }}
        >
          {filteredCommands.length === 0 ? (
            <div className="cmd-no-results">
              <span>No commands matching "{search}"</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const prevCmd = filteredCommands[idx - 1];
              const showCategoryHeading = !prevCmd || prevCmd.category !== cmd.category;

              return (
                <React.Fragment key={cmd.id}>
                  {showCategoryHeading && (
                    <div className="cmd-group-heading" role="presentation">
                      {cmd.category}
                    </div>
                  )}
                  <div
                    role="option"
                    aria-selected={selectedIndex === idx}
                    className={`cmd-item ${selectedIndex === idx ? 'selected' : ''}`}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => {
                      if (!isKeyboardNavRef.current) {
                        setSelectedIndex(idx);
                      }
                    }}
                  >
                    <div className="cmd-item-icon">{cmd.icon}</div>
                    <div className="cmd-item-content">
                      <div className="cmd-item-title">{cmd.title}</div>
                      {cmd.subtitle && <div className="cmd-item-sub">{cmd.subtitle}</div>}
                    </div>
                    <span className="cmd-item-badge">{cmd.category}</span>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="cmd-footer">
          <div className="cmd-hints-group">
            <span className="cmd-hint">
              <kbd className="cmd-key">↑</kbd> <kbd className="cmd-key">↓</kbd> to navigate
            </span>
            <span className="cmd-hint">
              <kbd className="cmd-key">↵</kbd> to select
            </span>
            <span className="cmd-hint">
              <kbd className="cmd-key">esc</kbd> to close
            </span>
          </div>
          <span className="cmd-count">
            {filteredCommands.length} {filteredCommands.length === 1 ? 'command' : 'commands'}
          </span>
        </div>
      </div>
    </div>
  );
};
