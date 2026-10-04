import React from 'react';
import { useLoaderData, Link, type LoaderFunctionArgs } from 'react-router';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, ExternalLinkIcon, CheckIcon, ArrowRightIcon } from '../components/Icons';

export async function projectDetailLoader({ params }: LoaderFunctionArgs) {
  const { projectId } = params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);

  if (!project) {
    throw new Response("Project Not Found", {
      status: 404,
      statusText: `No project with identifier "${projectId}" exists in the system.`
    });
  }

  // Find next project for seamless navigation
  const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.id === projectId);
  const nextProject = PORTFOLIO_DATA.projects[(currentIndex + 1) % PORTFOLIO_DATA.projects.length];

  return { project, nextProject };
}

export const ProjectDetailPage: React.FC = () => {
  const { project, nextProject } = useLoaderData<typeof projectDetailLoader>();

  return (
    <div className="project-detail-page section-padding">
      <div className="section-container">
        {/* Navigation Breadcrumb */}
        <div className="detail-breadcrumb">
          <Link to="/#projects" className="back-link">
            <span>← Return to Projects</span>
          </Link>
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
          </div>

          <h1 className="detail-title">{project.name}</h1>
          <p className="detail-tagline">{project.tagline}</p>

          <div className="detail-actions">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <span>Launch Live Application</span>
                <ExternalLinkIcon size={15} />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon size={15} />
              <span>Inspect Source Code</span>
            </a>
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
          </div>

          {/* Sidebar Specs & Tech Stack */}
          <aside className="detail-sidebar-column">
            {/* System Specification Card */}
            <div className="detail-spec-card">
              <div className="spec-card-header">
                <span className="card-badge">System Specifications</span>
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
                <span className="next-label">Next Case Study</span>
                <Link to={`/projects/${nextProject.id}`} className="next-link">
                  <span className="next-title">{nextProject.name}</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
