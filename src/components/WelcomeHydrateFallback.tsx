import React, { useState, useEffect } from 'react';
import { hydrationController, type HydrationState } from '../TS/hydrationController';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const WelcomeHydrateFallback: React.FC = () => {
  const [state, setState] = useState<HydrationState>(() => hydrationController.getState());
  const [isSkipping, setIsSkipping] = useState(false);

  const handleSkip = () => {
    setIsSkipping(true);
    hydrationController.skip();
  };

  useEffect(() => {
    const unsubscribe = hydrationController.subscribe((newState) => {
      setState(newState);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isExiting = state.isExiting || isSkipping;

  return (
    <div
      className={`welcome-simple-screen ${isExiting ? 'exiting' : ''}`}
      role="status"
      aria-live="polite"
      id="hydrate-fallback"
    >
      <div className="welcome-simple-content">
        <div className="welcome-simple-avatar">
          <img
            src={PORTFOLIO_DATA.personal.avatarUrl}
            alt={PORTFOLIO_DATA.personal.name}
            width={72}
            height={72}
            decoding="async"
            fetchPriority="high"
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
          onClick={handleSkip}
          disabled={isExiting}
          aria-disabled={isExiting}
        >
          {state.isPageDataLoaded ? 'Enter' : 'Skip →'}
        </button>
      </div>
    </div>
  );
};
