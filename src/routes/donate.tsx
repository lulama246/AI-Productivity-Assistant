import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { HandCoins, ShieldCheck, Heart } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Lulu's Helping Hands" },
      { name: "description", content: "Support our work with a donation." },
    ],
  }),
  component: Donate,
});

const preset = [50, 100, 250, 500];

function Donate() {
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");

  const donate = () => {
    const final = custom ? Number(custom) : amount;
    if (!final || final < 10) {
      toast.error("Please enter a valid amount (min R10).");
      return;
    }
    toast.success(`Thank you! Redirecting to payment for R${final}…`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest gradient-text">Donate</span>
        <h1 className="mt-2 font-display text-5xl font-bold">Every rand counts.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your donation funds meals, clothing, education, and technology for families across our community.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold">Choose an amount</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {preset.map((v) => (
              <button
                key={v}
                onClick={() => { setAmount(v); setCustom(""); }}
                className={`rounded-2xl p-5 text-left transition ${
                  amount === v && !custom
                    ? "gradient-brand shadow-lg"
                    : "border border-border bg-white/70 hover:bg-white"
                }`}
              >
                <div className="text-xs uppercase tracking-widest opacity-80">Donate</div>
                <div className="mt-1 font-display text-3xl font-bold">R{v}</div>
              </button>
            ))}
          </div>
          <div className="mt-6">
            <label className="text-sm font-medium">Custom amount (ZAR)</label>
            <input
              type="number"
              min={10}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="e.g. 1000"
              className="mt-1 w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white"
            />
          </div>
          <button onClick={donate} className="gradient-brand mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold shadow-md hover:opacity-95">
            <HandCoins className="h-4 w-4" /> Donate now
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Payments are processed securely — this is a demo placeholder.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="font-semibold">Trusted & transparent</div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We publish an annual impact report so you can see exactly where your donation goes.
            </p>
          </div>
          <div className="glass-dark rounded-3xl p-6">
            <Heart className="h-6 w-6" />
            <p className="mt-3 text-sm text-white/90">
              "R250 provided a family of four with groceries for a week. Thank you."
            </p>
            <p className="mt-2 text-xs text-white/70">— Community partner, Khayelitsha</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
