import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgressBar: React.FC = () => {
  const { progress, percentage, isScrolled } = useScrollProgress();

  return (
    <div
      className={`scroll-progress-container ${isScrolled ? 'active' : ''}`}
      aria-hidden="true"
    >
      <div
        className="scroll-progress-bar"
        style={{
          transform: `scaleX(${progress})`,
        }}
      >
        {/* Glowing laser spark at current scroll position */}
        <div className="scroll-progress-spark" />
      </div>

      {/* Floating percentage HUD badge on deep scroll */}
      {isScrolled && percentage > 2 && (
        <div
          className="scroll-percentage-pill"
          style={{
            left: `clamp(24px, ${progress * 100}%, calc(100% - 48px))`,
          }}
        >
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  );
};
