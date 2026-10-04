import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Experience } from '../components/Experience';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export async function experienceLoader() {
  return { timeline: PORTFOLIO_DATA.timeline };
}

export const ExperiencePage: React.FC = () => {
  const { timeline } = useLoaderData<typeof experienceLoader>();

  return (
    <div className="subpage-wrapper">
      <div className="section-container subpage-breadcrumb-container">
        <Link to="/" className="back-link">
          ← Return to Full Portfolio Overview
        </Link>
      </div>
      <Experience timeline={timeline} />
    </div>
  );
};
