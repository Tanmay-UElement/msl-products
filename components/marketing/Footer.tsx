import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="shell">
        <div className="fgrid">
          <div className="fcol">
            <Link href="/" className="brand" style={{ marginBottom: "16px" }}>
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
            <p style={{ color: "var(--ink-3)", fontSize: ".875rem", maxWidth: "34ch" }}>
              GPU, compute and storage from Tier III datacenters in Mumbai, Pune, Chennai and Noida.
            </p>
          </div>
          <div className="fcol">
            <h5>Services</h5>
            <Link href="/gpu">GPU as a Service</Link>
            <Link href="/compute">Compute as a Service</Link>
            <Link href="/storage">Storage as a Service</Link>
            <Link href="/platform">Platform</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="fcol">
            <h5>Solutions</h5>
            <Link href="/solutions">Model training</Link>
            <Link href="/solutions">Inference</Link>
            <Link href="/solutions">Render and VFX</Link>
            <Link href="/solutions">HPC</Link>
            <Link href="/solutions">Private cloud</Link>
          </div>
          <div className="fcol">
            <h5>Developers</h5>
            <Link href="/docs">Quickstart</Link>
            <Link href="/docs">API reference</Link>
            <Link href="/docs">Terraform provider</Link>
            <Link href="/docs">Base images</Link>
            <Link href="/docs">Status</Link>
          </div>
          <div className="fcol">
            <h5>Company</h5>
            <Link href="/company">About MSL</Link>
            <Link href="/infrastructure">Datacenters</Link>
            <Link href="/company">Careers</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://mslproducts.in" target="_blank" rel="noopener noreferrer">
              MSL Security ↗
            </a>
          </div>
        </div>
        <div className="fbase">
          <span>© 2026 MSL Products · All rights reserved</span>
          <span>Terms · Privacy · SLA · Trust portal · Acceptable use</span>
        </div>
      </div>
    </footer>
  );
};
