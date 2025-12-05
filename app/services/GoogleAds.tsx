import ServicePageLayout from '@/components/ServicePageLayout';

const GoogleAdsService = () => {
  const features = [
    {
      title: "Search Campaigns",
      description: "Target high-intent customers actively searching for your products or services with precision keyword targeting and compelling ad copy."
    },
    {
      title: "Display Advertising",
      description: "Build brand awareness and retarget visitors across millions of websites with visually engaging display ads."
    },
    {
      title: "Shopping Campaigns",
      description: "Showcase your products directly in search results with optimized product feeds and smart bidding strategies."
    },
    {
      title: "Video Advertising",
      description: "Engage audiences on YouTube with compelling video ads that drive brand awareness and conversions."
    },
    {
      title: "Performance Max",
      description: "Leverage AI-powered campaigns that automatically optimize across all Google channels for maximum ROI."
    },
    {
      title: "Remarketing",
      description: "Re-engage website visitors with tailored ads that bring them back to complete their purchase journey."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Audit & Research",
      description: "Comprehensive analysis of your market, competitors, and current advertising performance."
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Custom campaign architecture designed to meet your specific business objectives and budget."
    },
    {
      step: 3,
      title: "Campaign Launch",
      description: "Professional setup of campaigns with optimized ad copy, extensions, and targeting parameters."
    },
    {
      step: 4,
      title: "Optimize & Scale",
      description: "Continuous optimization based on data insights to improve performance and maximize ROI."
    }
  ];

  const faqs = [
    {
      question: "How much should I budget for Google Ads?",
      answer: "Budget depends on your industry, competition, and goals. We recommend starting with $2,000-$5,000/month for testing, then scaling based on results. Our clients typically see positive ROI within 60-90 days of optimized management."
    },
    {
      question: "How quickly will I see results from Google Ads?",
      answer: "You can start seeing traffic immediately after launching. However, meaningful conversion data and optimization insights typically require 2-4 weeks. Significant ROI improvements usually occur within 60-90 days of professional management."
    },
    {
      question: "What's the difference between Google Ads and SEO?",
      answer: "Google Ads provides immediate visibility through paid placements, while SEO builds organic rankings over time. We recommend a combined approach: Google Ads for immediate leads while building long-term SEO foundations."
    },
    {
      question: "Do you manage Performance Max campaigns?",
      answer: "Yes, we're certified in all Google Ads campaign types including Performance Max. We leverage AI-powered campaigns alongside traditional search campaigns for optimal results across all Google properties."
    },
    {
      question: "How do you measure Google Ads success?",
      answer: "We track key metrics including ROAS (Return on Ad Spend), cost per conversion, conversion rate, quality score, and impression share. We provide transparent monthly reports with actionable insights."
    }
  ];

  const relatedArticles = [
    {
      title: "Google Ads for Service Businesses: Complete Guide",
      description: "Learn how to maximize ROI with Google Ads for your service-based business.",
      url: "/blog/google-ads-service-businesses",
      category: "Google Ads"
    },
    {
      title: "Buyers Agents Google Ads Strategy",
      description: "Proven Google Ads strategies for buyers agents to generate quality leads.",
      url: "/blog/buyers-agents-google-ads-strategy",
      category: "Google Ads"
    },
    {
      title: "Tax Advisor Google Ads Strategy",
      description: "How accounting firms can leverage Google Ads for client acquisition.",
      url: "/blog/tax-advisor-google-ads-strategy",
      category: "Google Ads"
    },
    {
      title: "Security Company Google Ads Strategy",
      description: "Effective Google Ads campaigns for security service providers.",
      url: "/blog/security-google-ads-strategy",
      category: "Google Ads"
    }
  ];

  const benefits = [
    "Immediate visibility on Google search results",
    "Pay only when users click your ads",
    "Precise targeting by location, demographics, and intent",
    "Measurable ROI with detailed conversion tracking",
    "Flexible budgets that scale with your business",
    "Access to Google's vast advertising network",
    "Remarketing to re-engage interested visitors",
    "A/B testing capabilities for continuous improvement",
    "Competitive advantage in crowded markets"
  ];

  const industries = [
    "Professional Services",
    "E-commerce",
    "Healthcare",
    "Legal Services",
    "Home Services",
    "Financial Services",
    "Real Estate",
    "Education",
    "Technology",
    "NDIS Providers"
  ];

  return (
    <ServicePageLayout
      serviceName="Google Ads"
      serviceSlug="google-ads"
      metaTitle="Google Ads Management Services Australia | PPC Advertising Expert"
      metaDescription="Expert Google Ads management services in Australia. Drive qualified leads and sales with data-driven PPC campaigns. Free consultation available."
      heroTitle="Google Ads Management That Delivers Real Results"
      heroSubtitle="Pay-Per-Click Advertising"
      heroDescription="Transform your advertising spend into predictable, scalable revenue. Our data-driven Google Ads strategies help Australian businesses achieve 3-5x return on ad spend through precision targeting and continuous optimization."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default GoogleAdsService;
