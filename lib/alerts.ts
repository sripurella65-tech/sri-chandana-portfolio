import { Resend } from "resend";

type AlertPayload = Record<string, unknown>;

function format(payload: AlertPayload) {
  return Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`)
    .join("\n");
}

export async function sendAlert(title: string, payload: AlertPayload) {
  const text = `${title}\n\n${format(payload)}`;
  const jobs: Promise<unknown>[] = [];

  if (process.env.RESEND_API_KEY && process.env.ALERT_EMAIL_TO && process.env.ALERT_EMAIL_FROM) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    jobs.push(
      resend.emails.send({
        from: process.env.ALERT_EMAIL_FROM,
        to: process.env.ALERT_EMAIL_TO,
        subject: `[Portfolio] ${title}`,
        text,
      }),
    );
  }

  if (process.env.SLACK_WEBHOOK_URL) {
    jobs.push(
      fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }),
    );
  }

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    jobs.push(
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
      }),
    );
  }

  await Promise.allSettled(jobs);
}
