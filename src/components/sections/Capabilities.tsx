import { Megaphone, Search, LineChart, Brush, MousePointerClick, BarChart3, TrendingUp, Users, Award, Zap, Target, Code } from "lucide-react";
import { capabilitiesData } from "@/data/serviceData";

// Map icon names to icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  LineChart,
  Brush,
  Search,
  Megaphone,
  MousePointerClick,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Zap,
  Target,
  Code,
};

const Capabilities = () => {
  const { solutions } = capabilitiesData;
  const { sectionTitle, sectionSubtitle, items } = solutions;

  return (
    <section id="capabilities" className="py-16 md:py-24 lg:scroll-m-t-[50px] ">
      <div className="container">
        <h2 className="text-3xl font-semibold md:text-4xl">{sectionTitle}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {sectionSubtitle}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.iconName] || LineChart;
            return (
              <article key={item.title} className="glass-card rounded-lg p-6 transition-shadow hover:shadow-lg">
                <Icon className="mb-3 text-foreground/80" />
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
