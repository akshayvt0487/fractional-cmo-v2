'use client'
"use client"
import React, { useState, useRef, useEffect } from 'react';

 
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="100%25" height="100%25" fill="%23f0f0f0"/%3E%3C/svg%3E'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading === 'lazy' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '100px',
          threshold: 0.01,
        }
      );

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    }
  }, [loading]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && !imageError && (
        <div
          className={`absolute inset-0 w-full h-full bg-muted/20 animate-pulse transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      )}
      
      {shouldLoad && (
        <img
          ref={imgRef}
          src={imageError ? placeholder : src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          decoding="async"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            display: 'block'
          }}
        />
      )}
      
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;