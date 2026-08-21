import React from "react";
import Link from "next/link";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function PlatformPage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">
            Platform as a Service &nbsp;·&nbsp; <b>PaaS</b>
          </p>
          <h1>
            The layer
            <br />
            above the
            <br />
            metal
          </h1>
          <p className="lede">
            Managed Kubernetes, serverless inference endpoints, a model registry and a job scheduler. Run them, or don't — the infrastructure underneath works either way.
          </p>
          <div className="btnrow">
            <Link href="/docs" className="btn btn-primary">
              Platform docs <span className="ar">↗</span>
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Book a walkthrough
            </Link>
          </div>
        </div>
      </div>

      {/* Architecture SVG diagram */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell">
          <div className="stack-sm" style={{ marginBottom: "40px" }}>
            <p className="eyebrow">Architecture</p>
            <h2 className="sect">
              How the stack
              <br />
              fits together
            </h2>
          </div>
          <div className="notch" style={{ padding: "34px 26px" }}>
            <svg
              viewBox="0 0 900 340"
              style={{ width: "100%", height: "auto" }}
              role="img"
              aria-label="MSL platform stack: applications on managed services, on compute, GPU and storage, on the datacenter fabric"
            >
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2E6BFF" stopOpacity=".22" />
                  <stop offset="1" stopColor="#4DE1FF" stopOpacity=".07" />
                </linearGradient>
              </defs>
              <g fontFamily="var(--mono)" fontSize="11" letterSpacing="1.4">
                {/* layer 1 */}
                <rect x="20" y="16" width="860" height="52" fill="none" stroke="rgba(255,255,255,.14)" />
                <text x="36" y="38" fill="#63718A">
                  YOUR WORKLOAD
                </text>
                <text x="36" y="56" fill="#EDF1F7" fontSize="13">
                  Training jobs · Inference services · Databases · Pipelines
                </text>
                {/* layer 2 */}
                <rect x="20" y="84" width="860" height="76" fill="url(#lg)" stroke="rgba(46,107,255,.4)" />
                <text x="36" y="106" fill="#4DE1FF">
                  MSL PLATFORM SERVICES
                </text>
                <g fill="#EDF1F7" fontSize="12">
                  <rect x="36" y="118" width="180" height="28" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" />
                  <text x="50" y="136">
                    Managed Kubernetes
                  </text>
                  <rect x="228" y="118" width="180" height="28" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" />
                  <text x="242" y="136">
                    Serverless endpoints
                  </text>
                  <rect x="420" y="118" width="180" height="28" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" />
                  <text x="434" y="136">
                    Model registry
                  </text>
                  <rect x="612" y="118" width="232" height="28" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" />
                  <text x="626" y="136">
                    Batch scheduler (Slurm)
                  </text>
                </g>
                {/* layer 3 */}
                <rect x="20" y="176" width="278" height="72" fill="none" stroke="rgba(255,255,255,.14)" />
                <text x="36" y="198" fill="#63718A">
                  GPUaaS
                </text>
                <text x="36" y="222" fill="#EDF1F7" fontSize="13">
                  H200 · H100 · L40S · MI300X
                </text>
                <text x="36" y="240" fill="#63718A" fontSize="10">
                  PODS / METAL / CLUSTERS
                </text>

                <rect x="311" y="176" width="278" height="72" fill="none" stroke="rgba(255,255,255,.14)" />
                <text x="327" y="198" fill="#63718A">
                  CaaS
                </text>
                <text x="327" y="222" fill="#EDF1F7" fontSize="13">
                  EPYC 9004 · Xeon 6
                </text>
                <text x="327" y="240" fill="#63718A" fontSize="10">
                  VM / DEDICATED / METAL
                </text>

                <rect x="602" y="176" width="278" height="72" fill="none" stroke="rgba(255,255,255,.14)" />
                <text x="618" y="198" fill="#63718A">
                  StaaS
                </text>
                <text x="618" y="222" fill="#EDF1F7" fontSize="13">
                  Block · Object · Archive · FS
                </text>
                <text x="618" y="240" fill="#63718A" fontSize="10">
                  ZERO EGRESS
                </text>
                {/* connectors */}
                <g stroke="rgba(46,107,255,.5)" strokeWidth="1">
                  <path d="M159 176 L159 160" />
                  <path d="M450 176 L450 160" />
                  <path d="M741 176 L741 160" />
                  <path d="M450 84 L450 68" />
                </g>
                {/* layer 4 */}
                <rect x="20" y="264" width="860" height="58" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.14)" />
                <text x="36" y="286" fill="#63718A">
                  MSL DATACENTER FABRIC
                </text>
                <text x="36" y="306" fill="#EDF1F7" fontSize="13">
                  400G InfiniBand · 100G Ethernet · Tier III power &amp; cooling · BOM1 PNQ1 MAA1 DEL1
                </text>
                <g stroke="rgba(255,255,255,.14)">
                  <path d="M159 264 L159 248" />
                  <path d="M450 264 L450 248" />
                  <path d="M741 264 L741 248" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </ScrollReveal>

      {/* Managed Services */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Managed services</p>
            <h2 className="sect">
              Things you'd
              <br />
              rather not run
            </h2>
          </div>
          <div className="cards cards-2">
            <div className="card">
              <span className="k">MSL Kubernetes</span>
              <h4>Conformant, GPU-aware</h4>
              <p>
                Upstream Kubernetes with the NVIDIA operator, MIG partitioning, cluster autoscaling and the CSI drivers for our block and file tiers already wired in. We patch the control plane; you keep the kubeconfig.
              </p>
            </div>
            <div className="card">
              <span className="k">Endpoints</span>
              <h4>Serverless inference</h4>
              <p>
                Push a container, get an HTTPS endpoint that scales from zero to hundreds of replicas on queue depth. Cold start on a warm pool is under four seconds, and idle costs nothing.
              </p>
            </div>
            <div className="card">
              <span className="k">Registry</span>
              <h4>Models and images</h4>
              <p>
                An OCI registry and a versioned model store in-region, so pulls happen over the internal fabric instead of the public internet. Signing and vulnerability scanning included.
              </p>
            </div>
            <div className="card">
              <span className="k">Scheduler</span>
              <h4>Batch and queues</h4>
              <p>
                Slurm or Kueue on your reserved capacity, with fair-share across teams, priority pre-emption and per-project accounting that maps to your chargeback model.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Typical Onboarding */}
      <ScrollReveal className="band pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Getting on</p>
            <h2 className="sect">
              A typical
              <br />
              onboarding
            </h2>
            <p className="lede">This is the actual sequence, not a marketing funnel. Most teams are running real work in week two.</p>
          </div>
          <div className="steps">
            <div className="step">
              <span className="n">STEP 01</span>
              <h4>Scoping</h4>
              <p>
                An engineer walks through your workload, current spend and residency constraints. You get a sizing and a written quote, usually within three working days.
              </p>
            </div>
            <div className="step">
              <span className="n">STEP 02</span>
              <h4>Landing zone</h4>
              <p>
                We build the VPC, projects, IAM roles and quotas, connect your SSO, and run a benchmark on the exact shape you'll be using.
              </p>
            </div>
            <div className="step">
              <span className="n">STEP 03</span>
              <h4>Cutover</h4>
              <p>
                Data seeding over direct connect or a shipped appliance, a parallel run against your current provider, then a scheduled switch.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
