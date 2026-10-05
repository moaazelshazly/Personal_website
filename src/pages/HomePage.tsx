import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Hero } from '../components/Hero';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { fetchPortfolioProjects, fetchGitHubProfile } from '../TS/Fetcg';
import { ArrowRightIcon, CodeIcon, LayersIcon, BriefcaseIcon, CpuIcon, MailIcon, CheckIcon } from '../components/Icons';

export async function homeLoader() {
  const projects = await fetchPortfolioProjects();
  const profile = await fetchGitHubProfile();

  return {
    portfolio: {
      ...PORTFOLIO_DATA,
      projects,
      personal: {
        ...PORTFOLIO_DATA.personal,
        ...(profile ? {
          avatarUrl: profile.avatar_url,
          bio: profile.bio || PORTFOLIO_DATA.personal.bio,
          publicReposCount: profile.public_repos,
        } : {})
      }
    }
  };
}

export const HomePage: React.FC = () => {
  const { portfolio } = useLoaderData<typeof homeLoader>();
  const featuredProject = portfolio.projects[0];

  const exploreCards = [
    {
      to: '/projects',
      title: 'Engineered Projects',
      tag: '01 // WORK',
      icon: <LayersIcon size={18} />,
      desc: 'High-performance React apps, speed typing benchmark, and vanilla JS game with live GitHub repository sync.',
      count: `${portfolio.projects.length} Repositories`
    },
    {
      to: '/skills',
      title: 'Technical Competencies',
      tag: '02 // SKILLS',
      icon: <CodeIcon size={18} />,
      desc: 'Structured competency matrix spanning Frontend, Backend, Programming, UI/UX, and Modern Tooling.',
      count: '5 Domains'
    },
    {
      to: '/experience',
      title: 'Experience & Education',
      tag: '03 // TRAJECTORY',
      icon: <BriefcaseIcon size={18} />,
      desc: 'Chronological timeline of software engineering roles, open source work, and academic milestones.',
      count: `${portfolio.timeline.length} Milestones`
    },
    {
      to: '/about',
      title: 'About & Philosophy',
      tag: '04 // BACKGROUND',
      icon: <CpuIcon size={18} />,
      desc: 'Engineering principles, focus areas, and approaches to zero-drift design fidelity and web performance.',
      count: 'Profile'
    }
  ];

  return (
    <div className="home-route-view">
      {/* Hero Section */}
      <Hero personal={portfolio.personal} />

      {/* Routed Gateway Navigation Section */}
      <section className="section-padding home-gateway-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">
              <span className="tag-mono">SYSTEM DIRECTORY</span>
            </div>
            <h2 className="section-title">Explore the Engineering Portfolio</h2>
            <p className="section-subtitle">
              Navigate into focused sections covering production projects, technical skills, career trajectory, and philosophy.
            </p>
          </div>

          {/* 4 Gateway Cards */}
          <div className="home-gateway-grid">
            {exploreCards.map((card) => (
              <Link key={card.to} to={card.to} className="gateway-card">
                <div className="gateway-card-top">
                  <div className="gateway-icon-box">{card.icon}</div>
                  <span className="gateway-count-pill">{card.count}</span>
                </div>
                <div className="gateway-card-middle">
                  <span className="gateway-tag">{card.tag}</span>
                  <h3 className="gateway-title">{card.title}</h3>
                  <p className="gateway-desc">{card.desc}</p>
                </div>
                <div className="gateway-card-bottom">
                  <span className="gateway-link-text">Enter Section</span>
                  <ArrowRightIcon size={14} className="gateway-arrow" />
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Project Teaser Banner */}
          {featuredProject && (
            <div className="home-featured-banner">
              <div className="featured-banner-meta">
                <span className="featured-tag">FLAGSHIP CASE STUDY</span>
                <h3 className="featured-title">{featuredProject.name}</h3>
                <p className="featured-desc">{featuredProject.tagline}</p>
                <div className="featured-highlights-row">
                  {featuredProject.highlights.map((h, i) => (
                    <span key={i} className="featured-highlight-item">
                      <CheckIcon size={13} className="check-color" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="featured-banner-action">
                <Link to={`/projects/${featuredProject.id}`} className="btn btn-primary">
                  <span>Read Full Case Study</span>
                  <ArrowRightIcon size={15} />
                </Link>
              </div>
            </div>
          )}

          {/* Quick Contact Banner */}
          <div className="home-contact-banner">
            <div className="contact-banner-content">
              <h3 className="contact-banner-title">Ready to discuss an engineering role or contract?</h3>
              <p className="contact-banner-desc">
                Currently open to frontend engineering opportunities and design system consulting.
              </p>
            </div>
            <Link to="/contact" className="btn btn-secondary">
              <MailIcon size={15} />
              <span>Initiate Contact</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
