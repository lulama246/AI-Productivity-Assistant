import { createFileRoute } from "@tanstack/react-router";
import { Heart, Eye, Sparkles, Users, Scale, Lightbulb, HandHeart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lulu's Helping Hands" },
      { name: "description", content: "Our mission, vision, and values." },
    ],
  }),
  component: About,
});

const values = [
  { icon: HandHeart, label: "Compassion" },
  { icon: Users, label: "Respect" },
  { icon: Scale, label: "Integrity" },
  { icon: Heart, label: "Equality" },
  { icon: Lightbulb, label: "Innovation" },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest gradient-text">About Us</span>
        <h1 className="mt-2 font-display text-5xl font-bold">Kindness, powered by technology.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Lulu's Helping Hands connects people in need with the resources, volunteers, and
          organizations who can make a real difference — faster and more thoughtfully.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-8">
          <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl">
            <Sparkles className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold">Mission</h2>
          <p className="mt-2 text-muted-foreground">
            Helping individuals and families through compassion, community support, and innovative
            AI technology.
          </p>
        </div>
        <div className="glass rounded-3xl p-8">
          <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl">
            <Eye className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold">Vision</h2>
          <p className="mt-2 text-muted-foreground">
            To build stronger communities where everyone has access to support and opportunities.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-3xl font-bold">Our Values</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <div key={v.label} className="glass rounded-2xl p-5 text-center">
              <span className="gradient-brand mx-auto grid h-11 w-11 place-items-center rounded-xl">
                <v.icon className="h-5 w-5" />
              </span>
              <div className="mt-3 font-display text-lg font-semibold">{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
