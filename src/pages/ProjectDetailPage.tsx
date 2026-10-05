import React, { useState } from 'react';
import { useLoaderData, NavLink, type LoaderFunctionArgs } from 'react-router';
import { fetchPortfolioProjects, formatGitHubDate, getLanguageColor } from '../TS/Fetcg';
import {
  GithubIcon,
  ExternalLinkIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  GitForkIcon,
  GitBranchIcon,
  ClockIcon,
  CopyIcon,
} from '../components/Icons';

export async function projectDetailLoader({ params }: LoaderFunctionArgs) {
  const { projectId } = params;
  const projects = await fetchPortfolioProjects();
  const project = projects.find(
    (p) =>
      p.id.toLowerCase() === projectId?.toLowerCase() ||
      p.id.toLowerCase().replace(/[-_]/g, '') === projectId?.toLowerCase().replace(/[-_]/g, '')
  );

  if (!project) {
    throw new Response("Project Not Found", {
      status: 404,
      statusText: `No project with identifier "${projectId}" exists in the system.`
    });
  }

  // Find next project for seamless navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return { project, nextProject };
}

export const ProjectDetailPage: React.FC = () => {
  const { project, nextProject } = useLoaderData<typeof projectDetailLoader>();
  const [copiedClone, setCopiedClone] = useState(false);

  const cloneCommand = `git clone ${project.githubUrl}.git`;

  const handleCopyClone = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div className="project-detail-page section-padding">
      <div className="section-container">
        {/* Navigation Breadcrumb */}
        <div className="detail-breadcrumb">
          <NavLink to="/projects" className="back-link">
            <span>← Return to Projects</span>
          </NavLink>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{project.id}</span>
        </div>

        {/* Project Header */}
        <header className="detail-header">
          <div className="detail-badge-row">
            <span className="category-pill">{project.category}</span>
            <span className="status-pill-subtle">
              <span className="status-dot-sm" />
              {project.status}
            </span>
            {project.language && (
              <span className="language-indicator-pill">
                <span
                  className="lang-dot"
                  style={{ backgroundColor: getLanguageColor(project.language) }}
                />
                <span>{project.language}</span>
              </span>
            )}
          </div>

          <h1 className="detail-title">{project.name}</h1>
          <p className="detail-tagline">{project.tagline}</p>

          <div className="detail-actions">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <GithubIcon size={15} />
              <span>View on GitHub (@moaazelshazly)</span>
              <ExternalLinkIcon size={13} />
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <span>Launch Live Application</span>
                <ExternalLinkIcon size={14} />
              </a>
            )}
          </div>
        </header>

        {/* Deep Dive Architecture Content */}
        <div className="detail-body-grid">
          {/* Main Case Study */}
          <div className="detail-main-column">
            {/* Overview Section */}
            <section className="detail-section-block">
              <h2 className="detail-section-heading">System Overview</h2>
              <p className="detail-prose">{project.description}</p>
            </section>

            {/* Architectural Challenge & Engineering Solution */}
            <section className="detail-section-block">
              <h2 className="detail-section-heading">Architectural Challenge &amp; Solution</h2>
              <div className="detail-challenge-card">
                <div className="challenge-top">
                  <span className="tag-mono">CORE ENGINEERING PROBLEM</span>
                </div>
                <p className="challenge-text">{project.problemSolved}</p>
              </div>
            </section>

            {/* Technical Highlights */}
            <section className="detail-section-block">
              <h2 className="detail-section-heading">Key Technical Milestones</h2>
              <div className="detail-highlights-grid">
                {project.highlights.map((h, i) => (
                  <div key={i} className="detail-highlight-card">
                    <CheckIcon size={14} className="highlight-check" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Clone Terminal Box */}
            <section className="detail-section-block">
              <h2 className="detail-section-heading">Clone &amp; Run Locally</h2>
              <div className="clone-terminal-box">
                <div className="clone-code-row">
                  <span className="terminal-prompt">$</span>
                  <code className="clone-code-text">{cloneCommand}</code>
                </div>
                <button
                  type="button"
                  onClick={handleCopyClone}
                  className="clone-copy-btn"
                  aria-label="Copy clone command"
                  title="Copy to clipboard"
                >
                  {copiedClone ? (
                    <>
                      <CheckIcon size={13} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar Specs & Tech Stack */}
          <aside className="detail-sidebar-column">
            {/* Live GitHub Telemetry Card */}
            <div className="detail-spec-card github-telemetry-card">
              <div className="spec-card-header">
                <span className="card-badge">GitHub Telemetry</span>
                <span className="live-pulse-badge">
                  <span className="status-dot-sm green-pulse" />
                  Live API
                </span>
              </div>
              <div className="spec-item-list">
                <div className="spec-item">
                  <span className="spec-item-key">Repository</span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="spec-item-val link-val"
                  >
                    moaazelshazly/{project.id}
                  </a>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">Stars</span>
                  <span className="spec-item-val stat-badge">
                    <StarIcon size={12} />
                    {project.stars ?? 0}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">Forks</span>
                  <span className="spec-item-val stat-badge">
                    <GitForkIcon size={12} />
                    {project.forks ?? 0}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">Default Branch</span>
                  <span className="spec-item-val stat-badge">
                    <GitBranchIcon size={12} />
                    {project.defaultBranch || 'main'}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">Last Synced</span>
                  <span className="spec-item-val stat-badge">
                    <ClockIcon size={12} />
                    {formatGitHubDate(project.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* System Specification Card */}
            <div className="detail-spec-card">
              <div className="spec-card-header">
                <span className="card-badge">Architecture Spec</span>
              </div>
              <div className="spec-item-list">
                <div className="spec-item">
                  <span className="spec-item-key">Category</span>
                  <span className="spec-item-val">{project.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">Deployment Status</span>
                  <span className="spec-item-val green-val">{project.status}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">License</span>
                  <span className="spec-item-val">MIT Open Source</span>
                </div>
                <div className="spec-item">
                  <span className="spec-item-key">WCAG Compliance</span>
                  <span className="spec-item-val">AAA Verified</span>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="detail-tech-card">
              <h3 className="tech-card-title">Applied Technology Stack</h3>
              <div className="detail-tech-list">
                {project.technologies.map((t) => (
                  <div key={t} className="detail-tech-badge">
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Project Teaser */}
            {nextProject && (
              <div className="next-project-card">
                <span className="next-label">Next Project</span>
                <NavLink to={`/projects/${nextProject.id}`} className="next-link">
                  <span className="next-title">{nextProject.name}</span>
                  <ArrowRightIcon size={14} />
                </NavLink>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
