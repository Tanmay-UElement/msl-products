import React from "react";
import Link from "next/link";
import { CodeBlock } from "../../../components/marketing/CodeBlock";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function GpuPage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">
            GPU as a Service &nbsp;·&nbsp; <b>GPUaaS</b>
          </p>
          <h1>
            One card or
            <br />
            five hundred
          </h1>
          <p className="lede">
            Containerised pods for iteration, bare metal for production, and interconnected clusters when a single node stops being enough. Same catalogue, same console, same bill.
          </p>
          <div className="btnrow">
            <Link href="/pricing" className="btn btn-primary">
              See GPU pricing <span className="ar">↗</span>
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Reserve capacity
            </Link>
          </div>
        </div>
      </div>

      {/* Catalogue Table */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Catalogue</p>
            <h2 className="sect">Available today</h2>
          </div>
          <div className="tblwrap">
            <table>
              <thead>
                <tr>
                  <th>Accelerator</th>
                  <th>Memory</th>
                  <th>Interconnect</th>
                  <th>Best for</th>
                  <th>On-demand</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name">NVIDIA H200 SXM</td>
                  <td className="dim">141 GB HBM3e</td>
                  <td className="dim">NVLink + 400G IB</td>
                  <td>Frontier-scale training</td>
                  <td className="rate">₹319 /hr</td>
                  <td className="dim">BOM1 · PNQ1</td>
                </tr>
                <tr>
                  <td className="name">NVIDIA H100 SXM</td>
                  <td className="dim">80 GB HBM3</td>
                  <td className="dim">NVLink + 400G IB</td>
                  <td>Multi-node training</td>
                  <td className="rate">₹239 /hr</td>
                  <td className="dim">BOM1 · PNQ1 · MAA1</td>
                </tr>
                <tr>
                  <td className="name">NVIDIA H100 PCIe</td>
                  <td className="dim">80 GB HBM3</td>
                  <td className="dim">PCIe Gen5</td>
                  <td>Single-node training</td>
                  <td className="rate">₹199 /hr</td>
                  <td className="dim">All regions</td>
                </tr>
                <tr>
                  <td className="name">NVIDIA A100 SXM</td>
                  <td className="dim">80 GB HBM2e</td>
                  <td className="dim">NVLink + 200G IB</td>
                  <td>Fine-tuning, HPC</td>
                  <td className="rate">₹149 /hr</td>
                  <td className="dim">All regions</td>
                </tr>
                <tr>
                  <td className="name">NVIDIA L40S</td>
                  <td className="dim">48 GB GDDR6</td>
                  <td className="dim">PCIe Gen4</td>
                  <td>Inference, render</td>
                  <td className="rate">₹99 /hr</td>
                  <td className="dim">All regions</td>
                </tr>
                <tr>
                  <td className="name">NVIDIA RTX 6000 Ada</td>
                  <td className="dim">48 GB GDDR6</td>
                  <td className="dim">PCIe Gen4</td>
                  <td>Visualisation, CAD</td>
                  <td className="rate">₹79 /hr</td>
                  <td className="dim">PNQ1 · DEL1</td>
                </tr>
                <tr>
                  <td className="name">NVIDIA RTX 4090</td>
                  <td className="dim">24 GB GDDR6X</td>
                  <td className="dim">PCIe Gen4</td>
                  <td>Development, LoRA</td>
                  <td className="rate">₹44 /hr</td>
                  <td className="dim">PNQ1 · DEL1</td>
                </tr>
                <tr>
                  <td className="name">AMD Instinct MI300X</td>
                  <td className="dim">192 GB HBM3</td>
                  <td className="dim">Infinity Fabric</td>
                  <td>Large-context inference</td>
                  <td className="rate">₹269 /hr</td>
                  <td className="dim">BOM1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="note">
            Rates are per GPU-hour, billed per second, exclusive of GST. Reserved and committed terms are lower — see pricing.
          </p>
        </div>
      </ScrollReveal>

      {/* Three shapes */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell railed">
          <div className="rail">
            <div className="rail-u">U38</div>
          </div>
          <div className="rbody stack-lg">
            <div className="stack-sm">
              <p className="eyebrow">Three shapes</p>
              <h2 className="sect">
                Pick how close
                <br />
                to the metal
              </h2>
            </div>
            <div className="cards cards-3">
              <div className="card">
                <span className="k">Pods</span>
                <h4>Containerised</h4>
                <p>
                  Your image, our scheduler. Starts in about 40 seconds, stops when idle, and bills only while running. This is where most teams begin.
                </p>
              </div>
              <div className="card">
                <span className="k">Bare metal</span>
                <h4>Whole machines</h4>
                <p>
                  Root on the host, no hypervisor tax, your own drivers and kernel. Monthly or longer, with the NICs and NVMe wired the way you specify.
                </p>
              </div>
              <div className="card">
                <span className="k">Clusters</span>
                <h4>Interconnected</h4>
                <p>
                  16 to 512 GPUs on non-blocking 400G InfiniBand, delivered as a named environment with Slurm or Kubernetes already running.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Cluster Engineering */}
      <ScrollReveal className="band pad">
        <div className="shell split split-t">
          <div className="stack">
            <p className="eyebrow">Cluster engineering</p>
            <h2 className="sect">
              Fabric that
              <br />
              actually scales
            </h2>
            <p className="lede">
              A rack of H100s is not a cluster. Getting linear scaling out of sixty-four nodes is a topology and tuning problem, and it is the part we do for you before handover.
            </p>
            <ul className="bullets">
              <li>
                <b>Rail-optimised fat tree</b> — non-blocking, with SHARP in-network reduction on supported fabrics
              </li>
              <li>
                <b>NCCL tuned per topology</b> — we hand you the benchmark numbers, not a brochure
              </li>
              <li>
                <b>GPUDirect Storage</b> — checkpoints stream to NVMe without a bounce through host memory
              </li>
              <li>
                <b>Health-checked nodes</b> — every node passes a burn-in and DCGM suite before it enters your pool
              </li>
              <li>
                <b>Slurm or Kubernetes</b> — your choice, configured, with the operator stack in place
              </li>
            </ul>
          </div>
          
          <div className="stack">
            <CodeBlock
              title="nccl-tests — 64× H100 SXM, BOM1"
              codeText="all_reduce_perf -b 8 -e 8G -f 2 -g 8"
              displayCode={
                <>
                  <span className="c"># all_reduce_perf -b 8 -e 8G -f 2 -g 8</span>
                  <br />
                  <br />
                  size(B)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time(us)&nbsp;&nbsp;&nbsp;busbw(GB/s)
                  <br />
                  <span className="k">1073741824</span>&nbsp;&nbsp;&nbsp;4812.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">371.4</span>
                  <br />
                  <span className="k">2147483648</span>&nbsp;&nbsp;&nbsp;9503.7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">376.1</span>
                  <br />
                  <span className="k">4294967296</span>&nbsp;&nbsp;18871.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">378.9</span>
                  <br />
                  <span className="k">8589934592</span>&nbsp;&nbsp;37622.8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">380.2</span>
                  <br />
                  <br />
                  <span className="c"># scaling efficiency 8 → 64 nodes: 94.1%</span>
                </>
              }
            />
            <p className="note">Representative figures from an acceptance run. We publish yours before you sign anything.</p>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="cta pad">
        <div className="shell stack" style={{ textAlign: "center", maxWidth: "720px" }}>
          <h2 className="sect" style={{ fontSize: "clamp(1.9rem,4.6vw,3rem)" }}>
            Need more than
            <br />
            a single node?
          </h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            Tell us the model size and the deadline. We'll come back with a topology, a price and a date.
          </p>
          <div className="btnrow" style={{ justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">
              Talk to capacity planning <span className="ar">↗</span>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
