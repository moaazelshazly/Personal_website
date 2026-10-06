
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

class HydrationController {
  private hasHydrated = false;
  private isExiting = false;
  private isPageDataLoaded = false;
  private startTime = 0;
  private tickerId: number = null;
  private listeners: Set<HydrationListener> = new Set();
  private skipResolver: (() => void) | null = null;
  private isPreviewMode = false;

  readonly MAX_DURATION_MS = 5000; // 5 seconds maximum as requested
  readonly MIN_DURATION_MS = 2000; // Minimum duration so welcome animation is smoothly experienced

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
   * Allow user to immediately enter portfolio by clicking "Enter Now" or pressing Enter
   */
  skip() {
    if (this.skipResolver) {
      this.isExiting = true;
      this.notify();
      this.skipResolver();
      this.skipResolver = null;
    }
  }
  /**
   * Coordinates the initial loader with:
   * 1. Data load completion
   * 2. 5-second maximum timer
   * 3. Graceful minimum display so the welcome is properly visible
   * 4. Immediate skip if requested
   */
  async coordinateInitialLoad<T>(dataPromise: Promise<T>): Promise<T> {
    // If the site already hydrated on a previous visit/route, don't show welcome again
    if (this.hasHydrated && !this.isPreviewMode) {
      return await dataPromise;
    }

    this.startTime = Date.now();
    this.isExiting = false;
    this.isPageDataLoaded = false;
    this.startTicker();

    // Track data loading
    const trackedDataPromise = dataPromise
      .then((data) => {
        this.isPageDataLoaded = true;
        this.notify();
        return data;
      })
      .catch((err) => {
        console.warn('Page data loading warning (proceeding with fallback data):', err);
        this.isPageDataLoaded = true;
        this.notify();
        return null as unknown as T;
      });

    // Skip promise triggered when user clicks Enter Now
    const skipPromise = new Promise<void>((resolve) => {
      this.skipResolver = resolve;
    });

    // Condition promise: Wait until page load ready OR 5 seconds finish
    const conditionPromise = new Promise<void>((resolve) => {
      const check = () => {
        const elapsed = Date.now() - this.startTime;
        const fiveSecondsFinished = elapsed >= this.MAX_DURATION_MS;
        const pageLoadReady = this.isPageDataLoaded && elapsed >= this.MIN_DURATION_MS;

        if (fiveSecondsFinished || pageLoadReady) {
          resolve();
        } else {
          setTimeout(check, 40);
        }
      };
      setTimeout(check, 40);
    });

    // Race condition: page load/5s condition VS user skip
    await Promise.race([conditionPromise, skipPromise]);

    // Perform smooth exit animation
    this.isExiting = true;
    this.notify();
    await new Promise((r) => setTimeout(r, 320));

    this.stopTicker();
    this.hasHydrated = true;
    this.isExiting = false;
    this.notify();

    // Await data or resolve immediately if data is already in memory
    const resolvedData = await Promise.race([
      trackedDataPromise,
      new Promise<T>((r) => setTimeout(() => r(null as unknown as T), 50)),
    ]);

    return resolvedData ?? (await dataPromise);
  }

  private startTicker() {
    this.stopTicker();
    this.tickerId = setInterval(() => {
      this.notify();
    }, 40);
  }

  private stopTicker() {
    if (this.tickerId) {
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
    this.isPageDataLoaded = false;
    this.startTime = Date.now();
    this.startTicker();

    setTimeout(() => {
      this.isPageDataLoaded = true;
    }, 1500);
    const check = () => {
      const elapsed = Date.now() - this.startTime;
      if (elapsed >= this.MAX_DURATION_MS) {
        this.isExiting = true;
        this.notify();
        setTimeout(() => {
          this.stopTicker();
          this.hasHydrated = true;
          this.isExiting = false;
          this.isPreviewMode = false;
          this.notify();
          if (onComplete) onComplete();
        }, 320);
      } else {
        setTimeout(check, 50);
      }
    };
    setTimeout(check, 50);
  }
}
export const hydrationController = new HydrationController();
