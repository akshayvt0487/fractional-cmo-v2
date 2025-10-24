import { Megaphone, Search, LineChart, Brush, MousePointerClick, BarChart3 } from "lucide-react";

const items = [
  { icon: LineChart, title: "Growth Strategy", desc: "North-star metrics, ICP, positioning, channel mix, and quarterly roadmaps." },
  { icon: Brush, title: "Website UX/UI", desc: "High-converting information architecture, messaging, and landing page systems." },
  { icon: Search, title: "SEO Structure", desc: "Technical foundations, content strategy, topic clusters, and internal linking." },
  { icon: Megaphone, title: "Google Ads", desc: "Full-funnel performance with SKAGs where needed, exact-match hygiene, and creative testing." },
  { icon: MousePointerClick, title: "Meta Lead Gen", desc: "Facebook & Instagram acquisition: creative sprints, audience refinement, and LTV cohorts." },
  { icon: BarChart3, title: "Analytics & CRO", desc: "GA4, pixels, MTA hygiene, and experimentation for compounding wins." },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl font-semibold md:text-4xl">Capabilities</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Senior hands-on leadership across the full acquisition and conversion stack.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="glass-card rounded-lg p-6 transition-shadow hover:shadow-lg">
              <Icon className="mb-3 text-foreground/80" />
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
