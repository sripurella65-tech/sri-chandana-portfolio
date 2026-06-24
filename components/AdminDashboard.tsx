"use client";

type Data = {
  totalVisitors: number;
  resumeDownloads: number;
  recentVisitors: Array<Record<string, unknown> & { id: string; visitorId: string; lastSeenAt: string }>;
  submissions: Array<Record<string, unknown> & { id: string; name: string | null; email: string | null; company: string | null; createdAt: string }>;
  clicks: Array<Record<string, unknown> & { id: string; eventType: string; target: string | null; createdAt: string }>;
  locations: Array<{ country: string; count: number }>;
  projects: Array<{ target: string; count: number }>;
};

const date = (value: string) => new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export default function AdminDashboard({ data }: { data: Data }) {
  const cards = [
    ["Total visitors", data.totalVisitors],
    ["Resume downloads", data.resumeDownloads],
    ["Contact leads", data.submissions.length],
    ["Recent interactions", data.clicks.length],
  ];

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div><p className="section-kicker">Portfolio intelligence</p><h1 className="font-display text-3xl font-semibold">Admin dashboard</h1></div>
        <button onClick={logout} className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300">Sign out</button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => <div key={label} className="glass rounded-2xl p-5"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 font-display text-3xl font-semibold text-white">{value}</p></div>)}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent visitors">
          {data.recentVisitors.map((v) => <Row key={v.id} title={`${v.city || "Unknown city"}, ${v.country || "Unknown"}`} meta={`${v.browser || "Unknown browser"} · ${date(v.lastSeenAt)}`} />)}
        </Panel>
        <Panel title="Contact submissions">
          {data.submissions.length ? data.submissions.map((v) => <Row key={v.id} title={v.name || v.email || "Anonymous visitor"} meta={`${v.company || "No company"} · ${date(v.createdAt)}`} />) : <Empty />}
        </Panel>
        <Panel title="Recent click events">
          {data.clicks.map((v) => <Row key={v.id} title={v.eventType.replaceAll("_", " ")} meta={`${v.target || "No target"} · ${date(v.createdAt)}`} />)}
        </Panel>
        <div className="grid gap-6">
          <Panel title="Location breakdown">{data.locations.length ? data.locations.map((v) => <Bar key={v.country} label={v.country} count={v.count} max={Math.max(...data.locations.map((x) => x.count))} />) : <Empty />}</Panel>
          <Panel title="Most viewed projects">{data.projects.length ? data.projects.map((v) => <Bar key={v.target} label={v.target} count={v.count} max={Math.max(...data.projects.map((x) => x.count))} />) : <Empty />}</Panel>
        </div>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="glass rounded-2xl p-5"><h2 className="mb-4 font-display font-semibold text-white">{title}</h2><div className="grid gap-2">{children}</div></section>;
}
function Row({ title, meta }: { title: string; meta: string }) {
  return <div className="rounded-xl bg-white/[.035] p-3"><p className="text-sm font-medium capitalize text-slate-200">{title}</p><p className="mt-1 truncate text-[11px] text-slate-500">{meta}</p></div>;
}
function Bar({ label, count, max }: { label: string; count: number; max: number }) {
  return <div><div className="mb-1 flex justify-between text-xs text-slate-400"><span>{label}</span><span>{count}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-cyan to-mint" style={{ width: `${(count / max) * 100}%` }} /></div></div>;
}
function Empty() {
  return <p className="py-5 text-center text-xs text-slate-600">No data yet.</p>;
}
