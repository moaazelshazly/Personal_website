import React, { useState } from 'react';
import { Link } from 'react-router';
import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';
import {
  GithubIcon,
  ExternalLinkIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  GitForkIcon,
  GitBranchIcon,
  ClockIcon,
  RefreshCwIcon,
} from './Icons';
import {
  formatGitHubDate,
  getLanguageColor,
  fetchPortfolioProjects,
  GITHUB_USERNAME,
} from '../TS/Fetcg';

interface ProjectsProps {
  projects?: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects: initialProjects = PORTFOLIO_DATA.projects }) => {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('Live');
  const [activeProjectTab, setActiveProjectTab] = useState<Record<string, 'overview' | 'problem' | 'tech' | 'github'>>({});

  const categories = ['All', 'Frontend', 'Performance', 'Full Stack'];

  const filteredProjects = filter === 'All'
    ? projectsList
    : projectsList.filter(p => p.category === filter);

  const setTab = (projectId: string, tab: 'overview' | 'problem' | 'tech' | 'github') => {
    setActiveProjectTab(prev => ({ ...prev, [projectId]: tab }));
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const refreshed = await fetchPortfolioProjects(true);
      setProjectsList(refreshed);
      setLastRefreshedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Failed to refresh repos:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const renderCodeSnippet = (project: Project) => {
    const pId = project.id.toLowerCase();

    if (pId.includes('website') || pId.includes('personal')) {
      return (
        <div className="terminal-content">
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="code-kw">import</span> {'{'} <span className="code-ident">fetchPortfolioProjects</span> {'}'} <span className="code-kw">from</span> <span className="code-str">'./TS/Fetcg'</span>;
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="code-kw">export const</span> <span className="code-func">PortfolioEngine</span> = () =&gt; {'{'}
          </div>
          <div className="code-line indent-1">
            <span className="line-num">3</span>
            <span className="code-kw">const</span> token = <span className="code-str">"env.VITE_GITHUB_TOKEN"</span>;
          </div>
          <div className="code-line indent-1">
            <span className="line-num">4</span>
            <span className="code-kw">const</span> status = <span className="code-str">"Synced (200 OK)"</span>;
          </div>
          <div className="code-line indent-1">
            <span className="line-num">5</span>
            <span className="code-kw">return</span> (
          </div>
          <div className="code-line indent-2">
            <span className="line-num">6</span>
            &lt;<span className="code-tag">LinearTheme</span> <span className="code-attr">contrast</span>=<span className="code-str">"AAA"</span>&gt;
          </div>
          <div className="code-line indent-3">
            <span className="line-num">7</span>
            &lt;<span className="code-tag">LiveGitHubStream</span> <span className="code-attr">user</span>=<span className="code-str">"{GITHUB_USERNAME}"</span> /&gt;
          </div>
          <div className="code-line indent-2">
            <span className="line-num">8</span>
            &lt;/<span className="code-tag">LinearTheme</span>&gt;
          </div>
          <div className="code-line">
            <span className="line-num">9</span>
            {'}'};
          </div>
        </div>
      );
    }

    if (pId.includes('typing')) {
      return (
        <div className="terminal-content">
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="code-kw">import</span> {'{'} <span className="code-ident">useState</span>, <span className="code-ident">useEffect</span> {'}'} <span className="code-kw">from</span> <span className="code-str">'react'</span>;
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="code-kw">export const</span> <span className="code-func">TypingTelemetry</span> = () =&gt; {'{'}
          </div>
          <div className="code-line indent-1">
            <span className="line-num">3</span>
            <span className="code-kw">const</span> [wpm, setWpm] = <span className="code-func">useState</span>(<span className="code-num">0</span>);
          </div>
          <div className="code-line indent-1">
            <span className="line-num">4</span>
            <span className="code-kw">const</span> [acc, setAcc] = <span className="code-func">useState</span>(<span className="code-num">100</span>);
          </div>
          <div className="code-line indent-1">
            <span className="line-num">5</span>
            <span className="code-kw">const</span> handleKeystroke = (e) =&gt; <span className="code-func">recordVelocity</span>(e);
          </div>
          <div className="code-line indent-1">
            <span className="line-num">6</span>
            <span className="code-kw">return</span> (
          </div>
          <div className="code-line indent-2">
            <span className="line-num">7</span>
            &lt;<span className="code-tag">TelemetryHUD</span> <span className="code-attr">wpm</span>={'{wpm}'} <span className="code-attr">accuracy</span>={'{acc}'} /&gt;
          </div>
          <div className="code-line indent-1">
            <span className="line-num">8</span>
            );
          </div>
          <div className="code-line">
            <span className="line-num">9</span>
            {'}'};
          </div>
        </div>
      );
    }

    if (pId.includes('game') || pId.includes('js')) {
      return (
        <div className="terminal-content">
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="code-kw">const</span> wordlist = [<span className="code-str">"apple"</span>, <span className="code-str">"grape"</span>, <span className="code-str">"mango"</span>, <span className="code-str">"lemon"</span>];
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="code-kw">let</span> target = wordlist[Math.<span className="code-func">floor</span>(Math.<span className="code-func">random</span>() * wordlist.length)];
          </div>
          <div className="code-line">
            <span className="line-num">3</span>
            <span className="code-kw">function</span> <span className="code-func">checkLetter</span>(char) {'{'}
          </div>
          <div className="code-line indent-1">
            <span className="line-num">4</span>
            <span className="code-kw">if</span> (target.<span className="code-func">includes</span>(char)) {'{'}
          </div>
          <div className="code-line indent-2">
            <span className="line-num">5</span>
            <span className="code-func">revealMatchingSlots</span>(char);
          </div>
          <div className="code-line indent-1">
            <span className="line-num">6</span>
            {'}'} <span className="code-kw">else</span> {'{'} <span className="code-func">deductHeartCounter</span>(); {'}'}
          </div>
          <div className="code-line">
            <span className="line-num">7</span>
            {'}'}
          </div>
          <div className="code-line">
            <span className="line-num">8</span>
            window.<span className="code-func">addEventListener</span>(<span className="code-str">'keydown'</span>, (e) =&gt; <span className="code-func">checkLetter</span>(e.key));
          </div>
        </div>
      );
    }

    if (pId.includes('neetcode') || pId.includes('algo')) {
      return (
        <div className="terminal-content">
          <div className="code-line">
            <span className="line-num">1</span>
            <span className="code-kw">#include</span> <span className="code-str">&lt;vector&gt;</span>
          </div>
          <div className="code-line">
            <span className="line-num">2</span>
            <span className="code-kw">#include</span> <span className="code-str">&lt;unordered_map&gt;</span>
          </div>
          <div className="code-line">
            <span className="line-num">3</span>
            <span className="code-kw">class</span> <span className="code-ident">Solution</span> {'{'}
          </div>
          <div className="code-line">
            <span className="line-num">4</span>
            <span className="code-kw">public:</span>
          </div>
          <div className="code-line indent-1">
            <span className="line-num">5</span>
            vector&lt;<span className="code-ident">int</span>&gt; <span className="code-func">twoSum</span>(vector&lt;<span className="code-ident">int</span>&gt;&amp; nums, <span className="code-ident">int</span> target) {'{'}
          </div>
          <div className="code-line indent-2">
            <span className="line-num">6</span>
            unordered_map&lt;<span className="code-ident">int</span>, <span className="code-ident">int</span>&gt; seen;
          </div>
          <div className="code-line indent-2">
            <span className="line-num">7</span>
            <span className="code-comment">// Asymptotic: O(n) Time Complexity</span>
          </div>
          <div className="code-line indent-2">
            <span className="line-num">8</span>
            <span className="code-kw">return</span> {'{}'};
          </div>
          <div className="code-line indent-1">
            <span className="line-num">9</span>
            {'}'}
          </div>
          <div className="code-line">
            <span className="line-num">10</span>
            {'};'}
          </div>
        </div>
      );
    }

    // Default snippet for any dynamic repo
    return (
      <div className="terminal-content">
        <div className="code-line">
          <span className="line-num">1</span>
          <span className="code-kw">export const</span> <span className="code-func">{project.id.replace(/-/g, '_')}</span> = () =&gt; {'{'}
        </div>
        <div className="code-line indent-1">
          <span className="line-num">2</span>
          <span className="code-kw">const</span> repo = <span className="code-str">"moaazelshazly/{project.id}"</span>;
        </div>
        <div className="code-line indent-1">
          <span className="line-num">3</span>
          <span className="code-kw">const</span> branch = <span className="code-str">"{project.defaultBranch || 'main'}"</span>;
        </div>
        <div className="code-line indent-1">
          <span className="line-num">4</span>
          <span className="code-kw">return</span> (
        </div>
        <div className="code-line indent-2">
          <span className="line-num">5</span>
          &lt;<span className="code-tag">RepositoryModule</span> <span className="code-attr">lang</span>=<span className="code-str">"{project.language}"</span> /&gt;
        </div>
        <div className="code-line indent-1">
          <span className="line-num">6</span>
          );
        </div>
        <div className="code-line">
          <span className="line-num">7</span>
          {'}'};
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-mono">03 // SELECTED WORK</span>
          </div>
          <h2 className="section-title">Engineered Projects &amp; GitHub Repositories</h2>
          <p className="section-subtitle">
            Production-grade web applications, interactive browser tools, and algorithmic repositories synced directly with GitHub.
          </p>
        </div>

        {/* GitHub Live Sync Status Banner */}
        <div className="github-sync-banner">
          <div className="sync-banner-left">
            <span className="sync-pulse-dot" />
            <span className="sync-text">
              Connected to <strong>@{GITHUB_USERNAME}</strong> on GitHub
            </span>
            <span className="sync-time-badge">
              {lastRefreshedAt === 'Live' ? 'Auto-Synced' : `Refreshed at ${lastRefreshedAt}`}
            </span>
          </div>
          <div className="sync-banner-right">
            <button
              type="button"
              onClick={handleManualRefresh}
              className={`sync-refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
              title="Re-sync data from GitHub API"
            >
              <RefreshCwIcon size={13} className={isRefreshing ? 'spin-icon' : ''} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync GitHub'}</span>
            </button>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="sync-profile-link"
            >
              <GithubIcon size={14} />
              <span>GitHub Profile</span>
              <ExternalLinkIcon size={12} />
            </a>
          </div>
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
          <span className="results-count">{filteredProjects.length} repositories displayed</span>
        </div>

        {/* Projects List */}
        <div className="projects-collection">
          {filteredProjects.map((project: Project, index: number) => {
            const currentTab = activeProjectTab[project.id] || 'overview';
            const langColor = getLanguageColor(project.language);

            return (
              <article key={project.id} className="project-feature-row">
                <div className="project-main-meta">
                  {/* Category, Status, and GitHub Live Stats */}
                  <div className="project-badge-row">
                    <span className="category-pill">{project.category}</span>
                    <span className="status-pill-subtle">
                      <span className="status-dot-sm" />
                      {project.status}
                    </span>
                    {project.language && (
                      <span className="language-indicator-pill">
                        <span className="lang-dot" style={{ backgroundColor: langColor }} />
                        <span>{project.language}</span>
                      </span>
                    )}
                    <span className="project-index-num">0{index + 1}</span>
                  </div>

                  {/* Project Title & Tagline */}
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-tagline">{project.tagline}</p>

                  {/* Live GitHub Telemetry Quick Pill Bar */}
                  <div className="project-github-stats-bar">
                    <span className="github-stat-chip" title="GitHub Stars">
                      <StarIcon size={12} />
                      <span>{project.stars ?? 0}</span>
                    </span>
                    <span className="github-stat-chip" title="GitHub Forks">
                      <GitForkIcon size={12} />
                      <span>{project.forks ?? 0}</span>
                    </span>
                    <span className="github-stat-chip" title="Default Branch">
                      <GitBranchIcon size={12} />
                      <span>{project.defaultBranch || 'main'}</span>
                    </span>
                    {project.updatedAt && (
                      <span className="github-stat-chip date-chip" title="Last Updated on GitHub">
                        <ClockIcon size={12} />
                        <span>Updated {formatGitHubDate(project.updatedAt)}</span>
                      </span>
                    )}
                  </div>

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
                    <button
                      type="button"
                      className={`project-subtab-btn ${currentTab === 'github' ? 'active' : ''}`}
                      onClick={() => setTab(project.id, 'github')}
                    >
                      <span>GitHub Spec</span>
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
                          <span className="problem-label">Challenge &amp; Engineering Solution:</span>
                          <p className="problem-text">{project.problemSolved}</p>
                        </div>
                      </div>
                    )}

                    {currentTab === 'tech' && (
                      <div className="tab-pane">
                        <div className="tech-stack-overview">
                          <span className="tech-label">Primary Stack &amp; Libraries:</span>
                          <div className="tech-tags-cloud">
                            {project.technologies.map((t) => (
                              <span key={t} className="tech-tag-pill">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentTab === 'github' && (
                      <div className="tab-pane">
                        <div className="github-spec-box">
                          <div className="github-spec-grid">
                            <div className="spec-col">
                              <span className="spec-label">Repository:</span>
                              <span className="spec-val">moaazelshazly/{project.id}</span>
                            </div>
                            <div className="spec-col">
                              <span className="spec-label">Language:</span>
                              <span className="spec-val">{project.language || 'TypeScript'}</span>
                            </div>
                            <div className="spec-col">
                              <span className="spec-label">Default Branch:</span>
                              <span className="spec-val">{project.defaultBranch || 'main'}</span>
                            </div>
                            <div className="spec-col">
                              <span className="spec-label">Clone URL:</span>
                              <span className="spec-val mono-val">{project.githubUrl}.git</span>
                            </div>
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
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <GithubIcon size={14} />
                      <span>GitHub Repo</span>
                      <ExternalLinkIcon size={12} />
                    </a>
                    {project.demoUrl && project.demoUrl !== project.githubUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <span>Live Demo</span>
                        <ExternalLinkIcon size={14} />
                      </a>
                    )}
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
                      <span className="terminal-filename">
                        {project.id}.{project.language === 'JavaScript' ? 'jsx' : project.language === 'C++' ? 'cpp' : 'tsx'}
                      </span>
                      <span className="terminal-branch">{project.defaultBranch || 'main'}</span>
                    </div>

                    {renderCodeSnippet(project)}

                    {/* Interactive Metrics Ribbon */}
                    <div className="terminal-stats-bar">
                      <div className="stat-slot">
                        <span className="stat-name">LANG</span>
                        <span className="stat-val">{project.language || 'TS'}</span>
                      </div>
                      <div className="stat-slot">
                        <span className="stat-name">STATUS</span>
                        <span className="stat-val">{project.status.toUpperCase()}</span>
                      </div>
                      <div className="stat-slot">
                        <span className="stat-name">SOURCE</span>
                        <span className="stat-val">GITHUB</span>
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
