import React from "react";
import Link from "next/link";
import { CodeBlock } from "../../../components/marketing/CodeBlock";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function DocsPage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">Developers</p>
          <h1>Start here</h1>
          <p className="lede">
            Sign up, get a key, run one command. The full reference lives in the docs site; this is the shortest path from zero to a running GPU.
          </p>
        </div>
      </div>

      {/* Quickstart steps & code blocks */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Quickstart</p>
            <h2 className="sect">Zero to GPU</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="n">STEP 01</span>
              <h4>Create an account</h4>
              <p>
                A company email and a payment method. Verification is automatic for most domains; regulated sectors get a short KYC step instead.
              </p>
            </div>
            <div className="step">
              <span className="n">STEP 02</span>
              <h4>Issue an API key</h4>
              <p>Scoped to a project and a role. Keys can be rotated, expired and audited from the console or the API.</p>
            </div>
            <div className="step">
              <span className="n">STEP 03</span>
              <h4>Launch a pod</h4>
              <p>One command with a GPU type, a count and an image. SSH details and a Jupyter URL come back in the response.</p>
            </div>
          </div>
          
          <div className="split split-t">
            <CodeBlock
              title="rest — create a pod"
              codeText="curl -X POST https://api.mslproducts.com/v1/pods -H 'Authorization: Bearer $MSL_API_KEY'"
              displayCode={
                <>
                  $ curl -X POST <span className="s">https://api.mslproducts.com/v1/pods</span> \<br />
                  &nbsp;&nbsp;-H <span className="s">"Authorization: Bearer $MSL_API_KEY"</span> \<br />
                  &nbsp;&nbsp;-H <span className="s">"Content-Type: application/json"</span> \<br />
                  &nbsp;&nbsp;-d <span className="s">'{'{'}</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"gpu": "l40s",</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"count": 1,</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"image": "msl/vllm:0.6",</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"region": "pnq1",</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"idle_timeout_s": 900</span><br />
                  &nbsp;&nbsp;<span className="s">{'}'}</span><br />
                  <br />
                  <span className="c">{'{'} "id": "pod-3c9x1a", "state": "starting" {'}'}</span>
                </>
              }
            />
            
            <CodeBlock
              title="terraform — a reserved cluster"
              codeText='resource "msl_cluster" "training" { gpu_type = "h100-sxm" node_count = 8 }'
              displayCode={
                <>
                  <span className="k">resource</span> <span className="s">"msl_cluster"</span> <span className="s">"training"</span> {'{'}<br />
                  &nbsp;&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <span className="s">"llama-ft"</span><br />
                  &nbsp;&nbsp;region&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <span className="s">"bom1"</span><br />
                  &nbsp;&nbsp;gpu_type&nbsp;&nbsp;&nbsp;= <span className="s">"h100-sxm"</span><br />
                  &nbsp;&nbsp;node_count = <span className="k">8</span><br />
                  &nbsp;&nbsp;fabric&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <span className="s">"infiniband-400g"</span><br />
                  &nbsp;&nbsp;scheduler&nbsp;&nbsp;= <span className="s">"slurm"</span><br />
                  <br />
                  &nbsp;&nbsp;<span className="k">volume</span> {'{'}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;tier = <span className="s">"shared-fs"</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;size = <span className="s">"120Ti"</span><br />
                  &nbsp;&nbsp;{'}'}
                  <br />
                  {'}'}
                </>
              }
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Developers reference links */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Reference</p>
            <h2 className="sect">The rest of it</h2>
          </div>
          <div className="cards cards-3">
            <Link className="lcard" href="/docs">
              <span className="go">↗</span>
              <span className="k">API</span>
              <h4>REST reference</h4>
              <p>Every endpoint, with request and response schemas and a live sandbox.</p>
            </Link>
            <Link className="lcard" href="/docs">
              <span className="go">↗</span>
              <span className="k">SDK</span>
              <h4>Python and Go</h4>
              <p>Typed clients with retries, pagination and streaming logs built in.</p>
            </Link>
            <Link className="lcard" href="/docs">
              <span className="go">↗</span>
              <span className="k">IaC</span>
              <h4>Terraform provider</h4>
              <p>Pods, clusters, volumes, buckets, VPCs and IAM as code.</p>
            </Link>
            <Link className="lcard" href="/docs">
              <span className="go">↗</span>
              <span className="k">Images</span>
              <h4>Base containers</h4>
              <p>CUDA, ROCm, PyTorch, vLLM and TensorRT images, rebuilt weekly.</p>
            </Link>
            <Link className="lcard" href="/docs">
              <span className="go">↗</span>
              <span className="k">Guides</span>
              <h4>Migration guides</h4>
              <p>Moving from AWS, GCP, Azure and on-premise, with the gotchas named.</p>
            </Link>
            <Link className="lcard" href="/docs">
              <span className="go">↗</span>
              <span className="k">Status</span>
              <h4>Status and incidents</h4>
              <p>Per-region health, maintenance windows and full post-incident reports.</p>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
