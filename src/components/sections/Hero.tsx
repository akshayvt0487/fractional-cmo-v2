'use client'

import { Button } from "@/components/ui/button";
import StrategyForm from "@/components/ui/strategy-form";
import Header from "@/components/ui/header";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <Header />
      
      
      <header id="hero" className="relative w-full overflow-hidden bg-slate-900">
  {/* Interactive mouse highlight effect */}
  <div
    ref={ref}
    className="relative isolate w-full"
    style={{
      background:
        "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), hsl(var(--brand-2) / 0.08), transparent 60%)",
    }}
  >
    {/* Inner content container */}
    <div className="relative mx-auto max-w-6xl px-6 pt-44 pb-20 md:pt-52 md:pb-28">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <CheckCircle2 className="opacity-80" /> Trusted by founders and scaling teams
        </div>

        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          Basheer Padanna — Fractional CMO for predictable growth
        </h1>

        <p className="mt-4 text-lg text-white/80 md:text-xl">
          I design and lead end-to-end growth systems across strategy, UX/UI, SEO, Google Ads, and Meta lead generation.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
          <StrategyForm preSelectedService="strategy" />
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:text-white"
          >
            <a href="#capabilities" aria-label="See capabilities">
              See Capabilities
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
</header>

    </>
  );
};

export default Hero;