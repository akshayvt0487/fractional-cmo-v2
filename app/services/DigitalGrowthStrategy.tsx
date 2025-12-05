import ServicePageLayout from '@/components/ServicePageLayout';

const DigitalGrowthStrategy = () => {
  const features = [
    {
      title: "Growth Audit & Assessment",
      description: "Deep analysis of your current digital presence, market position, and growth opportunities to identify high-impact strategies."
    },
    {
      title: "Customer Journey Mapping",
      description: "Detailed mapping of your ideal customer's path from awareness to purchase, identifying optimization opportunities at each stage."
    },
    {
      title: "Channel Strategy",
      description: "Data-driven recommendations on which marketing channels will deliver the best ROI for your specific business and audience."
    },
    {
      title: "Growth Experimentation",
      description: "Systematic testing framework to validate growth hypotheses and scale what works across your marketing efforts."
    },
    {
      title: "Technology Stack Optimization",
      description: "Assessment and recommendations for marketing technology, CRM, and analytics tools to support scalable growth."
    },
    {
      title: "KPI Framework & Dashboards",
      description: "Custom metrics framework and real-time dashboards to track progress toward your growth objectives."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Growth Diagnostic",
      description: "Comprehensive assessment of your business model, market, competition, and current growth levers."
    },
    {
      step: 2,
      title: "Strategy Design",
      description: "Custom growth strategy with prioritized initiatives, resource requirements, and expected outcomes."
    },
    {
      step: 3,
      title: "Roadmap Creation",
      description: "Detailed 90-day execution plan with milestones, responsibilities, and success metrics."
    },
    {
      step: 4,
      title: "Implementation Support",
      description: "Ongoing strategic guidance, performance reviews, and strategy refinement as you execute."
    }
  ];

  const faqs = [
    {
      question: "What is a digital growth strategy?",
      answer: "A digital growth strategy is a comprehensive plan that leverages digital channels, data, and technology to accelerate business growth. It goes beyond marketing to encompass customer acquisition, retention, product optimization, and scalable systems."
    },
    {
      question: "How is this different from regular marketing?",
      answer: "Traditional marketing focuses on awareness and lead generation. Growth strategy takes a holistic view—analyzing your entire customer journey, identifying friction points, optimizing conversion funnels, and building systems that compound growth over time."
    },
    {
      question: "What kind of growth can I expect?",
      answer: "Results vary by business, but our clients typically see 30-100% improvement in key metrics within 6-12 months. We focus on sustainable growth through systematic optimization rather than short-term tactics."
    },
    {
      question: "Do you implement the strategy or just advise?",
      answer: "We offer both strategic consulting and implementation support. Many clients engage us for strategy development, then either implement internally or have us manage execution through our Fractional CMO service."
    },
    {
      question: "How do you prioritize growth initiatives?",
      answer: "We use an ICE framework (Impact, Confidence, Ease) to prioritize initiatives. This ensures we focus on high-impact activities that are achievable and likely to succeed, balancing quick wins with longer-term strategic investments."
    }
  ];

  const relatedArticles = [
    {
      title: "Growth Marketing Strategy Guide",
      description: "Comprehensive guide to building a growth marketing strategy that scales.",
      url: "/blog/growth-marketing-strategy",
      category: "Growth Marketing"
    },
    {
      title: "NDIS Business Growth Strategy",
      description: "Strategic growth framework for NDIS service providers.",
      url: "/blog/ndis-business-growth-strategy",
      category: "NDIS"
    },
    {
      title: "Trade Business Growth Strategies",
      description: "Proven growth strategies for trade and service businesses.",
      url: "/blog/trade-business-growth-strategies",
      category: "Business Growth"
    },
    {
      title: "Accounting Growth Strategy Guide",
      description: "Growth strategies for accounting and financial services firms.",
      url: "/blog/accounting-growth-strategy-guide",
      category: "Professional Services"
    }
  ];

  const benefits = [
    "Clear growth roadmap with priorities",
    "Data-driven decision making",
    "Systematic approach to scaling",
    "Reduced wasted marketing spend",
    "Aligned team and resources",
    "Measurable growth metrics",
    "Sustainable competitive advantage",
    "Scalable marketing systems",
    "Expert strategic guidance"
  ];

  const industries = [
    "SaaS & Technology",
    "Professional Services",
    "NDIS Providers",
    "Healthcare",
    "Financial Services",
    "E-commerce",
    "B2B Services",
    "Education",
    "Real Estate"
  ];

  return (
    <ServicePageLayout
      serviceName="Digital Growth Strategy"
      serviceSlug="digital-growth-strategy"
      metaTitle="Digital Growth Strategy Australia | Business Growth Consulting"
      metaDescription="Expert digital growth strategy consulting in Australia. Build scalable systems for sustainable business growth with data-driven strategies and proven frameworks."
      heroTitle="Strategic Growth Planning for Ambitious Businesses"
      heroSubtitle="Growth Strategy Consulting"
      heroDescription="Move beyond random marketing tactics to systematic growth. Our digital growth strategy service helps Australian businesses build scalable acquisition systems, optimize conversion funnels, and achieve sustainable revenue growth."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default DigitalGrowthStrategy;
