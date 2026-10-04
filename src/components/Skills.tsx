import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CodeIcon, ServerIcon, PaletteIcon, SlidersIcon, CpuIcon, CheckIcon } from './Icons';

interface SkillsProps {
  skills?: typeof PORTFOLIO_DATA.skills;
}

export const Skills: React.FC<SkillsProps> = ({ skills = PORTFOLIO_DATA.skills }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const categories = ['All', ...skills.map(s => s.title)];

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Frontend':
        return <CodeIcon size={16} />;
      case 'Backend':
        return <ServerIcon size={16} />;
      case 'Programming':
        return <CpuIcon size={16} />;
      case 'UI/UX':
        return <PaletteIcon size={16} />;
      case 'Tools':
        return <SlidersIcon size={16} />;
      default:
        return <CodeIcon size={16} />;
    }
  };

  const filteredCategories = selectedGroup === 'All'
    ? skills
    : skills.filter(s => s.title === selectedGroup);

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-mono">02 // CAPABILITIES</span>
          </div>
          <h2 className="section-title">Technical Skills & Tooling</h2>
          <p className="section-subtitle">
            Curated competencies across frontend engineering, systems architecture, and UI/UX craft.
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-bar">
          <div className="filter-pill-group" role="tablist" aria-label="Skills Filter">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedGroup === cat}
                className={`filter-pill-btn ${selectedGroup === cat ? 'active' : ''}`}
                onClick={() => setSelectedGroup(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="skills-groups-wrapper">
          {filteredCategories.map((group) => (
            <div key={group.title} className="skill-group-container">
              {/* Group Header */}
              <div className="skill-group-header">
                <div className="group-title-cluster">
                  <div className="group-icon-box">
                    {getCategoryIcon(group.title)}
                  </div>
                  <div>
                    <h3 className="group-title">{group.title}</h3>
                    <p className="group-desc">{group.description}</p>
                  </div>
                </div>
                <span className="group-count-badge">{group.skills.length} competencies</span>
              </div>

              {/* Skills Items Grid */}
              <div className="skills-item-grid">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`skill-card ${skill.highlight ? 'skill-highlight' : ''}`}
                  >
                    <div className="skill-card-top">
                      <span className="skill-name">{skill.name}</span>
                      <span className={`skill-level-pill ${skill.level.toLowerCase()}`}>
                        {skill.level}
                      </span>
                    </div>
                    <p className="skill-details">{skill.description}</p>
                    {skill.highlight && (
                      <div className="skill-core-indicator">
                        <CheckIcon size={11} />
                        <span>Core Specialty</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
