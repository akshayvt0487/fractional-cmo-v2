import { useEffect } from 'react';

interface PerformanceEntryWithTiming extends PerformanceEntry {
  processingStart?: number;
  startTime: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Log performance metrics for monitoring
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          const timingEntry = entry as PerformanceEntryWithTiming;
          if (timingEntry.processingStart) {
            console.log('FID:', timingEntry.processingStart - timingEntry.startTime);
          }
        }
        if (entry.entryType === 'layout-shift') {
          const layoutEntry = entry as LayoutShiftEntry;
          if (!layoutEntry.hadRecentInput) {
            console.log('CLS:', layoutEntry.value);
          }
        }
      }
    });

    // Observe various performance metrics
    if ('PerformanceObserver' in window) {
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        observer.observe({ entryTypes: ['first-input'] });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Fallback for older browsers
        console.log('Performance Observer not fully supported');
      }
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;