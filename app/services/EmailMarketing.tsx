import ServicePageLayout from '@/components/ServicePageLayout';

const EmailMarketing = () => {
  const features = [
    {
      title: "Email Strategy & Planning",
      description: "Comprehensive email marketing strategy aligned with your customer journey, business goals, and audience segments."
    },
    {
      title: "Email Template Design",
      description: "Professional, mobile-responsive email templates that reflect your brand and drive engagement."
    },
    {
      title: "Automation & Sequences",
      description: "Automated email workflows for welcome series, lead nurturing, abandoned carts, and customer retention."
    },
    {
      title: "List Management & Segmentation",
      description: "Strategic list building, hygiene, and segmentation to deliver relevant messages to the right subscribers."
    },
    {
      title: "Campaign Management",
      description: "End-to-end management of email campaigns including copywriting, scheduling, A/B testing, and optimization."
    },
    {
      title: "Analytics & Optimization",
      description: "Detailed performance tracking with actionable insights to continuously improve open rates, clicks, and conversions."
    }
  ];

  const process = [
    {
      step: 1,
      title: "Audit & Assessment",
      description: "Review of your current email marketing, list health, deliverability, and performance benchmarks."
    },
    {
      step: 2,
      title: "Strategy Development",
      description: "Custom email strategy with audience segmentation, content calendar, and automation roadmap."
    },
    {
      step: 3,
      title: "Setup & Implementation",
      description: "Email platform configuration, template design, automation building, and list optimization."
    },
    {
      step: 4,
      title: "Execute & Optimize",
      description: "Ongoing campaign management with continuous testing and performance optimization."
    }
  ];

  const faqs = [
    {
      question: "Is email marketing still effective?",
      answer: "Absolutely. Email marketing delivers an average ROI of $42 for every $1 spent, making it one of the highest-performing digital channels. With proper strategy and personalization, email remains essential for customer engagement and revenue growth."
    },
    {
      question: "How often should I email my list?",
      answer: "Frequency depends on your industry and audience expectations. Most businesses benefit from 1-4 emails per week. The key is consistency and value—every email should provide something useful to your subscribers."
    },
    {
      question: "What email platform do you recommend?",
      answer: "We work with leading platforms including Klaviyo, Mailchimp, ActiveCampaign, and HubSpot. The right choice depends on your business size, features needed, and integration requirements. We'll recommend the best fit during consultation."
    },
    {
      question: "How do you grow an email list?",
      answer: "We use multiple list-building strategies: lead magnets, content upgrades, website popups, social media campaigns, and referral programs. All methods focus on attracting qualified subscribers who are genuinely interested in your offerings."
    },
    {
      question: "What about spam compliance and deliverability?",
      answer: "We ensure full compliance with Australian spam laws and international regulations (GDPR, CAN-SPAM). Our approach includes proper consent management, list hygiene, authentication setup, and deliverability monitoring to keep your emails out of spam folders."
    }
  ];

  const relatedArticles = [
    {
      title: "Digital Marketing Automation Guide",
      description: "How to automate your email and marketing workflows for scale.",
      url: "/blog/digital-marketing-automation-guide",
      category: "Marketing Automation"
    },
    {
      title: "B2B Lead Generation Strategies",
      description: "Email's role in B2B lead nurturing and conversion.",
      url: "/blog/b2b-lead-generation-strategies",
      category: "Lead Generation"
    },
    {
      title: "NDIS Participant Engagement Strategies",
      description: "Using email to engage and retain NDIS participants.",
      url: "/blog/ndis-participant-engagement-strategies",
      category: "NDIS"
    },
    {
      title: "Trade Customer Retention Strategies",
      description: "Email strategies to retain and upsell trade customers.",
      url: "/blog/trade-customer-retention-strategies",
      category: "Customer Retention"
    }
  ];

  const benefits = [
    "Highest ROI of any marketing channel",
    "Direct access to your audience",
    "Personalization at scale",
    "Automated revenue generation",
    "Measurable results and attribution",
    "Customer retention and loyalty",
    "Cost-effective communication",
    "Ownership of your audience list",
    "Integration with other channels"
  ];

  const industries = [
    "E-commerce",
    "Professional Services",
    "SaaS & Technology",
    "Healthcare",
    "Financial Services",
    "Education",
    "Real Estate",
    "NDIS Providers",
    "Hospitality"
  ];

  return (
    <ServicePageLayout
      serviceName="Email Marketing"
      serviceSlug="email-marketing"
      metaTitle="Email Marketing Services Australia | Email Automation Expert"
      metaDescription="Professional email marketing services in Australia. Drive engagement and revenue with strategic email campaigns, automation, and list management."
      heroTitle="Email Marketing That Converts Subscribers to Customers"
      heroSubtitle="Email Marketing & Automation"
      heroDescription="Unlock the power of your email list with strategic campaigns and intelligent automation. Our email marketing services help Australian businesses nurture leads, retain customers, and drive predictable revenue growth."
      features={features}
      process={process}
      faqs={faqs}
      relatedArticles={relatedArticles}
      benefits={benefits}
    />
  );
};

export default EmailMarketing;
