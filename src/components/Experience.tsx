import React, { useState } from 'react';
import { PORTFOLIO_DATA, type TimelineItem } from '../data/portfolioData';
import { BriefcaseIcon, GraduationCapIcon, CheckIcon } from './Icons';

interface ExperienceProps {
  timeline?: TimelineItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ timeline = PORTFOLIO_DATA.timeline }) => {
  const [filter, setFilter] = useState<'all' | 'experience' | 'education'>('all');

  const filteredItems = timeline.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-mono">04 // TRAJECTORY</span>
          </div>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            Chronological overview of software engineering positions, open-source work, and academic background.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="experience-filter-bar">
          <div className="filter-pill-group" role="tablist" aria-label="Experience & Education Filter">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <span>All Milestones</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'experience'}
              className={`filter-pill-btn ${filter === 'experience' ? 'active' : ''}`}
              onClick={() => setFilter('experience')}
            >
              <BriefcaseIcon size={14} />
              <span>Work Experience</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'education'}
              className={`filter-pill-btn ${filter === 'education' ? 'active' : ''}`}
              onClick={() => setFilter('education')}
            >
              <GraduationCapIcon size={14} />
              <span>Education & Degrees</span>
            </button>
          </div>
        </div>

        {/* Structured Timeline */}
        <div className="timeline-container">
          <div className="timeline-line-track" aria-hidden="true" />

          <div className="timeline-items-list">
            {filteredItems.map((item: TimelineItem) => {
              const isWork = item.type === 'experience';

              return (
                <div key={item.id} className="timeline-node">
                  {/* Timeline Indicator Dot with Icon */}
                  <div className={`timeline-dot-wrapper ${isWork ? 'work-dot' : 'edu-dot'}`}>
                    {isWork ? <BriefcaseIcon size={13} /> : <GraduationCapIcon size={13} />}
                  </div>

                  {/* Node Content Card */}
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div className="title-block">
                        <h3 className="node-title">{item.title}</h3>
                        <span className="node-institution">{item.institution}</span>
                      </div>
                      <div className="meta-block">
                        <span className="node-period">{item.period}</span>
                        {item.badge && <span className="node-badge">{item.badge}</span>}
                      </div>
                    </div>

                    <p className="node-description">{item.description}</p>

                    {/* Bullet Points */}
                    <ul className="node-bullets">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="bullet-item">
                          <CheckIcon size={13} className="bullet-check" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Tag Bar */}
                    {item.tech && (
                      <div className="node-tech-row">
                        {item.tech.map((t) => (
                          <span key={t} className="timeline-tech-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
