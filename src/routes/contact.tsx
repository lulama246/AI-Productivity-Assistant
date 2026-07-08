import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lulu's Helping Hands" },
      { name: "description", content: "Get in touch with our team." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(2000),
});

function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const p = schema.safeParse(Object.fromEntries(fd));
    if (!p.success) return toast.error("Please complete every field correctly.");
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent! We'll respond within 1–2 business days.");
    }, 700);
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest gradient-text">Contact</span>
        <h1 className="mt-2 font-display text-5xl font-bold">We'd love to hear from you.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you need help, want to volunteer, or would like to partner — reach out.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-8">
          <label className="block">
            <span className="text-sm font-medium">Name</span>
            <input required name="name" className="mt-1 w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input required type="email" name="email" className="mt-1 w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Message</span>
            <textarea required name="message" rows={6} className="mt-1 w-full resize-none rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white" />
          </label>
          <button disabled={sending} className="gradient-brand w-full rounded-full px-6 py-3 text-sm font-semibold shadow-md disabled:opacity-60">
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display text-lg font-semibold">Reach us directly</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@luluhelpinghands.org</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +27 (0) 21 000 0000</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Cape Town, South Africa</li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Linkedin].map((I, i) => (
                <a key={i} href="#" className="glass grid h-10 w-10 place-items-center rounded-xl transition hover:-translate-y-0.5">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="glass overflow-hidden rounded-3xl">
            <div className="relative h-64 w-full bg-gradient-to-br from-brand-purple/20 to-brand-pink/30">
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <MapPin className="mx-auto h-8 w-8 text-primary" />
                  <div className="mt-2 text-sm font-semibold">Google Map placeholder</div>
                  <div className="text-xs text-muted-foreground">Cape Town, South Africa</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
