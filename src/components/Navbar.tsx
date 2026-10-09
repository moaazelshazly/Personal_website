import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { CommandIcon, MenuIcon, CloseIcon, GithubIcon, LinkedinIcon } from './Icons';
import { ThemeToggle } from './ThemeToggle';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Skills', to: '/skills' },
    { label: 'Experience', to: '/experience' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Link */}
        <Link
          to="/"
          className="brand-logo"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="brand-symbol">
            <span className="symbol-inner">ME</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">{PORTFOLIO_DATA.personal.name}</span>
            <span className="brand-sub">Frontend & UI/UX</span>
          </div>
        </Link>

        {/* Desktop Navigation using NavLink */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Status Badge */}
          <div className="availability-badge hide-sm" title="Open to opportunities">
            <span className="status-dot-pulse" />
            <span className="status-label">Available for work</span>
          </div>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Command Menu Button */}
          <button
            type="button"
            className="command-trigger-btn"
            onClick={onOpenCommand}
            aria-label="Open command palette (Ctrl+K)"
            title="Press ⌘K or Ctrl+K to open"
          >
            <CommandIcon size={14} />
            <span className="cmd-text">Menu</span>
            <kbd className="cmd-kbd">⌘K</kbd>
          </button>

          {/* Social Quick Links */}
          <div className="header-socials hide-md">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="social-icon-btn"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-icon-btn"
            >
              <LinkedinIcon size={16} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle-btn show-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav">
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mobile-drawer-footer">
              <div className="mobile-theme-row">
                <span className="mobile-theme-label">Theme</span>
                <ThemeToggle variant="segmented" />
              </div>
              <div className="availability-badge mobile-badge">
                <span className="status-dot-pulse" />
                <span className="status-label">{PORTFOLIO_DATA.personal.statusBadge}</span>
              </div>
              <div className="mobile-social-links">
                <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="mobile-social-pill">
                  <GithubIcon size={16} /> GitHub
                </a>
                <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="mobile-social-pill">
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

