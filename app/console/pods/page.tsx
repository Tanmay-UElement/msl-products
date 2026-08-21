"use client";

import React from "react";
import { useConsole } from "../../../lib/ConsoleContext";
import { StateBadge } from "../../../components/console/StateBadge";

const inr = (n: number) => {
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

export default function PodsPage() {
  const {
    pods,
    setDeployModalOpen,
    startPod,
    stopPod,
    toast,
  } = useConsole();

  const handleRefresh = () => {
    toast("Fleet refreshed");
  };

  return (
    <div>
      <div className="panel">
        <div className="h">
          <h3>{pods.length} pods</h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn btn-ghost btn-sm" onClick={handleRefresh}>
              Refresh
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setDeployModalOpen(true)}
            >
              Deploy a pod <span className="ar">↗</span>
            </button>
          </div>
        </div>

        <div className="b flush">
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Shape</th>
                  <th>Image</th>
                  <th>Region</th>
                  <th>Uptime</th>
                  <th>Rate</th>
                  <th>State</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pods.map((p) => (
                  <tr key={p.id}>
                    <td className="n">{p.name}</td>
                    <td className="m">{p.id}</td>
                    <td className="m">{p.gpu}</td>
                    <td className="m">{p.img}</td>
                    <td className="m">{p.region}</td>
                    <td className="m">{p.up}</td>
                    <td className="r">{p.rate ? `${inr(p.rate)}/hr` : "—"}</td>
                    <td>
                      <StateBadge state={p.state} />
                    </td>
                    <td className="act">
                      {p.state === "running" ? (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => stopPod(p.id)}
                        >
                          Stop
                        </button>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => startPod(p.id)}
                          disabled={p.state === "provisioning"}
                        >
                          Start
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="h">
          <h3>Do it from the terminal instead</h3>
        </div>
        <div className="b">
          <div className="code">
            $ msl <span className="k">pods create</span> --gpu <span className="s">h100-sxm</span> --count <span className="s">8</span> \<br />
            &nbsp;&nbsp;&nbsp;&nbsp;--image <span className="s">msl/pytorch:2.4-cu124</span> --region <span className="s">bom1</span>
            <br />
            <br />
            <span className="c">✓ pod-7fk29d running in 38s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
