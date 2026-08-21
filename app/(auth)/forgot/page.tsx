"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus({
        message: "Please enter a valid work email.",
        isError: true,
      });
      return;
    }
    setStatus({
      message: "Reset link sent. Check your email inbox.",
      isError: false,
    });
    setEmail("");
  };

  return (
    <div className="auth-box">
      <Link className="brand" href="/">
        <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <rect x=".5" y=".5" width="25" height="25" stroke="#2E6BFF" />
          <rect x="5" y="5" width="7" height="7" fill="#2E6BFF" />
          <rect x="14" y="5" width="7" height="7" fill="#4DE1FF" opacity=".55" />
          <rect x="5" y="14" width="7" height="7" fill="#4DE1FF" opacity=".55" />
          <rect x="14" y="14" width="7" height="7" fill="#2E6BFF" />
        </svg>
        <span>
          MSL <s>/ Console</s>
        </span>
      </Link>

      <h1>Reset your<br />password</h1>
      <p className="sub">
        We will email a reset link valid for 30 minutes. Active sessions are not signed out until the password changes.
      </p>

      {status && (
        <div className={`alert ${status.isError ? "err" : "ok"}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="field">
          <span className="lbl">Work email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary btn-full">
          Send reset link <span className="ar">↗</span>
        </button>
      </form>

      <p className="auth-foot">
        <Link href="/login">Back to sign in</Link>
      </p>
    </div>
  );
}
