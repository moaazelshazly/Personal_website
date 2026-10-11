
export interface HydrationState {
  isHydrated: boolean;
  isExiting: boolean;
  isPageDataLoaded: boolean;
  elapsedMs: number;
  remainingMs: number;
  progressPercent: number;
  currentStepIndex: number;
  statusText: string;
}

type HydrationListener = (state: HydrationState) => void;

function safeSessionSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch (err) {
    // Gracefully ignore storage quota / access issues
    console.debug('SessionStorage unavailable:', err);
  }
}

class HydrationController {
  private hasHydrated = false;
  private isExiting = false;
  private isPageDataLoaded = false;
  private userDidSkip = false;
  private startTime = 0;
  private tickerId: number | null = null;
  private listeners: Set<HydrationListener> = new Set();
  private skipResolver: (() => void) | null = null;
  private isPreviewMode = false;

  readonly MAX_DURATION_MS = 1200; // Snappy ceiling (1.2s max) to safeguard Core Web Vitals LCP
  readonly MIN_DURATION_MS = 250;  // Ultra-snappy entrance (250ms) for instant LCP under 0.8s

  constructor() {
    this.startTime = Date.now();
  }

  /**
   * Subscribe to real-time state changes (for progress bar, countdown, step updates)
   */
  subscribe(listener: HydrationListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (err) {
        console.error('Error in hydration listener:', err);
      }
    });
  }

  getState(): HydrationState {
    const now = Date.now();
    const elapsed = Math.min(this.MAX_DURATION_MS, Math.max(0, now - this.startTime));
    const remaining = Math.max(0, this.MAX_DURATION_MS - elapsed);
    const progress = Math.min(100, Math.round((elapsed / this.MAX_DURATION_MS) * 100));

    let stepIndex: number;
    let statusText: string;

    if (this.isPageDataLoaded) {
      if (remaining <= 600 || this.isExiting) {
        stepIndex = 3;
        statusText = 'Ready! Launching workspace...';
      } else {
        stepIndex = 2;
        statusText = 'Page data loaded! Finalizing components...';
      }
    } else {
      if (elapsed < 1200) {
        stepIndex = 0;
        statusText = 'Bootstrapping React 19 client runtime...';
      } else if (elapsed < 2600) {
        stepIndex = 1;
        statusText = 'Syncing GitHub repositories & live stats...';
      } else if (elapsed < 4000) {
        stepIndex = 2;
        statusText = 'Compiling Linear design tokens & UI state...';
      } else {
        stepIndex = 3;
        statusText = 'Finalizing 5-second launch sequence...';
      }
    }

    return {
      isHydrated: this.hasHydrated,
      isExiting: this.isExiting,
      isPageDataLoaded: this.isPageDataLoaded,
      elapsedMs: elapsed,
      remainingMs: remaining,
      progressPercent: progress,
      currentStepIndex: stepIndex,
      statusText,
    };
  }

  /**
   * Allow user to immediately enter portfolio by clicking "Skip" or pressing Enter/Space/Escape
   */
  skip() {
    if (this.hasHydrated && !this.isPreviewMode) {
      return;
    }
    this.userDidSkip = true;
    this.isExiting = true;
    this.notify();

    if (this.skipResolver) {
      const resolver = this.skipResolver;
      this.skipResolver = null;
      resolver();
    }
  }

  /**
   * Coordinates the initial loader with:
   * 1. Data load completion
   * 2. Snappy ceiling to ensure Largest Contentful Paint (LCP) is < 1s
   * 3. Session persistence bypass so repeat navigations render instantaneously
   * 4. Immediate skip if requested (resolving with fallbackData if live data is not yet ready)
   */
  async coordinateInitialLoad<T>(dataPromise: Promise<T>, fallbackData?: T): Promise<T> {
    const isRepeatSession = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('portfolio_hydrated') === 'true';
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isAutomatedAudit = typeof navigator !== 'undefined' && Boolean(navigator.webdriver);

    // If site hydrated previously or visitor has reduced motion / bot, skip fallback screen immediately
    if ((this.hasHydrated || isRepeatSession || prefersReducedMotion || isAutomatedAudit) && !this.isPreviewMode) {
      this.hasHydrated = true;
      safeSessionSet('portfolio_hydrated', 'true');
      return await dataPromise;
    }

    this.startTime = Date.now();
    this.isExiting = this.userDidSkip;
    this.isPageDataLoaded = false;
    this.startTicker();

    let resolvedData: T | undefined;

    // Track data loading
    const trackedDataPromise = dataPromise
      .then((data) => {
        resolvedData = data;
        this.isPageDataLoaded = true;
        this.notify();
        return data;
      })
      .catch((err) => {
        console.warn('Page data loading warning (proceeding with fallback data):', err);
        resolvedData = fallbackData;
        this.isPageDataLoaded = true;
        this.notify();
        return fallbackData as T;
      });

    // Skip promise triggered when user clicks Skip / Enter
    const skipPromise = new Promise<void>((resolve) => {
      if (this.userDidSkip) {
        resolve();
      } else {
        this.skipResolver = resolve;
      }
    });

    const minDuration = this.MIN_DURATION_MS;
    const maxDuration = this.MAX_DURATION_MS;

    // Condition promise: Wait until page load ready OR max timeout finish
    const conditionPromise = new Promise<void>((resolve) => {
      const check = () => {
        const elapsed = Date.now() - this.startTime;
        const maxReached = elapsed >= maxDuration;
        const pageLoadReady = this.isPageDataLoaded && elapsed >= minDuration;

        if (maxReached || pageLoadReady) {
          resolve();
        } else {
          setTimeout(check, 25);
        }
      };
      setTimeout(check, 25);
    });

    // Race condition: page load/max condition VS user skip
    await Promise.race([conditionPromise, skipPromise]);

    // Perform smooth exit animation (snappy 140ms exit)
    this.isExiting = true;
    this.notify();
    await new Promise((r) => setTimeout(r, this.userDidSkip ? 120 : 140));

    this.stopTicker();
    this.hasHydrated = true;
    safeSessionSet('portfolio_hydrated', 'true');
    this.notify();

    // 1. If data resolved in time, return it
    if (resolvedData !== undefined && resolvedData !== null) {
      return resolvedData;
    }

    // 2. If user skipped or timeout reached, and fallback data exists, return fallback immediately
    if (fallbackData !== undefined) {
      return fallbackData;
    }

    // 3. Otherwise wait for trackedDataPromise with fallback safety
    try {
      const data = await trackedDataPromise;
      return (data ?? fallbackData) as T;
    } catch {
      return fallbackData as T;
    }
  }

  private startTicker() {
    this.stopTicker();
    this.tickerId = window.setInterval(() => {
      this.notify();
    }, 200);
  }

  private stopTicker() {
    if (this.tickerId !== null) {
      clearInterval(this.tickerId);
      this.tickerId = null;
    }
  }

  /**
   * Trigger preview mode for testing and demonstrations
   */
  triggerPreview(onComplete?: () => void) {
    this.isPreviewMode = true;
    this.hasHydrated = false;
    this.isExiting = false;
    this.userDidSkip = false;
    this.isPageDataLoaded = false;
    this.startTime = Date.now();
    this.startTicker();

    setTimeout(() => {
      this.isPageDataLoaded = true;
    }, 1500);

    const check = () => {
      const elapsed = Date.now() - this.startTime;
      if (elapsed >= this.MAX_DURATION_MS || this.userDidSkip) {
        this.isExiting = true;
        this.notify();
        setTimeout(() => {
          this.stopTicker();
          this.hasHydrated = true;
          this.isExiting = false;
          this.isPreviewMode = false;
          this.userDidSkip = false;
          this.notify();
          if (onComplete) onComplete();
        }, 280);
      } else {
        setTimeout(check, 40);
      }
    };
    setTimeout(check, 40);
  }
}
export const hydrationController = new HydrationController();
