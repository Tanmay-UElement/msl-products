import React from "react";
import Link from "next/link";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function ComputePage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">
            Compute as a Service &nbsp;·&nbsp; <b>CaaS</b>
          </p>
          <h1>
            CPU that
            <br />
            keeps up
          </h1>
          <p className="lede">
            GPUs are useless if the data pipeline stalls. Our compute tier sits on the same leaf switches as the accelerators, so preprocessing, serving and databases stay next to the work.
          </p>
          <div className="btnrow">
            <Link href="/pricing" className="btn btn-primary">
              See compute pricing <span className="ar">↗</span>
            </Link>
            <Link href="/docs" className="btn btn-ghost">
              Read the docs
            </Link>
          </div>
        </div>
      </div>

      {/* Families table */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Instance families</p>
            <h2 className="sect">
              Four shapes,
              <br />
              no surprises
            </h2>
          </div>
          <div className="tblwrap">
            <table>
              <thead>
                <tr>
                  <th>Family</th>
                  <th>Processor</th>
                  <th>vCPU : RAM</th>
                  <th>Local disk</th>
                  <th>Network</th>
                  <th>From</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name">C — Compute</td>
                  <td className="dim">EPYC 9004 / Xeon 6</td>
                  <td className="dim">1 : 2 GB</td>
                  <td className="dim">NVMe optional</td>
                  <td className="dim">25 Gbps</td>
                  <td className="rate">₹1.10 /vCPU-hr</td>
                </tr>
                <tr>
                  <td className="name">M — Balanced</td>
                  <td className="dim">EPYC 9004</td>
                  <td className="dim">1 : 4 GB</td>
                  <td className="dim">NVMe optional</td>
                  <td className="dim">25 Gbps</td>
                  <td className="rate">₹1.35 /vCPU-hr</td>
                </tr>
                <tr>
                  <td className="name">R — Memory</td>
                  <td className="dim">EPYC 9004</td>
                  <td className="dim">1 : 8 GB</td>
                  <td className="dim">NVMe optional</td>
                  <td className="dim">50 Gbps</td>
                  <td className="rate">₹1.90 /vCPU-hr</td>
                </tr>
                <tr>
                  <td className="name">I — Storage</td>
                  <td className="dim">EPYC 9004</td>
                  <td className="dim">1 : 4 GB</td>
                  <td className="dim">up to 30 TB NVMe</td>
                  <td className="dim">100 Gbps</td>
                  <td className="rate">₹2.40 /vCPU-hr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="note">RAM billed separately at ₹0.55 per GB-hour. Dedicated hosts and bare metal quoted monthly.</p>
        </div>
      </ScrollReveal>

      {/* How it runs */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">How it runs</p>
            <h2 className="sect">
              Virtual, dedicated
              <br />
              or bare
            </h2>
          </div>
          <div className="cards cards-3">
            <div className="card">
              <span className="k">Instances</span>
              <h4>Virtual machines</h4>
              <p>
                KVM with SR-IOV networking and passthrough NVMe. Snapshots, resize in place, and images that boot in under twenty seconds.
              </p>
            </div>
            <div className="card">
              <span className="k">Dedicated</span>
              <h4>Single-tenant hosts</h4>
              <p>
                A whole physical host reserved to you, so noisy neighbours and licensing audits both stop being a topic.
              </p>
            </div>
            <div className="card">
              <span className="k">Metal</span>
              <h4>Bare metal</h4>
              <p>PXE, your image, your kernel. IPMI and serial console exposed, with the NIC and disk layout you asked for.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Networking & Features */}
      <ScrollReveal className="band pad">
        <div className="shell split split-t">
          <div className="stack">
            <p className="eyebrow">Networking</p>
            <h2 className="sect">
              Private by
              <br />
              default
            </h2>
            <ul className="bullets">
              <li>
                <b>VPC per project</b> — routed subnets, security groups, no shared broadcast domain
              </li>
              <li>
                <b>Internal traffic is free</b> — between instances, pods and storage, in any volume
              </li>
              <li>
                <b>Direct connect</b> — cross-connect to your own cage, or a private circuit to your office
              </li>
              <li>
                <b>DDoS scrubbing</b> — always on at the edge, included, not an upsell tier
              </li>
              <li>
                <b>Floating IPs</b> — reassign a public address between hosts without a DNS wait
              </li>
            </ul>
          </div>
          
          <div className="stack">
            <p className="eyebrow">Also included</p>
            <div className="cards cards-2">
              <div className="card">
                <span className="k">Backup</span>
                <h4>Scheduled snapshots</h4>
                <p>Policy-driven, cross-site, restorable to a new instance in minutes.</p>
              </div>
              <div className="card">
                <span className="k">Monitor</span>
                <h4>Metrics and logs</h4>
                <p>Prometheus-compatible endpoints and 30 days of retention, no agent licence.</p>
              </div>
              <div className="card">
                <span className="k">IAM</span>
                <h4>Roles and keys</h4>
                <p>SSO via SAML or OIDC, scoped API keys, and a full audit trail per project.</p>
              </div>
              <div className="card">
                <span className="k">Quotas</span>
                <h4>Spend controls</h4>
                <p>Hard caps per project so an experiment can't turn into an invoice.</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="cta pad">
        <div className="shell stack" style={{ textAlign: "center", maxWidth: "720px" }}>
          <h2 className="sect" style={{ fontSize: "clamp(1.9rem,4.6vw,3rem)" }}>
            Migrating from
            <br />
            somewhere else?
          </h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            We do the assessment, the move and the cutover. Most workloads land inside a fortnight.
          </p>
          <div className="btnrow" style={{ justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Plan a migration <span className="ar">↗</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
