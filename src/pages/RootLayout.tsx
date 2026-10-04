import React, { useState, useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CommandMenu } from '../components/CommandMenu';

export const RootLayout: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app-root">
      <ScrollRestoration />

      {/* Navigation */}
      <Navbar onOpenCommand={() => setIsCommandOpen(true)} />

      {/* Routed Content */}
      <main id="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Command Palette */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </div>
  );
};
