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

    let mutationObserver: MutationObserver | null = null;
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const selector = '.reveal-on-scroll, .reveal-stagger, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-fade';
      const revealElements = document.querySelectorAll<HTMLElement>(selector);

      if (prefersReducedMotion) {
        revealElements.forEach((el) => {
          el.classList.add('is-revealed');
          el.setAttribute('data-revealed', 'true');
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

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add('is-revealed');
              target.setAttribute('data-revealed', 'true');
              // Unobserve once revealed for zero continuous overhead
              observer?.unobserve(target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      const observeElement = (el: HTMLElement) => {
        if (el.getAttribute('data-revealed') === 'true' || el.classList.contains('is-revealed')) {
          el.classList.add('is-revealed');
          el.setAttribute('data-revealed', 'true');
        } else {
          observer?.observe(el);
        }
      };

      revealElements.forEach(observeElement);

      // MutationObserver guarantees:
      // 1. If React re-renders and wipes 'is-revealed' from a revealed element, it is immediately restored
      // 2. Newly added elements (e.g. from filter tab switches or dynamic content) are observed
      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target as HTMLElement;
            if (
              target.getAttribute('data-revealed') === 'true' &&
              !target.classList.contains('is-revealed')
            ) {
              target.classList.add('is-revealed');
            }
          } else if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                if (node.matches(selector)) {
                  observeElement(node);
                }
                node.querySelectorAll<HTMLElement>(selector).forEach(observeElement);
              }
            });
          }
        });
      });

      mutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
        childList: true,
      });
    };

    // Small delay to ensure DOM is settled after hydration/routing
    const timer = setTimeout(setupObserver, 60);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [location.pathname, location.search]);
}
