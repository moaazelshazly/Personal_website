import React from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { About } from '../components/About';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export async function aboutLoader() {
  return {
    about: PORTFOLIO_DATA.about,
    personal: PORTFOLIO_DATA.personal
  };
}

export const AboutPage: React.FC = () => {
  const { about, personal } = useLoaderData<typeof aboutLoader>();

  return (
    <div className="subpage-wrapper">
      <div className="section-container subpage-breadcrumb-container">
        <NavLink to="/" className="back-link">
          ← Return to Full Portfolio Overview
        </NavLink>
      </div>
      <About about={about} personal={personal} />
    </div>
  );
};
