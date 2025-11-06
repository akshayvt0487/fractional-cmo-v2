// Critical resource preloading
const preloadCriticalImages = () => {
  const criticalImages = [
    '/images/blog/fractional-cmo-hero.jpg',
    '/favicon.png',
    '/lovable-uploads/5016915a-7345-483c-9d8f-50938a28715f.png',
    '/assets/basheer-padanna-professional.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Performance monitoring
const setupPerformanceObserver = () => {
  if ('PerformanceObserver' in window) {
    try {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Monitor Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let clsValue = 0;
        entries.forEach((entry: any) => {
          if (entry.value !== undefined && !entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.log('Performance monitoring not fully supported');
    }
  }
};

// Font loading optimization
const enableFontDisplay = () => {
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      console.log('Fonts loaded');
    });
  }
};

// Lazy loading for images
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Connection-aware loading
export const isSlowConnection = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
  }
  return false;
};

// Resource prioritization
export const prioritizeResources = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    script.removeAttribute('data-defer');
  });

  // Preload critical routes
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('../components/sections/Hero');
      import('../components/ui/header');
    });
  }
};

export const initPerformanceOptimizations = () => {
  // Preload critical resources
  preloadCriticalImages();
  
  // Setup performance observer
  setupPerformanceObserver();
  
  // Enable font display optimization
  enableFontDisplay();
  
  // Setup lazy loading
  setupLazyLoading();
  
  // Prioritize resources
  prioritizeResources();
};