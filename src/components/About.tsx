import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LayersIcon, CpuIcon, SparklesIcon, CheckIcon, GithubIcon, ExternalLinkIcon } from './Icons';

interface AboutProps {
  about?: typeof PORTFOLIO_DATA.about;
  personal?: typeof PORTFOLIO_DATA.personal;
}

export const About: React.FC<AboutProps> = ({
  about = PORTFOLIO_DATA.about,
  personal = PORTFOLIO_DATA.personal
}) => {
  return (
    <section id="about" className="section-padding about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-mono">01 // OVERVIEW</span>
          </div>
          <h2 className="section-title">About &amp; Engineering Focus</h2>
          <p className="section-subtitle">
            Balancing software engineering discipline with fine-grained UI/UX execution and algorithmic rigor.
          </p>
        </div>

        {/* Content Layout */}
        <div className="about-grid">
          {/* Left Column: Narrative */}
          <div className="about-text-column">
            <h3 className="about-heading">{about.heading}</h3>
            
            <div className="about-paragraphs">
              {about.paragraphs.map((p, idx) => (
                <p key={idx} className="about-p">
                  {p}
                </p>
              ))}
            </div>

            {/* Core Principles */}
            <div className="principles-box">
              <span className="principles-title">Engineering Principles</span>
              <ul className="principles-list">
                <li>
                  <CheckIcon size={14} className="principle-check" />
                  <span><strong>Accessible First:</strong> Screen-reader tested, semantic HTML5, and WCAG AAA compliance.</span>
                </li>
                <li>
                  <CheckIcon size={14} className="principle-check" />
                  <span><strong>Performance Minded:</strong> Sub-50ms render cycles and zero unnecessary re-render passes.</span>
                </li>
                <li>
                  <CheckIcon size={14} className="principle-check" />
                  <span><strong>Clean Architecture:</strong> Strong TypeScript contracts, pure components, and deterministic state.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Focus Pillars & Quick Status */}
          <div className="about-sidebar-column">
            {/* Status Card with GitHub Profile Info */}
            <div className="about-status-card">
              <div className="status-card-header">
                <span className="card-badge">Profile Snapshot</span>
                <span className="card-status-dot" />
              </div>

              <div className="about-profile-header">
                <img
                  src={personal.avatarUrl || "https://avatars.githubusercontent.com/u/181676567?v=4"}
                  alt={personal.name}
                  className="about-avatar-img"
                />
                <div className="about-profile-meta">
                  <span className="about-profile-name">{personal.name}</span>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="about-github-link"
                  >
                    <GithubIcon size={13} />
                    <span>@moaazelshazly</span>
                    <ExternalLinkIcon size={11} />
                  </a>
                </div>
              </div>

              <div className="status-rows">
                <div className="status-row">
                  <span className="row-key">Role:</span>
                  <span className="row-val">CS Student &amp; Developer</span>
                </div>
                <div className="status-row">
                  <span className="row-key">Location:</span>
                  <span className="row-val">{personal.location}</span>
                </div>
                <div className="status-row">
                  <span className="row-key">Core Stack:</span>
                  <span className="row-val highlight-val">React 19, TypeScript, C++, Vite</span>
                </div>
                <div className="status-row">
                  <span className="row-key">GitHub Repos:</span>
                  <span className="row-val green-val">{personal.publicReposCount || 4} Public Repositories</span>
                </div>
                <div className="status-row">
                  <span className="row-key">Availability:</span>
                  <span className="row-val green-val">Full-Time &amp; Contract Roles</span>
                </div>
              </div>
            </div>

            {/* Focus Pillars */}
            <div className="focus-pillars">
              {about.focusAreas.map((area, idx) => (
                <div key={idx} className="focus-pillar-card">
                  <div className="pillar-icon-box">
                    {idx === 0 && <LayersIcon size={16} />}
                    {idx === 1 && <CpuIcon size={16} />}
                    {idx === 2 && <SparklesIcon size={16} />}
                  </div>
                  <div className="pillar-content">
                    <h4 className="pillar-title">{area.title}</h4>
                    <p className="pillar-desc">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
