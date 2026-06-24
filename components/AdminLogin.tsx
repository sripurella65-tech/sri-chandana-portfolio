"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const password = new FormData(event.currentTarget).get("password");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) location.reload();
    else setError("That password didn’t match.");
  }

  return (
    <main className="grid min-h-screen place-items-center p-5">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-3xl p-7">
        <p className="section-kicker">Private analytics</p>
        <h1 className="font-display text-2xl font-semibold text-white">Admin dashboard</h1>
        <input className="field mt-6" name="password" type="password" placeholder="Admin password" required autoFocus />
        {error && <p className="mt-3 text-xs text-rose-300">{error}</p>}
        <button className="mt-4 w-full rounded-xl bg-mint py-3 text-sm font-bold text-ink">Sign in</button>
        <a href="/" className="mt-4 block text-center text-xs text-slate-500 hover:text-white">Back to portfolio</a>
      </form>
    </main>
  );
}
