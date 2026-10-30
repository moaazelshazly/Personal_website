import { useState, useEffect, useRef } from 'react';

export interface ScrollProgressState {
  progress: number; // 0 to 1
  percentage: number; // 0 to 100
  scrollY: number;
  direction: 'up' | 'down' | null;
  isScrolled: boolean;
  isNearBottom: boolean;
}

export function useScrollProgress(): ScrollProgressState {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    progress: 0,
    percentage: 0,
    scrollY: 0,
    direction: null,
    isScrolled: false,
    isNearBottom: false,
  });

  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;

        const currentY = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const safeTotal = totalHeight > 0 ? totalHeight : 1;
        const currentProgress = Math.min(Math.max(currentY / safeTotal, 0), 1);
        const percentage = Math.round(currentProgress * 100);

        let direction: 'up' | 'down' | null = null;
        if (Math.abs(currentY - lastScrollY.current) > 2) {
          direction = currentY > lastScrollY.current ? 'down' : 'up';
          lastScrollY.current = currentY;
        }

        const isScrolled = currentY > 20;
        const isNearBottom = currentProgress >= 0.95;

        setScrollState((prev) => {
          if (
            prev.percentage === percentage &&
            prev.isScrolled === isScrolled &&
            prev.isNearBottom === isNearBottom &&
            prev.direction === direction
          ) {
            return prev;
          }

          return {
            progress: currentProgress,
            percentage,
            scrollY: currentY,
            direction: direction ?? prev.direction,
            isScrolled,
            isNearBottom,
          };
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollState;
}
