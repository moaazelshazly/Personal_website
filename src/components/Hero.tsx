import React from 'react';
import { Link } from 'react-router';
import { ArrowRightIcon, MailIcon, GithubIcon, LinkedinIcon, ArrowUpRightIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { InteractiveHeroCard } from './InteractiveHeroCard';

interface HeroProps {
  personal?: typeof PORTFOLIO_DATA.personal;
}

export const Hero: React.FC<HeroProps> = ({ personal = PORTFOLIO_DATA.personal }) => {
  return (
    <section id="hero" className="hero-section">
      {/* Ambient background glow (restrained, Linear-style, not generic AI blob) */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="section-container">
        {/* Status Callout Pill */}
        <div className="hero-status-wrapper">
          <div className="status-pill">
            <span className="status-dot" />
            <span className="status-text">{personal.statusBadge}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="hero-content">
          <div className="hero-author-meta">
            <span className="author-name">{personal.name}</span>
            <span className="meta-separator">/</span>
            <span className="author-title">{personal.role}</span>
          </div>

          <h1 className="hero-headline">
            Engineering precision interfaces, design systems, and resilient web applications.
          </h1>

          <p className="hero-description">
            {personal.shortBio} Specializing in React 19, TypeScript, and micro-interactions with strict accessibility and zero unnecessary runtime bloat.
          </p>

          {/* CTA Actions */}
          <div className="hero-actions">
            <Link
              to="/projects"
              className="btn btn-primary"
            >
              <span>View Projects</span>
              <ArrowRightIcon size={16} />
            </Link>

            <Link
              to="/contact"
              className="btn btn-secondary"
            >
              <MailIcon size={16} />
              <span>Contact Me</span>
            </Link>

            {/* Social Quick Links */}
            <div className="hero-social-links">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn"
                title="GitHub Profile"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
                <ArrowUpRightIcon size={12} className="external-arrow" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ArrowUpRightIcon size={12} className="external-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* Memorable Visual Element: Interactive Engineering Console */}
        <div className="hero-visual-wrapper">
          <div className="visual-container">
            <InteractiveHeroCard />
          </div>
        </div>
      </div>
    </section>
  );
};
