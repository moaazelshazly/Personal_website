import React from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { Projects } from '../components/Projects';
import { fetchPortfolioProjects } from '../TS/Fetcg';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { hydrationController } from '../TS/hydrationController';

export async function projectsLoader() {
  const fallbackData = { projects: PORTFOLIO_DATA.projects };
  const dataPromise = fetchPortfolioProjects().then((projects) => ({ projects }));
  const result = await hydrationController.coordinateInitialLoad(dataPromise, fallbackData);
  return {
    projects: result?.projects || PORTFOLIO_DATA.projects,
  };
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
