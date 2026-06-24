import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export async function isAdmin() {
  const expected = process.env.ADMIN_PASSWORD;
  const token = (await cookies()).get("portfolio_admin")?.value;
  if (!expected || !token) return false;
  const expectedToken = createHash("sha256").update(expected).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
  } catch {
    return false;
  }
}
