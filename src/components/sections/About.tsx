import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import basheerPhoto from "@/assets/Basheer-Padanna.png";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:items-center ">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Hello, I&apos;m <em className="text-primary">Basheer Padanna</em>
              </h2>
              <p className="mt-2 text-xl text-muted-foreground">
                Fractional CMO, Growth Strategist & Performance Marketing Leader
              </p>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground">
                With 15+ years of experience across growth strategy, performance marketing, and conversion optimisation, 
                I bring a rare blend of strategic insight and hands-on execution reality.
              </p>
              
              <p className="text-muted-foreground">
                I&apos;ve worked with founder-led startups, scaling companies, and established brands across service based businesses, NDIS providers, construction companies, and tradies.
              </p>
              
              <div className="mt-6">
                <p className="font-medium text-foreground mb-2">My background includes:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 15+ years in growth marketing and conversion optimisation</li>
                  <li>• Managed $2M+ in annual ad spend across Google Ads and Meta</li>
                  <li>• Built and optimised 50+ high-converting landing page systems</li>
                  <li>• Led growth initiatives for NDIS providers and construction companies</li>
                  <li>• Deep expertise in service-based businesses and lead generation</li>
                </ul>
              </div>
            </div>
            
            <Button asChild className="bg-gray-900 text-white font-semibold hover:bg-gray-900/90">
              <a href="#contact">Work with me</a>
            </Button>
          </div>
          
          <div className="relative">
            <Image
              src={basheerPhoto}
              alt="Basheer Padanna - Experienced Fractional CMO and Digital Marketing Strategist"
              className="rounded-lg shadow-lg w-full"
              loading="eager" />
            
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8">I help growth-focused companies get from <em className="text-primary">strategy to scale</em></h3>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="text-lg font-medium mb-2">Strategy</h4>
              <p className="text-sm text-muted-foreground">
                North-star growth plans, ICP definition, and channel mix optimisation that align with business objectives.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Execution</h4>
              <p className="text-sm text-muted-foreground">
                Hands-on campaign management, landing page optimisation, and conversion rate improvement with measurable ROI.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Scale</h4>
              <p className="text-sm text-muted-foreground">
                Systematic growth frameworks, team development, and operational excellence that compound over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default About;