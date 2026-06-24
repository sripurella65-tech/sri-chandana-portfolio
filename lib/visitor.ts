import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function getVisitorMetadata(userAgent?: string) {
  const requestHeaders = await headers();
  const ua = userAgent || requestHeaders.get("user-agent") || "";
  const parsed = UAParser(ua);
  const forwarded = requestHeaders.get("x-forwarded-for");

  return {
    ipAddress: forwarded?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip"),
    city: requestHeaders.get("x-vercel-ip-city"),
    region: requestHeaders.get("x-vercel-ip-country-region"),
    country: requestHeaders.get("x-vercel-ip-country"),
    timezone: requestHeaders.get("x-vercel-ip-timezone"),
    deviceType: parsed.device.type || "desktop",
    browser: [parsed.browser.name, parsed.browser.version].filter(Boolean).join(" "),
    operatingSystem: [parsed.os.name, parsed.os.version].filter(Boolean).join(" "),
    userAgent: ua,
  };
}
