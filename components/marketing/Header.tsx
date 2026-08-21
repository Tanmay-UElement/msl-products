"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Items inside the "Products" dropdown */
const PRODUCT_LINKS = [
  { href: "/gpu",            label: "GPU",         desc: "H200, H100 & A100 bare-metal" },
  { href: "/compute",        label: "Compute",     desc: "Pods, clusters & reserved capacity" },
  { href: "/storage",        label: "Storage",     desc: "NVMe volumes & S3-compatible buckets" },
  { href: "/platform",       label: "Platform",    desc: "CLI, API, Terraform & SDKs" },
  { href: "/solutions",      label: "Solutions",   desc: "AI training, inference & HPC" },
  { href: "/infrastructure", label: "Datacenters", desc: "Tier-IV facilities across India" },
];

/** Top-level nav links (not in dropdown) */
const TOP_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs",    label: "Docs" },
  { href: "/company", label: "Company" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropOpen, setDropOpen]       = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const isProductActive = PRODUCT_LINKS.some((l) => pathname === l.href);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ── Dropdown overlay styles (scoped, no Tailwind needed) ── */}
      <style>{`
        .nav-drop-wrap {
          position: relative;
        }
        .nav-drop-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--mono);
          font-size: 11.5px;
          letter-spacing: .11em;
          text-transform: uppercase;
          color: var(--ink-2);
          padding: 9px 13px;
          border-radius: 6px;
          transition: .15s;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-drop-btn:hover,
        .nav-drop-btn.active {
          color: var(--ink);
          background: rgba(255, 255, 255, .05);
        }
        .nav-drop-btn.active {
          color: var(--ink);
        }
        .nav-drop-chevron {
          width: 10px;
          height: 10px;
          flex: none;
          transition: transform .18s;
        }
        .nav-drop-btn[aria-expanded="true"] .nav-drop-chevron {
          transform: rotate(180deg);
        }
        /* Dropdown panel */
        .nav-drop-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 540px;
          background: var(--rack);
          border: 1px solid var(--wire-2);
          border-radius: 6px;
          padding: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          z-index: 200;
          box-shadow: 0 24px 48px rgba(0,0,0,.45);
          /* entrance animation */
          animation: dropIn .16s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-drop-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 11px 14px;
          border-radius: 4px;
          transition: background .13s;
          text-decoration: none;
        }
        .nav-drop-item:hover {
          background: rgba(255,255,255,.06);
        }
        .nav-drop-item.on {
          background: var(--blue-dim);
        }
        .nav-drop-item-label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--ink);
          font-weight: 500;
        }
        .nav-drop-item.on .nav-drop-item-label {
          color: var(--blue-hi);
        }
        .nav-drop-item-desc {
          font-size: 12px;
          color: var(--ink-3);
          line-height: 1.4;
        }
        /* Mobile: dropdown becomes flat list */
        @media(max-width:1080px) {
          .nav-drop-panel {
            position: static;
            transform: none;
            min-width: 0;
            width: 100%;
            grid-template-columns: 1fr;
            box-shadow: none;
            border: none;
            border-top: 1px solid var(--wire);
            border-radius: 0;
            padding: 4px 0;
            animation: none;
            background: transparent;
          }
          .nav-drop-item {
            padding: 12px 14px;
            border-radius: 0;
          }
          .nav-drop-chevron { display: none; }
        }
      `}</style>

      <header className="nav">
        <div className="navin">
          {/* Brand */}
          <Link href="/" className="brand" aria-label="MSL Products home">
            <svg className="brand-mk" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x=".5" y=".5" width="25" height="25" stroke="#2E6BFF" />
              <rect x="5" y="5" width="7" height="7" fill="#2E6BFF" />
              <rect x="14" y="5" width="7" height="7" fill="#4DE1FF" opacity=".55" />
              <rect x="5" y="14" width="7" height="7" fill="#4DE1FF" opacity=".55" />
              <rect x="14" y="14" width="7" height="7" fill="#2E6BFF" />
            </svg>
            <span className="brand-tx">MSL <s>/ Products</s></span>
          </Link>

          {/* Nav links */}
          <nav className={`navlinks ${menuOpen ? "open" : ""}`} id="nav">

            {/* ── Products dropdown ── */}
            <div className="nav-drop-wrap" ref={dropRef}>
              <button
                className={`nav-drop-btn${isProductActive ? " active" : ""}`}
                aria-expanded={dropOpen}
                aria-haspopup="true"
                onClick={() => setDropOpen((v) => !v)}
              >
                Products
                <svg className="nav-drop-chevron" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M2 3.5l3 3 3-3" />
                </svg>
              </button>

              {dropOpen && (
                <div className="nav-drop-panel" role="menu">
                  {PRODUCT_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`nav-drop-item${pathname === l.href ? " on" : ""}`}
                      role="menuitem"
                      onClick={() => { setDropOpen(false); setMenuOpen(false); }}
                    >
                      <span className="nav-drop-item-label">{l.label}</span>
                      <span className="nav-drop-item-desc">{l.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── Top-level links ── */}
            {TOP_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "on" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs + burger */}
          <div className="navcta">
            <Link href="/contact" className="btn btn-ghost">Talk to us</Link>
            <Link href="/login" className="btn btn-ghost" style={{ display: "inline-flex" }}>Sign In</Link>
            <Link href="/docs" className="btn btn-primary">Deploy <span className="ar">↗</span></Link>
            <button
              className="burger"
              id="burger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => { setMenuOpen(!menuOpen); setDropOpen(false); }}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
