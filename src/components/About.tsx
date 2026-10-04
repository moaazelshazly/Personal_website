import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LayersIcon, CpuIcon, SparklesIcon, CheckIcon } from './Icons';

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
          <h2 className="section-title">About & Focus</h2>
          <p className="section-subtitle">
            Balancing software engineering discipline with fine-grained UI/UX execution.
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
                  <span><strong>Accessible First:</strong> Screen-reader tested, semantic tags, and WCAG AAA compliance.</span>
                </li>
                <li>
                  <CheckIcon size={14} className="principle-check" />
                  <span><strong>Performance Minded:</strong> Sub-50ms render cycles and zero unnecessary re-render passes.</span>
                </li>
                <li>
                  <CheckIcon size={14} className="principle-check" />
                  <span><strong>Design Fidelity:</strong> 1:1 translation from Figma to responsive production components.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Focus Pillars & Quick Status */}
          <div className="about-sidebar-column">
            {/* Status Card */}
            <div className="about-status-card">
              <div className="status-card-header">
                <span className="card-badge">Profile Snapshot</span>
                <span className="card-status-dot" />
              </div>
              <div className="status-rows">
                <div className="status-row">
                  <span className="row-key">Status:</span>
                  <span className="row-val">CS Senior & Engineering Fellow</span>
                </div>
                <div className="status-row">
                  <span className="row-key">Location:</span>
                  <span className="row-val">{personal.location}</span>
                </div>
                <div className="status-row">
                  <span className="row-key">Core Stack:</span>
                  <span className="row-val highlight-val">React 19, TypeScript, Modern CSS</span>
                </div>
                <div className="status-row">
                  <span className="row-key">Availability:</span>
                  <span className="row-val green-val">Immediate for Full-Time & Contracts</span>
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
