const steps = [
  { n: 1, title: "Discovery", desc: "Goals, constraints, data check, and baseline performance review." },
  { n: 2, title: "Strategy", desc: "Positioning, ICP, channel mix, and measurement framework." },
  { n: 3, title: "Build & Launch", desc: "Web, SEO structure, campaigns, and analytics instrumentation." },
  { n: 4, title: "Operate & Scale", desc: "Weekly cadence, experiments, and compounding growth systems." },
];

const Process = () => (
  <section id="process" className="py-16 md:py-24">
    <div className="container">
      <h2 className="text-3xl font-semibold md:text-4xl">How we’ll work</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">Clear, outcomes-first operating model.</p>
      <ol className="mt-10 grid gap-6 md:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="glass-card rounded-lg p-6">
            <div className="text-sm text-muted-foreground">Step {s.n}</div>
            <h3 className="mt-1 text-xl font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
