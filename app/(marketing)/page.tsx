import React from "react";
import Link from "next/link";
import { Rack } from "../../components/marketing/Rack";
import { CodeBlock } from "../../components/marketing/CodeBlock";
import { ScrollReveal } from "../../components/marketing/ScrollReveal";

export default function HomePage() {
  return (
    <div className="page on">
      {/* Hero Section */}
      <div className="shell hero">
        <div className="herogrid">
          <div className="stack">
            <p className="eyebrow">
              <b>●</b> &nbsp;Mumbai · Pune · Chennai · Noida
            </p>
            <h1>
              GPU capacity
              <br />
              that lives
              <br />
              <em>in India</em>
            </h1>
            <p className="lede">
              Rent H200s, H100s and L40S by the second from our own Tier III floors. Your data never leaves the country, and you never pay to get it out.
            </p>
            <div className="btnrow">
              <Link href="/gpu" className="btn btn-primary">
                Deploy a pod <span className="ar">↗</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Reserve a cluster
              </Link>
            </div>
            <p className="note">Per-second billing · Zero egress · No commitment on on-demand</p>
          </div>

          {/* Live rack elevation component */}
          <div className="rackwrap">
            <Rack />
          </div>
        </div>
      </div>

      {/* Logo band */}
      <div className="band pad band-mt">
        <div className="shell stack">
          <p className="eyebrow">Running production workloads on MSL</p>
          <div className="logos">
            <span className="logo-t">Vantara AI</span>
            <span className="logo-t">Kettle Labs</span>
            <span className="logo-t">Northline Bank</span>
            <span className="logo-t">Praxis Health</span>
            <span className="logo-t">Orbit Studios</span>
            <span className="logo-t">Meridian Auto</span>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell railed">
          <div className="rail">
            <div className="rail-u">U42</div>
          </div>
          <div className="rbody stack-lg">
            <div className="stack-sm">
              <p className="eyebrow">What we rent</p>
              <h2 className="sect">
                Three things,
                <br />
                done properly
              </h2>
              <p className="lede">
                Everything else is an integration. We build, power and cool the machines ourselves, so the price you see is the cost of the metal plus our margin — not a chain of resellers.
              </p>
            </div>
            <div className="cards cards-3">
              <Link className="lcard" href="/gpu">
                <span className="go">↗</span>
                <span className="k">GPUaaS</span>
                <h4>GPU as a Service</h4>
                <p>
                  Bare-metal and containerised GPUs from a single card to a 512-GPU InfiniBand fabric. Spin up in about 40 seconds.
                </p>
                <span className="price">from ₹44 / GPU-hr</span>
              </Link>
              <Link className="lcard" href="/compute">
                <span className="go">↗</span>
                <span className="k">CaaS</span>
                <h4>Compute as a Service</h4>
                <p>
                  Virtual machines, dedicated hosts and autoscaling container pools on EPYC and Xeon, billed by the second.
                </p>
                <span className="price">from ₹1.10 / vCPU-hr</span>
              </Link>
              <Link className="lcard" href="/storage">
                <span className="go">↗</span>
                <span className="k">StaaS</span>
                <h4>Storage as a Service</h4>
                <p>
                  NVMe block, S3-compatible object and archive tiers on the same fabric as your compute. Egress is free.
                </p>
                <span className="price">from ₹0.40 / GB-month</span>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quickstart Section */}
      <ScrollReveal className="band pad">
        <div className="shell railed">
          <div className="rail">
            <div className="rail-u">U34</div>
          </div>
          <div className="rbody">
            <div className="split split-t">
              <div className="stack">
                <p className="eyebrow">From nothing to training</p>
                <h2 className="sect">
                  Four commands.
                  <br />
                  No sales call.
                </h2>
                <p className="lede">
                  Sign up with a company email, add a payment method, and the API is live. Enterprise procurement exists if you want it — it just isn't in the way.
                </p>
                <ul className="bullets">
                  <li>
                    <b>CLI, REST and Terraform</b> — the same resource model in all three
                  </li>
                  <li>
                    <b>OCI images</b> — bring your own container or start from our CUDA bases
                  </li>
                  <li>
                    <b>Persistent volumes</b> — attach the same NVMe volume to any pod in the region
                  </li>
                  <li>
                    <b>Idle timeout</b> — pods stop themselves so a forgotten notebook can't cost you a weekend
                  </li>
                </ul>
                <div className="btnrow">
                  <Link href="/docs" className="btn btn-ghost">
                    Read the quickstart <span className="ar">↗</span>
                  </Link>
                </div>
              </div>
              
              <CodeBlock
                title="bash — provision an H100 pod"
                codeText="msl pods create --gpu h100-sxm --count 8 --image msl/pytorch:2.4-cu124 --volume scratch:2Ti --region bom1"
                displayCode={
                  <>
                    <span className="c"># install and authenticate</span>
                    <br />
                    $ pip install <span className="s">msl-cli</span>
                    <br />
                    $ msl <span className="k">auth login</span>
                    <br />
                    <br />
                    <span className="c"># eight H100s, a 2 TiB scratch volume, Mumbai</span>
                    <br />
                    $ msl <span className="k">pods create</span> \<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;--gpu <span className="s">h100-sxm</span> --count <span className="s">8</span> \<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;--image <span className="s">msl/pytorch:2.4-cu124</span> \<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;--volume <span className="s">scratch:2Ti</span> --region <span className="s">bom1</span>
                    <br />
                    <br />
                    <span className="c">✓ pod-7fk29d running in 38s</span>
                    <br />
                    <span className="c">✓ ssh msl@7fk29d.bom1.mslproducts.com</span>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Ledger Section */}
      <ScrollReveal className="band pad">
        <div className="shell stack">
          <p className="eyebrow">The floor, in numbers</p>
          <div className="ledger">
            <div>
              <p className="v">
                <s>4</s> sites
              </p>
              <p className="l">Mumbai · Pune · Chennai · Noida</p>
            </div>
            <div>
              <p className="v">18 MW</p>
              <p className="l">Contracted IT load</p>
            </div>
            <div>
              <p className="v">1.38</p>
              <p className="l">Design PUE</p>
            </div>
            <div>
              <p className="v">99.99<s>%</s></p>
              <p className="l">Uptime commitment</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Why Section */}
      <ScrollReveal className="band pad">
        <div className="shell railed">
          <div className="rail">
            <div className="rail-u">U22</div>
          </div>
          <div className="rbody stack-lg">
            <div className="stack-sm">
              <p className="eyebrow">Why teams move here</p>
              <h2 className="sect">
                The boring
                <br />
                reasons matter
              </h2>
            </div>
            <div className="cards cards-2">
              <div className="card">
                <span className="k">Latency</span>
                <h4>Under 10 ms to your users</h4>
                <p>
                  Inference served from Mumbai reaches most of western India in single-digit milliseconds. A US region cannot do that, whatever the GPU costs there.
                </p>
              </div>
              <div className="card">
                <span className="k">Residency</span>
                <h4>Data stays where the law wants it</h4>
                <p>
                  RBI localisation, the DPDP Act and sectoral rules all point the same way. Our regions are in-country and audited, so residency stops being a design constraint.
                </p>
              </div>
              <div className="card">
                <span className="k">Egress</span>
                <h4>Nothing to pay on the way out</h4>
                <p>
                  Moving a checkpoint set out of a hyperscaler can cost more than training it. We don't meter egress at all — not on object storage, not on pods.
                </p>
              </div>
              <div className="card">
                <span className="k">Support</span>
                <h4>Engineers in your timezone</h4>
                <p>
                  The person who answers at 3 a.m. IST can see the rack, the switch and the PDU. Escalation is a corridor, not a ticket queue in another hemisphere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Workloads Section */}
      <ScrollReveal className="band pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Built for</p>
            <h2 className="sect">
              Workloads we
              <br />
              see every day
            </h2>
          </div>
          <div className="cards cards-4">
            <div className="card">
              <span className="k">01</span>
              <h4>Model training</h4>
              <p>Multi-node runs on 400G InfiniBand with NCCL tuned and checkpointing to local NVMe.</p>
            </div>
            <div className="card">
              <span className="k">02</span>
              <h4>Inference at scale</h4>
              <p>Autoscaling endpoints with scale-to-zero, so idle traffic costs nothing overnight.</p>
            </div>
            <div className="card">
              <span className="k">03</span>
              <h4>Fine-tuning</h4>
              <p>Single-node A100 and L40S pods for LoRA and full fine-tunes, priced for iteration.</p>
            </div>
            <div className="card">
              <span className="k">04</span>
              <h4>Render and simulation</h4>
              <p>RTX 6000 Ada farms for VFX, CAD and CFD, with shared project volumes.</p>
            </div>
          </div>
          <div className="btnrow">
            <Link href="/solutions" className="btn btn-ghost">
              See all workloads <span className="ar">↗</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal className="cta pad">
        <div className="shell stack" style={{ textAlign: "center", maxWidth: "760px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>
            Capacity is live now
          </p>
          <h2 className="sect" style={{ fontSize: "clamp(2rem,5vw,3.4rem)" }}>
            Start on one GPU.
            <br />
            Grow to a cluster.
          </h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            On-demand needs a card and an email. Reserved capacity needs a conversation — usually a short one.
          </p>
          <div className="btnrow" style={{ justifyContent: "center" }}>
            <Link href="/docs" className="btn btn-primary">
              Deploy a pod <span className="ar">↗</span>
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
