import { CheckCircle, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FractionalCMO = () => {
  const benefits = [
  {
    icon: DollarSign,
    title: "Cost-Effectigve Strategy",
    description: "Access senior-level marketing leadership at 60-80% less than a full-time CMO salary, benefits, and equity."
  },
  {
    icon: TrendingUp,
    title: "Immediate Strategic Impact",
    description: "Skip the 6-month ramp-up period. Get actionable growth strategies and execution plans from day one."
  },
  {
    icon: Users,
    title: "Flexible Engagement",
    description: "Scale up or down based on your business needs. Perfect for growth phases, launches, or strategic pivots."
  },
  {
    icon: CheckCircle,
    title: "Proven Expertise",
    description: "Leverage cross-industry experience and best practices without the commitment of a permanent hire."
  }];


  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-background via-background to-primary/5 ">
      <div className="container">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl font-semibold md:text-4xl mb-4  ">
            What is a Fractional CMO?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Strategic marketing leadership and consultation at a fraction of the cost. 
            Get C-suite expertise without the full-time commitment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300/70 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Strategic Assessment</h4>
                  <p className="text-gray-600 text-sm">Deep-dive audit of your current marketing ecosystem, identifying gaps and opportunities.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300/70 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold ">Growth Strategy Development</h4>
                  <p className="text-gray-600 text-sm">Create a comprehensive roadmap with clear KPIs, channel priorities, and resource allocation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300/70 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1 font-semibold ">Execution & Optimization</h4>
                  <p className="text-gray-600 text-sm">Strategic guidance and review support for your internal team&apos;s implementation. We provide feedback, direction, and optimization recommendations. Companies should have an internal team for execution, though we can provide references to local or overseas implementation partners if needed. Direct implementation by our team available at additional cost.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 border border-gray-300 bg-gray-100 drop-shadow-2xl">
            <h3 className="text-xl font-semibold mb-6">Fractional CMO vs Full-Time Marketing Manager</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="font-medium text-gray-600">Aspect</div>
                <div className="font-medium text-gray-600">Fractional CMO</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm border-t  border-gray-300 pt-4">
                <div>Strategic Experience</div>
                <div className="text-primary font-medium">10+ years, multi-industry</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Cost Commitment</div>
                <div className="text-primary font-medium">60-80% less than full-time</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Time to Value</div>
                <div className="text-primary font-medium">Immediate impact</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Flexibility</div>
                <div className="text-primary font-medium">Scale up/down as needed</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Consultation Depth</div>
                <div className="text-primary font-medium">C-suite strategic thinking</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ icon: Icon, title, description }) =>
          <Card key={title} className="text-center">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-300/70 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>);

};

export default FractionalCMO;