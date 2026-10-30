import React, { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { ArrowUpIcon } from './Icons';

export const ScrollToTop: React.FC = () => {
  const { progress, percentage, scrollY } = useScrollProgress();
  const [isHovered, setIsHovered] = useState(false);

  const isVisible = scrollY > 280;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div
      className={`scroll-to-top-hud ${isVisible ? 'visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on Hover */}
      <div className={`scroll-hud-tooltip ${isHovered ? 'tooltip-open' : ''}`} role="tooltip">
        <span>Back to top · {percentage}%</span>
      </div>

      <button
        type="button"
        className="scroll-to-top-btn"
        onClick={scrollToTop}
        aria-label={`Scroll to top of page. Currently at ${percentage} percent.`}
        title="Return to top (Smooth scroll)"
      >
        <svg
          className="scroll-progress-ring"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="scrollRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-indigo, #5e6ad2)" />
              <stop offset="50%" stopColor="var(--color-accent, #7170ff)" />
              <stop offset="100%" stopColor="var(--color-teal, #00d2ff)" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            className="ring-bg"
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="2.5"
            fill="transparent"
          />

          {/* Progress stroke */}
          <circle
            className="ring-progress"
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="2.5"
            stroke="url(#scrollRingGradient)"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <span className="scroll-arrow-icon">
          <ArrowUpIcon size={16} />
        </span>
      </button>
    </div>
  );
};
