// Centralized citation data for blog posts
export const citations = {
  // NDIS Industry Data
  ndis: {
    providers: {
      source: "NDIS Commission",
      url: "https://www.ndiscommission.gov.au/about/data-and-insights/quarterly-performance-reports",
      title: "NDIS Provider Registration Data",
      date: "2024"
    },
    participants: {
      source: "NDIA",
      url: "https://www.ndis.gov.au/about-us/publications/quarterly-reports",
      title: "NDIS Quarterly Report",
      date: "Q4 2023"
    },
    budget: {
      source: "Australian Government Budget",
      url: "https://www.budget.gov.au/2023-24/content/bp2/download/bp2_2023-24.pdf",
      title: "Budget Paper No. 2 - NDIS Funding",
      date: "2023-24"
    },
    digitalUsage: {
      source: "Deloitte Access Economics",
      url: "https://www2.deloitte.com/au/en/pages/economics/articles/ndis-market-stewardship.html",
      title: "NDIS Market Stewardship Report",
      date: "2023"
    }
  },

  // B2B Marketing Data
  b2b: {
    leadGenChallenge: {
      source: "HubSpot Research",
      url: "https://blog.hubspot.com/marketing/state-of-inbound-2023",
      title: "State of Inbound Marketing Report",
      date: "2023"
    },
    leadScoring: {
      source: "Marketo",
      url: "https://www.marketo.com/definitive-guides/lead-scoring/",
      title: "The Definitive Guide to Lead Scoring",
      date: "2023"
    },
    leadNurturing: {
      source: "Forrester Research",
      url: "https://go.forrester.com/what-it-means/b2b-lead-management/",
      title: "B2B Lead Management Best Practices",
      date: "2023"
    },
    linkedinLeads: {
      source: "LinkedIn Marketing Solutions",
      url: "https://business.linkedin.com/marketing-solutions/b2b-marketing",
      title: "B2B Marketing on LinkedIn: Statistics and Insights",
      date: "2023"
    }
  },

  // Digital Marketing Industry Data
  digitalMarketing: {
    marketingBudget: {
      source: "HubSpot Research",
      url: "https://blog.hubspot.com/marketing/how-much-budget-for-marketing",
      title: "How Much Should Companies Spend on Marketing? [Data + Expert Insights]",
      date: "2023"
    },
    contentMarketing: {
      source: "Content Marketing Institute",
      url: "https://contentmarketinginstitute.com/research/",
      title: "B2B Content Marketing Benchmarks Report",
      date: "2023"
    },
    seoStats: {
      source: "BrightEdge Research",
      url: "https://www.brightedge.com/resources/research-reports/organic-search-driving-traffic",
      title: "Organic Search Drives 53% of All Site Traffic",
      date: "2023"
    }
  },

  // Cyber Security Data
  cybersecurity: {
    startupFailure: {
      source: "CB Insights",
      url: "https://www.cbinsights.com/research/cybersecurity-startup-market-map/",
      title: "The Cybersecurity Startup Market Map: 150+ Startups In 17 Categories",
      date: "2023"
    },
    customerAcquisition: {
      source: "SaaS Capital",
      url: "https://www.saas-capital.com/blog-posts/what-does-it-cost-to-acquire-a-customer/",
      title: "What Does It Cost to Acquire a Customer? 2023 B2B SaaS Benchmarks",
      date: "2023"
    }
  },

  // Legal Industry Data
  legal: {
    digitalAdoption: {
      source: "American Bar Association",
      url: "https://www.americanbar.org/groups/law_practice/publications/techreport/",
      title: "Legal Technology Survey Report",
      date: "2023"
    },
    clientAcquisition: {
      source: "Thomson Reuters",
      url: "https://legal.thomsonreuters.com/en/insights/reports/state-of-us-small-law-firms",
      title: "State of U.S. Small Law Firms Report",
      date: "2023"
    }
  },

  // Construction Industry Data
  construction: {
    marketSize: {
      source: "IBISWorld",
      url: "https://www.ibisworld.com/au/industry/residential-building-construction/",
      title: "Residential Building Construction in Australia - Market Research Report",
      date: "2023"
    },
    digitalAdoption: {
      source: "Construction Industry Institute",
      url: "https://www.construction-institute.org/resources/knowledgebase/knowledge-areas/business-process-improvement",
      title: "Digital Adoption in Construction Industry",
      date: "2023"
    }
  }
};

export type CitationKey = keyof typeof citations;
export type CitationSubKey<T extends CitationKey> = keyof typeof citations[T];