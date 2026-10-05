import React from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { Contact } from '../components/Contact';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export async function contactLoader() {
  return { personal: PORTFOLIO_DATA.personal };
}

export const ContactPage: React.FC = () => {
  const { personal } = useLoaderData<typeof contactLoader>();

  return (
    <div className="subpage-wrapper">
      <div className="section-container subpage-breadcrumb-container">
        <NavLink to="/" className="back-link">
          ← Return to Full Portfolio Overview
        </NavLink>
      </div>
      <Contact personal={personal} />
    </div>
  );
};
