import React from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { Projects } from '../components/Projects';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export async function projectsLoader() {
  return { projects: PORTFOLIO_DATA.projects };
}

export const ProjectsPage: React.FC = () => {
  const { projects } = useLoaderData<typeof projectsLoader>();

  return (
    <div className="subpage-wrapper">
      <div className="section-container subpage-breadcrumb-container">
        <NavLink to="/" className="back-link">
          ← Return to Full Portfolio Overview
        </NavLink>
      </div>
      <Projects projects={projects} />
    </div>
  );
};
