import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin />;

  try {
    const [totalVisitors, recentVisitors, submissions, clicks, locations, projects, resumeDownloads] =
      await Promise.all([
        prisma.visitor.count(),
        prisma.visitor.findMany({ orderBy: { lastSeenAt: "desc" }, take: 12 }),
        prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
        prisma.clickEvent.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
        prisma.visitor.groupBy({ by: ["country"], _count: true, orderBy: { _count: { country: "desc" } }, take: 8 }),
        prisma.clickEvent.groupBy({
          by: ["target"],
          where: { eventType: "project_click" },
          _count: true,
          orderBy: { _count: { target: "desc" } },
          take: 8,
        }),
        prisma.clickEvent.count({ where: { eventType: "resume_download" } }),
      ]);

    return (
      <AdminDashboard
        data={{
          totalVisitors,
          resumeDownloads,
          recentVisitors: recentVisitors.map((v) => ({ ...v, firstSeenAt: v.firstSeenAt.toISOString(), lastSeenAt: v.lastSeenAt.toISOString() })),
          submissions: submissions.map((v) => ({ ...v, createdAt: v.createdAt.toISOString() })),
          clicks: clicks.map((v) => ({ ...v, createdAt: v.createdAt.toISOString() })),
          locations: locations.map((v) => ({ country: v.country || "Unknown", count: v._count })),
          projects: projects.map((v) => ({ target: v.target || "Unknown", count: v._count })),
        }}
      />
    );
  } catch {
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="glass max-w-lg rounded-3xl p-8 text-center">
          <h1 className="font-display text-2xl font-semibold">Dashboard unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Connect a Neon database and run <code>pnpm db:push</code> to initialize analytics.</p>
        </div>
      </div>
    );
  }
}
