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
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      <div className="panel mb-7">
        <div className="h px-6 py-4">
          <h3 className="text-[17px]">{pods.length} pods</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-ghost btn-sm px-4 py-3 text-[15px]" onClick={handleRefresh}>
              Refresh
            </button>
            <button
              className="btn btn-primary btn-sm px-4 py-3 text-[15px]"
              onClick={() => setDeployModalOpen(true)}
            >
              Deploy a pod <span className="ar">↗</span>
            </button>
          </div>
        </div>

        <div className="b flush">
          <div className="tw">
            <table className="text-[15px]">
              <thead>
                <tr>
                  <th className="px-4 py-3.5">Name</th>
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Shape</th>
                  <th className="px-4 py-3.5">Image</th>
                  <th className="px-4 py-3.5">Region</th>
                  <th className="px-4 py-3.5">Uptime</th>
                  <th className="px-4 py-3.5">Rate</th>
                  <th className="px-4 py-3.5">State</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {pods.map((p) => (
                  <tr key={p.id}>
                    <td className="n px-4 py-3.5">{p.name}</td>
                    <td className="m px-4 py-3.5">{p.id}</td>
                    <td className="m px-4 py-3.5">{p.gpu}</td>
                    <td className="m px-4 py-3.5">{p.img}</td>
                    <td className="m px-4 py-3.5">{p.region}</td>
                    <td className="m px-4 py-3.5">{p.up}</td>
                    <td className="r px-4 py-3.5">{p.rate ? `${inr(p.rate)}/hr` : "—"}</td>
                    <td className="px-4 py-3.5">
                      <StateBadge state={p.state} />
                    </td>
                    <td className="act px-4 py-3.5">
                      {p.state === "running" ? (
                        <button
                          className="btn btn-ghost btn-sm px-3.5 py-2.5 text-sm"
                          onClick={() => stopPod(p.id)}
                        >
                          Stop
                        </button>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm px-3.5 py-2.5 text-sm"
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
        <div className="h px-6 py-4">
          <h3 className="text-[17px]">Do it from the terminal instead</h3>
        </div>
        <div className="b px-6 py-5">
          <div className="code text-[15px] leading-7 px-5 py-4">
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