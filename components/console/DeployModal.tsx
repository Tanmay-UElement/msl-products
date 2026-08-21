"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConsole } from "../../lib/ConsoleContext";

const GPUS = [
  { value: "319", label: "H200 SXM 141GB", rate: 319 },
  { value: "239", label: "H100 SXM 80GB", rate: 239 },
  { value: "199", label: "H100 PCIe 80GB", rate: 199 },
  { value: "269", label: "MI300X 192GB", rate: 269 },
  { value: "149", label: "A100 SXM 80GB", rate: 149 },
  { value: "99", label: "L40S 48GB", rate: 99 },
  { value: "79", label: "RTX 6000 Ada 48GB", rate: 79 },
  { value: "44", label: "RTX 4090 24GB", rate: 44 },
];

export const DeployModal: React.FC = () => {
  const router = useRouter();
  const { isDeployModalOpen, setDeployModalOpen, addPod } = useConsole();

  const [name, setName] = useState("");
  const [gpuIndex, setGpuIndex] = useState(0); // default to H200 SXM
  const [count, setCount] = useState(8);
  const [img, setImg] = useState("msl/pytorch:2.4-cu124");
  const [region, setRegion] = useState("BOM1");
  const [timeout, setTimeoutVal] = useState("Never");
  const [estimatedRate, setEstimatedRate] = useState(0);

  useEffect(() => {
    const gpuObj = GPUS[gpuIndex];
    if (gpuObj) {
      setEstimatedRate(gpuObj.rate * count);
    }
  }, [gpuIndex, count]);

  if (!isDeployModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gpuObj = GPUS[gpuIndex];
    if (!gpuObj) return;

    const shortGpuLabel = gpuObj.label.split(" ").slice(0, 2).join(" ");
    const podName = name.trim() || "pod-" + Math.random().toString(36).substring(2, 6);

    addPod({
      name: podName,
      gpu: `${count} × ${shortGpuLabel}`,
      region,
      rate: gpuObj.rate * count,
      img,
    });

    setDeployModalOpen(false);
    
    // Reset form
    setName("");
    setGpuIndex(0);
    setCount(8);
    setImg("msl/pytorch:2.4-cu124");
    setRegion("BOM1");
    setTimeoutVal("Never");

    // Route to pods page
    router.push("/console/pods");
  };

  return (
    <div className="modal on" onClick={() => setDeployModalOpen(false)}>
      <div
        className="modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fade .2s ease" }}
      >
        <div className="modal-h">
          <h3>Deploy a pod</h3>
          <button className="x" onClick={() => setDeployModalOpen(false)}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-b">
            <label className="field">
              <span className="lbl">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-training-run"
              />
            </label>
            
            <div className="f2">
              <label className="field">
                <span className="lbl">Accelerator</span>
                <select
                  value={gpuIndex}
                  onChange={(e) => setGpuIndex(parseInt(e.target.value, 10))}
                >
                  {GPUS.map((g, idx) => (
                    <option key={g.value} value={idx}>
                      {g.label} — ₹{g.rate}/hr
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span className="lbl">Count</span>
                <select
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </label>
            </div>
            
            <label className="field">
              <span className="lbl">Image</span>
              <select value={img} onChange={(e) => setImg(e.target.value)}>
                <option value="msl/pytorch:2.4-cu124">msl/pytorch:2.4-cu124</option>
                <option value="msl/vllm:0.6">msl/vllm:0.6</option>
                <option value="msl/jax:0.4-cu124">msl/jax:0.4-cu124</option>
                <option value="msl/tensorrt-llm:0.12">msl/tensorrt-llm:0.12</option>
                <option value="msl/render:ada">msl/render:ada</option>
                <option value="Custom image…">Custom image…</option>
              </select>
            </label>
            
            <div className="f2">
              <label className="field">
                <span className="lbl">Region</span>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="BOM1">BOM1</option>
                  <option value="PNQ1">PNQ1</option>
                  <option value="MAA1">MAA1</option>
                  <option value="DEL1">DEL1</option>
                </select>
              </label>
              <label className="field">
                <span className="lbl">Idle timeout</span>
                <select value={timeout} onChange={(e) => setTimeoutVal(e.target.value)}>
                  <option value="30 minutes">30 minutes</option>
                  <option value="2 hours">2 hours</option>
                  <option value="Never">Never</option>
                </select>
              </label>
            </div>
            
            <div className="panel" style={{ margin: 0 }}>
              <div className="b" style={{ padding: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="eyebrow">Estimated rate</span>
                  <span className="num" style={{ color: "var(--signal)", fontSize: "1.1rem" }}>
                    ₹{estimatedRate.toLocaleString("en-IN")}/hr
                  </span>
                </div>
                <div className="mono" style={{ fontSize: "10px", color: "var(--ink-3)", marginTop: "7px", letterSpacing: ".06em" }}>
                  BILLED PER SECOND · STOPS ON IDLE TIMEOUT · NO MINIMUM
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-f">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setDeployModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Deploy <span className="ar">↗</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
