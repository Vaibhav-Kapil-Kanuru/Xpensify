"use client";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Set Your Goals",
    description: "Tell us your financial dreams. Our AI breaks them into achievable milestones.",
    detail: "Define monthly, quarterly, and long-range ambitions with confidence.",
  },
  {
    number: "02",
    title: "Get Personalized Coaching",
    description: "Receive daily insights, explanations, and nudges tailored to your journey.",
    detail: "Chat naturally with an AI coach fluent in finance and your own habits.",
  },
  {
    number: "03",
    title: "Learn & Grow",
    description: "Master financial concepts through gamified lessons and interactive quizzes.",
    detail: "Earn XP, unlock badges, and build knowledge muscle memory the fun way.",
  },
  {
    number: "04",
    title: "Track Your Progress",
    description: "Watch your financial wellness score improve as you hit milestones.",
    detail: "Visual dashboards and proactive alerts keep you aligned without overwhelm.",
  },
];

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("inview");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-fade"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-32 px-6 pattern-grid"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 artistic-bg" />
        <div className="absolute inset-0 artistic-overlay animate-gradient" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]">
          <div className="h-full w-full pattern-grid opacity-25" />
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-[hsl(var(--glass-bg))] backdrop-blur-xl border border-[hsl(var(--glass-border))] text-sm font-semibold text-foreground/90 px-4 py-1.5 shadow-[var(--shadow-soft)]">
              How XPENSIFY Works
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground/95 leading-tight">
              Your Path to <span className="gradient-text">Financial Freedom</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
              Simple, powerful, and compassionate. XPENSIFY removes friction so you can focus on momentum.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute left-[30px] top-0 hidden h-full w-px bg-gradient-to-b from-blue-600 via-blue-600/30 to-transparent md:block" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 150}>
                <div className="relative flex flex-col gap-6 md:flex-row md:items-start group">
                  <div className="relative flex w-full items-center gap-4 md:w-auto md:flex-col md:items-center">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-accent)] text-blue-600 text-xl font-bold shadow-[var(--shadow-glow)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[var(--shadow-intense)] z-10">
                      {step.number}
                      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                    <span className="hidden h-full w-px bg-gradient-to-b from-blue-600/40 via-blue-600/10 to-transparent md:block" />
                  </div>
                  <div className="flex-1 rounded-3xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-600/50 hover:shadow-[var(--shadow-elegant)] hover:scale-[1.01]">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle2 className="h-6 w-6 text-blue-600 animate-glow-pulse" />
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground/95">{step.title}</h3>
                        </div>
                        <p className="mt-2 text-base md:text-lg text-foreground/75 leading-relaxed">{step.description}</p>
                      </div>
                      <div className="rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-5 text-sm text-foreground/70 backdrop-blur-lg md:max-w-xs shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                        {step.detail}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={600}>
          <div className="mt-16 mx-auto max-w-2xl rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-6 md:p-8 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-500 backdrop-blur-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground/95">Ready to Take Control?</h3>
            <p className="mt-3 text-base text-foreground/75 max-w-lg mx-auto">
              Join thousands already mastering their finances with a coach that speaks your language.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-center">
              {[
                { label: "Active Users", value: "110K+" },
                { label: "Goals Achieved", value: "$52M+" },
                { label: "Average Rating", value: "4.9★" },
              ].map((stat, idx) => (
                <div key={stat.label} className="animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-foreground/60 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="default" className="btn-premium text-primary-foreground font-semibold shadow-[var(--shadow-glow)] px-6 py-3">
                Start for Free
              </Button>
              <Button size="default" variant="outline" className="bg-[hsl(var(--glass-bg))] backdrop-blur-md border-[hsl(var(--glass-border))] text-foreground/90 hover:bg-blue-600/10 hover:border-blue-600/50 transition-all duration-300 px-6 py-3 font-semibold shadow-[var(--shadow-soft)]">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorks;
