import ServicePageLayout from '@/components/ServicePageLayout';

const SEOServices = () => {
  const features = [
    {
      title: "Technical SEO Audit",
      description: "Comprehensive analysis of site architecture, speed, mobile-friendliness, and crawlability to ensure search engines can index your content effectively."
    },
    {
      title: "On-Page Optimization",
      description: "Strategic optimization of title tags, meta descriptions, headers, content structure, and internal linking for maximum search visibility."
    },
    {
      title: "Content Strategy",
      description: "Data-driven content planning that targets high-value keywords and addresses user search intent throughout the buyer journey."
    },
    {
      title: "Local SEO",
      description: "Dominate local search results with Google Business Profile optimization, local citations, and geo-targeted content strategies."
    },
    {
      title: "Link Building",
      description: "Ethical, white-hat link acquisition from authoritative websites to build domain authority and improve rankings."
    },
    {
      title: "SEO Analytics & Reporting",
      description: "Transparent monthly reporting with actionable insights on rankings, traffic, conversions, and ROI metrics."
    }
  ];

  const process = [
    {
      step: 1,
      title: "SEO Audit",
      description: "Deep-dive analysis of your website's current SEO health, competitor landscape, and opportunity gaps."
    },
    {
      step: 2,
      title: "Strategy Blueprint",
      description: "Custom SEO roadmap prioritizing quick wins and long-term growth strategies aligned with your goals."
    },
    {
      step: 3,
      title: "Implementation",
      description: "Systematic execution of technical fixes, content optimization, and link building activities."
    },
    {
      step: 4,
      title: "Monitor & Refine",
      description: "Ongoing tracking, algorithm adaptation, and strategy refinement for sustained ranking improvements."
    }
  ];

  const faqs = [
    {
      question: "How long does SEO take to show results?",
      answer: "SEO is a long-term investment. You'll typically see initial improvements in 3-6 months, with significant results in 6-12 months. The timeline depends on your website's current state, competition level, and the aggressiveness of your strategy."
    },
    {
      question: "What's the difference between on-page and off-page SEO?",
      answer: "On-page SEO refers to optimizations made directly on your website (content, structure, technical elements). Off-page SEO involves external factors like backlinks, brand mentions, and social signals that build your site's authority."
    },
    {
      question: "Do you guarantee first page rankings?",
      answer: "No ethical SEO provider can guarantee specific rankings as Google's algorithm considers 200+ factors. However, we guarantee following best practices, transparent reporting, and working toward agreed-upon KPIs with proven methodologies."
    },
    {
      question: "How do you approach local SEO?",
      answer: "Our local SEO strategy includes Google Business Profile optimization, local citation building, location-specific content creation, review management, and schema markup implementation to dominate local search results."
    },
    {
      question: "Will SEO work alongside my paid advertising?",
      answer: "Absolutely. SEO and paid advertising complement each other perfectly. While SEO builds long-term organic presence, paid ads provide immediate visibility. Together, they maximize your search engine real estate and overall marketing effectiveness."
    }
  ];

  const relatedArticles = [
    {
      title: "Local Search Ranking Strategies for Australian Businesses",
      description: "Master local SEO to dominate search results in your service area.",
      url: "/blog/local-search-ranking-strategies",
      category: "SEO"
    },
    {
      title: "Local SEO for Trade Businesses",
      description: "Complete guide to local SEO strategies for tradies and service providers.",
      url: "/blog/local-seo-trade-businesses",
      category: "SEO"
    },
    {
      title: "Conveyancing SEO Guide",
      description: "SEO strategies specifically for conveyancing and legal professionals.",
      url: "/blog/conveyancing-seo-guide",
      category: "SEO"
    },
    {
      title: "Financial Planner SEO Guide",
      description: "How financial planners can improve organic search visibility.",
      url: "/blog/financial-planner-seo-guide",
      category: "SEO"
    }
  ];

  const benefits = [
    "Sustainable organic traffic growth",
    "Higher quality leads from search intent",
    "Improved brand credibility and trust",
    "Lower cost per acquisition over time",
    "24/7 visibility without ongoing ad spend",
    "Competitive advantage in your market",
    "Better user experience and site performance",
    "Measurable ROI with clear attribution",
    "Long-lasting results that compound over time"
  ];

  const industries = [
    "Professional Services",
    "Legal Services",
    "Healthcare",
    "Financial Services",
    "Home Services",
    "E-commerce",
    "Real Estate",
    "NDIS Providers",
    "Technology",
    "Education"
  ];

  return (
    <ServicePageLayout
      serviceName="SEO Services"
      serviceSlug="seo-services"
      metaTitle="SEO Services Australia | Search Engine Optimization Expert"
      metaDescription="Professional SEO services in Australia. Improve organic rankings, drive qualified traffic, and grow your business with proven search optimization strategies."
      heroTitle="SEO Services That Drive Sustainable Growth"
      heroSubtitle="Search Engine Optimization"
      heroDescription="Build lasting organic visibility with our comprehensive SEO services. We combine technical expertise, content strategy, and data-driven optimization to help Australian businesses rank higher and convert more visitors into customers."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default SEOServices;
