import { createFileRoute } from "@tanstack/react-router";
import { Sprout, BookOpen, Home, Utensils, Palette, Laptop } from "lucide-react";

export const Route = createFileRoute("/community-projects")({
  head: () => ({
    meta: [
      { title: "Community Projects — Lulu's Helping Hands" },
      { name: "description", content: "Active projects making a difference locally." },
    ],
  }),
  component: Projects,
});

const projects = [
  { icon: Utensils, title: "Community Kitchens", tag: "Ongoing", desc: "Weekly meals for 400+ families in three neighbourhoods." },
  { icon: BookOpen, title: "After-School Learning", tag: "Ongoing", desc: "Tutoring and school supplies for Grade R–7 learners." },
  { icon: Home, title: "Safe Space Shelter", tag: "New", desc: "Temporary shelter and counselling for women and children." },
  { icon: Laptop, title: "AI For Good Bootcamp", tag: "Launching", desc: "Free AI literacy workshops for youth and NGOs." },
  { icon: Sprout, title: "Community Gardens", tag: "Ongoing", desc: "Sustainable food gardens in schools and shared spaces." },
  { icon: Palette, title: "Youth Creative Studio", tag: "Ongoing", desc: "Music, art, and media programs for teens." },
];

function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest gradient-text">Community Projects</span>
        <h1 className="mt-2 font-display text-5xl font-bold">Work in the field.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real projects, run with local partners, powered by community and technology.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.title} className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
              <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl">
                <p.icon className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/80">
                {p.tag}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
