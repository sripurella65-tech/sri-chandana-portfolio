"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const skills = [
  { label: "Data Engineering", value: "Python · SQL · PySpark · Pandas · Great Expectations", icon: Database },
  { label: "AWS Cloud", value: "Lambda · S3 · Glue · Athena · Redshift · Bedrock · API Gateway", icon: Cloud },
  { label: "Azure Cloud", value: "Data Factory · Databricks · Synapse · ADLS Gen2 · Azure DevOps", icon: Cloud },
  { label: "AI / GenAI", value: "LangChain · OpenAI API · RAG · Vector DBs · Embeddings", icon: Sparkles },
  { label: "Backend & APIs", value: "FastAPI · Flask · REST APIs · JavaScript · Bash", icon: Code2 },
  { label: "Databases", value: "PostgreSQL · MySQL · SQL Server · DynamoDB · MongoDB", icon: Database },
  { label: "DevOps & BI", value: "Docker · GitHub Actions · CI/CD · Power BI · Agile", icon: Zap },
];

const projects = [
  {
    id: "metadata-assistant",
    index: "01",
    title: "Generative AI Metadata Assistant",
    description: "A conversational RAG assistant that turns fragmented metadata into fast, trusted answers for analysts.",
    impact: "Improves data discovery and self-service analytics.",
    tech: ["Python", "AWS Bedrock", "LangChain", "OpenAI", "S3"],
    flow: ["User Question", "API Gateway", "RAG Retriever", "Metadata / S3", "LLM", "Answer"],
    accent: "from-cyan/30 to-blue-500/5",
  },
  {
    id: "api-automation",
    index: "02",
    title: "Cloud API Automation Platform",
    description: "A serverless request platform with resilient processing, state tracking, and operational alerting.",
    impact: "Automates internal workflows and request tracking.",
    tech: ["Python", "FastAPI", "AWS Lambda", "DynamoDB", "CloudWatch"],
    flow: ["Request", "FastAPI", "Lambda", "DynamoDB", "CloudWatch"],
    accent: "from-mint/20 to-emerald-500/5",
  },
  {
    id: "ai-data-workflow",
    index: "03",
    title: "AI-Ready Data Processing",
    description: "A governed data preparation workflow that transforms raw datasets into reliable ML-ready assets.",
    impact: "Reduces preprocessing time and improves model input quality.",
    tech: ["Python", "SQL", "PySpark", "S3", "Glue", "Athena"],
    flow: ["Raw Data", "S3", "Glue Catalog", "PySpark", "Athena", "ML Dataset"],
    accent: "from-violet-500/20 to-fuchsia-500/5",
  },
  {
    id: "healthcare-pipeline",
    index: "04",
    title: "Healthcare Operations Pipeline",
    description: "A medallion-style Azure pipeline for reliable clinical and operational reporting at scale.",
    impact: "Enables reliable clinical and operational analytics.",
    tech: ["Python", "ADF", "Databricks", "Synapse", "Delta Lake"],
    flow: ["APIs / Files", "ADF", "ADLS Gen2", "Databricks", "Delta Lake", "Synapse", "Power BI"],
    accent: "from-orange-500/20 to-amber-500/5",
  },
  {
    id: "customer-analytics",
    index: "05",
    title: "Customer Analytics Platform",
    description: "A historical customer model with SCD Type 2 logic for accurate cohort and performance analysis.",
    impact: "Unlocks cohort, trend, and performance monitoring.",
    tech: ["Python", "PySpark", "Databricks", "Synapse", "Power BI"],
    flow: ["Snapshots", "PySpark Merge", "SCD Type 2", "Synapse", "Power BI"],
    accent: "from-pink-500/20 to-rose-500/5",
  },
];

function visitorId() {
  const key = "scp-visitor-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

async function track(eventType: string, target?: string) {
  try {
    await fetch("/api/track/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId: visitorId(), eventType, target, path: location.pathname }),
      keepalive: true,
    });
  } catch {}
}

