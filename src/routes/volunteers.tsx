import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { UserRound, Mail, Phone, Sparkles, CalendarCheck, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "Volunteer — Lulu's Helping Hands" },
      { name: "description", content: "Join our volunteer community." },
    ],
  }),
  component: Volunteers,
});

const schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  skills: z.string().trim().min(2).max(500),
  availability: z.string().trim().min(2).max(200),
  role: z.string().trim().min(2).max(200),
});

function Volunteers() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error("Please fill out every field correctly.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thank you for volunteering! We'll be in touch soon.");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest gradient-text">Volunteers</span>
          <h1 className="mt-2 font-display text-5xl font-bold">Give an hour. Change a life.</h1>
          <p className="mt-4 text-muted-foreground">
            Volunteers are the beating heart of Lulu's Helping Hands. Tell us about yourself and
            we'll match you with meaningful ways to help.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: HeartHandshake, t: "Meaningful impact", d: "Directly support people in your community." },
              { icon: CalendarCheck, t: "Flexible schedules", d: "Give as much or as little time as you can." },
              { icon: Sparkles, t: "AI-assisted", d: "Smart tools plan your shifts and outreach." },
            ].map((i) => (
              <div key={i.t} className="glass flex items-start gap-3 rounded-2xl p-4">
                <span className="gradient-brand grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                  <i.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">{i.t}</div>
                  <div className="text-sm text-muted-foreground">{i.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold">Volunteer Registration</h2>
          <Field icon={UserRound} label="Full Name" name="fullName" placeholder="Jane Doe" />
          <Field icon={Mail} label="Email" name="email" type="email" placeholder="jane@email.com" />
          <Field icon={Phone} label="Phone Number" name="phone" placeholder="+27 82 123 4567" />
          <Field label="Skills" name="skills" placeholder="e.g. teaching, cooking, driving" />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Availability" name="availability" options={["Weekdays", "Weekends", "Evenings", "Flexible"]} />
            <SelectField label="Preferred Role" name="role" options={["Food Distribution", "Mentoring", "Event Support", "Admin & AI Tools", "Community Outreach"]} />
          </div>
          <button disabled={submitting} className="gradient-brand w-full rounded-full px-6 py-3 text-sm font-semibold shadow-md transition hover:opacity-95 disabled:opacity-60">
            {submitting ? "Submitting…" : "Join as Volunteer"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, name, type = "text", placeholder }: { icon?: React.ComponentType<{ className?: string }>; label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="relative mt-1">
        {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />}
        <input
          required
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-border bg-white/70 py-2.5 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white ${Icon ? "pl-10" : "pl-4"}`}
        />
      </div>
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select required name={name} defaultValue="" className="mt-1 w-full rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm outline-none focus:border-primary focus:bg-white">
        <option value="" disabled>Select…</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </label>
  );
}
