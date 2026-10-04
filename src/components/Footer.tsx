import React from 'react';
import { NavLink } from 'react-router';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, ArrowUpRightIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-content">
          {/* Left Block */}
          <div className="footer-left">
            <div className="footer-brand">
              <span className="footer-logo-dot" />
              <span className="footer-name">{PORTFOLIO_DATA.personal.name}</span>
            </div>
            <p className="footer-tagline">
              Frontend Engineer &amp; UI/UX Designer. Focused on high-performance web systems and design precision.
            </p>
            <div className="footer-copyright">
              © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
            </div>
          </div>

          {/* Center Links */}
          <div className="footer-center">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links-list">
              <li><NavLink to="/">Overview</NavLink></li>
              <li><NavLink to="/projects">Engineered Projects</NavLink></li>
              <li><NavLink to="/skills">Competencies</NavLink></li>
              <li><NavLink to="/experience">Trajectory</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* Right Block */}
          <div className="footer-right">
            <span className="footer-col-title">Network &amp; Code</span>
            <div className="footer-social-row">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
                <ArrowUpRightIcon size={11} />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
                <ArrowUpRightIcon size={11} />
              </a>
            </div>

            <div className="footer-scroll-top">
              <button
                type="button"
                onClick={scrollToTop}
                className="back-to-top-btn"
                aria-label="Scroll back to top"
              >
                <span>Back to top ↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="footer-colophon">
          <span className="colophon-text">
            Designed adhering to the Linear Design System tokens. Built with React 19, TypeScript, and modern CSS variables.
          </span>
          <span className="colophon-build">v2.5.0-prod</span>
        </div>
      </div>
    </footer>
  );
};
