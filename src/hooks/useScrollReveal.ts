import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Initializes IntersectionObserver to detect scroll-revealed elements
 * and triggers high-performance GPU-accelerated entrance animations.
 */
export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setupObserver = () => {
      const revealElements = document.querySelectorAll<HTMLElement>(
        '.reveal-on-scroll, .reveal-stagger, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-fade'
      );

      if (revealElements.length === 0) return;

      if (prefersReducedMotion) {
        revealElements.forEach((el) => {
          el.classList.add('is-revealed');
        });
        return;
      }

      // Automatically assign stagger indices to child elements if parent has reveal-stagger
      document.querySelectorAll<HTMLElement>('.reveal-stagger').forEach((parent) => {
        const children = parent.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i] as HTMLElement;
          if (!child.style.getPropertyValue('--reveal-index')) {
            child.style.setProperty('--reveal-index', `${i}`);
          }
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              // Unobserve once revealed for zero continuous overhead
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealElements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    };

    // Small delay to ensure DOM is settled after hydration/routing
    const timer = setTimeout(setupObserver, 60);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
}
