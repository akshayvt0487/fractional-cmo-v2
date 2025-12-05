import ServicePageLayout from '@/components/ServicePageLayout';

const SocialMediaMarketing = () => {
  const features = [
    {
      title: "Social Media Strategy",
      description: "Comprehensive social media strategy aligned with your business goals, target audience, and brand voice."
    },
    {
      title: "Content Creation",
      description: "Engaging, platform-optimized content including graphics, videos, and copy that resonates with your audience."
    },
    {
      title: "Community Management",
      description: "Active engagement with your audience through comments, messages, and community building activities."
    },
    {
      title: "Paid Social Advertising",
      description: "Targeted advertising campaigns on Facebook, Instagram, LinkedIn, and other platforms to reach ideal customers."
    },
    {
      title: "Influencer Partnerships",
      description: "Strategic influencer collaborations to expand reach and build credibility with your target market."
    },
    {
      title: "Social Analytics & Reporting",
      description: "Detailed performance tracking and insights to optimize content strategy and demonstrate ROI."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Audience Research",
      description: "Deep dive into your target audience's social media behavior, preferences, and engagement patterns."
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Custom content strategy with platform selection, content pillars, posting schedule, and growth tactics."
    },
    {
      step: 3,
      title: "Content & Campaign Execution",
      description: "Professional content creation and paid campaign management across selected platforms."
    },
    {
      step: 4,
      title: "Analyze & Optimize",
      description: "Continuous performance analysis and strategy refinement based on engagement and conversion data."
    }
  ];

  const faqs = [
    {
      question: "Which social media platforms should my business use?",
      answer: "Platform selection depends on your target audience and business type. B2B businesses typically perform well on LinkedIn, while B2C and visual products excel on Instagram and Facebook. We analyze your audience to recommend the optimal platform mix."
    },
    {
      question: "How often should I post on social media?",
      answer: "Quality trumps quantity. We recommend 3-5 posts per week on primary platforms, focusing on valuable, engaging content rather than high-volume posting. Consistency and relevance matter more than frequency."
    },
    {
      question: "What's the ROI of social media marketing?",
      answer: "Social media ROI includes brand awareness, lead generation, customer engagement, and direct sales. We set up proper attribution tracking so you can see exactly how social media contributes to your business goals."
    },
    {
      question: "Do you create the content or do we provide it?",
      answer: "We offer full-service content creation including graphics, videos, and copy. We can also work with content you provide or take a collaborative approach where we enhance and optimize your existing content."
    },
    {
      question: "How do paid social ads compare to Google Ads?",
      answer: "Paid social ads are excellent for brand awareness, audience building, and reaching people based on interests and behaviors. Google Ads capture high-intent searchers. Most businesses benefit from both working together strategically."
    }
  ];

  const relatedArticles = [
    {
      title: "Social Media Marketing Strategy Guide",
      description: "Build a winning social media strategy for your business.",
      url: "/blog/social-media-marketing-strategy",
      category: "Social Media"
    },
    {
      title: "Conveyancing Social Media Marketing",
      description: "Social media strategies for legal and conveyancing professionals.",
      url: "/blog/conveyancing-social-media-marketing",
      category: "Social Media"
    },
    {
      title: "NDIS Digital Marketing Strategies",
      description: "Social media and digital marketing for NDIS providers.",
      url: "/blog/ndis-digital-marketing-strategies",
      category: "NDIS"
    },
    {
      title: "Therapy Services Digital Marketing",
      description: "Social media strategies for therapy and healthcare providers.",
      url: "/blog/therapy-services-digital-marketing",
      category: "Healthcare"
    }
  ];

  const benefits = [
    "Increased brand awareness and reach",
    "Direct engagement with target audience",
    "Cost-effective advertising options",
    "Build community and loyalty",
    "Drive website traffic and leads",
    "Humanize your brand",
    "Real-time customer feedback",
    "Competitive insights and monitoring",
    "Support for customer service"
  ];

  const industries = [
    "Retail & E-commerce",
    "Professional Services",
    "Healthcare",
    "Real Estate",
    "Hospitality",
    "NDIS Providers",
    "Education",
    "Technology",
    "Financial Services"
  ];

  return (
    <ServicePageLayout
      serviceName="Social Media Marketing"
      serviceSlug="social-media-marketing"
      metaTitle="Social Media Marketing Services Australia | Social Media Management"
      metaDescription="Professional social media marketing services in Australia. Build your brand, engage your audience, and drive results with strategic social media management."
      heroTitle="Social Media Marketing That Builds Real Connections"
      heroSubtitle="Social Media Management"
      heroDescription="Transform your social media presence from an afterthought to a growth engine. Our strategic social media marketing helps Australian businesses build engaged communities, generate leads, and strengthen brand loyalty."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default SocialMediaMarketing;
