import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import {
  Mail,
  ListChecks,
  CalendarClock,
  Search,
  MessageCircleHeart,
  Send,
  Sparkles,
  Loader2,
  ShieldCheck,
  Copy,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  generateEmail,
  summarizeNotes,
  generatePlan,
  researchTopic,
  chatWithLulu,
} from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Lulu's Helping Hands" },
      { name: "description", content: "Five AI tools to help your community work." },
    ],
  }),
  component: AIPage,
});

type TabId = "chat" | "email" | "notes" | "planner" | "research";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "chat", label: "Lulu Chat", icon: MessageCircleHeart },
  { id: "email", label: "Email Generator", icon: Mail },
  { id: "notes", label: "Notes Summarizer", icon: ListChecks },
  { id: "planner", label: "Task Planner", icon: CalendarClock },
  { id: "research", label: "Research", icon: Search },
];

function AIPage() {
  const [tab, setTab] = useState<TabId>("chat");
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest gradient-text">
          <Sparkles className="h-3.5 w-3.5" /> AI Toolkit
        </span>
        <h1 className="mt-2 font-display text-5xl font-bold">AI at your service.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Five specialized tools to help you communicate, plan, and act with kindness — faster.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t.id ? "gradient-brand shadow-md" : "glass hover:bg-white/80",
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "chat" && <ChatPanel />}
        {tab === "email" && <EmailPanel />}
        {tab === "notes" && <NotesPanel />}
        {tab === "planner" && <PlannerPanel />}
        {tab === "research" && <ResearchPanel />}
      </div>

      <div className="glass mt-8 flex items-start gap-3 rounded-2xl p-4 text-sm text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>
          <strong className="text-foreground">Responsible AI:</strong> Always review AI outputs
          before using them. AI can make mistakes — verify important information.
        </p>
      </div>
    </div>
  );
}

/* --------------------- Shared --------------------- */

function ResultCard({ text }: { text: string }) {
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="glass mt-6 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-widest gradient-text">Result</div>
        <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold hover:bg-white">
          <Copy className="h-3.5 w-3.5" /> Copy
        </button>
      </div>
      <article className="prose prose-sm mt-4 max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-strong:text-foreground">
        <ReactMarkdown>{text}</ReactMarkdown>
      </article>
    </div>
  );
}

function PrimaryButton({ loading, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-md transition hover:opacity-95 disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
      {children}
    </button>
  );
}

/* --------------------- Email --------------------- */

