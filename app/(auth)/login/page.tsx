"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useConsole } from "../../../lib/ConsoleContext";

export default function LoginPage() {
  const { signIn } = useConsole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    signIn();
  };

  const handleSso = (provider: string) => {
    signIn();
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
      
      <h1>Sign in</h1>
      <p className="sub">
        Use your work account. Single sign-on is available on Team and Enterprise plans.
      </p>

      {error && <div className="alert err">{error}</div>}

      <div className="sso">
        <button type="button" onClick={() => handleSso("Google")}>Continue with Google</button>
        <button type="button" onClick={() => handleSso("Microsoft")}>Continue with Microsoft</button>
        <button type="button" onClick={() => handleSso("SAML SSO")}>Continue with SAML SSO</button>
      </div>

      <div className="divider">or</div>

      <form onSubmit={handleSubmit}>
        <label className="field">
          <span className="lbl">Work email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="you@company.com"
            required
          />
        </label>
        <label className="field">
          <span className="lbl">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary btn-full">
          Sign in <span className="ar">↗</span>
        </button>
      </form>

      <p className="auth-foot">
        <Link href="/forgot">Forgot your password?</Link>
        <br />
        <br />
        No account yet? <Link href="/signup">Create one</Link> · <Link href="/">Back to mslproducts.com</Link>
      </p>
    </div>
  );
}
