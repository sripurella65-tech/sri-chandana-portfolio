"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const skillGroups = [
  { title: "Data", items: "Python, SQL, PySpark, Pandas, Great Expectations" },
  { title: "AWS", items: "Lambda, S3, Glue, Athena, Redshift, Bedrock, API Gateway" },
  { title: "Azure", items: "Data Factory, Databricks, Synapse, ADLS Gen2, Azure DevOps" },
  { title: "AI", items: "LangChain, RAG, OpenAI API, Vector Databases, Embeddings" },
  { title: "Backend", items: "FastAPI, Flask, REST APIs, PostgreSQL, DynamoDB" },
  { title: "Delivery", items: "Docker, GitHub Actions, CI/CD, Power BI, Agile" },
];

const experience = [
  {
    company: "Wells Fargo",
    role: "Software Developer · AI & Cloud Applications",
    summary:
      "Built GenAI and cloud-native applications that connect enterprise data, retrieval systems, and secure APIs.",
    highlights: [
      "Developed RAG workflows with AWS Bedrock, LangChain, and Python.",
      "Built serverless services using Lambda, API Gateway, S3, and DynamoDB.",
      "Improved observability and delivery with CloudWatch, Docker, and GitHub Actions.",
    ],
  },
  {
    company: "Cyient",
    role: "Software Developer · Data & Cloud Solutions",
    summary:
      "Delivered data integration and validation workflows across Python, SQL, PySpark, and Azure.",
    highlights: [
      "Created processing workflows for REST, XML, JSON, Oracle, and SQL Server data.",
      "Implemented pipelines with Azure Data Factory and Databricks.",
      "Strengthened data trust through reconciliation, validation, and documentation.",
    ],
  },
];

const projects = [
  {
    id: "metadata-assistant",
    number: "01",
    title: "Generative AI Metadata Assistant",
    category: "AI / RAG",
    description:
      "A conversational assistant that retrieves enterprise metadata and returns grounded answers for analysts.",
    impact: "Faster data discovery and more effective self-service analytics.",
    tech: "Python · AWS Bedrock · LangChain · OpenAI · S3",
    flow: ["Question", "API", "Retriever", "Metadata", "LLM", "Answer"],
  },
  {
    id: "api-automation",
    number: "02",
    title: "Cloud API Automation Platform",
    category: "AWS / Backend",
    description:
      "A serverless platform for processing, tracking, and monitoring internal service requests.",
    impact: "Less manual coordination and clearer operational visibility.",
    tech: "FastAPI · Lambda · DynamoDB · CloudWatch",
    flow: ["Request", "API", "Lambda", "Database", "Alerts"],
  },
  {
    id: "ai-data-workflow",
    number: "03",
    title: "AI-Ready Data Processing",
    category: "Data Engineering",
    description:
      "A governed transformation workflow that converts raw cloud data into dependable ML-ready datasets.",
    impact: "Shorter preparation cycles and higher-quality model inputs.",
    tech: "Python · SQL · PySpark · S3 · Glue · Athena",
    flow: ["Raw data", "S3", "Catalog", "PySpark", "Athena", "ML data"],
  },
  {
    id: "healthcare-pipeline",
    number: "04",
    title: "Healthcare Operations Pipeline",
    category: "Azure / Analytics",
    description:
      "A scalable lakehouse pipeline for clinical and operational reporting across heterogeneous sources.",
    impact: "Reliable reporting for healthcare operations and decision-making.",
    tech: "ADF · ADLS Gen2 · Databricks · Delta Lake · Synapse",
    flow: ["Sources", "ADF", "ADLS", "Databricks", "Synapse", "Power BI"],
  },
  {
    id: "customer-analytics",
    number: "05",
    title: "Customer Analytics Platform",
    category: "Data Modeling",
    description:
      "A historical customer model that preserves change over time for cohort and trend analysis.",
    impact: "Accurate longitudinal reporting and customer performance insights.",
    tech: "PySpark · Databricks · SCD Type 2 · Synapse · Power BI",
    flow: ["Snapshots", "Merge", "SCD 2", "Warehouse", "Dashboard"],
  },
];

