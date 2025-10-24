import { Button } from "@/components/ui/button";
import StrategyForm from "@/components/ui/strategy-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/sections/Footer";
import Header from "@/components/ui/header";

const About = () => {
  return (
    <>
     
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold md:text-6xl">
                About <span className="text-primary">Basheer Padanna</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Fractional CMO helping ambitious companies build scalable growth systems 
                through strategic thinking and hands-on execution.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">My Background</h2>
                  <div className="prose prose-gray max-w-none space-y-4 text-muted-foreground">
                    <p>
                      With over 15 years of experience in growth marketing and strategic leadership, 
                      I've helped companies from early-stage startups to established brands build 
                      and scale their acquisition engines.
                    </p>
                    <p>
                      My approach combines strategic thinking with hands-on execution—I don't just 
                      create plans, I roll up my sleeves to implement them. Whether it's optimising 
                      a $100K/month ad spend or rebuilding a company's entire conversion funnel, 
                      I focus on systems that drive measurable, scalable growth.
                    </p>
                    <p>
                      I've managed over $2M+ in annual ad spend, built 50+ high-converting landing 
                      page systems, and led growth initiatives for NDIS providers, construction 
                      companies, and service-based businesses across Australia.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">How I Work</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      I believe in outcomes over outputs. Every strategy session, campaign, 
                      or optimisation I work on is tied directly to your business objectives 
                      and measured against clear KPIs.
                    </p>
                    <p>
                      My engagements are designed for velocity and clarity—whether it's a 
                      sprint-style audit or ongoing fractional leadership, you'll know exactly 
                      what we're building and why it matters.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">Core Expertise</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Strategic Planning</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Growth strategy and roadmapping</li>
                          <li>• ICP definition and positioning</li>
                          <li>• Channel mix optimisation</li>
                          <li>• Competitive analysis</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Performance Marketing</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Google Ads management</li>
                          <li>• Meta advertising optimisation</li>
                          <li>• Landing page conversion</li>
                          <li>• Attribution and analytics</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Conversion Optimisation</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• UX/UI optimisation</li>
                          <li>• A/B testing frameworks</li>
                          <li>• Funnel analysis and improvement</li>
                          <li>• User journey mapping</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Team Leadership</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li>• Marketing team development</li>
                          <li>• Process and workflow design</li>
                          <li>• Vendor and agency management</li>
                          <li>• Cross-functional collaboration</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <div className="font-semibold text-primary text-2xl">300-800%</div>
                      <div className="text-muted-foreground">Average ROAS achieved</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary text-2xl">$5M+</div>
                      <div className="text-muted-foreground">Attributed revenue generated</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary text-2xl">50%+</div>
                      <div className="text-muted-foreground">Conversion rate increases</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary text-2xl">25+</div>
                      <div className="text-muted-foreground">Companies successfully scaled</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Industries</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li>• NDIS & Healthcare Services</li>
                      <li>• Building & Construction</li>
                      <li>• Professional Services</li>
                      <li>• Home Services & Trades</li>
                      <li>• Legal & Financial Services</li>
                      <li>• Education & Training</li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="text-center space-y-4">
                  <StrategyForm preSelectedService="strategy" />
                  <p className="text-sm text-muted-foreground">
                    Ready to scale your growth?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;