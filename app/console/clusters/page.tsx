"use client";

import React from "react";
import Link from "next/link";
import { useConsole } from "../../../lib/ConsoleContext";

export default function ClustersPage() {
  const { clusters, toast } = useConsole();

  const handleReportDownload = () => {
    toast("Acceptance report queued for download");
  };

  const handleCapacityRequest = () => {
    toast("Capacity request ticket opened");
  };

  const NODES = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="billing-page-wide" style={{ maxWidth: 1800, width: "100%", margin: "0 auto" }}>
      {/* Scoped size/width overrides — matches BillingPage */}
      <style>{`
        .billing-page-wide {
          font-size: 15px;
        }
        .billing-page-wide .cols {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
          gap: 28px;
          align-items: start;
        }
        .billing-page-wide .panel {
          margin-bottom: 28px;
        }
        .billing-page-wide .panel .h {
          padding: 18px 24px;
        }
        .billing-page-wide .panel .h h3 {
          font-size: 17px;
        }
        .billing-page-wide .panel .b {
          padding: 22px 24px;
        }
        .billing-page-wide table {
          font-size: 15px;
        }
        .billing-page-wide table th,
        .billing-page-wide table td {
          padding: 14px 18px;
        }
        .billing-page-wide .btn {
          padding: 12px 18px;
          font-size: 15px;
        }
        .billing-page-wide .kv dt,
        .billing-page-wide .kv dd {
          font-size: 14px;
        }
        .billing-page-wide .b- {
          font-size: 13px;
          padding: 5px 10px;
        }

        @media (max-width: 1100px) {
          .billing-page-wide .cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Clusters List */}
      <div className="panel">
        <div className="h">
          <h3>{clusters.length} reserved clusters</h3>
          <button className="btn btn-primary btn-sm" onClick={handleCapacityRequest}>
            Request capacity <span className="ar">↗</span>
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Nodes</th>
                  <th>GPUs</th>
                  <th>Region</th>
                  <th>Term</th>
                  <th>Health</th>
                  <th>Utilisation</th>
                </tr>
              </thead>
              <tbody>
                {clusters.map((c) => (
                  <tr key={c.id}>
                    <td className="n">{c.name}</td>
                    <td className="m">{c.id}</td>
                    <td className="m">{c.nodes}</td>
                    <td className="m">
                      {c.gpus} × {c.gpu}
                    </td>
                    <td className="m">{c.region}</td>
                    <td className="m">{c.term}</td>
                    <td className="r" style={{ color: "var(--signal)" }}>
                      {c.health}
                    </td>
                    <td className="m">{c.util}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="cols">
        {/* Left column: Node Health */}
        <div className="panel">
          <div className="h">
            <h3>Node health · clu-9a4b2c</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Node</th>
                    <th>GPUs</th>
                    <th>DCGM</th>
                    <th>Inlet</th>
                    <th>Power</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {NODES.map((n) => {
                    const isDraining = n === 6;
                    return (
                      <tr key={n}>
                        <td className="n">node-{String(n).padStart(2, "0")}</td>
                        <td className="m">8 × H200</td>
                        <td className="r">{isDraining ? "Warn · ECC" : "Pass"}</td>
                        <td className="m">{21 + (n % 3)}°C</td>
                        <td className="m">{(9.8 + (n % 4) * 0.4).toFixed(1)} kW</td>
                        <td>
                          {isDraining ? (
                            <span className="b- b-prov">
                              <i></i>Draining
                            </span>
                          ) : (
                            <span className="b- b-run">
                              <i></i>Healthy
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Fabric specs */}
        <div className="panel">
          <div className="h">
            <h3>Fabric</h3>
          </div>
          <div className="b">
            <dl className="kv">
              <dt>Topology</dt>
              <dd>Rail-optimised fat tree, non-blocking</dd>
              <dt>Link rate</dt>
              <dd>400G InfiniBand NDR</dd>
              <dt>All-reduce busbw</dt>
              <dd>380.2 GB/s at 8 GB message</dd>
              <dt>Scaling 8→64</dt>
              <dd>94.1% efficiency</dd>
              <dt>Shared FS</dt>
              <dd>120 TiB, ~340 GB/s read</dd>
              <dt>Scheduler</dt>
              <dd>Slurm 24.05 with Pyxis</dd>
            </dl>
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: "16px" }}
              onClick={handleReportDownload}
            >
              Download acceptance report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}