function getVisitorId() {
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
      body: JSON.stringify({
        visitorId: getVisitorId(),
        eventType,
        target,
        path: location.pathname,
      }),
      keepalive: true,
    });
  } catch {}
}

function VisitorModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, visitorId: getVisitorId() }),
      });
      if (!response.ok) throw new Error();
      setStatus("sent");
      setTimeout(onClose, 1200);
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Optional visitor details"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8 }}
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl md:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        <p className="eyebrow">Optional introduction</p>
        <h2 className="mt-3 max-w-md font-display text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          Thanks for stopping by.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
          Recruiting or hiring? Share as much or as little as you’d like, and I can follow up directly.
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
          <input className="field" name="name" placeholder="Name" maxLength={100} />
          <input className="field" name="email" type="email" placeholder="Email" maxLength={150} />
          <input className="field" name="phone" placeholder="Phone" maxLength={40} />
          <input className="field" name="company" placeholder="Company" maxLength={120} />
          <input className="field sm:col-span-2" name="role" placeholder="Role / job title" maxLength={120} />
          <textarea
            className="field min-h-24 resize-y sm:col-span-2"
            name="jobDescription"
            placeholder="Job description (optional)"
            maxLength={3000}
          />
          <textarea
            className="field min-h-20 resize-y sm:col-span-2"
            name="message"
            placeholder="Message (optional)"
            maxLength={2000}
          />
          <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-4 text-slate-400">
              This form is optional. Basic visit analytics are collected.
            </p>
            <button
              disabled={status === "sending"}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "Thank you" : "Send details"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-xs text-red-600 sm:col-span-2">
              Couldn’t send right now. You can close this window and continue.
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <div className="no-scrollbar flex items-center overflow-x-auto">
      {items.map((item, index) => (
        <div key={item} className="flex shrink-0 items-center">
          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600">
            {item}
          </span>
          {index < items.length - 1 && <span className="mx-1.5 h-px w-4 bg-slate-300" />}
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setModal(true);
    void (async () => {
      try {
        await fetch("/api/track/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId: getVisitorId(),
            path: location.pathname,
            referrer: document.referrer,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        });
      } catch {}
    })();
  }, []);

  const nav = ["About", "Experience", "Projects", "Contact"];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-slate-950">
      <AnimatePresence>{modal && <VisitorModal onClose={() => setModal(false)} />}</AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-900/10 bg-[#f7f7f4]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="font-display text-base font-semibold tracking-tight">
            Sri Chandana Purella
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-medium text-slate-500 transition hover:text-slate-950"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="mailto:srichandanapurella25@gmail.com"
            onClick={() => track("email_click", "navigation")}
            className="hidden items-center gap-2 rounded-full border border-slate-900/15 px-4 py-2 text-xs font-semibold transition hover:bg-slate-950 hover:text-white md:flex"
          >
            Get in touch <ArrowUpRight size={14} />
          </a>
          <button onClick={() => setMenu(!menu)} aria-label="Toggle menu" className="md:hidden">
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t border-slate-900/10 bg-[#f7f7f4] md:hidden"
            >
              <div className="grid gap-4 px-5 py-5">
                {nav.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)} className="text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative border-b border-slate-900/10 pt-[68px]">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.35fr_.65fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available for Data, AI & Cloud Engineering roles
            </div>
            <h1 className="max-w-5xl font-display text-[clamp(3.4rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              Data systems,
              <br />
              built for <span className="text-blue-700">decisions.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              I’m Sri Chandana, a Data, AI & Cloud Engineer building dependable pipelines, intelligent applications,
              and analytics platforms across AWS and Azure.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={() => track("projects_navigation", "hero")}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore my work <ArrowDown size={15} />
              </a>
              <a
                href="/resume.html"
                download
                onClick={() => track("resume_download", "hero")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/15 bg-white/50 px-5 py-3 text-sm font-semibold transition hover:bg-white"
              >
                <Download size={15} /> Resume
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="self-end lg:self-center"
          >
            <div className="border-l border-slate-900/15 pl-6">
              <p className="eyebrow">Currently focused on</p>
              <div className="mt-6 space-y-5">
                {["Cloud data platforms", "Production RAG systems", "Reliable API automation", "Analytics engineering"].map(
                  (item, index) => (
                    <div key={item} className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-slate-400">0{index + 1}</span>
                      <p className="font-display text-lg font-medium">{item}</p>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-9 flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} /> Jersey City, NJ · Open to New York
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr]">
          <div>
            <p className="eyebrow">About</p>
          </div>
          <div>
            <h2 className="max-w-4xl font-display text-3xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
              I turn complex data and cloud requirements into systems teams can understand, trust, and use.
            </h2>
            <div className="mt-10 grid gap-6 text-base leading-7 text-slate-600 md:grid-cols-2">
              <p>
                My work spans cloud pipelines, AI-ready data products, GenAI assistants, backend automation, and
                decision-focused analytics.
              </p>
              <p>
                I care about more than moving data. I build for reliability, maintainability, observability, and the
                people who depend on the result.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-900/10">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-2 border-b border-slate-900/10 py-4 sm:grid-cols-[180px_1fr] sm:items-center"
            >
              <h3 className="font-display text-sm font-semibold">{group.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{group.items}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="bg-slate-950 py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr]">
            <div>
              <p className="eyebrow text-blue-300">Experience</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
                Building practical systems at the intersection of data, software, and cloud infrastructure.
              </p>
            </div>
            <div>
              {experience.map((item, index) => (
                <motion.article
                  key={item.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid gap-8 py-10 first:pt-0 md:grid-cols-[.6fr_1.4fr] ${
                    index < experience.length - 1 ? "border-b border-white/15" : ""
                  }`}
                >
                  <div>
                    <p className="font-display text-xl font-medium">{item.company}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.role}</p>
                  </div>
                  <div>
                    <p className="text-lg leading-7 text-slate-200">{item.summary}</p>
                    <ul className="mt-6 grid gap-3">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-400">
                          <CheckCircle2 className="mt-1 shrink-0 text-blue-400" size={15} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 max-w-sm font-display text-3xl font-medium tracking-tight md:text-4xl">
              Five systems. One goal: useful outcomes.
            </h2>
          </div>
          <div className="border-t border-slate-900/15">
            {projects.map((project) => (
              <motion.article
                id={project.id}
                key={project.id}
                onClick={() => track("project_click", project.id)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group border-b border-slate-900/15 py-8"
              >
                <div className="grid gap-5 md:grid-cols-[52px_1fr]">
                  <span className="pt-1 font-mono text-xs text-slate-400">{project.number}</span>
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
                          {project.category}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
                          {project.title}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className="text-slate-300 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-700"
                      />
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">{project.description}</p>
                    <p className="mt-3 text-sm font-medium text-slate-900">{project.impact}</p>
                    <div className="mt-6">
                      <Flow items={project.flow} />
                    </div>
                    <p className="mt-5 text-xs text-slate-400">{project.tech}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-900/10 bg-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Let’s connect</p>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.4fr_.6fr]">
            <h2 className="max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] md:text-6xl">
              Building a data, AI, or cloud team? I’d love to hear about it.
            </h2>
            <div>
              <p className="text-sm leading-6 text-blue-100">
                Based in Jersey City and open to opportunities across New Jersey, New York, and beyond.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="mailto:srichandanapurella25@gmail.com"
                  onClick={() => track("email_click", "contact")}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-800"
                >
                  <Mail size={15} /> Email me
                </a>
                <a
                  href="https://www.linkedin.com/in/srichandanap"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("linkedin_click", "contact")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Sri Chandana Purella</p>
          <div className="flex gap-5">
            <a href="/admin" className="transition hover:text-white">
              Admin
            </a>
            <a href="#top" className="transition hover:text-white">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
