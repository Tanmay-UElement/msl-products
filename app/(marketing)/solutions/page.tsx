import React from "react";
import Link from "next/link";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function SolutionsPage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">Solutions</p>
          <h1>
            What people
            <br />
            run on us
          </h1>
          <p className="lede">
            Written by workload, not by industry vertical, because the shape of the job determines the shape of the infrastructure far more than the sector does.
          </p>
        </div>
      </div>

      {/* Workload Cards */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">By workload</p>
            <h2 className="sect">Six patterns</h2>
          </div>
          <div className="cards cards-3">
            <div className="card">
              <span className="k">AI / ML</span>
              <h4>Foundation model training</h4>
              <p>
                Reserved H200 or H100 clusters on 400G InfiniBand, parallel filesystem for checkpoints, Slurm for queueing. Sized by parameter count and token budget.
              </p>
            </div>
            <div className="card">
              <span className="k">AI / ML</span>
              <h4>Inference serving</h4>
              <p>
                L40S or MI300X behind autoscaling endpoints, with scale-to-zero for spiky traffic and MIG partitioning when a whole card is too much.
              </p>
            </div>
            <div className="card">
              <span className="k">AI / ML</span>
              <h4>Fine-tuning and RAG</h4>
              <p>
                Single-node A100 or L40S pods, a vector database on NVMe block, and the dataset sitting in object storage in the same region.
              </p>
            </div>
            <div className="card">
              <span className="k">Media</span>
              <h4>Render and VFX</h4>
              <p>
                RTX 6000 Ada farms with a shared project filesystem, burst capacity for delivery weeks, and no egress bill on the final master.
              </p>
            </div>
            <div className="card">
              <span className="k">Engineering</span>
              <h4>Simulation and HPC</h4>
              <p>
                CFD, FEA and EDA on memory-heavy nodes with low-latency interconnect. Licence-server friendly, with dedicated hosts where the vendor demands it.
              </p>
            </div>
            <div className="card">
              <span className="k">Enterprise IT</span>
              <h4>Private cloud and DR</h4>
              <p>
                VMs, dedicated hosts and cross-site replication for teams leaving on-premise hardware without leaving the jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Sector Cards */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell railed">
          <div className="rail">
            <div className="rail-u">U26</div>
          </div>
          <div className="rbody stack-lg">
            <div className="stack-sm">
              <p className="eyebrow">By sector</p>
              <h2 className="sect">
                Where residency
                <br />
                is the point
              </h2>
              <p className="lede">
                Some industries can't put the question aside. For these, in-country infrastructure isn't a preference — it's the condition of doing the project at all.
              </p>
            </div>
            <div className="cards cards-3">
              <div className="card">
                <span className="k">BFSI</span>
                <h4>Banking and insurance</h4>
                <p>
                  RBI localisation for payment data, cyber-security framework alignment, and audit evidence your regulator will accept.
                </p>
              </div>
              <div className="card">
                <span className="k">Public sector</span>
                <h4>Government and PSU</h4>
                <p>
                  MeitY-empanelated capacity with GeM procurement, and deployment models that keep classified workloads on dedicated hardware.
                </p>
              </div>
              <div className="card">
                <span className="k">Healthcare</span>
                <h4>Providers and pharma</h4>
                <p>
                  DPDP-compliant handling of patient data, with imaging and genomics pipelines close to the storage that holds them.
                </p>
              </div>
              <div className="card">
                <span className="k">Manufacturing</span>
                <h4>Industrial and auto</h4>
                <p>Simulation clusters and edge-to-core pipelines that keep design IP inside the corporate boundary.</p>
              </div>
              <div className="card">
                <span className="k">Media</span>
                <h4>Studios and OTT</h4>
                <p>
                  Render capacity that scales for a delivery window and drops back afterwards, with masters that cost nothing to retrieve.
                </p>
              </div>
              <div className="card">
                <span className="k">Startups</span>
                <h4>AI-native companies</h4>
                <p>
                  Start on a card, grow to a cluster, and keep the same API. Credits and reserved pricing available through our accelerator programme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="cta pad">
        <div className="shell stack" style={{ textAlign: "center", maxWidth: "720px" }}>
          <h2 className="sect" style={{ fontSize: "clamp(1.9rem,4.6vw,3rem)" }}>
            Not sure which
            <br />
            shape you need?
          </h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Describe the workload. We'll size it, benchmark it and tell you honestly if we're the wrong fit.
          </p>
          <div className="btnrow" style={{ justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Start a conversation <span className="ar">↗</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
