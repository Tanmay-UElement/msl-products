"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useConsole } from "../../../lib/ConsoleContext";

export default function SignupPage() {
  const { signUp } = useConsole();
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    company: "",
    password: "",
    region: "BOM1 — Mumbai",
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { first, last, email, company, password, region } = formData;
    
    if (!first.trim() || !last.trim() || !email.trim() || !company.trim() || !password.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    if (password.length < 12) {
      setError("Password must be at least 12 characters.");
      return;
    }

    signUp(first, last, email, company, region);
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

      <h1>Create<br />an account</h1>
      <p className="sub">
        Evaluation credits are applied automatically. No sales call required to start.
      </p>

      {error && <div className="alert err">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="f2">
          <label className="field">
            <span className="lbl">First name</span>
            <input
              type="text"
              name="first"
              value={formData.first}
              onChange={handleChange}
              required
            />
          </label>
          <label className="field">
            <span className="lbl">Last name</span>
            <input
              type="text"
              name="last"
              value={formData.last}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        
        <label className="field">
          <span className="lbl">Work email</span>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="hint">Personal domains need a short verification step</span>
        </label>
        
        <label className="field">
          <span className="lbl">Company</span>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>
        
        <label className="field">
          <span className="lbl">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="hint">At least 12 characters. We check against known breach lists.</span>
        </label>
        
        <label className="field">
          <span className="lbl">Primary region</span>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option>BOM1 — Mumbai</option>
            <option>PNQ1 — Pune</option>
            <option>MAA1 — Chennai</option>
            <option>DEL1 — Noida</option>
          </select>
        </label>
        
        <button type="submit" className="btn btn-primary btn-full">
          Create account <span className="ar">↗</span>
        </button>
      </form>

      <p className="auth-foot">
        By creating an account you accept the <Link href="/legal/terms">terms of service</Link> and{" "}
        <Link href="/legal/aup">acceptable use policy</Link>.<br />
        <br />
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}
