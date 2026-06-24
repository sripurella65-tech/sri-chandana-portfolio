import { sendAlert } from "@/lib/alerts";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  visitorId: z.string().min(8).max(100),
  eventType: z.string().min(1).max(100),
  target: z.string().max(300).optional(),
  path: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    await prisma.clickEvent.create({
      data: {
        visitorId: input.visitorId,
        eventType: input.eventType,
        target: input.target,
        path: input.path,
      },
    });
    await sendAlert("Portfolio interaction", {
      event: input.eventType,
      target: input.target,
      page: input.path,
      visitorId: input.visitorId,
      time: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Click tracking failed", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
