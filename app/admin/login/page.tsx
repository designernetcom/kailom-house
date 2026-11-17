"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof body.error === "string" ? body.error : "Unable to sign in.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard} aria-labelledby="login-title">
        <p className={styles.kicker}>Kailom House / Content management</p>
        <h1 id="login-title">Sign in to your dashboard.</h1>
        <p className={styles.muted}>Manage categories, subcategories and products from one place.</p>
        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
          <label>
            Email address
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
          <button className={styles.primaryButton} type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <a className={styles.backLink} href="/">← Back to website</a>
      </section>
    </main>
  );
}
