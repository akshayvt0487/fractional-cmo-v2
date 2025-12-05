import ServicePageLayout from '@/components/ServicePageLayout';

const DigitalMarketingService = () => {
  const features = [
    {
      title: "Integrated Marketing Strategy",
      description: "Cohesive digital marketing plans that align all channels—SEO, PPC, social, email—toward unified business objectives."
    },
    {
      title: "Multi-Channel Campaign Management",
      description: "Expert management across Google Ads, Meta, LinkedIn, and other platforms to maximize reach and ROI."
    },
    {
      title: "Conversion Rate Optimization",
      description: "Data-driven improvements to landing pages, user journeys, and conversion funnels to maximize leads and sales."
    },
    {
      title: "Marketing Automation",
      description: "Streamlined lead nurturing and customer engagement through automated email sequences and workflows."
    },
    {
      title: "Analytics & Attribution",
      description: "Advanced tracking and reporting to understand which channels drive results and optimize marketing spend."
    },
    {
      title: "Brand Development",
      description: "Consistent brand messaging and visual identity across all digital touchpoints to build trust and recognition."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Discovery & Audit",
      description: "Comprehensive analysis of your current marketing efforts, competitors, and market opportunities."
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Custom digital marketing strategy with clear KPIs, channel mix, and resource allocation."
    },
    {
      step: 3,
      title: "Campaign Execution",
      description: "Professional implementation across all selected channels with consistent messaging and tracking."
    },
    {
      step: 4,
      title: "Optimize & Scale",
      description: "Continuous performance analysis and optimization to improve results and scale success."
    }
  ];

  const faqs = [
    {
      question: "What's included in your digital marketing services?",
      answer: "Our comprehensive digital marketing services include strategy development, SEO, paid advertising (Google & Social), content marketing, email marketing, social media management, conversion optimization, and detailed analytics reporting."
    },
    {
      question: "How do you measure digital marketing success?",
      answer: "We track key metrics aligned with your business goals: leads generated, cost per acquisition, return on ad spend, organic traffic growth, conversion rates, and revenue attribution. Monthly reports provide clear visibility into performance."
    },
    {
      question: "What budget do I need for effective digital marketing?",
      answer: "Effective digital marketing typically starts at $3,000-$5,000/month including management and ad spend. The right budget depends on your goals, competition, and market size. We'll recommend an appropriate investment during your strategy consultation."
    },
    {
      question: "How long until I see results?",
      answer: "Paid advertising can generate leads within days. SEO improvements typically show within 3-6 months. A comprehensive digital marketing strategy should demonstrate clear ROI within 90 days, with compounding results over time."
    },
    {
      question: "Do you work with businesses in my industry?",
      answer: "We specialize in B2B services, professional services, NDIS providers, and trade businesses. Our strategies are customized to your industry's unique customer journey and competitive landscape."
    }
  ];

  const relatedArticles = [
    {
      title: "Digital Marketing ROI for Service Businesses",
      description: "How to measure and maximize digital marketing return on investment.",
      url: "/blog/digital-marketing-roi-service-businesses",
      category: "Digital Marketing"
    },
    {
      title: "Digital Marketing Automation Guide",
      description: "Streamline your marketing with automation strategies that scale.",
      url: "/blog/digital-marketing-automation-guide",
      category: "Digital Marketing"
    },
    {
      title: "Digital Strategy for Modern Business",
      description: "Building a comprehensive digital strategy for business growth.",
      url: "/blog/digital-strategy-modern-business",
      category: "Digital Marketing"
    },
    {
      title: "B2B Lead Generation Strategies",
      description: "Proven tactics for generating high-quality B2B leads online.",
      url: "/blog/b2b-lead-generation-strategies",
      category: "Lead Generation"
    }
  ];

  const benefits = [
    "Unified strategy across all digital channels",
    "Data-driven decisions backed by analytics",
    "Consistent brand presence online",
    "Improved lead quality and quantity",
    "Better customer journey optimization",
    "Scalable marketing systems",
    "Transparent ROI measurement",
    "Competitive market positioning",
    "Expert guidance without full-time cost"
  ];

  const industries = [
    "Professional Services",
    "NDIS Providers",
    "Legal Services",
    "Healthcare",
    "Financial Services",
    "Home Services",
    "Real Estate",
    "Technology",
    "Construction",
    "Education"
  ];

  return (
    <ServicePageLayout
      serviceName="Digital Marketing"
      serviceSlug="digital-marketing"
      metaTitle="Digital Marketing Services Australia | Full-Service Marketing Agency"
      metaDescription="Comprehensive digital marketing services in Australia. From strategy to execution, we help businesses grow with SEO, PPC, social media, and content marketing."
      heroTitle="Full-Service Digital Marketing That Drives Growth"
      heroSubtitle="Integrated Marketing Solutions"
      heroDescription="Stop juggling disconnected marketing activities. Our integrated digital marketing services bring together strategy, execution, and optimization across all channels to deliver measurable business growth for Australian businesses."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default DigitalMarketingService;
