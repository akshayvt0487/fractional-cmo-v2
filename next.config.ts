import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      {
        source: '/blog/accounting-digital-marketing-guide',
        destination: '/blog/accounting-digital-marketing',
        permanent: true,
      },
      {
        source: '/blog/accounting-growth-strategy-guide',
        destination: '/blog/accounting-growth-strategy',
        permanent: true,
      },
      {
        source: '/blog/b2b-lead-generation-strategies',
        destination: '/blog/b2b-lead-generation',
        permanent: true,
      },
      {
        source: '/blog/construction-cost-estimation-guide',
        destination: '/blog/construction-cost-estimation',
        permanent: true,
      },
      {
        source: '/blog/conveyancing-seo-guide',
        destination: '/blog/conveyancing-seo',
        permanent: true,
      },
      {
        source: '/blog/digital-marketing-automation-guide',
        destination: '/blog/digital-marketing-automation',
        permanent: true,
      },
      {
        source: '/blog/financial-planner-seo-guide',
        destination: '/blog/financial-planner-seo',
        permanent: true,
      },
      {
        source: '/blog/floor-sanding-digital-marketing-guide',
        destination: '/blog/floor-sanding-digital-marketing',
        permanent: true,
      },
      {
        source: '/blog/google-ads-conveyancing-guide',
        destination: '/blog/google-ads-conveyancing',
        permanent: true,
      },
      {
        source: '/blog/home-builders-lead-generation-guide',
        destination: '/blog/home-builders-lead-generation',
        permanent: true,
      },
      {
        source: '/blog/it-consulting-lead-generation-guide',
        destination: '/blog/it-consulting-lead-generation',
        permanent: true,
      },
      {
        source: '/blog/loan-broker-digital-marketing-guide',
        destination: '/blog/loan-broker-digital-marketing',
        permanent: true,
      },
      {
        source: '/blog/local-search-ranking-strategies',
        destination: '/blog/local-search-ranking',
        permanent: true,
      },
      {
        source: '/blog/ndis-software-saas-marketing-guide',
        destination: '/blog/ndis-software-saas-marketing',
        permanent: true,
      },
      {
        source: '/blog/ndis-web-design-guide',
        destination: '/blog/ndis-web-design',
        permanent: true,
      },
      {
        source: '/blog/painters-digital-marketing-guide',
        destination: '/blog/painters-digital-marketing',
        permanent: true,
      },
      {
        source: '/blog/pre-purchase-car-inspection-business-guide',
        destination: '/blog/pre-purchase-car-inspection-business',
        permanent: true,
      },
      {
        source: '/blog/real-estate-seo-marketing-guide',
        destination: '/blog/real-estate-seo-marketing',
        permanent: true,
      },
      {
        source: '/blog/removalist-business-marketing-guide',
        destination: '/blog/removalist-business-marketing',
        permanent: true,
      },
      {
        source: '/blog/removalist-digital-marketing-guide',
        destination: '/blog/removalist-digital-marketing',
        permanent: true,
      },
      {
        source: '/blog/starting-removalist-business-guide',
        destination: '/blog/starting-removalist-business',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/image/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' },
        ],
      },
    ];
  },
};

export default nextConfig;
