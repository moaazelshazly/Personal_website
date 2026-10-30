import React, { useRef, useEffect, useState } from 'react';

export type RevealAnimation = 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'fade';

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: RevealAnimation;
  delay?: number; // in milliseconds
  threshold?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  animation = 'fade-up',
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
  children,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const animationClass = `reveal-${animation}`;
  const isRevealedClass = isVisible ? 'is-revealed' : '';

  return (
    <div
      ref={ref}
      className={`scroll-reveal-box ${animationClass} ${isRevealedClass} ${className}`.trim()}
      style={{
        ...style,
        ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
};
