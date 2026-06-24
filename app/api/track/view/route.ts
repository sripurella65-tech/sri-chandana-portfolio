import { sendAlert } from "@/lib/alerts";
import { prisma } from "@/lib/prisma";
import { getVisitorMetadata } from "@/lib/visitor";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  visitorId: z.string().min(8).max(100),
  path: z.string().max(500).default("/"),
  referrer: z.string().max(1000).optional(),
  timezone: z.string().max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const metadata = await getVisitorMetadata();
    const visitor = await prisma.visitor.upsert({
      where: { visitorId: input.visitorId },
      update: { ...metadata, timezone: metadata.timezone || input.timezone },
      create: { visitorId: input.visitorId, ...metadata, timezone: metadata.timezone || input.timezone },
    });
    await prisma.pageView.create({
      data: { visitorId: input.visitorId, path: input.path, referrer: input.referrer || null },
    });
    await sendAlert("New portfolio visit", {
      visitorId: visitor.visitorId,
      page: input.path,
      referrer: input.referrer,
      city: visitor.city,
      region: visitor.region,
      country: visitor.country,
      device: visitor.deviceType,
      browser: visitor.browser,
      time: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("View tracking failed", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
