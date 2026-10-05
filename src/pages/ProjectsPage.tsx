import React from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { Projects } from '../components/Projects';
import { fetchPortfolioProjects } from '../TS/Fetcg';
import { hydrationController } from '../TS/hydrationController';

export async function projectsLoader() {
  const dataPromise = fetchPortfolioProjects().then((projects) => ({ projects }));
  return await hydrationController.coordinateInitialLoad(dataPromise);
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
