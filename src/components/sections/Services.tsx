import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-semibold md:text-4xl">Engagements</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Flexible models designed for velocity and clarity.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Audit & Strategy Sprint</CardTitle>
              <CardDescription>2–4 weeks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Deep-dive audit across web, SEO, and paid. Strategic roadmap with quick wins and north-star plan.</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="#contact">Request details</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Fractional CMO</CardTitle>
              <CardDescription>1-3 sessions per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Ongoing leadership: own growth targets, manage channels and team, and install operating cadence.</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="#contact">Discuss fit</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance Advertising</CardTitle>
              <CardDescription>Google Ads & Meta • Team Included</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Hands-on execution with dedicated team: creative testing, keyword rigor, and CRO partnership.</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="#contact">Get a proposal</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
