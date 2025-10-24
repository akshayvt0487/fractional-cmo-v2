import React from 'react';
import OptimizedBlogLayout from '@/components/OptimizedBlogLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StrategyForm from '@/components/ui/strategy-form';
import heroImage from '@/assets/blog/lawyers-lead-generation-hero.jpg';
import { relatedArticles } from '@/utils/seoUtils';

const LawyersLeadGeneration = () => {
  const articleData = {
    headline: "Lawyer Lead Generation: Proven Strategies to Attract Quality Clients",
    description: "Master ethical lead generation strategies for law firms. Learn digital marketing, content strategies, and networking tactics that consistently attract high-value legal clients.",
    author: "Basheer Padanna",
    publishedDate: "2025-01-18",
    modifiedDate: "2025-01-18",
    url: "/blog/lawyers-lead-generation",
    imageUrl: heroImage,
    category: "Legal Marketing",
    readTime: "26 min read",
    tags: ["Legal Marketing", "Lead Generation", "Law Firm Growth", "Digital Marketing", "Client Acquisition"]
  };

  const faqs = [
    {
      question: "What are the most effective lead generation strategies for lawyers?",
      answer: "The most effective strategies include content marketing (legal guides, blog posts), SEO optimization for legal keywords, Google Ads for high-intent searches, networking events, referral programs, and thought leadership through speaking engagements and media appearances."
    },
    {
      question: "Are there ethical restrictions on lawyer advertising?",
      answer: "Yes, lawyers must comply with professional conduct rules that vary by jurisdiction. Generally, advertising must be truthful, not misleading, not create unrealistic expectations, and maintain client confidentiality. Always check your local bar association guidelines."
    },
    {
      question: "What's a reasonable marketing budget for a law firm?",
      answer: "Most successful law firms invest 7-12% of gross revenue in marketing. Solo practitioners might start with $2,000-5,000 monthly, while larger firms often invest $10,000+ monthly. Focus on ROI rather than just budget size."
    },
    {
      question: "How long does it take to see results from legal marketing?",
      answer: "SEO and content marketing typically show results in 6-12 months. Google Ads can generate leads immediately. Networking and referral building take 3-6 months to establish momentum. Consistent effort across multiple channels yields the best long-term results."
    }
  ];

  return (
    <OptimizedBlogLayout
      articleData={articleData}
      relatedArticles={relatedArticles.legal}
      faqs={faqs}
      heroImage={heroImage}
      heroAlt="Professional lawyer implementing digital lead generation strategies in modern law firm office"
    >
      <section className="mb-12">
        <Card className="border-l-4 border-l-primary bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Legal Market Insights
              </Badge>
              <span className="text-sm text-muted-foreground">Updated January 2025</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Legal Services Market</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">$180B+</div>
                <div className="text-sm text-muted-foreground">Legal Services Market Size</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1.3M+</div>
                <div className="text-sm text-muted-foreground">Licensed Lawyers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">74%</div>
                <div className="text-sm text-muted-foreground">Find Lawyers Online</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-lg leading-relaxed text-muted-foreground mb-6">
          The legal profession is highly competitive, making effective lead generation crucial for firm growth. This comprehensive guide reveals proven strategies that successful law firms use to attract quality clients while maintaining ethical standards and building long-term relationships.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Understanding Legal Client Acquisition</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">The Legal Client Journey</h3>
          <p className="text-muted-foreground mb-4">
            Legal clients follow a specific decision-making process that differs significantly from other industries. Understanding this journey is essential for effective marketing:
          </p>
          <div className="bg-muted/50 p-6 rounded-lg mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Problem Recognition</h4>
                <p className="text-sm text-muted-foreground">Client realizes they need legal help</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Research & Education</h4>
                <p className="text-sm text-muted-foreground">Searches for information and potential lawyers</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Evaluation</h4>
                <p className="text-sm text-muted-foreground">Compares lawyers based on expertise and trust</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Decision</h4>
                <p className="text-sm text-muted-foreground">Selects lawyer and initiates engagement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Practice Area Considerations</h3>
          <p className="text-muted-foreground mb-6">
            Different practice areas require different marketing approaches and have varying client acquisition patterns:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">High-Volume Practice Areas</h4>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li>• Personal injury</li>
                  <li>• Family law and divorce</li>
                  <li>• Criminal defense</li>
                  <li>• Employment law</li>
                  <li>• Bankruptcy</li>
                </ul>
                <div className="bg-muted/50 p-3 rounded">
                  <p className="text-sm"><strong>Marketing focus:</strong> Local SEO, Google Ads, content marketing for common questions</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Specialized Practice Areas</h4>
                <ul className="space-y-2 text-muted-foreground mb-4">
                  <li>• Corporate law</li>
                  <li>• Intellectual property</li>
                  <li>• Tax law</li>
                  <li>• Real estate transactions</li>
                  <li>• Estate planning</li>
                </ul>
                <div className="bg-muted/50 p-3 rounded">
                  <p className="text-sm"><strong>Marketing focus:</strong> Professional networking, thought leadership, referral relationships</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Digital Marketing Strategies</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Search Engine Optimization (SEO)</h3>
          <p className="text-muted-foreground mb-6">
            SEO is crucial for law firms as most legal clients start their search online. Ranking well for relevant legal terms establishes credibility and drives qualified traffic.
          </p>
          
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mb-6">
            <h4 className="font-semibold mb-4 text-primary">Essential Legal Keywords Strategy</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium mb-2">Core Practice Keywords</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "[practice area] lawyer [city]"</li>
                  <li>• "[practice area] attorney near me"</li>
                  <li>• "best [practice area] lawyer"</li>
                  <li>• "[city] law firm"</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Problem-Based Keywords</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "what to do after [legal issue]"</li>
                  <li>• "how to [legal action]"</li>
                  <li>• "[legal issue] help [location]"</li>
                  <li>• "need lawyer for [problem]"</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Long-tail Opportunities</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Specific legal procedures</li>
                  <li>• Common legal questions</li>
                  <li>• Industry-specific legal needs</li>
                  <li>• Local court procedures</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">On-Page SEO for Law Firms</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Optimize title tags with practice area + location</li>
                  <li>• Create dedicated practice area pages</li>
                  <li>• Include attorney bios with expertise details</li>
                  <li>• Add client testimonials and case results</li>
                  <li>• Implement local business schema markup</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Content Marketing Strategy</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Write comprehensive legal guides</li>
                  <li>• Create FAQ sections for common issues</li>
                  <li>• Publish case study summaries</li>
                  <li>• Share legal news and updates</li>
                  <li>• Develop practice area resource libraries</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Google Ads for Legal Services</h3>
          <p className="text-muted-foreground mb-6">
            Google Ads can generate immediate visibility for legal services, but success requires careful keyword selection and compliance with legal advertising rules.
          </p>

          <div className="bg-muted/50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold mb-4">Google Ads Campaign Structure for Law Firms</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Campaign 1: High-Intent Legal Keywords</h5>
                <p className="text-sm text-muted-foreground mb-2">Target people actively seeking legal representation</p>
                <div className="bg-background p-3 rounded border">
                  <code className="text-sm">
                    Keywords: "personal injury lawyer", "divorce attorney", "DUI lawyer"<br/>
                    Budget: $100-300/day depending on market<br/>
                    Match Type: Exact + Phrase
                  </code>
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Campaign 2: Competitor Terms</h5>
                <p className="text-sm text-muted-foreground mb-2">Target searches for competing law firms</p>
                <div className="bg-background p-3 rounded border">
                  <code className="text-sm">
                    Keywords: Competitor firm names + "alternative"<br/>
                    Budget: $50-150/day<br/>
                    Match Type: Exact only
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Ad Copy Best Practices</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Highlight years of experience</li>
                  <li>• Mention specializations clearly</li>
                  <li>• Include "Free Consultation" offers</li>
                  <li>• Use location-specific language</li>
                  <li>• Comply with ethical advertising rules</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Landing Page Optimization</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Match page content to ad promise</li>
                  <li>• Include clear contact forms</li>
                  <li>• Display attorney credentials</li>
                  <li>• Show client testimonials</li>
                  <li>• Add trust signals and certifications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Content Marketing Excellence</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Educational Content Strategy</h3>
          <p className="text-muted-foreground mb-6">
            Educational content establishes expertise, builds trust, and attracts potential clients who are researching their legal options.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">High-Value Content Types</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Comprehensive legal guides</li>
                  <li>• Step-by-step process explanations</li>
                  <li>• Common mistakes to avoid articles</li>
                  <li>• Legal news analysis and commentary</li>
                  <li>• Industry-specific legal advice</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Content Distribution</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Firm blog and website</li>
                  <li>• LinkedIn articles and posts</li>
                  <li>• Email newsletter campaigns</li>
                  <li>• Guest posts on legal publications</li>
                  <li>• Video content on YouTube</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
            <h4 className="font-semibold mb-4 text-primary">Sample Content Calendar for Law Firms</h4>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <h5 className="font-medium mb-2">Week 1</h5>
                <p className="text-sm text-muted-foreground">Legal guide: "Understanding [Process]"</p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Week 2</h5>
                <p className="text-sm text-muted-foreground">Case study: Recent successful outcome</p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Week 3</h5>
                <p className="text-sm text-muted-foreground">Legal news: Industry update analysis</p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Week 4</h5>
                <p className="text-sm text-muted-foreground">FAQ: Common client questions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Networking and Referral Building</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Professional Networking Strategy</h3>
          <p className="text-muted-foreground mb-6">
            Building relationships with other professionals creates valuable referral sources and establishes your reputation in the legal community.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Legal Community</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bar associations and events</li>
                  <li>• Legal continuing education</li>
                  <li>• Practice area committees</li>
                  <li>• Young lawyers associations</li>
                  <li>• Legal aid organizations</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Business Community</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Chamber of Commerce</li>
                  <li>• Business networking groups</li>
                  <li>• Industry associations</li>
                  <li>• Rotary and service clubs</li>
                  <li>• Local business events</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Professional Services</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Accountants and CPAs</li>
                  <li>• Financial advisors</li>
                  <li>• Real estate agents</li>
                  <li>• Insurance agents</li>
                  <li>• Business consultants</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Referral Relationship Building</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">Initial Outreach</h5>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Schedule coffee meetings with potential referral sources</li>
                  <li>• Attend industry events and conferences</li>
                  <li>• Join professional organizations</li>
                  <li>• Offer to speak at relevant events</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Relationship Maintenance</h5>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Regular communication and updates</li>
                  <li>• Reciprocal referrals when appropriate</li>
                  <li>• Share relevant legal insights</li>
                  <li>• Invite to firm events and seminars</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Lead Conversion and Client Experience</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Optimizing the Initial Consultation</h3>
          <p className="text-muted-foreground mb-6">
            The initial consultation is crucial for converting leads into clients. A professional, organized approach builds confidence and trust.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Consultation Preparation</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Review client's case details beforehand</li>
                  <li>• Prepare relevant questions and documents</li>
                  <li>• Research applicable laws and precedents</li>
                  <li>• Set clear agenda and expectations</li>
                  <li>• Prepare fee structure explanations</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Professional Presentation</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Professional office environment</li>
                  <li>• Clear explanation of legal process</li>
                  <li>• Honest assessment of case strength</li>
                  <li>• Transparent discussion of costs</li>
                  <li>• Written follow-up summary</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
            <h4 className="font-semibold mb-4 text-primary">Consultation Follow-Up Process</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-medium">Within 24 Hours</h5>
                  <p className="text-sm text-muted-foreground">Send summary email with next steps and any promised documents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-medium">Day 3-5</h5>
                  <p className="text-sm text-muted-foreground">Follow up if engagement agreement hasn't been returned</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-medium">Week 2</h5>
                  <p className="text-sm text-muted-foreground">Final follow-up with additional value (legal resource or article)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Measuring Marketing Success</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">Key Performance Indicators</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Lead Generation Metrics</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Total leads by source</li>
                  <li>• Cost per lead</li>
                  <li>• Lead quality scoring</li>
                  <li>• Consultation booking rate</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Conversion Metrics</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Consultation to client rate</li>
                  <li>• Average case value</li>
                  <li>• Client lifetime value</li>
                  <li>• Referral generation rate</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-primary">Marketing ROI</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Revenue per marketing dollar</li>
                  <li>• Time to break even</li>
                  <li>• Long-term client value</li>
                  <li>• Brand awareness metrics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </OptimizedBlogLayout>
  );
};

export default LawyersLeadGeneration;