function EmailPanel() {
  const fn = useServerFn(generateEmail);
  const [tone, setTone] = useState<"Formal" | "Friendly" | "Professional" | "Persuasive">("Professional");
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const run = async () => {
    if (purpose.trim().length < 5) return toast.error("Describe your email purpose.");
    setLoading(true);
    try {
      const r = await fn({ data: { tone, purpose, recipient } });
      setResult(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="font-display text-2xl font-bold">AI Email Generator</h2>
      <p className="mt-1 text-sm text-muted-foreground">Draft outreach for donations, sponsorship, or volunteer requests.</p>
      <div className="mt-6 grid gap-4">
        <div>
          <label className="text-sm font-medium">Tone</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["Formal", "Friendly", "Professional", "Persuasive"] as const).map((t) => (
              <button key={t} onClick={() => setTone(t)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition", tone === t ? "gradient-brand shadow" : "bg-white/70 hover:bg-white")}>{t}</button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="text-sm font-medium">Recipient (optional)</span>
          <input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Local business owner" className="mt-1 w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Purpose</span>
          <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={5} placeholder="e.g. Request a R5,000 sponsorship for our winter blanket drive." className="mt-1 w-full resize-none rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white" />
        </label>
        <PrimaryButton onClick={run} loading={loading}>Generate email</PrimaryButton>
      </div>
      {result && <ResultCard text={result} />}
    </div>
  );
}

/* --------------------- Notes --------------------- */

function NotesPanel() {
  const fn = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const run = async () => {
    if (notes.trim().length < 20) return toast.error("Paste at least a paragraph of notes.");
    setLoading(true);
    try {
      const r = await fn({ data: { notes } });
      setResult(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="font-display text-2xl font-bold">AI Meeting Notes Summarizer</h2>
      <p className="mt-1 text-sm text-muted-foreground">Paste raw notes — get summary, key points, action items, owners, and deadlines.</p>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={10} placeholder="Paste meeting notes here…" className="mt-4 w-full resize-none rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white" />
      <div className="mt-4"><PrimaryButton onClick={run} loading={loading}>Summarize notes</PrimaryButton></div>
      {result && <ResultCard text={result} />}
    </div>
  );
}

/* --------------------- Planner --------------------- */

function PlannerPanel() {
  const fn = useServerFn(generatePlan);
  const scopes = ["Daily", "Weekly", "Priority Tasks", "Volunteer Assignments", "Event Planning"] as const;
  const [scope, setScope] = useState<(typeof scopes)[number]>("Daily");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const run = async () => {
    if (context.trim().length < 5) return toast.error("Add some context or goals.");
    setLoading(true);
    try {
      const r = await fn({ data: { scope, context } });
      setResult(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="font-display text-2xl font-bold">AI Task Planner</h2>
      <p className="mt-1 text-sm text-muted-foreground">Build schedules, priorities, volunteer assignments, and event plans.</p>
      <div className="mt-4">
        <label className="text-sm font-medium">Plan type</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {scopes.map((s) => (
            <button key={s} onClick={() => setScope(s)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition", scope === s ? "gradient-brand shadow" : "bg-white/70 hover:bg-white")}>{s}</button>
          ))}
        </div>
      </div>
      <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={6} placeholder="e.g. Plan Saturday's food distribution: 8 volunteers, 3 sites, 200 parcels." className="mt-4 w-full resize-none rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white" />
      <div className="mt-4"><PrimaryButton onClick={run} loading={loading}>Create plan</PrimaryButton></div>
      {result && <ResultCard text={result} />}
    </div>
  );
}

/* --------------------- Research --------------------- */

function ResearchPanel() {
  const fn = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const run = async () => {
    if (topic.trim().length < 3) return toast.error("Enter a topic.");
    setLoading(true);
    try {
      const r = await fn({ data: { topic } });
      setResult(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="font-display text-2xl font-bold">AI Research Assistant</h2>
      <p className="mt-1 text-sm text-muted-foreground">Community development, fundraising, sponsorship, and social impact.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Corporate sponsorship strategies for small NGOs" className="flex-1 rounded-xl border border-border bg-white/70 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white" />
        <PrimaryButton onClick={run} loading={loading}>Research</PrimaryButton>
      </div>
      {result && <ResultCard text={result} />}
    </div>
  );
}

/* --------------------- Chat --------------------- */

type Msg = { role: "user" | "assistant"; content: string };

function ChatPanel() {
  const fn = useServerFn(chatWithLulu);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I'm **Lulu AI**. Ask me about donations, volunteering, community events, or getting help. How can I support you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fn({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: r.text }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chat error.");
      setMessages(next);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3">
        <span className="gradient-brand grid h-11 w-11 place-items-center rounded-2xl shadow">
          <MessageCircleHeart className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold">Lulu AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Warm guidance on donations, volunteering, events, and help.</p>
        </div>
      </div>

      <div ref={scrollRef} className="mt-6 max-h-[520px] min-h-[320px] space-y-4 overflow-y-auto rounded-2xl bg-white/40 p-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
              m.role === "user" ? "gradient-brand shadow" : "bg-white text-foreground shadow-sm",
            )}>
              <div className={cn("prose prose-sm max-w-none", m.role === "user" && "prose-invert")}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm text-muted-foreground shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" /> Lulu is thinking…
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
          rows={2}
          placeholder="Ask Lulu anything…"
          className="flex-1 resize-none rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="gradient-brand inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md disabled:opacity-60"
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
