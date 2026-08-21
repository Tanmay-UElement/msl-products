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
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "150px" }}>
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
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      {/* Stat Tiles */}
      <div className="tiles grid grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
        <div className="tile px-6 py-6">
          <div className="l text-[13px]">Month to date</div>
          <div className="v text-[30px] my-1.5">{lakh(spend.used)}</div>
          <div className={`d text-[13px] ${pct > 85 ? "warn" : "up"}`}>{pct}% of {lakh(spend.cap)} cap</div>
        </div>
        <div className="tile px-6 py-6">
          <div className="l text-[13px]">Current burn</div>
          <div className="v text-[30px] my-1.5">{inr(currentBurn)}<s> /hr</s></div>
          <div className="d text-[13px]">{runningPods.length} pods + {clusters.length} clusters</div>
        </div>
        <div className="tile px-6 py-6">
          <div className="l text-[13px]">GPUs allocated</div>
          <div className="v text-[30px] my-1.5">107</div>
          <div className="d up text-[13px]">96% fleet utilisation</div>
        </div>
        <div className="tile px-6 py-6">
          <div className="l text-[13px]">Egress this month</div>
          <div className="v text-[30px] my-1.5">₹0</div>
          <div className="d text-[13px]">184 TB transferred</div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="cols grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-7 items-start">
        {/* Left main column */}
        <div>
          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">GPU-hours consumed · last 20 days</h3>
              <span className="mono" style={{ fontSize: "11px", color: "var(--ink-3)" }}>
                DAILY
              </span>
            </div>
            <div className="b px-6 py-5">
              <Sparkline data={hist} w={600} h={150} />
              <div className="legend text-sm mt-2">
                <span>02 Aug</span>
                <span>
                  <b>2,847</b> GPU-hours this period
                </span>
                <span>21 Aug</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Active workloads</h3>
              <button
                className="btn btn-ghost btn-sm px-3.5 py-2.5 text-sm"
                onClick={() => router.push("/console/pods")}
              >
                View all
              </button>
            </div>
            <div className="b flush">
              <div className="tw">
                <table className="text-[15px]">
                  <thead>
                    <tr>
                      <th className="px-4 py-3.5">Name</th>
                      <th className="px-4 py-3.5">Shape</th>
                      <th className="px-4 py-3.5">Region</th>
                      <th className="px-4 py-3.5">Uptime</th>
                      <th className="px-4 py-3.5">Rate</th>
                      <th className="px-4 py-3.5">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pods.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="n px-4 py-3.5">{p.name}</td>
                        <td className="m px-4 py-3.5">{p.gpu}</td>
                        <td className="m px-4 py-3.5">{p.region}</td>
                        <td className="m px-4 py-3.5">{p.up}</td>
                        <td className="r px-4 py-3.5">{p.rate ? `${inr(p.rate)}/hr` : "—"}</td>
                        <td className="px-4 py-3.5">
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
          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Spend cap</h3>
            </div>
            <div className="b px-6 py-5">
              <div className="meter">
                <i className={pct > 85 ? "warn" : ""} style={{ width: `${pct}%` }}></i>
              </div>
              <div className="legend text-sm mt-2">
                <span>
                  <b>{lakh(spend.used)}</b> used
                </span>
                <span>{lakh(spend.cap)} cap</span>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-3)", marginTop: "16px" }}>
                New workloads are blocked automatically at the cap. Running workloads are never killed by a budget rule.
              </p>
              <button
                className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
                style={{ marginTop: "16px" }}
                onClick={() => router.push("/console/billing")}
              >
                Adjust cap
              </button>
            </div>
          </div>

          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Reserved clusters</h3>
            </div>
            <div className="b flush">
              <div className="rows text-[15px] [&>div]:px-6 [&>div]:py-4">
                {clusters.map((c) => (
                  <div key={c.id}>
                    <div>
                      <div className="t">{c.name}</div>
                      <div className="s text-sm">
                        {c.gpus} × {c.gpu} · {c.region}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="r">{c.util}% util</div>
                      <div className="s text-sm" style={{ color: "var(--signal)" }}>
                        {c.health}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Open tickets</h3>
              <button
                className="btn btn-ghost btn-sm px-3.5 py-2.5 text-sm"
                onClick={() => router.push("/console/support")}
              >
                All
              </button>
            </div>
            <div className="b flush">
              <div className="rows text-[15px] [&>div]:px-6 [&>div]:py-4">
                {activeTickets.map((t) => (
                  <div key={t.id}>
                    <div>
                      <div className="t">{t.subject}</div>
                      <div className="s text-sm">
                        {t.id} · {t.sev} · {t.updated}
                      </div>
                    </div>
                    <span className="b-">{t.state}</span>
                  </div>
                ))}
                {activeTickets.length === 0 && (
                  <div className="empty" style={{ padding: "24px" }}>
                    <p style={{ margin: 0, color: "var(--ink-3)", fontSize: "14px" }}>No open support tickets.</p>
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