import { sendAlert } from "@/lib/alerts";
import { prisma } from "@/lib/prisma";
import { getVisitorMetadata } from "@/lib/visitor";
import { NextResponse } from "next/server";
import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional().transform((v) => v || undefined);
const schema = z.object({
  visitorId: z.string().min(8).max(100),
  name: optionalText(100),
  email: z.union([z.literal(""), z.string().email().max(150)]).optional().transform((v) => v || undefined),
  phone: optionalText(40),
  company: optionalText(120),
  role: optionalText(120),
  jobDescription: optionalText(3000),
  message: optionalText(2000),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const metadata = await getVisitorMetadata();
    const visitor = await prisma.visitor.upsert({
      where: { visitorId: input.visitorId },
      update: {},
      create: { visitorId: input.visitorId, ...metadata },
    });
    const submission = await prisma.contactSubmission.create({ data: input });
    void sendAlert("New contact submission", {
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      company: submission.company,
      role: submission.role,
      jobDescription: submission.jobDescription,
      message: submission.message,
      city: visitor?.city,
      region: visitor?.region,
      country: visitor?.country,
      time: submission.createdAt.toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ error: "Unable to submit details." }, { status: 400 });
  }
}
