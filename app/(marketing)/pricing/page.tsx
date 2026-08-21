"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

interface GpuItem {
  name: string;
  memory: string;
  base: number;
}

const GPU_ITEMS: GpuItem[] = [
  { name: "H200 SXM", memory: "141 GB", base: 319 },
  { name: "H100 SXM", memory: "80 GB", base: 239 },
  { name: "H100 PCIe", memory: "80 GB", base: 199 },
  { name: "MI300X", memory: "192 GB", base: 269 },
  { name: "A100 SXM", memory: "80 GB", base: 149 },
  { name: "L40S", memory: "48 GB", base: 99 },
  { name: "RTX 6000 Ada", memory: "48 GB", base: 79 },
  { name: "RTX 4090", memory: "24 GB", base: 44 },
];

const MULTIPLIERS = {
  on: 1,
  res: 0.78,
  com: 0.62,
};

const NOTES = {
  on: "On-demand · billed per second · no minimum term",
  res: "Reserved 12 months · 22% below on-demand · capacity held for you",
  com: "Committed 36 months · 38% below on-demand · flexible across GPU types",
};

export default function PricingPage() {
  const [term, setTerm] = useState<"on" | "res" | "com">("on");

  const m = MULTIPLIERS[term];

  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">Pricing</p>
          <h1>
            Published.
            <br />
            All of it.
          </h1>
          <p className="lede">
            Every rate we charge is on this page. There is no egress line, no request line, no support tier you have to buy to get a human, and no minimum on on-demand.
          </p>
          <div className="toggle" id="term">
            <button
              className={term === "on" ? "on" : ""}
              onClick={() => setTerm("on")}
            >
              On-demand
            </button>
            <button
              className={term === "res" ? "on" : ""}
              onClick={() => setTerm("res")}
            >
              Reserved 12 mo
            </button>
            <button
              className={term === "com" ? "on" : ""}
              onClick={() => setTerm("com")}
            >
              Committed 36 mo
            </button>
          </div>
        </div>
      </div>

      {/* GPU list table */}
      <ScrollReveal className="band pad" style={{ marginTop: "48px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">GPU · per GPU-hour</p>
            <h2 className="sect">Accelerators</h2>
          </div>
          <div className="tblwrap">
            <table>
              <thead>
                <tr>
                  <th>Accelerator</th>
                  <th>Memory</th>
                  <th>Rate</th>
                  <th>Monthly equivalent</th>
                </tr>
              </thead>
              <tbody id="gputbl">
                {GPU_ITEMS.map((gpu) => {
                  const hrRate = gpu.base * m;
                  const rateText = `₹${hrRate.toFixed(hrRate < 100 ? 1 : 0)} /hr`;
                  const moText = `≈ ₹${Math.round(hrRate * 730).toLocaleString("en-IN")} /mo`;
                  return (
                    <tr key={gpu.name}>
                      <td className="name">{gpu.name}</td>
                      <td className="dim">{gpu.memory}</td>
                      <td className="rate">{rateText}</td>
                      <td className="dim">{moText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="note" id="termnote">
            {NOTES[term]}
          </p>
        </div>
      </ScrollReveal>

      {/* CPU & Storage Pricing Tables */}
      <ScrollReveal className="band pad">
        <div className="shell stack-lg">
          <div className="split split-t">
            <div className="stack">
              <div className="stack-sm">
                <p className="eyebrow">Compute</p>
                <h2 className="sect">CPU and memory</h2>
              </div>
              <div className="tblwrap">
                <table style={{ minWidth: 0 }}>
                  <thead>
                    <tr>
                      <th>Resource</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="name">vCPU — C family</td>
                      <td className="rate">₹1.10 /hr</td>
                    </tr>
                    <tr>
                      <td className="name">vCPU — M family</td>
                      <td className="rate">₹1.35 /hr</td>
                    </tr>
                    <tr>
                      <td className="name">vCPU — R family</td>
                      <td className="rate">₹1.90 /hr</td>
                    </tr>
                    <tr>
                      <td className="name">vCPU — I family</td>
                      <td className="rate">₹2.40 /hr</td>
                    </tr>
                    <tr>
                      <td className="name">Memory</td>
                      <td className="rate">₹0.55 /GB-hr</td>
                    </tr>
                    <tr>
                      <td className="name">Public IPv4</td>
                      <td className="rate">₹180 /month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="stack">
              <div className="stack-sm">
                <p className="eyebrow">Storage</p>
                <h2 className="sect">Capacity</h2>
              </div>
              <div className="tblwrap">
                <table style={{ minWidth: 0 }}>
                  <thead>
                    <tr>
                      <th>Tier</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="name">Block NVMe</td>
                      <td className="rate">₹8.00 /GB-mo</td>
                    </tr>
                    <tr>
                      <td className="name">Shared filesystem</td>
                      <td className="rate">₹6.20 /GB-mo</td>
                    </tr>
                    <tr>
                      <td className="name">Object Standard</td>
                      <td className="rate">₹1.60 /GB-mo</td>
                    </tr>
                    <tr>
                      <td className="name">Object Archive</td>
                      <td className="rate">₹0.40 /GB-mo</td>
                    </tr>
                    <tr>
                      <td className="name">Snapshots</td>
                      <td className="rate">₹1.60 /GB-mo</td>
                    </tr>
                    <tr>
                      <td className="name">Egress · requests</td>
                      <td className="rate">₹0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p className="note">
            All rates exclusive of GST. Billing is per second for compute and GPU, per GB-month prorated daily for storage.
          </p>
        </div>
      </ScrollReveal>

      {/* Included features */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Included at every size</p>
            <h2 className="sect">Not an upsell</h2>
          </div>
          <div className="cards cards-4">
            <div className="card">
              <h4>Data egress</h4>
              <p>Unmetered, in and out, across every service.</p>
            </div>
            <div className="card">
              <h4>Internal traffic</h4>
              <p>Free between compute, GPU and storage in a region.</p>
            </div>
            <div className="card">
              <h4>24×7 support</h4>
              <p>Humans on chat, phone and email. No paid tier.</p>
            </div>
            <div className="card">
              <h4>DDoS protection</h4>
              <p>Always on at the edge, no scrubbing surcharge.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* FAQs */}
      <ScrollReveal className="band pad">
        <div className="shell">
          <div className="stack-sm" style={{ marginBottom: "34px" }}>
            <p className="eyebrow">Questions we get asked</p>
            <h2 className="sect">Billing, plainly</h2>
          </div>
          <div className="faq">
            <details>
              <summary>Is there really no egress charge?</summary>
              <p>
                Correct. We don't meter data leaving our network, on any service. Our transit is a fixed cost we already carry, and metering it is a commercial choice rather than a physical one. If you push sustained multi-gigabit traffic we'll talk about a dedicated port, but there's no per-gigabyte line on the invoice.
              </p>
            </details>
            <details>
              <summary>How does per-second billing actually work?</summary>
              <p>
                A pod or instance accrues charges from the moment it reaches a running state to the moment it stops. Stopped instances are billed for attached storage only. There's no rounding to the hour and no minimum runtime, so a four-minute test costs four minutes.
              </p>
            </details>
            <details>
              <summary>What's the difference between reserved and committed?</summary>
              <p>
                Reserved holds specific capacity for you at a discounted rate for twelve months, billed whether or not you use it. Committed is a thirty-six month spend commitment across any service, with the deepest rates and flexibility to move between GPU types as your workload changes.
              </p>
            </details>
            <details>
              <summary>Do you accept GeM and standard enterprise procurement?</summary>
              <p>
                Yes. We're listed on GeM for public-sector buyers, and we work with the usual enterprise instruments — POs, monthly consolidated invoicing in INR, credit terms and MSA-based contracting. Startups can also pay by card with no contract at all.
              </p>
            </details>
            <details>
              <summary>Can I get credits to evaluate?</summary>
              <p>
                Yes. Every new account gets evaluation credits, and if you're benchmarking against another provider we'll usually fund a proper comparison run rather than a token trial. Ask for it directly.
              </p>
            </details>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
