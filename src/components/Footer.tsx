"use client";
import { Heart, Linkedin, Mail, Twitter, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[hsl(var(--glass-border))] artistic-bg py-20 px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 artistic-overlay" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--green-glow))/0.6] to-transparent" />
        <div className="absolute -top-24 right-20 h-64 w-64 rounded-full bg-[hsl(var(--green-glow))]/12 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-16 h-72 w-72 rounded-full bg-[hsl(var(--green-emerald))]/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 pattern-dots opacity-15" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] mb-12">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gradient-accent)] text-2xl shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-110 hover:rotate-3">
                💸
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </span>
              <div>
                <p className="text-xl font-bold text-white/95">XPENSIFY</p>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Financial Intelligence</p>
              </div>
            </div>
            <p className="mb-6 max-w-md text-base text-white/75 leading-relaxed">
              Your AI-powered companion for mastering money. Learn, plan, and grow with clarity while XPENSIFY safeguards
              your data and amplifies your financial confidence.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-[hsl(var(--glass-border))] text-sm text-white/70">
              <Lock className="w-4 h-4 text-[hsl(var(--green-glow))]" />
              <span>Private by design. No ads. No tracking.</span>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-white/80 mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "Success Stories", href: "#stories" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:text-[hsl(var(--green-glow))]"
                  >
                    <span className="h-0.5 w-0 bg-gradient-to-r from-[hsl(var(--green-glow))] to-[hsl(var(--green-glow))] group-hover:w-5 transition-all duration-300 rounded-full" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-white/80 mb-6">Stay in the Loop</h4>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Monthly insights on financial wellness, product updates, and curated learning paths.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row mb-8">
              <Input
                type="email"
                placeholder="you@finance.com"
                className="flex-1 glass-input text-white placeholder:text-white/40 focus-visible:ring-[hsl(var(--green-glow))]/60"
              />
              <Button
                type="submit"
                className="btn-premium text-primary-white font-semibold shadow-[var(--shadow-glow)] whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
                { icon: Twitter, label: "Twitter", href: "https://www.twitter.com" },
                { icon: Mail, label: "Email", href: "mailto:hello@xpensify.ai" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md transition-all duration-300 hover:border-[hsl(var(--green-glow))/0.5] hover:bg-[hsl(var(--green-glow))/0.1] hover:text-[hsl(var(--green-glow))] hover:scale-105 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[hsl(var(--glass-border))] pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="font-medium">© {new Date().getFullYear()} XPENSIFY. All rights reserved.</p>
          <p className="flex items-center gap-2 font-medium">
            Crafted with <Heart className="h-4 w-4 text-[hsl(var(--green-glow))] fill-[hsl(var(--green-glow))] animate-pulse" /> to unlock financial freedom.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
