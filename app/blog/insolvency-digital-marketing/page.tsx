import { createMetadata } from "@/lib/seo";
import { blogPosts } from '@/data/blogPosts';

import OptimizedBlogLayout from "@/components/OptimizedBlogLayout";
import { Card } from "@/components/ui/card";
import Citation from "@/components/Citation";
import InternalLinks from "@/components/InternalLinks";
import heroImage from "@/assets/blog/insolvency-digital-marketing-hero.jpg";
const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  
export const metadata = createMetadata({
  title: "Insolvency Digital Marketing",
  description: "Expert guidance on insolvency digital marketing. Learn proven strategies and best practices for business growth.",
  path: "/blog/insolvency-digital-marketing",
  keywords: ["insolvency", "digital", "marketing", "digital marketing", "business growth", "marketing strategy"],
  openGraph: {
    title: "Insolvency Digital Marketing",
    description: "Expert guidance on insolvency digital marketing. Learn proven strategies and best practices for business growth.",
    url: "https://fractional-cmo.com.au/blog/insolvency-digital-marketing",
    siteName: "Fractional CMO",
    type: "article",
    images: [{
      url: "https://fractional-cmo.com.au/images/blog/insolvency-digital-marketing.jpg",
      width: 1200,
      height: 630,
      alt: "Insolvency Digital Marketing"
    }],
    publishedTime: "2026-01-15",
    modifiedTime: "2026-10-31T11:10:04.761Z",
    authors: ["Basheer Padanna"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Insolvency Digital Marketing",
    description: "Expert guidance on insolvency digital marketing. Learn proven strategies and best practices for business growth.",
    images: ["https://fractional-cmo.com.au/images/blog/insolvency-digital-marketing.jpg"],
    site: "@FractionalCMO"
  }
});
const InsolvencyDigitalMarketing = () => {
  const citations = [{
    source: "ARITA",
    title: "ARITA - Code of Professional Practice",
    url: "https://www.arita.com.au/",
    date: "2026"
  }, {
    source: "ASIC",
    title: "ASIC - Insolvency Practitioners",
    url: "https://asic.gov.au/regulatory-resources/insolvency/",
    date: "2026"
  }];
  const relatedArticles = [{
    title: "Lead Generation for Legal Services",
    description: "Proven lead generation strategies for lawyers and legal service providers.",
    url: "/blog/lawyers-lead-generation",
    category: "Legal"
  }, {
    title: "B2B Lead Generation Guide",
    description: "Master B2B lead generation with comprehensive strategies for professional services.",
    url: "/blog/b2b-lead-generation",
    category: "Lead Generation"
  }, {
    title: "Digital Strategy Framework",
    description: "Build a comprehensive digital strategy that drives sustainable business growth.",
    url: "/blog/digital-strategy-modern-business",
    category: "Strategy"
  }];
  const post = blogPosts.find(p => p.slug === "insolvency-digital-marketing");
  if (!post) throw new Error("Blog post not found: insolvency-digital-marketing");
  
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return <OptimizedBlogLayout articleData={{
    headline: "Digital Marketing Strategy for Insolvency Practitioners: Complete 2026 Guide",
    description: "Master digital marketing for insolvency practices. Proven strategies to attract corporate clients, build authority, and grow your insolvency practice in competitive markets.",
    publishedDate: convertDateFormat(post.date),
    url: "/blog/insolvency-digital-marketing",
    readTime: "14 min read",
    category: "Legal",
    author: "Basheer Padanna"
  }} heroImage={heroImage} heroAlt="Digital Marketing for Insolvency Practitioners" relatedArticles={relatedArticles}>
      <p className="lead text-xl text-muted-foreground mb-8">
        Insolvency practitioners face unique marketing challenges—highly regulated services, crisis-driven demand, and sophisticated B2B clients. This guide reveals the digital marketing strategies that drive sustainable growth for insolvency practices in 2026.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">The Digital Marketing Landscape for Insolvency Services</h2>
        
        <p className="mb-6">
          The insolvency sector has transformed dramatically. Directors no longer rely solely on accountant referrals—they research practitioners online, compare credentials, and evaluate track records before making contact. Your digital presence now influences appointment decisions before prospects even speak with you.
        </p>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Client Research Behavior</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Crisis Stage</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Google searches for immediate assistance</li>
                <li>• Review of practitioner credentials</li>
                <li>• Comparison of response times</li>
                <li>• Website professionalism assessment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Research Stage</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Educational content consumption</li>
                <li>• Case study evaluation</li>
                <li>• Referrer network validation</li>
                <li>• Fee structure comparison</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Strategic Positioning Framework</h2>
        
        <h3 className="text-2xl font-semibold mb-4 mt-8">Defining Your Market Position</h3>
        <p className="mb-6">
          Successful insolvency marketing begins with clear positioning. Generic &quot;we do everything&quot; messaging fails to resonate with sophisticated clients making high-stakes decisions.
        </p>

        <div className="bg-muted/50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold mb-4">Positioning Options for Insolvency Practitioners</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Industry Specialization</h5>
              <p className="text-muted-foreground mb-2">
                Position as the expert for specific sectors facing unique insolvency challenges:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Construction and property development (complex securities, phoenix activity risks)</li>
                <li>Retail and e-commerce (rapid liquidations, stock disposal)</li>
                <li>Manufacturing (equipment valuations, operational wind-downs)</li>
                <li>Professional services (work-in-progress recovery, goodwill considerations)</li>
                <li>Hospitality and tourism (lease negotiations, seasonal complications)</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Service Specialization</h5>
              <p className="text-muted-foreground mb-2">
                Focus on specific insolvency appointments:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Voluntary administration specialists</li>
                <li>Creditor voluntary liquidations</li>
                <li>Court liquidations and official liquidations</li>
                <li>Deed of company arrangement (DOCA) facilitation</li>
                <li>Small business restructuring (SBR) under new legislation</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Geographic Positioning</h5>
              <p className="text-muted-foreground">
                Regional practitioners can compete effectively against metro firms by emphasizing local presence, market knowledge, and accessibility. Metropolitan practitioners should highlight capacity for complex, multi-jurisdictional appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Search Engine Optimization (SEO) Strategy</h2>
        
        <p className="mb-6">
          SEO for insolvency practitioners targets two distinct audiences: distressed directors seeking immediate assistance, and professional advisors researching practitioners for client referrals.
        </p>

        <h3 className="text-2xl font-semibold mb-4 mt-8">Keyword Strategy Framework</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Crisis Keywords (High Intent)</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• &quot;insolvency practitioner [city]&quot;</li>
              <li>• &quot;liquidator urgent appointment&quot;</li>
              <li>• &quot;voluntary administration today&quot;</li>
              <li>• &quot;company in financial trouble&quot;</li>
              <li>• &quot;can&apos;t pay creditors help&quot;</li>
              <li>• &quot;wind up company urgent&quot;</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Research Keywords (Educational)</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• &quot;voluntary administration process Australia&quot;</li>
              <li>• &quot;liquidation vs voluntary administration&quot;</li>
              <li>• &quot;insolvency practitioner fees&quot;</li>
              <li>• &quot;director duties insolvent company&quot;</li>
              <li>• &quot;creditor voluntary liquidation steps&quot;</li>
              <li>• &quot;small business restructuring&quot;</li>
            </ul>
          </Card>
        </div>

        <h3 className="text-2xl font-semibold mb-4 mt-8">Technical SEO Essentials</h3>
        <div className="bg-muted/50 p-6 rounded-lg mb-6">
          <ul className="space-y-3">
            <li>
              <strong>Mobile Optimization:</strong> Directors in crisis often search outside business hours on mobile devices. Your site must load fast and display perfectly on all devices.
            </li>
            <li>
              <strong>Local SEO:</strong> Optimize Google Business Profile with accurate NAP (name, address, phone), service areas, and insolvency-specific categories.
            </li>
            <li>
              <strong>Site Structure:</strong> Clear navigation with dedicated pages for each service type (liquidation, voluntary administration, receivership, etc.).
            </li>
            <li>
              <strong>Schema Markup:</strong> Implement legal service schema to enhance search visibility and provide structured data to search engines.
            </li>
            <li>
              <strong>Page Speed:</strong> Compress images, enable caching, and minimize code to achieve sub-3-second load times.
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold mb-4 mt-8">Content Marketing for Authority</h3>
        <p className="mb-4">
          Comprehensive content establishes expertise and captures prospects at various research stages:
        </p>

        <Card className="p-6 mb-6">
          <h4 className="font-semibold mb-4">Essential Content Assets</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Cornerstone Guides</h5>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>&quot;Complete Guide to Voluntary Administration in Australia&quot;</li>
                <li>&quot;Director&apos;s Guide to Company Liquidation&quot;</li>
                <li>&quot;Understanding Creditor Rights in Insolvency&quot;</li>
                <li>&quot;Small Business Restructuring: Everything You Need to Know&quot;</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Industry-Specific Content</h5>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Construction insolvency guide (retentions, securities, subcontractor claims)</li>
                <li>Retail liquidation handbook (stock sales, lease surrender)</li>
                <li>Manufacturing wind-down strategies</li>
                <li>Professional services insolvency considerations</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Thought Leadership</h5>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Quarterly insolvency statistics and trend analysis</li>
                <li>Legislative updates and implications</li>
                <li>Court decision commentary and precedent analysis</li>
                <li>Economic outlook and insolvency predictions</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Google Ads for Immediate Visibility</h2>
        
        <p className="mb-6">
          Paid search advertising delivers instant visibility for high-value appointment searches. Properly structured Google Ads campaigns can generate consistent inquiries from qualified prospects.
        </p>

        <div className="space-y-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Campaign Structure</h3>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Branded Campaign</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Protect your firm name and practitioner names from competitor advertising:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                    <li>Bid on exact match firm name variations</li>
                    <li>Include sitelink extensions to key service pages</li>
                    <li>Highlight ARITA registration and credentials</li>
                    <li>Emphasize immediate availability</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Service-Specific Campaigns</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Separate campaigns for each primary service:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                    <li><strong>Voluntary Administration:</strong> Target VA-specific searches, emphasize business rescue options</li>
                    <li><strong>Liquidation Services:</strong> Focus on CVL and court liquidation inquiries</li>
                    <li><strong>Small Business Restructuring:</strong> Capitalize on new SBR legislation awareness</li>
                    <li><strong>Receivership:</strong> Target secured creditor and receiver appointment searches</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Geographic Campaigns</h4>
                  <p className="text-muted-foreground text-sm">
                    Target searches in your service areas with location-specific ad copy and landing pages. Adjust bids based on appointment likelihood in different regions.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Ad Copy Best Practices</h3>
            <div className="bg-muted/50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li>
                  <strong>Headline 1:</strong> Include primary keyword and immediate availability
                  <br />
                  <span className="text-sm text-muted-foreground">Example: &quot;Voluntary Administration Expert | Same Day Appointments&quot;</span>
                </li>
                <li>
                  <strong>Headline 2:</strong> Emphasize credentials and specialization
                  <br />
                  <span className="text-sm text-muted-foreground">Example: &quot;Registered Liquidator | Construction Insolvency Specialist&quot;</span>
                </li>
                <li>
                  <strong>Headline 3:</strong> Add social proof or location
                  <br />
                  <span className="text-sm text-muted-foreground">Example: &quot;25+ Years Experience | Sydney & NSW&quot;</span>
                </li>
                <li>
                  <strong>Description:</strong> Clear process overview and call-to-action
                  <br />
                  <span className="text-sm text-muted-foreground">Example: &quot;Experienced insolvency practitioners helping directors navigate voluntary administration and liquidation. Free initial consultation. Call now for immediate assistance.&quot;</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Landing Page Optimization</h3>
            <Card className="p-6">
              <p className="text-muted-foreground mb-4">
                Don&apos;t send paid traffic to your homepage. Create dedicated landing pages for each campaign:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Headline matches ad message for consistency</li>
                <li>Prominent click-to-call button (especially mobile)</li>
                <li>Simple 3-4 field inquiry form</li>
                <li>Trust indicators (ARITA registration, years of experience, testimonials)</li>
                <li>Clear process overview (what happens next)</li>
                <li>FAQ section addressing immediate concerns</li>
                <li>No navigation distractions—keep focus on conversion</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">LinkedIn Strategy for Professional Services</h2>
        
        <p className="mb-6">
          LinkedIn is the primary platform for B2B networking with accountants, lawyers, and financial advisors who refer insolvency appointments. Strategic LinkedIn presence generates consistent referral pipeline.
        </p>

        <div className="bg-muted/50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Brand Development</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Profile Optimization</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Professional headshot and cover image reflecting insolvency expertise</li>
                <li>Headline emphasizing specialization (&quot;Registered Liquidator | Construction Insolvency Specialist&quot;)</li>
                <li>About section telling your professional story and philosophy</li>
                <li>Featured section showcasing key content and case studies</li>
                <li>Regular activity demonstrating ongoing market engagement</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Content Strategy</h4>
              <p className="text-muted-foreground mb-3">
                Post 2-3 times weekly with mix of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Market Commentary:</strong> Analysis of insolvency statistics, economic trends, sector challenges</li>
                <li><strong>Educational Posts:</strong> Director duties, insolvency indicators, creditor rights</li>
                <li><strong>Legislative Updates:</strong> Changes to insolvency law, court decisions, regulatory developments</li>
                <li><strong>Case Study Insights:</strong> Anonymized appointment learnings (maintaining confidentiality)</li>
                <li><strong>Thought Leadership:</strong> Your perspectives on industry evolution and best practices</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Engagement Tactics</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Comment thoughtfully on posts from accountants, lawyers, and business advisors</li>
                <li>Share relevant content from referral partners with your commentary</li>
                <li>Participate in relevant LinkedIn groups (accounting, legal, business advisory)</li>
                <li>Respond promptly to comments on your content</li>
                <li>Send personalized connection requests with clear value proposition</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4 mt-8">LinkedIn Ads for Referrer Targeting</h3>
        <Card className="p-6 mb-6">
          <p className="text-muted-foreground mb-4">
            LinkedIn&apos;s precise B2B targeting allows you to reach potential referrers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Target Audience:</strong> Partners and directors in accounting firms, business advisory, and commercial law</li>
            <li><strong>Job Titles:</strong> Accountant, Business Advisor, Commercial Lawyer, Financial Controller, CFO</li>
            <li><strong>Company Size:</strong> Focus on firms with 10-200 employees (sweet spot for referrals)</li>
            <li><strong>Geography:</strong> Your service regions with radius targeting around major business centers</li>
            <li><strong>Ad Format:</strong> Sponsored content and InMail campaigns with educational resources</li>
            <li><strong>Offer:</strong> Downloadable guides, webinar invitations, collaboration opportunities</li>
          </ul>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Website Conversion Optimization</h2>
        
        <p className="mb-6">
          Your website must convert distressed directors and professional referrers into appointments. Every element should reduce friction and build confidence.
        </p>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Homepage Essentials</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Above the Fold</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Clear value proposition in headline (&quot;Expert Insolvency Solutions for Australian Businesses&quot;)</li>
                <li>Primary CTA button (Book Consultation / Call Now)</li>
                <li>24/7 emergency phone number with click-to-call</li>
                <li>Trust indicators (ARITA registered, years in practice, appointments completed)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Sections</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Services overview with links to detailed pages</li>
                <li>Industry specializations you serve</li>
                <li>Process explanation (what to expect)</li>
                <li>Practitioner credentials and experience</li>
                <li>Client testimonials and results</li>
                <li>Recent insights / thought leadership</li>
                <li>FAQ addressing common concerns</li>
              </ul>
            </div>
          </div>
        </Card>

        <h3 className="text-2xl font-semibold mb-4 mt-8">Service Page Structure</h3>
        <div className="bg-muted/50 p-6 rounded-lg mb-6">
          <p className="mb-4">Each service (liquidation, voluntary administration, receivership, etc.) needs a dedicated page:</p>
          <ul className="space-y-3">
            <li>
              <strong>When This Service is Appropriate:</strong> Clear explanation of situations requiring this appointment
            </li>
            <li>
              <strong>Process Overview:</strong> Step-by-step timeline from appointment to completion
            </li>
            <li>
              <strong>Your Approach:</strong> Methodology and philosophy for this service
            </li>
            <li>
              <strong>Fee Structure:</strong> Transparent explanation of costs (ranges if specific pricing not possible)
            </li>
            <li>
              <strong>Relevant Case Studies:</strong> Similar situations you&apos;ve successfully managed
            </li>
            <li>
              <strong>Next Steps:</strong> Clear CTA for consultation booking
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold mb-4 mt-8">Mobile Experience Priority</h3>
        <Card className="p-6 mb-6">
          <p className="text-muted-foreground mb-4">
            Directors in crisis often research practitioners on mobile devices outside business hours:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Click-to-call button sticky header on mobile</li>
            <li>Simplified forms (3-4 fields maximum) optimized for mobile input</li>
            <li>Fast load times (under 3 seconds) even on 4G connections</li>
            <li>Easy navigation without pinch-zoom requirements</li>
            <li>Readable text without zooming (minimum 16px font size)</li>
          </ul>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Email Marketing and Automation</h2>
        
        <p className="mb-6">
          Marketing automation nurtures prospects through the decision process and maintains engagement with your referrer network.
        </p>

        <div className="space-y-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Prospect Nurture Sequences</h3>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Immediate Crisis Sequence</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    For prospects who complete urgent inquiry form:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                    <li><strong>Email 1 (Immediate):</strong> Confirmation with next 24-hour action plan</li>
                    <li><strong>Email 2 (2 hours):</strong> Director duties and immediate obligations</li>
                    <li><strong>Email 3 (6 hours):</strong> What to prepare for first meeting</li>
                    <li><strong>Email 4 (Next day):</strong> FAQ addressing common concerns</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Research Stage Sequence</h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    For prospects who download guides or educational content:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                    <li><strong>Email 1 (Immediate):</strong> Content delivery with additional resources</li>
                    <li><strong>Email 2 (Day 3):</strong> Common misconceptions about insolvency</li>
                    <li><strong>Email 3 (Day 7):</strong> Case study of similar situation</li>
                    <li><strong>Email 4 (Day 14):</strong> Invitation for confidential discussion</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Referrer Newsletter</h3>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                Monthly newsletter for accounting, legal, and business advisory contacts:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Market Update:</strong> Current insolvency statistics and trends</li>
                <li><strong>Early Warning Signs:</strong> Help referrers identify when clients need insolvency advice</li>
                <li><strong>Recent Developments:</strong> Legislative changes, court decisions, regulatory updates</li>
                <li><strong>Case Insight:</strong> Anonymized example with lessons for advisors</li>
                <li><strong>Resources:</strong> Tools and checklists referrers can use with clients</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Measuring Digital Marketing Performance</h2>
        
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Essential Metrics Dashboard</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Traffic Metrics</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Total monthly visitors</li>
                <li>• Organic search traffic</li>
                <li>• Paid search traffic</li>
                <li>• Referral source breakdown</li>
                <li>• Mobile vs desktop split</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Conversion Metrics</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Consultation booking rate</li>
                <li>• Phone call volume</li>
                <li>• Form submission rate</li>
                <li>• Content download volume</li>
                <li>• Cost per consultation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Business Metrics</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Consultation to appointment %</li>
                <li>• Average appointment value</li>
                <li>• Marketing ROI</li>
                <li>• Referrer network growth</li>
                <li>• Repeat referral rate</li>
              </ul>
            </div>
          </div>
        </Card>

        <h3 className="text-2xl font-semibold mb-4 mt-8">Attribution Tracking</h3>
        <div className="bg-muted/50 p-6 rounded-lg mb-6">
          <p className="mb-4">
            Understand which marketing channels drive appointments:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Track initial source for every consultation booking</li>
            <li>Survey new clients on how they found you</li>
            <li>Use unique phone numbers for different campaigns (call tracking)</li>
            <li>Implement UTM parameters on all marketing URLs</li>
            <li>Analyze conversion paths in Google Analytics</li>
            <li>Calculate ROI for each marketing channel</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Compliance and Professional Standards</h2>
        
        <p className="mb-6">
          Marketing for insolvency practitioners must comply with strict regulatory and professional standards:
        </p>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Regulatory Requirements</h3>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
            <li>
              <strong>ASIC Compliance:</strong> All marketing must be truthful, not misleading, and comply with registered liquidator obligations under the Corporations Act
            </li>
            <li>
              <strong>ARITA Code of Practice:</strong> Maintain professional standards in all marketing communications and avoid bringing the profession into disrepute
            </li>
            <li>
              <strong>Confidentiality:</strong> Case studies and testimonials must protect client identities and sensitive commercial information
            </li>
            <li>
              <strong>Fee Transparency:</strong> Marketing materials should explain fee structures without making specific promises or guarantees
            </li>
            <li>
              <strong>Credential Accuracy:</strong> All qualifications, registrations, and experience claims must be accurate and verifiable
            </li>
          </ul>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">90-Day Implementation Roadmap</h2>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Months 1: Foundation & Quick Wins</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Audit current digital presence and competitive landscape</li>
              <li>✓ Define positioning and specialization strategy</li>
              <li>✓ Optimize Google Business Profile</li>
              <li>✓ Implement click-to-call and mobile optimization</li>
              <li>✓ Launch Google Ads for immediate visibility</li>
              <li>✓ Set up analytics and conversion tracking</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Month 2: Content & Authority</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Create cornerstone content assets (guides, process explanations)</li>
              <li>✓ Develop industry-specific service pages</li>
              <li>✓ Launch LinkedIn thought leadership program</li>
              <li>✓ Implement email nurture sequences</li>
              <li>✓ Build referrer resources and toolkits</li>
              <li>✓ Optimize service landing pages</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Month 3: Scale & Optimize</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Analyze performance data and ROI</li>
              <li>✓ Expand content marketing calendar</li>
              <li>✓ Launch LinkedIn Ads for referrer targeting</li>
              <li>✓ Refine Google Ads based on conversion data</li>
              <li>✓ Implement marketing automation workflows</li>
              <li>✓ Plan referrer networking events</li>
            </ul>
          </Card>
        </div>
      </section>

      <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
        <h3 className="text-xl font-semibold mb-3">Ready to Transform Your Insolvency Practice?</h3>
        <p className="mb-4">
          Digital marketing for insolvency practitioners requires specialized expertise in both marketing strategy and understanding the unique dynamics of the insolvency sector. Our team has worked with insolvency practices across Australia to develop comprehensive digital strategies that generate consistent, high-quality appointments.
        </p>
        <p className="mb-0">
          Book a strategy call to discuss how we can help your practice build digital authority, attract more appointments, and grow your referrer network.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Citations & Resources</h3>
        {citations.map((citation, index) => <Citation key={index} {...citation} />)}
      </div>
    </OptimizedBlogLayout>;
};
export default InsolvencyDigitalMarketing;
