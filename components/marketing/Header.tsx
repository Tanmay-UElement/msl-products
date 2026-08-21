"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/gpu", label: "GPU" },
    { href: "/compute", label: "Compute" },
    { href: "/storage", label: "Storage" },
    { href: "/platform", label: "Platform" },
    { href: "/solutions", label: "Solutions" },
    { href: "/infrastructure", label: "Datacenters" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
    { href: "/company", label: "Company" },
  ];

  return (
    <header className="nav">
      <div className="navin">
        <Link href="/" className="brand" aria-label="MSL Products home">
          <svg className="brand-mk" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <rect x=".5" y=".5" width="25" height="25" stroke="#2E6BFF" />
            <rect x="5" y="5" width="7" height="7" fill="#2E6BFF" />
            <rect x="14" y="5" width="7" height="7" fill="#4DE1FF" opacity=".55" />
            <rect x="5" y="14" width="7" height="7" fill="#4DE1FF" opacity=".55" />
            <rect x="14" y="14" width="7" height="7" fill="#2E6BFF" />
          </svg>
          <span className="brand-tx">
            MSL <s>/ Products</s>
          </span>
        </Link>
        
        <nav className={`navlinks ${menuOpen ? "open" : ""}`} id="nav">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "on" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="navcta">
          <Link href="/contact" className="btn btn-ghost">
            Talk to us
          </Link>
          <Link href="/login" className="btn btn-ghost" style={{ display: "inline-flex" }}>
            Sign In
          </Link>
          <Link href="/docs" className="btn btn-primary">
            Deploy <span className="ar">↗</span>
          </Link>
          <button
            className="burger"
            id="burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
