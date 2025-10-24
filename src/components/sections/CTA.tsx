import { Button } from "@/components/ui/button";
import StrategyForm from "@/components/ui/strategy-form";

interface CTAProps {
  service?: string;
}

const CTA = ({ service }: CTAProps = {}) => (
  <section id="contact" className="py-16 md:py-24">
    <div className="container px-4">
      <div className="glass-card rounded-xl p-6 md:p-10 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl leading-tight">
          Let's map your next growth chapter
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground">
          Book a free 45‑minute strategy call.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <StrategyForm preSelectedService={service} />
          <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
            <a href="#services" aria-label="View engagements">View engagements</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;