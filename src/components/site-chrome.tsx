import { Link } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/ai-assistant", label: "AI Tools" },
  { to: "/volunteers", label: "Volunteer" },
  { to: "/donate", label: "Donate" },
  { to: "/community-projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="gradient-brand grid h-10 w-10 place-items-center rounded-xl shadow-lg">
            <Heart className="h-5 w-5" fill="currentColor" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold gradient-text">Lulu's Helping Hands</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Helping People. Changing Lives.
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/60 hover:text-foreground"
              activeProps={{ className: "bg-white/70 text-foreground shadow-sm" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/donate"
          className="gradient-brand hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition hover:opacity-95 md:inline-flex"
        >
          Donate
        </Link>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full bg-white/70 p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        className={cn(
          "glass mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl transition-all lg:hidden",
          open ? "max-h-[600px] p-3" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/60"
              activeProps={{ className: "bg-white/70 text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-6">
      <div className="glass mx-auto max-w-7xl rounded-3xl p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="gradient-brand grid h-11 w-11 place-items-center rounded-xl shadow-lg">
                <Heart className="h-5 w-5" fill="currentColor" />
              </span>
              <div>
                <div className="font-display text-xl font-bold gradient-text">
                  Lulu's Helping Hands
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Helping People. Changing Lives.
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              An AI-powered platform connecting people who need help with resources, volunteers, and
              organizations that care.
            </p>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold">Explore</h4>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {links.slice(1, 5).map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold">Get in touch</h4>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>hello@luluhelpinghands.org</li>
              <li>+27 (0) 21 000 0000</li>
              <li>Cape Town, South Africa</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/50 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>Copyright © 2026 Lulu. All rights reserved.</p>
          <p>Built with compassion and Artificial Intelligence.</p>
        </div>
      </div>
    </footer>
  );
}
