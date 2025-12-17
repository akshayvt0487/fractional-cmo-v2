import { createMetadata } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import StrategyForm from '@/components/ui/strategy-form';
import OptimizedBlogLayout from "@/components/OptimizedBlogLayout";
import { relatedArticles } from '@/utils/seoUtils';
import Citation from '@/components/Citation';
export const metadata = createMetadata({
  title: "Google Ads Conveyancing Guide",
  description: "Expert guidance on google ads conveyancing guide. Learn proven strategies and best practices for business growth.",
  path: "/blog/google-ads-conveyancing-guide",
  keywords: ["google", "conveyancing", "guide", "digital marketing", "business growth", "marketing strategy"],
  openGraph: {
    title: "Google Ads Conveyancing Guide",
    description: "Expert guidance on google ads conveyancing guide. Learn proven strategies and best practices for business growth.",
    url: "https://fractional-cmo.com.au/blog/google-ads-conveyancing-guide",
    siteName: "Fractional CMO",
    type: "article",
    images: [{
      url: "https://fractional-cmo.com.au/images/blog/google-ads-conveyancing-guide.jpg",
      width: 1200,
      height: 630,
      alt: "Google Ads Conveyancing Guide"
    }],
    publishedTime: "2026-09-04T00:00:00.000Z",
    modifiedTime: "2026-10-31T11:10:04.705Z",
    authors: ["Basheer Padanna"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Ads Conveyancing Guide",
    description: "Expert guidance on google ads conveyancing guide. Learn proven strategies and best practices for business growth.",
    images: ["https://fractional-cmo.com.au/images/blog/google-ads-conveyancing-guide.jpg"],
    site: "@FractionalCMO"
  }
});
const ConveyancingGoogleAds = () => {
  const post = blogPosts.find(p => p.slug === "google-ads-conveyancing");
import { blogPosts } from '@/data/blogPosts';
  if (!post) throw new Error("Blog post not found: google-ads-conveyancing");
  
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };


  const articleData = {
    headline: "Google Ads for Conveyancers: How to Dominate Local Property Market",
    description: "Complete Google Ads guide for conveyancing firms. Learn proven strategies, keyword targeting, and campaign optimization to attract property buyers and sellers in your local market.",
    author: "Basheer Padanna",
    publishedDate: convertDateFormat(post.date),
    modifiedDate: "2026-09-04T00:00:00.000Z",
    url: "/blog/google-ads-conveyancing-guide",
    imageUrl: "/images/blog/google-ads-conveyancing-guide-hero.jpg",
    category: "Legal Marketing",
    readTime: "24 min read",
    tags: ["Google Ads", "Conveyancing", "PPC", "Property Law", "Legal Marketing"]
  };
  const faqs = [{
    question: "What's the average cost per click for conveyancing Google Ads?",
    answer: "CPC for conveyancing keywords typically ranges from $8-25, with competitive markets like Sydney and Melbourne at the higher end. Focus on long-tail keywords and local targeting to reduce costs."
  }, {
    question: "How much should conveyancing firms spend on Google Ads?",
    answer: "Start with $3,000-5,000 monthly budget for comprehensive campaigns. Scale based on lead quality and conversion rates. Successful firms typically spend 5-10% of revenue on Google Ads."
  }, {
    question: "What's the best landing page strategy for conveyancing ads?",
    answer: "Create service-specific landing pages for residential, commercial, and first-time buyers. Include clear value propositions, fee transparency, client testimonials, and simple contact forms."
  }];
  return <OptimizedBlogLayout articleData={articleData} relatedArticles={relatedArticles.legal} faqs={faqs} heroImage={'/images/blog/conveyancing-google-ads-hero.jpg'} heroAlt="Google Ads strategies for conveyancing firms">
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          When property buyers and sellers need a conveyancer, they turn to Google first. With the right Google Ads strategy, 
          your conveyancing firm can capture these high-intent prospects at the exact moment they&apos;re ready to engage a solicitor.
        </p>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          This comprehensive guide reveals the proven Google Ads strategies that top conveyancing firms use to dominate 
          local search results, attract quality clients, and achieve consistent growth in competitive property markets.
        </p>

        <h2 className="text-3xl font-bold mb-6">Why Google Ads is Essential for Conveyancers</h2>
        
        <p className="mb-6">
          The property market has shifted online, with 89% of property buyers and sellers starting their search for legal services 
          on Google. Google Ads provides immediate visibility when potential clients search for conveyancing services, giving you 
          a competitive advantage over firms relying solely on referrals.
        </p>

        <h3 className="text-2xl font-semibold mb-4">The Conveyancing Search Landscape</h3>
        <ul className="space-y-2 mb-6">
          <li>• High-intent searches with commercial purpose</li>
          <li>• Local focus with geographic targeting opportunities</li>
          <li>• Time-sensitive nature of property transactions</li>
          <li>• Competitive landscape requiring strategic positioning</li>
          <li>• Multiple touchpoints in the buyer&apos;s journey</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Google Ads Advantages for Legal Services</h3>
        <ul className="space-y-2 mb-8">
          <li>• Immediate visibility for competitive keywords</li>
          <li>• Precise geographic and demographic targeting</li>
          <li>• Measurable ROI and performance tracking</li>
          <li>• Budget control and cost management</li>
          <li>• Ability to compete with larger firms</li>
        </ul>

        <h2 className="text-3xl font-bold mb-6">Campaign Structure and Strategy</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Campaign Types for Conveyancers</h3>
        <p className="mb-6">
          A well-structured Google Ads account uses multiple campaign types to capture prospects at different stages 
          of their decision-making process.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">1. Search Campaigns</h4>
            <p className="mb-4">
              Target high-intent keywords when prospects actively search for conveyancing services.
            </p>
            <ul className="space-y-2">
              <li><strong>Branded Campaign:</strong> Protect your firm&apos;s brand searches</li>
              <li><strong>Generic Services:</strong> Target general conveyancing keywords</li>
              <li><strong>Local Services:</strong> Focus on location-based searches</li>
              <li><strong>Competitive:</strong> Target competitor brand terms (where legally appropriate)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">2. Local Campaigns</h4>
            <p className="mb-4">
              Promote your physical location to nearby prospects using Google&apos;s location extensions and local inventory.
            </p>
            <ul className="space-y-2">
              <li>• Automatic optimization for local relevance</li>
              <li>• Integration with Google My Business</li>
              <li>• Drive phone calls and office visits</li>
              <li>• Showcase local market expertise</li>
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-6">Keyword Strategy and Research</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Keyword Categories for Conveyancers</h3>
        <p className="mb-6">
          Effective keyword targeting captures prospects at all stages of their property transaction journey.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">High-Intent Keywords (Primary Focus)</h4>
            <ul className="space-y-2">
              <li>• &quot;conveyancer [location]&quot; - Local, high commercial intent</li>
              <li>• &quot;property settlement lawyer&quot; - Professional service focus</li>
              <li>• &quot;conveyancing quote&quot; - Ready-to-purchase signals</li>
              <li>• &quot;solicitor property purchase&quot; - Specific service need</li>
              <li>• &quot;conveyancing fees [location]&quot; - Price comparison intent</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Medium-Intent Keywords (Secondary Focus)</h4>
            <ul className="space-y-2">
              <li>• &quot;property lawyer [location]&quot; - Legal service intent</li>
              <li>• &quot;settlement services&quot; - Transaction focus</li>
              <li>• &quot;conveyancing comparison&quot; - Service evaluation</li>
              <li>• &quot;property transfer process&quot; - Educational intent</li>
              <li>• &quot;first home buyer conveyancer&quot; - Specific demographic</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Long-Tail Opportunity Keywords</h4>
            <ul className="space-y-2">
              <li>• &quot;how much does conveyancing cost in [location]&quot; - Price research</li>
              <li>• &quot;what does a conveyancer do for property purchase&quot; - Educational</li>
              <li>• &quot;conveyancer vs solicitor difference&quot; - Comparison research</li>
              <li>• &quot;conveyancing checklist first home buyer&quot; - Process guidance</li>
              <li>• &quot;property settlement delays conveyancer help&quot; - Problem-solving</li>
            </ul>
          </CardContent>
        </Card>

        <h3 className="text-2xl font-semibold mb-4">Negative Keywords Strategy</h3>
        <p className="mb-6">
          Protecting your budget from irrelevant clicks is crucial for campaign profitability.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Essential Negative Keywords</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h5 className="font-medium mb-3">Cost-Related Exclusions</h5>
                <ul className="space-y-1 text-sm">
                  <li>• free</li>
                  <li>• cheap</li>
                  <li>• discount</li>
                  <li>• budget</li>
                  <li>• low cost</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Service Exclusions</h5>
                <ul className="space-y-1 text-sm">
                  <li>• DIY</li>
                  <li>• template</li>
                  <li>• online only</li>
                  <li>• automated</li>
                  <li>• self service</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Irrelevant Terms</h5>
                <ul className="space-y-1 text-sm">
                  <li>• jobs</li>
                  <li>• careers</li>
                  <li>• training</li>
                  <li>• course</li>
                  <li>• qualification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-6">Ad Copy Development and Testing</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Headlines That Drive Clicks</h3>
        <p className="mb-6">
          Your headlines must immediately communicate value and differentiate your services from competitors.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">High-Performing Headline Formulas</h4>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Trust & Credibility Headlines</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• &quot;[City]&apos;s Most Trusted Conveyancer - 20+ Years Experience&quot;</li>
                  <li>• &quot;Award-Winning Conveyancing Services - 5-Star Reviews&quot;</li>
                  <li>• &quot;Licensed Conveyancer - Professional Indemnity Insured&quot;</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Speed & Efficiency Headlines</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• &quot;Fast Track Conveyancing - Complete in 28 Days&quot;</li>
                  <li>• &quot;Express Property Settlement Services&quot;</li>
                  <li>• &quot;Urgent Conveyancing - Same Day Service Available&quot;</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Value & Transparency Headlines</h5>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• &quot;Fixed Fee Conveyancing - No Hidden Costs&quot;</li>
                  <li>• &quot;Compare Our Fees - Transparent Pricing&quot;</li>
                  <li>• &quot;All-Inclusive Conveyancing from $899&quot;</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-2xl font-semibold mb-4">Description Copy Strategy</h3>
        <p className="mb-6">
          Use descriptions to address specific client pain points and demonstrate expertise.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Effective Description Elements</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">Pain Point Solutions</h5>
                <ul className="space-y-2 text-sm">
                  <li>• &quot;Avoid costly settlement delays with expert guidance&quot;</li>
                  <li>• &quot;Navigate complex contracts with confidence&quot;</li>
                  <li>• &quot;Protect your investment with thorough due diligence&quot;</li>
                  <li>• &quot;Stress-free property transactions guaranteed&quot;</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Service Differentiators</h5>
                <ul className="space-y-2 text-sm">
                  <li>• &quot;Direct solicitor contact - no junior staff&quot;</li>
                  <li>• &quot;Evening and weekend appointments available&quot;</li>
                  <li>• &quot;Electronic settlement capability&quot;</li>
                  <li>• &quot;Comprehensive insurance protection&quot;</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-6">Landing Page Optimization for Conversions</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Landing Page Structure</h3>
        <p className="mb-6">
          Your landing pages must build trust immediately and guide visitors toward contact.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Essential Landing Page Elements</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h5 className="font-medium mb-2">Compelling Above-the-Fold Headline</h5>
                  <p className="text-sm text-muted-foreground">Clear value proposition that matches your ad copy exactly</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h5 className="font-medium mb-2">Trust Signals and Credentials</h5>
                  <p className="text-sm text-muted-foreground">Professional photos, qualifications, insurance details, and client testimonials</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h5 className="font-medium mb-2">Service Process Explanation</h5>
                  <p className="text-sm text-muted-foreground">Step-by-step breakdown of what clients can expect throughout the process</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h5 className="font-medium mb-2">Clear Pricing Information</h5>
                  <p className="text-sm text-muted-foreground">Transparent fee structure or starting prices to qualify leads</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h5 className="font-medium mb-2">Multiple Contact Options</h5>
                  <p className="text-sm text-muted-foreground">Phone, email, and contact form with fast response promises</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-2xl font-semibold mb-4">Conversion Rate Optimization</h3>
        <p className="mb-6">
          Small improvements to your landing pages can significantly impact your cost per lead.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">A/B Testing Opportunities</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-3">Elements to Test</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Headline variations and value propositions</li>
                  <li>• Call-to-action button colors and text</li>
                  <li>• Contact form length and field requirements</li>
                  <li>• Social proof placement and testimonial selection</li>
                  <li>• Pricing presentation and fee structures</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Performance Metrics</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Conversion rate (visitors to leads)</li>
                  <li>• Time on page and engagement metrics</li>
                  <li>• Bounce rate and exit points</li>
                  <li>• Mobile vs desktop performance</li>
                  <li>• Lead quality and qualification rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-6">Campaign Management and Optimization</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Bidding Strategies</h3>
        <p className="mb-6">
          Choose the right bidding strategy based on your campaign goals and available data.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Bidding Strategy Selection</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Target CPA (Cost Per Acquisition)</h5>
                <p className="text-sm text-blue-700 mb-2">Best for: Established campaigns with conversion history</p>
                <p className="text-xs text-blue-600">Recommendation: Start with 150% of your actual CPA, then optimize down</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Maximize Conversions</h5>
                <p className="text-sm text-green-700 mb-2">Best for: New campaigns focused on lead volume</p>
                <p className="text-xs text-green-600">Recommendation: Use when you want to maximize total leads within budget</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">Enhanced CPC</h5>
                <p className="text-sm text-orange-700 mb-2">Best for: Manual control with automated optimization</p>
                <p className="text-xs text-orange-600">Recommendation: Good starting point for new conveyancing campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-2xl font-semibold mb-4">Performance Monitoring</h3>
        <p className="mb-6">
          Regular monitoring and optimization are essential for sustained Google Ads success.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Key Performance Indicators</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h5 className="font-medium mb-3">Lead Metrics</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Cost per lead (CPL)</li>
                  <li>• Lead conversion rate</li>
                  <li>• Lead quality scores</li>
                  <li>• Time to conversion</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Campaign Health</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Quality Score trends</li>
                  <li>• Impression share</li>
                  <li>• Click-through rates</li>
                  <li>• Search rank averages</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-3">Business Impact</h5>
                <ul className="space-y-2 text-sm">
                  <li>• Return on ad spend (ROAS)</li>
                  <li>• Client lifetime value</li>
                  <li>• Market share growth</li>
                  <li>• Brand recognition metrics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-6">Budget Planning and ROI Calculation</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Budget Allocation Strategy</h3>
        <p className="mb-6">
          Effective budget management ensures you capture the maximum number of qualified leads.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Campaign Budget Distribution</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Branded Campaigns</span>
                <span className="text-primary font-bold">15%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Generic Conveyancing Terms</span>
                <span className="text-primary font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Local Services Keywords</span>
                <span className="text-primary font-bold">25%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Competitive Terms</span>
                <span className="text-primary font-bold">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-2xl font-semibold mb-4">ROI Calculation Framework</h3>
        <p className="mb-6">
          Understanding your return on investment helps justify and optimize your Google Ads spending.
        </p>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Conveyancing ROI Formula</h4>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary mb-2">ROI = (Client Value - Ad Spend) ÷ Ad Spend × 100</div>
                <p className="text-sm text-muted-foreground">Where Client Value = Average Fee × Conversion Rate × Total Leads</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-white rounded border">
                  <div className="text-lg font-bold text-green-600">$1,200</div>
                  <div className="text-xs text-gray-600">Average Fee</div>
                </div>
                <div className="text-center p-4 bg-white rounded border">
                  <div className="text-lg font-bold text-blue-600">15%</div>
                  <div className="text-xs text-gray-600">Lead to Client Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded border">
                  <div className="text-lg font-bold text-orange-600">$180</div>
                  <div className="text-xs text-gray-600">Value per Lead</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2>Your Path to Google Ads Success</h2>
        <p>
          Google Ads represents one of the most effective ways for conveyancing firms to attract qualified leads and grow their practice. By implementing strategic keyword targeting, compelling ad copy, and optimized landing pages, you can position your firm in front of potential clients at the exact moment they&apos;re searching for conveyancing services.
        </p>
        
        <p>
          Success with Google Ads requires ongoing optimization and refinement. Start with a focused campaign targeting your most profitable services and geographic areas, then expand as you gather data and improve your conversion rates. Remember that every click is an opportunity to demonstrate your expertise and convert a prospect into a valuable client.
        </p>

        <p className="mb-8">
          The conveyancing market is competitive, but with the right Google Ads strategy, you can achieve sustainable growth and build a thriving practice that serves clients throughout their property journey.
        </p>

        <Citation source="Google Ads Benchmark Report 2024" url="https://www.google.com/ads/resources/" title="Legal services average a 4.8% click-through rate on Google Ads, with conversion rates averaging 3.2% across the industry." />

      </OptimizedBlogLayout>;
};
export default ConveyancingGoogleAds;

