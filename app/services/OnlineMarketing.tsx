import ServicePageLayout from '@/components/ServicePageLayout';

const OnlineMarketing = () => {
  const features = [
    {
      title: "Comprehensive Online Presence Audit",
      description: "Full assessment of your digital footprint including website, search visibility, social profiles, and online reputation."
    },
    {
      title: "Website Optimization",
      description: "Conversion-focused improvements to your website's design, content, speed, and user experience."
    },
    {
      title: "Search Marketing (SEO & PPC)",
      description: "Integrated search strategy combining organic optimization with paid advertising for maximum visibility."
    },
    {
      title: "Content Marketing",
      description: "Strategic content creation that attracts, educates, and converts your target audience."
    },
    {
      title: "Online Reputation Management",
      description: "Monitor, manage, and improve your online reviews and brand perception across platforms."
    },
    {
      title: "Lead Generation Systems",
      description: "End-to-end lead capture, nurturing, and qualification systems to grow your customer base."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Digital Assessment",
      description: "Comprehensive review of your online presence, competitors, and market opportunities."
    },
    {
      step: 2,
      title: "Strategy Blueprint",
      description: "Custom online marketing plan with prioritized initiatives and clear success metrics."
    },
    {
      step: 3,
      title: "Implementation",
      description: "Systematic rollout of marketing initiatives across channels with proper tracking."
    },
    {
      step: 4,
      title: "Measure & Scale",
      description: "Performance monitoring, optimization, and scaling of successful strategies."
    }
  ];

  const faqs = [
    {
      question: "What's the difference between online marketing and digital marketing?",
      answer: "Online marketing and digital marketing are often used interchangeably. Both encompass marketing activities conducted through digital channels—websites, search engines, social media, email, and online advertising. We use the terms synonymously."
    },
    {
      question: "Where should I start with online marketing?",
      answer: "Start with a solid foundation: a well-optimized website, Google Business Profile, and basic SEO. From there, add channels based on where your customers spend time—typically Google Ads for immediate leads and social media for brand building."
    },
    {
      question: "How much should I invest in online marketing?",
      answer: "Investment varies by business size and goals. Most SMBs allocate 5-12% of revenue to marketing, with 50-80% going to digital channels. We recommend starting with $3,000-$5,000/month for meaningful impact, scaling based on results."
    },
    {
      question: "How do you measure online marketing success?",
      answer: "We track metrics tied to your business goals: website traffic, lead generation, cost per acquisition, conversion rates, revenue attribution, and ROI. Regular reporting provides clear visibility into what's working."
    },
    {
      question: "Can you help if I have no online presence yet?",
      answer: "Absolutely. We specialize in building online presence from scratch—from website development and SEO foundation to establishing social profiles and launching initial advertising campaigns. We'll create a phased plan that builds momentum over time."
    }
  ];

  const relatedArticles = [
    {
      title: "Digital Marketing ROI for Service Businesses",
      description: "Measuring and maximizing your online marketing investment.",
      url: "/blog/digital-marketing-roi-service-businesses",
      category: "Digital Marketing"
    },
    {
      title: "Local Search Ranking Strategies",
      description: "Dominate local search results for your business.",
      url: "/blog/local-search-ranking-strategies",
      category: "SEO"
    },
    {
      title: "Google Ads for Service Businesses",
      description: "Effective paid advertising strategies for service providers.",
      url: "/blog/google-ads-service-businesses",
      category: "Google Ads"
    },
    {
      title: "Growth Marketing Strategy",
      description: "Building sustainable online growth systems.",
      url: "/blog/growth-marketing-strategy",
      category: "Growth Marketing"
    }
  ];

  const benefits = [
    "Reach customers where they spend time",
    "Cost-effective compared to traditional marketing",
    "Precise targeting capabilities",
    "Measurable results and ROI",
    "24/7 marketing presence",
    "Scalable as your business grows",
    "Build lasting digital assets",
    "Compete with larger competitors",
    "Data-driven optimization"
  ];

  const industries = [
    "Professional Services",
    "Healthcare",
    "Legal Services",
    "Financial Services",
    "Home Services",
    "Real Estate",
    "NDIS Providers",
    "Retail",
    "Technology",
    "Education"
  ];

  return (
    <ServicePageLayout
      serviceName="Online Marketing"
      serviceSlug="online-marketing"
      metaTitle="Online Marketing Services Australia | Internet Marketing Expert"
      metaDescription="Professional online marketing services in Australia. Grow your business with comprehensive internet marketing strategies including SEO, PPC, social media, and more."
      heroTitle="Online Marketing Solutions for Business Growth"
      heroSubtitle="Internet Marketing Services"
      heroDescription="Establish and grow your online presence with comprehensive marketing strategies. From search visibility to lead generation, our online marketing services help Australian businesses attract, engage, and convert customers in the digital landscape."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default OnlineMarketing;
