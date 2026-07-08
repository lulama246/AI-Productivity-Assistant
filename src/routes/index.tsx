import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-illustration.jpg";
import {
  Sparkles,
  HeartHandshake,
  Users,
  HandCoins,
  ArrowRight,
  Mail,
  ListChecks,
  CalendarClock,
  Search,
  MessageCircleHeart,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const aiFeatures = [
  { icon: Mail, title: "AI Email Generator", desc: "Draft outreach for donations, sponsorship, and volunteers in seconds.", to: "/ai-assistant" },
  { icon: ListChecks, title: "Meeting Notes Summarizer", desc: "Turn raw notes into summaries, action items, owners, and deadlines.", to: "/ai-assistant" },
  { icon: CalendarClock, title: "AI Task Planner", desc: "Build daily, weekly, and event plans for staff and volunteers.", to: "/ai-assistant" },
  { icon: Search, title: "AI Research Assistant", desc: "Insights on fundraising, sponsorships, and social-impact projects.", to: "/ai-assistant" },
  { icon: MessageCircleHeart, title: "Lulu AI Assistant", desc: "A warm chatbot to guide people to help, donations, and events.", to: "/ai-assistant" },
] as const;

function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
      {/* HERO */}
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered community support
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl">
            Welcome to <span className="gradient-text">Lulu's Helping Hands</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Empowering communities through compassion, technology, and Artificial Intelligence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition hover:opacity-95">
              <HeartHandshake className="h-4 w-4" /> Get Help
            </Link>
            <Link to="/volunteers" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:bg-white/80">
              <Users className="h-4 w-4" /> Become a Volunteer
            </Link>
            <Link to="/donate" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:bg-white/80">
              <HandCoins className="h-4 w-4" /> Donate
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-foreground/80 hover:text-foreground">
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { k: "12k+", v: "People helped" },
              { k: "480", v: "Volunteers" },
              { k: "38", v: "Partner orgs" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-2xl font-bold gradient-text">{s.k}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="glass overflow-hidden rounded-[2rem] p-3">
            <img src={heroImage} alt="Diverse people helping each other with a glowing heart" width={1400} height={1200} className="h-auto w-full rounded-[1.5rem] object-cover" />
          </div>
          <div className="glass absolute -bottom-6 -left-6 hidden rounded-2xl p-4 shadow-xl md:block">
            <div className="flex items-center gap-3">
              <span className="gradient-brand grid h-10 w-10 place-items-center rounded-full">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">Responsible AI</div>
                <div className="text-xs text-muted-foreground">Human-reviewed. Privacy-first.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest gradient-text">AI Toolkit</span>
          <h2 className="mt-2 font-display text-4xl font-bold">Five AI features. One mission.</h2>
          <p className="mt-3 text-muted-foreground">
            Purpose-built assistants that free up time so people can focus on people.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((f) => (
            <Link key={f.title} to={f.to} className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl shadow-lg">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold gradient-text">
                Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RESPONSIBLE AI */}
      <section className="mt-24">
        <div className="glass-dark rounded-3xl p-8 md:p-12">
          <div className="grid items-start gap-8 md:grid-cols-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5" /> Responsible AI
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold">AI that respects you.</h2>
              <p className="mt-3 text-sm text-white/80">
                We design our AI features with care and clear boundaries.
              </p>
            </div>
            <ul className="md:col-span-2 grid gap-4 sm:grid-cols-2">
              {[
                "AI-generated content should always be reviewed before use.",
                "User information is kept private and never sold.",
                "AI may occasionally make mistakes — treat outputs as drafts.",
                "Verify important information before making decisions.",
              ].map((t) => (
                <li key={t} className="rounded-2xl bg-white/10 p-4 text-sm text-white/90">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
