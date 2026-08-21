"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useConsole } from "../../../lib/ConsoleContext";

export default function VerifyPage() {
  const { signIn } = useConsole();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val[val.length - 1]; // take last char
    }
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    // Auto-focus next input
    if (val !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

      <h1>Two-step<br />verification</h1>
      <p className="sub">Enter the six-digit code from your authenticator app.</p>

      <form onSubmit={handleSubmit}>
        <div className="otp">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              aria-label={`Digit ${idx + 1}`}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary btn-full">
          Verify <span className="ar">↗</span>
        </button>
      </form>

      <p className="auth-foot">
        Lost your device? <Link href="/contact">Contact support</Link> — we verify identity
        out of band before resetting a factor.<br />
        <br />
        <Link href="/login">Back to sign in</Link>
      </p>
    </div>
  );
}
