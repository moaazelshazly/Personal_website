import React, { useState } from 'react';
import { Link } from 'react-router';
import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';
import { GithubIcon, ExternalLinkIcon, CheckIcon, ArrowRightIcon } from './Icons';

interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects = PORTFOLIO_DATA.projects }) => {
  const [filter, setFilter] = useState<string>('All');
  const [activeProjectTab, setActiveProjectTab] = useState<Record<string, 'overview' | 'problem' | 'tech'>>({
    'chronos-studio': 'overview',
    'pulse-flow': 'overview',
    'devnotes-canvas': 'overview',
    'aura-ledger': 'overview'
  });

  const categories = ['All', 'Design System', 'Frontend', 'Full Stack', 'Performance'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const setTab = (projectId: string, tab: 'overview' | 'problem' | 'tech') => {
    setActiveProjectTab(prev => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-mono">03 // SELECTED WORK</span>
          </div>
          <h2 className="section-title">Engineered Projects</h2>
          <p className="section-subtitle">
            A selection of production-grade web applications, design systems, and real-time frontend architectures.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="projects-filter-bar">
          <div className="filter-pill-group" role="tablist" aria-label="Project Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={filter === cat}
                className={`filter-pill-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
          <span className="results-count">{filteredProjects.length} projects displayed</span>
        </div>

        {/* Projects List */}
        <div className="projects-collection">
          {filteredProjects.map((project: Project, index: number) => {
            const currentTab = activeProjectTab[project.id] || 'overview';

            return (
              <article key={project.id} className="project-feature-row">
                <div className="project-main-meta">
                  {/* Category and Status Badge */}
                  <div className="project-badge-row">
                    <span className="category-pill">{project.category}</span>
                    <span className="status-pill-subtle">
                      <span className="status-dot-sm" />
                      {project.status}
                    </span>
                    <span className="project-index-num">0{index + 1}</span>
                  </div>

                  {/* Project Title & Tagline */}
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>

                  {/* Interactive Sub-Tabs for Deep Technical Insight */}
                  <div className="project-subtabs">
                    <button
                      type="button"
                      className={`project-subtab-btn ${currentTab === 'overview' ? 'active' : ''}`}
                      onClick={() => setTab(project.id, 'overview')}
                    >
                      <span>Overview</span>
                    </button>
                    <button
                      type="button"
                      className={`project-subtab-btn ${currentTab === 'problem' ? 'active' : ''}`}
                      onClick={() => setTab(project.id, 'problem')}
                    >
                      <span>Problem Solved</span>
                    </button>
                    <button
                      type="button"
                      className={`project-subtab-btn ${currentTab === 'tech' ? 'active' : ''}`}
                      onClick={() => setTab(project.id, 'tech')}
                    >
                      <span>Architecture</span>
                    </button>
                  </div>

                  {/* Tab Body */}
                  <div className="project-tab-content">
                    {currentTab === 'overview' && (
                      <div className="tab-pane">
                        <p className="project-description">{project.description}</p>
                        <div className="project-highlights-list">
                          {project.highlights.map((h, i) => (
                            <div key={i} className="highlight-item">
                              <CheckIcon size={13} className="highlight-icon" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTab === 'problem' && (
                      <div className="tab-pane">
                        <div className="problem-solved-box">
                          <span className="problem-label">Challenge & Engineering Solution:</span>
                          <p className="problem-text">{project.problemSolved}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'tech' && (
                      <div className="tab-pane">
                        <div className="tech-stack-overview">
                          <span className="tech-label">Primary Stack & Libraries:</span>
                          <div className="tech-tags-cloud">
                            {project.technologies.map(t => (
                              <span key={t} className="tech-tag-pill">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tech Badges List */}
                  <div className="project-tech-bar">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Links */}
                  <div className="project-cta-group">
                    <Link
                      to={`/projects/${project.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <span>Case Study</span>
                      <ArrowRightIcon size={13} />
                    </Link>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <span>Live Demo</span>
                        <ExternalLinkIcon size={14} />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <GithubIcon size={14} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Project Visual / Technical Preview Panel */}
                <div className="project-visual-meta">
                  <div className="preview-terminal-window">
                    <div className="terminal-header">
                      <div className="terminal-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <span className="terminal-filename">{project.id}.tsx</span>
                      <span className="terminal-branch">main</span>
                    </div>

                    <div className="terminal-content">
                      <div className="code-line">
                        <span className="line-num">1</span>
                        <span className="code-kw">import</span> {'{'} <span className="code-ident">createSignal</span>, <span className="code-ident">useMemo</span> {'}'} <span className="code-kw">from</span> <span className="code-str">'@core/runtime'</span>;
                      </div>
                      <div className="code-line">
                        <span className="line-num">2</span>
                        <span className="code-kw">export const</span> <span className="code-func">{project.id.replace(/-/g, '_')}</span> = () =&gt; {'{'}
                      </div>
                      <div className="code-line indent-1">
                        <span className="line-num">3</span>
                        <span className="code-kw">const</span> status = <span className="code-str">"{project.status}"</span>;
                      </div>
                      <div className="code-line indent-1">
                        <span className="line-num">4</span>
                        <span className="code-kw">const</span> latency = <span className="code-str">"&lt; 16ms"</span>;
                      </div>
                      <div className="code-line indent-1">
                        <span className="line-num">5</span>
                        <span className="code-kw">return</span> (
                      </div>
                      <div className="code-line indent-2">
                        <span className="line-num">6</span>
                        &lt;<span className="code-tag">ViewportContainer</span> <span className="code-attr">renderMode</span>=<span className="code-str">"hardware"</span>&gt;
                      </div>
                      <div className="code-line indent-3">
                        <span className="line-num">7</span>
                        &lt;<span className="code-tag">Pipeline</span> <span className="code-attr">active</span>={'true'} <span className="code-attr">cache</span>=<span className="code-str">"l1"</span> /&gt;
                      </div>
                      <div className="code-line indent-2">
                        <span className="line-num">8</span>
                        &lt;/<span className="code-tag">ViewportContainer</span>&gt;
                      </div>
                      <div className="code-line">
                        <span className="line-num">9</span>
                        {'}'};
                      </div>
                    </div>

                    {/* Interactive Metrics Ribbon */}
                    <div className="terminal-stats-bar">
                      <div className="stat-slot">
                        <span className="stat-name">ENGINE</span>
                        <span className="stat-val">OPTIMIZED</span>
                      </div>
                      <div className="stat-slot">
                        <span className="stat-name">WCAG</span>
                        <span className="stat-val">AAA PASS</span>
                      </div>
                      <div className="stat-slot">
                        <span className="stat-name">BUNDLE</span>
                        <span className="stat-val">&lt; 12KB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
