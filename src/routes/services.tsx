import { createFileRoute } from "@tanstack/react-router";
import {
  Apple,
  Shirt,
  GraduationCap,
  Briefcase,
  Brain,
  Users,
  LifeBuoy,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Lulu's Helping Hands" },
      { name: "description", content: "Support services we offer to the community." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Apple, title: "Food Assistance", desc: "Nourishing meals and grocery parcels for families in need." },
  { icon: Shirt, title: "Clothing Donations", desc: "Warm, dignified clothing for all ages and seasons." },
  { icon: GraduationCap, title: "Educational Support", desc: "School supplies, tutoring, and mentorship programs." },
  { icon: Briefcase, title: "Job Readiness", desc: "CV coaching, interview prep, and employer connections." },
  { icon: Brain, title: "Mental Health Support", desc: "Guidance and referrals to trusted counselling services." },
  { icon: Users, title: "Community Outreach", desc: "Events, workshops, and volunteer-led local action." },
  { icon: LifeBuoy, title: "Emergency Assistance", desc: "Rapid response for crisis situations and urgent needs." },
  { icon: Sparkles, title: "AI Productivity Tools", desc: "Free AI tools for staff, volunteers, and community leaders." },
];

function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest gradient-text">Services</span>
        <h1 className="mt-2 font-display text-5xl font-bold">What we do.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Practical support, delivered with dignity, and enhanced by responsible AI.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.title} className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl shadow-md">
              <s.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
