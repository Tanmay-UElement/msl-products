"use client";

import React from "react";
import Link from "next/navigation";
import { useRouter } from "next/navigation";
import { useConsole } from "../../lib/ConsoleContext";
import { StateBadge } from "../../components/console/StateBadge";

// Stat formatting helpers
const inr = (n: number) => {
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

const lakh = (n: number) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return inr(n);
};

const Sparkline: React.FC<{ data: number[]; w: number; h: number }> = ({ data, w, h }) => {
  const max = Math.max(...data);
  const min = 0;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const area = `M0,${h} L${pts.join(" L")} L${w},${h} Z`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "120px" }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E6BFF" stopOpacity=".35" />
          <stop offset="1" stopColor="#2E6BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sg)" />
      <polyline points={pts.join(" ")} fill="none" stroke="#4DE1FF" strokeWidth="1.4" />
    </svg>
  );
};

export default function ConsoleOverviewPage() {
  const router = useRouter();
  const { spend, pods, clusters, tickets } = useConsole();

  const runningPods = pods.filter((p) => p.state === "running");
  const currentBurn = runningPods.reduce((acc, p) => acc + p.rate, 0);
  const pct = Math.round((spend.used / spend.cap) * 100);
  const hist = [42, 51, 48, 63, 58, 71, 69, 84, 78, 92, 88, 96, 91, 103, 99, 112, 108, 121, 117, 128];

  const activeTickets = tickets.filter((t) => t.state !== "Resolved");

  return (
    <div>
      {/* Stat Tiles */}
      <div className="tiles">
        <div className="tile">
          <div className="l">Month to date</div>
          <div className="v">{lakh(spend.used)}</div>
          <div className={`d ${pct > 85 ? "warn" : "up"}`}>{pct}% of {lakh(spend.cap)} cap</div>
        </div>
        <div className="tile">
          <div className="l">Current burn</div>
          <div className="v">{inr(currentBurn)}<s> /hr</s></div>
          <div className="d">{runningPods.length} pods + {clusters.length} clusters</div>
        </div>
        <div className="tile">
          <div className="l">GPUs allocated</div>
          <div className="v">107</div>
          <div className="d up">96% fleet utilisation</div>
        </div>
        <div className="tile">
          <div className="l">Egress this month</div>
          <div className="v">₹0</div>
          <div className="d">184 TB transferred</div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="cols">
        {/* Left main column */}
        <div>
          <div className="panel">
            <div className="h">
              <h3>GPU-hours consumed · last 20 days</h3>
              <span className="mono" style={{ fontSize: "10px", color: "var(--ink-3)" }}>
                DAILY
              </span>
            </div>
            <div className="b">
              <Sparkline data={hist} w={600} h={120} />
              <div className="legend">
                <span>02 Aug</span>
                <span>
                  <b>2,847</b> GPU-hours this period
                </span>
                <span>21 Aug</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h">
              <h3>Active workloads</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => router.push("/console/pods")}
              >
                View all
              </button>
            </div>
            <div className="b flush">
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Shape</th>
                      <th>Region</th>
                      <th>Uptime</th>
                      <th>Rate</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pods.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="n">{p.name}</td>
                        <td className="m">{p.gpu}</td>
                        <td className="m">{p.region}</td>
                        <td className="m">{p.up}</td>
                        <td className="r">{p.rate ? `${inr(p.rate)}/hr` : "—"}</td>
                        <td>
                          <StateBadge state={p.state} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right side column */}
        <div>
          <div className="panel">
            <div className="h">
              <h3>Spend cap</h3>
            </div>
            <div className="b">
              <div className="meter">
                <i className={pct > 85 ? "warn" : ""} style={{ width: `${pct}%` }}></i>
              </div>
              <div className="legend">
                <span>
                  <b>{lakh(spend.used)}</b> used
                </span>
                <span>{lakh(spend.cap)} cap</span>
              </div>
              <p style={{ fontSize: ".8125rem", color: "var(--ink-3)", marginTop: "14px" }}>
                New workloads are blocked automatically at the cap. Running workloads are never killed by a budget rule.
              </p>
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginTop: "14px" }}
                onClick={() => router.push("/console/billing")}
              >
                Adjust cap
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="h">
              <h3>Reserved clusters</h3>
            </div>
            <div className="b flush">
              <div className="rows">
                {clusters.map((c) => (
                  <div key={c.id}>
                    <div>
                      <div className="t">{c.name}</div>
                      <div className="s">
                        {c.gpus} × {c.gpu} · {c.region}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="r">{c.util}% util</div>
                      <div className="s" style={{ color: "var(--signal)" }}>
                        {c.health}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h">
              <h3>Open tickets</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => router.push("/console/support")}
              >
                All
              </button>
            </div>
            <div className="b flush">
              <div className="rows">
                {activeTickets.map((t) => (
                  <div key={t.id}>
                    <div>
                      <div className="t">{t.subject}</div>
                      <div className="s">
                        {t.id} · {t.sev} · {t.updated}
                      </div>
                    </div>
                    <span className="b-">{t.state}</span>
                  </div>
                ))}
                {activeTickets.length === 0 && (
                  <div className="empty" style={{ padding: "20px" }}>
                    <p style={{ margin: 0, color: "var(--ink-3)", fontSize: "12px" }}>No open support tickets.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
