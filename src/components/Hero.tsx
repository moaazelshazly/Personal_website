import React from 'react';
import { Link } from 'react-router';
import { ArrowRightIcon, MailIcon, GithubIcon, LinkedinIcon, ArrowUpRightIcon, FileTextIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { InteractiveHeroCard } from './InteractiveHeroCard';

interface HeroProps {
  personal?: typeof PORTFOLIO_DATA.personal;
}

export const Hero: React.FC<HeroProps> = ({ personal = PORTFOLIO_DATA.personal }) => {
  return (
    <section id="hero" className="hero-section">
      {/* Ambient background glow (restrained, Linear-style) */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="section-container">
        {/* Status Callout & GitHub Profile Badge */}
        <div className="hero-status-wrapper">
          <div className="status-pill">
            <span className="status-dot" />
            <span className="status-text">{personal.statusBadge}</span>
          </div>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="hero-github-pill"
            title="View Moaaz Elshazly's GitHub Profile"
          >
            <GithubIcon size={13} />
            <span>@moaazelshazly · {personal.publicReposCount || 4} Repos</span>
            <span className="live-dot-green" />
          </a>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="hero-content">
          <div className="hero-profile-avatar-row">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="hero-avatar-link"
              title="View GitHub Profile (@moaazelshazly)"
              aria-label={`${personal.name} on GitHub`}
            >
              <img
                src={personal.avatarUrl || "https://avatars.githubusercontent.com/u/181676567?v=4"}
                alt={personal.name}
                className="hero-avatar-img"
              />
              <span className="hero-avatar-gh-badge" aria-hidden="true">
                <GithubIcon size={11} />
              </span>
            </a>
            <div className="hero-author-meta">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="author-name author-name-link"
              >
                {personal.name}
              </a>
              <span className="meta-separator">/</span>
              <span className="author-title">{personal.role}</span>
              <span className="meta-separator">/</span>
              <span className="author-location">{personal.location}</span>
            </div>
          </div>

          <h1 className="hero-headline">
            Engineering precision interfaces, interactive tools, and clean web applications.
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
                title="GitHub Profile (@moaazelshazly)"
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

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="social-pill-btn"
                title="See My Resume"
              >
                <FileTextIcon size={16} />
                <span>See My Resume</span>
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