function ArchitectureFlow({ items }: { items: string[] }) {
  return (
    <div className="no-scrollbar flex items-center overflow-x-auto py-2">
      {items.map((item, index) => (
        <div key={item} className="flex shrink-0 items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.09 }}
            className="rounded-lg border border-white/10 bg-ink/70 px-3 py-2 text-[11px] font-semibold text-slate-300"
          >
            {item}
          </motion.div>
          {index < items.length - 1 && (
            <motion.div
              className="mx-1 h-px w-5 bg-gradient-to-r from-cyan to-mint"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.09 + 0.08 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function VisitorModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, visitorId: visitorId() }),
      });
      if (!response.ok) throw new Error();
      setStatus("sent");
      setTimeout(onClose, 1100);
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Optional visitor details"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
        className="glass relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 md:p-8"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white">
          <X size={20} />
        </button>
        <div className="mb-6 pr-10">
          <p className="section-kicker">A quick hello</p>
          <h2 className="font-display text-2xl font-semibold text-white">Thanks for visiting my portfolio.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            If you’re a recruiter, hiring manager, or industry professional, you can optionally share your details so I can follow up.
          </p>
        </div>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <input className="field" name="name" placeholder="Name (optional)" maxLength={100} />
          <input className="field" name="email" type="email" placeholder="Email (optional)" maxLength={150} />
          <input className="field" name="phone" placeholder="Phone (optional)" maxLength={40} />
          <input className="field" name="company" placeholder="Company (optional)" maxLength={120} />
          <input className="field sm:col-span-2" name="role" placeholder="Role / Job title (optional)" maxLength={120} />
          <textarea className="field min-h-24 sm:col-span-2" name="jobDescription" placeholder="Job description (optional)" maxLength={3000} />
          <textarea className="field min-h-20 sm:col-span-2" name="message" placeholder="Message (optional)" maxLength={2000} />
          <div className="mt-2 flex items-center justify-between gap-4 sm:col-span-2">
            <p className="text-[11px] leading-4 text-slate-500">Completely optional. Basic visit analytics are collected to improve this site.</p>
            <button disabled={status === "sending"} className="shrink-0 rounded-xl bg-mint px-5 py-3 text-sm font-bold text-ink transition hover:brightness-110 disabled:opacity-60">
              {status === "sending" ? "Sending…" : status === "sent" ? "Thank you!" : "Share details"}
            </button>
          </div>
          {status === "error" && <p className="text-xs text-rose-300 sm:col-span-2">Couldn’t send right now. You can close this and continue exploring.</p>}
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setModal(true);
    const sendView = async () => {
      try {
        await fetch("/api/track/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId: visitorId(),
            path: location.pathname,
            referrer: document.referrer,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        });
      } catch {}
    };
    void sendView();
  }, []);

  const nav = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <main className="overflow-hidden">
      <AnimatePresence>{modal && <VisitorModal onClose={() => setModal(false)} />}</AnimatePresence>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-ink/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white">
            Sri<span className="text-mint">.</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold text-slate-400 transition hover:text-white">{item}</a>
            ))}
          </div>
          <a href="mailto:srichandanapurella25@gmail.com" onClick={() => track("email_click", "navigation")} className="hidden rounded-full border border-cyan/25 px-4 py-2 text-xs font-bold text-cyan transition hover:bg-cyan/10 md:block">
            Let’s talk
          </a>
          <button className="md:hidden" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/5 bg-ink md:hidden">
              <div className="grid gap-4 p-5">
                {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)} className="text-sm text-slate-300">{item}</a>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="top" className="relative min-h-screen">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-[12%] top-36 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]" />
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-16 pt-28 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[.06] px-3 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-mint">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> Open to opportunities · NY / NJ
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[.98] tracking-[-.05em] text-white sm:text-6xl lg:text-[78px]">
              I build data systems that make <span className="bg-gradient-to-r from-cyan to-mint bg-clip-text text-transparent">AI useful.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              I’m Sri Chandana Purella, a Data, AI & Cloud Engineer creating resilient pipelines, intelligent applications, and analytics platforms across AWS and Azure.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/resume.html" download onClick={() => track("resume_download", "hero")} className="flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-mint">
                <Download size={17} /> Download resume
              </a>
              <a href="#projects" onClick={() => track("projects_navigation", "hero")} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-bold text-white transition hover:border-cyan/30 hover:bg-cyan/[.06]">
                View projects <ArrowDownRight size={17} />
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8 }} className="relative hidden lg:block">
            <div className="glass relative mx-auto aspect-square max-w-md rounded-[2.5rem] p-7 shadow-glow">
              <div className="absolute inset-8 rounded-full border border-dashed border-cyan/20 animate-[spin_28s_linear_infinite]" />
              <div className="absolute inset-20 rounded-full border border-dashed border-mint/15 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-28 w-28 place-items-center rounded-3xl border border-cyan/30 bg-cyan/10 shadow-glow">
                  <Database className="text-cyan" size={38} />
                  <span className="absolute mt-20 text-[9px] font-bold uppercase tracking-[.2em] text-cyan">Data Core</span>
                </div>
              </div>
              {[
                ["AWS", "left-5 top-20"],
                ["Azure", "right-3 top-28"],
                ["GenAI", "bottom-16 left-10"],
                ["PySpark", "bottom-10 right-8"],
              ].map(([label, pos], i) => (
                <motion.div key={label} className={`absolute ${pos} rounded-xl border border-white/10 bg-panel px-4 py-3 text-xs font-bold text-slate-200`} animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }}>
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="section-kicker">About me</p>
            <h2 className="section-title">Engineering clarity from complexity.</h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-slate-400">
            <p>I build the connective tissue between raw information and useful decisions: cloud data pipelines, AI-ready platforms, GenAI assistants, API automation, and analytics workflows.</p>
            <p>My work pairs pragmatic engineering with business context—reliable enough for production, understandable enough for teams to trust, and flexible enough to grow.</p>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {[["2", "Cloud ecosystems"], ["5", "Featured builds"], ["∞", "Curiosity"]].map(([value, label]) => (
                <div key={label} className="glass rounded-2xl p-4">
                  <p className="font-display text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="border-y border-white/[.06] bg-white/[.015] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="section-kicker">Toolkit</p>
          <h2 className="section-title">A modern engineering stack.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ label, value, icon: Icon }, index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-cyan/20">
                <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-cyan/[.08] text-cyan"><Icon size={19} /></div>
                <h3 className="font-display font-semibold text-white">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="section-kicker">Experience</p>
        <h2 className="section-title">Building where data meets product.</h2>
        <div className="mt-14 grid gap-5">
          {[
            {
              company: "Wells Fargo",
              role: "Software Developer · AI & Cloud Applications",
              text: "Designed GenAI and cloud-native applications using AWS Bedrock, LangChain, RAG, Python, Lambda, API Gateway, S3, and DynamoDB. Built observable REST services and strengthened delivery through Docker, GitHub Actions, and CI/CD.",
              tags: ["AWS Bedrock", "RAG", "Python", "Serverless", "CI/CD"],
            },
            {
              company: "Cyient",
              role: "Software Developer · Data & Cloud Solutions",
              text: "Built data processing and integration workflows with Python, SQL, PySpark, REST APIs, Oracle, and SQL Server. Delivered Azure Data Factory and Databricks pipelines with validation, reconciliation, and maintainable documentation.",
              tags: ["PySpark", "SQL", "Azure Data Factory", "Databricks", "REST APIs"],
            },
          ].map((item, index) => (
            <motion.article key={item.company} initial={{ opacity: 0, x: index ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass grid gap-6 rounded-3xl p-6 md:grid-cols-[.38fr_1fr] md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-mint">{item.company}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{item.role}</h3>
              </div>
              <div>
                <p className="leading-7 text-slate-400">{item.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-slate-400">{tag}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="border-y border-white/[.06] bg-white/[.015] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="section-kicker">Selected work</p>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="section-title max-w-2xl">Systems designed for real-world impact.</h2>
            <p className="max-w-sm text-sm leading-6 text-slate-500">Interactive architecture stories—from incoming signal to measurable result.</p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                id={project.id}
                key={project.title}
                onClick={() => track("project_click", project.id)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 2) * 0.08 }}
                className={`glass group relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.accent} p-6 md:p-7 ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute right-6 top-5 font-display text-5xl font-bold text-white/[.035]">{project.index}</div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-cyan">Architecture case study</p>
                <h3 className="max-w-xl font-display text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{project.description}</p>
                <div className="my-6 rounded-2xl border border-white/[.06] bg-ink/40 p-3">
                  <ArchitectureFlow items={project.flow} />
                </div>
                <div className="flex flex-wrap gap-2">{project.tech.map((item) => <span key={item} className="rounded-full bg-white/[.05] px-3 py-1.5 text-[10px] font-semibold text-slate-300">{item}</span>)}</div>
                <div className="mt-6 flex items-center gap-2 border-t border-white/[.06] pt-5 text-sm font-semibold text-mint">
                  <ArrowRight size={15} /> {project.impact}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="glass relative overflow-hidden rounded-[2rem] p-7 md:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan/10 blur-[90px]" />
          <p className="section-kicker">Let’s build something useful</p>
          <h2 className="max-w-4xl font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            Hiring for Data Engineering, AI Engineering, Cloud Data Platform, or Analytics Engineering roles?
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">I’m based in Jersey City and open to opportunities across New Jersey, New York, and beyond. Let’s connect.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="mailto:srichandanapurella25@gmail.com" onClick={() => track("email_click", "contact")} className="flex items-center gap-2 rounded-xl bg-mint px-5 py-3.5 text-sm font-bold text-ink"><Mail size={17} /> Email me</a>
            <a href="https://www.linkedin.com/in/srichandanap" target="_blank" rel="noreferrer" onClick={() => track("linkedin_click", "contact")} className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/[.05]"><Linkedin size={17} /> LinkedIn</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Sri Chandana Purella. Built with intention.</p>
          <div className="flex items-center gap-5">
            <a href="mailto:srichandanapurella25@gmail.com" aria-label="Email"><Mail size={16} /></a>
            <a href="https://www.linkedin.com/in/srichandanap" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={16} /></a>
            <a href="/admin" className="hover:text-slate-300">Admin</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
