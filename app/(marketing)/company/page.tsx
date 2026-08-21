import React from "react";
import Link from "next/link";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function CompanyPage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "860px" }}>
          <p className="eyebrow">Company</p>
          <h1>
            We build the
            <br />
            infrastructure
            <br />
            we needed
          </h1>
          <p className="lede">
            MSL has spent more than a decade putting enterprise IT into Indian datacenters. We kept watching teams pay hyperscaler rates for capacity that had to sit in-country anyway — so we built the capacity instead.
          </p>
        </div>
      </div>

      {/* History Split & Ledger */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell split split-t">
          <div className="stack">
            <p className="eyebrow">What we're for</p>
            <h2 className="sect">
              Compute
              <br />
              sovereignty,
              <br />
              without the
              <br />
              speech
            </h2>
            <p className="lede">
              India generates a growing share of the world's data and trains a shrinking share of the world's models on its own soil. That gap is an infrastructure problem, and infrastructure problems are solved by pouring concrete and buying switches — not by position papers.
            </p>
            <p className="lede">
              We own the racks, the power contracts and the network. That's why the price list is short and the answers are specific.
            </p>
          </div>
          
          <div className="stack">
            <div className="ledger" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <p className="v">2014</p>
                <p className="l">Founded</p>
              </div>
              <div>
                <p className="v">240<s>+</s></p>
                <p className="l">Enterprise customers</p>
              </div>
              <div>
                <p className="v">18 MW</p>
                <p className="l">Contracted IT load</p>
              </div>
              <div>
                <p className="v">130<s>+</s></p>
                <p className="l">Engineers on staff</p>
              </div>
            </div>
            
            <ul className="bullets">
              <li>
                <b>2014</b> — founded as an infrastructure integrator serving BFSI and manufacturing
              </li>
              <li>
                <b>2019</b> — first owned colocation footprint in Navi Mumbai
              </li>
              <li>
                <b>2023</b> — GPU platform launched with A100 capacity in Mumbai and Pune
              </li>
              <li>
                <b>2025</b> — H100 clusters on 400G InfiniBand; Chennai and Noida regions live
              </li>
              <li>
                <b>2026</b> — H200 and MI300X capacity; Hyderabad liquid-cooled build begins
              </li>
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* Operating Commitments */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">How we operate</p>
            <h2 className="sect">Four commitments</h2>
          </div>
          <div className="cards cards-4">
            <div className="card">
              <span className="k">01</span>
              <h4>Publish the price</h4>
              <p>
                Every rate is on the pricing page. Discounts exist for volume, but nobody is quoted a different number for the same thing.
              </p>
            </div>
            <div className="card">
              <span className="k">02</span>
              <h4>Publish the benchmark</h4>
              <p>You get real numbers from your shape before you commit, including the ones that don't flatter us.</p>
            </div>
            <div className="card">
              <span className="k">03</span>
              <h4>Answer as engineers</h4>
              <p>Support is staffed by people who can read a DCGM trace. First response is a fix attempt, not a triage form.</p>
            </div>
            <div className="card">
              <span className="k">04</span>
              <h4>Make leaving easy</h4>
              <p>No egress fees and no proprietary lock-in on storage. If you go, you go with your data and no exit invoice.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Careers & Corporate split */}
      <ScrollReveal className="band pad">
        <div className="shell split split-t">
          <div className="stack">
            <p className="eyebrow">Careers</p>
            <h2 className="sect">
              Come build
              <br />
              the floor
            </h2>
            <p className="lede">
              We're hiring platform engineers, datacenter operations staff and solutions architects across Mumbai, Pune and Chennai. Hardware people especially welcome.
            </p>
            <div className="btnrow">
              <Link href="/contact" className="btn btn-ghost">
                See open roles <span className="ar">↗</span>
              </Link>
            </div>
          </div>
          
          <div className="stack">
            <p className="eyebrow">Two companies, one group</p>
            <div className="notch" style={{ padding: "26px 24px" }}>
              <p style={{ color: "var(--ink-2)", fontSize: ".9375rem", lineHeight: "1.65" }}>
                <b style={{ color: "var(--ink)", fontWeight: 500 }}>mslproducts.com</b> — this site. Datacenter infrastructure: GPU, compute, storage and platform services, sold globally.
              </p>
              <p style={{ color: "var(--ink-2)", fontSize: ".9375rem", lineHeight: "1.65", marginTop: "18px", paddingTop: "18px", borderTop: "1px solid var(--wire)" }}>
                <b style={{ color: "var(--ink)", fontWeight: 500 }}>mslproducts.in</b> — our cybersecurity distribution and VAR business, representing 40+ security technologies to Indian enterprises and channel partners.
              </p>
              <a href="https://mslproducts.in" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: "22px" }}>
                Visit MSL Security <span className="ar">↗</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
