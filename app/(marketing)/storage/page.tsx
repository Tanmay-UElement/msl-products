import React from "react";
import Link from "next/link";
import { CodeBlock } from "../../../components/marketing/CodeBlock";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function StoragePage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero px-5 sm:px-8">
        <div className="stack w-full max-w-[820px]">
          <p className="eyebrow">
            Storage as a Service &nbsp;·&nbsp; <b>StaaS</b>
          </p>
          <h1>
            Free to
            <br className="hidden sm:inline" />
            <span className="sm:hidden"> </span>
            read. Free
            <br className="hidden sm:inline" />
            <span className="sm:hidden"> </span>
            to leave.
          </h1>
          <p className="lede">
            Three tiers on one namespace, sitting on the same fabric as your GPUs. We don't charge for egress, requests or retrieval — the price on the tier is the price you pay.
          </p>
          <div className="btnrow flex flex-wrap gap-3 sm:flex-nowrap">
            <Link href="/pricing" className="btn btn-primary w-full justify-center text-center sm:w-auto">
              See storage pricing <span className="ar">↗</span>
            </Link>
            <Link href="/docs" className="btn btn-ghost w-full justify-center text-center sm:w-auto">
              S3 API reference
            </Link>
          </div>
        </div>
      </div>

      {/* Tiers Table */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Tiers</p>
            <h2 className="sect">Hot, warm, cold</h2>
          </div>
          <div className="tblwrap overflow-x-auto">
            <table className="min-w-[640px] w-full">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Media</th>
                  <th>Access</th>
                  <th>Durability</th>
                  <th>Typical use</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name">Block NVMe</td>
                  <td className="dim">TLC NVMe, triple replica</td>
                  <td className="dim">&lt; 200 µs</td>
                  <td className="dim">11 nines</td>
                  <td>Databases, scratch, checkpoints</td>
                  <td className="rate">₹8.00 /GB-mo</td>
                </tr>
                <tr>
                  <td className="name">Object Standard</td>
                  <td className="dim">NVMe + HDD, EC 8+3</td>
                  <td className="dim">&lt; 25 ms</td>
                  <td className="dim">11 nines</td>
                  <td>Datasets, model registry, media</td>
                  <td className="rate">₹1.60 /GB-mo</td>
                </tr>
                <tr>
                  <td className="name">Object Archive</td>
                  <td className="dim">HDD, EC 12+4</td>
                  <td className="dim">minutes</td>
                  <td className="dim">11 nines</td>
                  <td>Compliance retention, cold backup</td>
                  <td className="rate">₹0.40 /GB-mo</td>
                </tr>
                <tr>
                  <td className="name">Shared filesystem</td>
                  <td className="dim">Parallel NVMe, NFS/Lustre</td>
                  <td className="dim">&lt; 400 µs</td>
                  <td className="dim">11 nines</td>
                  <td>Multi-node training, render farms</td>
                  <td className="rate">₹6.20 /GB-mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="note">
            No charge for egress, PUT, GET, LIST or early deletion. Cross-region replication billed at the destination tier only.
          </p>
        </div>
      </ScrollReveal>

      {/* Compatibility split */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell split split-t grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="stack">
            <p className="eyebrow">Compatibility</p>
            <h2 className="sect">
              It speaks S3,
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              so nothing
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              changes
            </h2>
            <p className="lede">
              Point your existing SDK at a new endpoint. Signature v4, multipart, versioning, lifecycle rules, presigned URLs and object lock all behave the way your code already expects.
            </p>
            <div className="chips flex flex-wrap gap-2">
              <span className="chip">boto3</span>
              <span className="chip">aws-cli</span>
              <span className="chip">rclone</span>
              <span className="chip">MinIO SDK</span>
              <span className="chip">s3fs</span>
              <span className="chip">Terraform</span>
              <span className="chip">Velero</span>
              <span className="chip">DVC</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <CodeBlock
              title="python — same code, new endpoint"
              codeText="s3 = boto3.client('s3', endpoint_url='https://s3.bom1.mslproducts.com')"
              displayCode={
                <>
                  <span className="k">import</span> boto3
                  <br />
                  <br />
                  s3 = boto3.<span className="k">client</span>(
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"s3"</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;endpoint_url=<span className="s">"https://s3.bom1.mslproducts.com"</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;region_name=<span className="s">"bom1"</span>,
                  <br />
                  )
                  <br />
                  <br />
                  s3.<span className="k">upload_file</span>(<span className="s">"ckpt-4200.safetensors"</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"runs"</span>, <span className="s">"llama-ft/ckpt-4200"</span>)
                  <br />
                  <br />
                  <span className="c"># 41.2 GB in 3m12s · egress charge ₹0.00</span>
                </>
              }
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Protection Cards */}
      <ScrollReveal className="band pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Protection</p>
            <h2 className="sect">
              Assume the
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              worst happens
            </h2>
          </div>
          <div className="cards cards-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <span className="k">Encryption</span>
              <h4>AES-256 at rest</h4>
              <p>Per-bucket keys, or bring your own through our KMS. TLS 1.3 in flight, always.</p>
            </div>
            <div className="card">
              <span className="k">Immutability</span>
              <h4>Object lock</h4>
              <p>WORM retention with legal hold, for auditors who need writes to be irreversible.</p>
            </div>
            <div className="card">
              <span className="k">Replication</span>
              <h4>Cross-site copies</h4>
              <p>Asynchronous replication between Mumbai, Pune and Chennai on a bucket rule.</p>
            </div>
            <div className="card">
              <span className="k">Recovery</span>
              <h4>Tested restores</h4>
              <p>Quarterly restore drills with a written report, because an untested backup isn't one.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}