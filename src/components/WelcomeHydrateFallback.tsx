import React, { useState, useEffect } from 'react';
import { hydrationController, type HydrationState } from '../TS/hydrationController';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const WelcomeHydrateFallback: React.FC = () => {
  const [state, setState] = useState<HydrationState>(() => hydrationController.getState());

  useEffect(() => {
    const unsubscribe = hydrationController.subscribe((newState) => {
      setState(newState);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`welcome-simple-screen ${state.isExiting ? 'exiting' : ''}`}
      role="status"
      aria-live="polite"
      id="hydrate-fallback"
    >
      <div className="welcome-simple-content">
        <div className="welcome-simple-avatar">
          <img
            src={PORTFOLIO_DATA.personal.avatarUrl}
            alt={PORTFOLIO_DATA.personal.name}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <p className="welcome-simple-tag">Welcome</p>
        <h1 className="welcome-simple-title">{PORTFOLIO_DATA.personal.name}</h1>
        <p className="welcome-simple-role">{PORTFOLIO_DATA.personal.role}</p>

        <button
          type="button"
          className="welcome-simple-skip"
          onClick={() => hydrationController.skip()}
        >
          {state.isPageDataLoaded ? 'Enter' : 'Skip →'}
        </button>
      </div>
    </div>
  );
};
