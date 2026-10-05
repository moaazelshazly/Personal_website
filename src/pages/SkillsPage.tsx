import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Skills } from '../components/Skills';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { hydrationController } from '../TS/hydrationController';

export async function skillsLoader() {
  const dataPromise = Promise.resolve({ skills: PORTFOLIO_DATA.skills });
  return await hydrationController.coordinateInitialLoad(dataPromise);
}

export const SkillsPage: React.FC = () => {
  const { skills } = useLoaderData<typeof skillsLoader>();

  return (
    <div className="subpage-wrapper">
      <div className="section-container subpage-breadcrumb-container">
        <Link to="/" className="back-link">
          ← Return to Full Portfolio Overview
        </Link>
      </div>
      <Skills skills={skills} />
    </div>
  );
};
