"use client";

import React, { useEffect, useState } from "react";

interface SledData {
  u: string;
  model: string;
  fill: number;
  prov: boolean;
  statusText: string;
  statusClass: string;
}

const SLEDS: SledData[] = [
  { u: "U42", model: "8× H200 SXM", fill: 8, prov: false, statusText: "Allocated", statusClass: "live" },
  { u: "U38", model: "8× H200 SXM", fill: 8, prov: false, statusText: "Allocated", statusClass: "live" },
  { u: "U34", model: "8× H100 SXM", fill: 6, prov: false, statusText: "Allocated", statusClass: "live" },
  { u: "U30", model: "8× H100 SXM", fill: 0, prov: true, statusText: "Provisioning", statusClass: "prov" },
  { u: "U26", model: "8× L40S", fill: 3, prov: false, statusText: "5 free", statusClass: "free" },
  { u: "U22", model: "8× A100 80GB", fill: 8, prov: false, statusText: "Allocated", statusClass: "live" },
  { u: "U18", model: "Storage — 720 TB NVMe", fill: 7, prov: false, statusText: "Attached", statusClass: "live" },
  { u: "U14", model: "8× RTX 6000 Ada", fill: 0, prov: false, statusText: "8 free", statusClass: "free" },
];

export const Rack: React.FC = () => {
  const [slotStatus, setSlotStatus] = useState<string[][]>(
    Array(SLEDS.length).fill(null).map(() => Array(8).fill("off"))
  );

  useEffect(() => {
    SLEDS.forEach((sled, ri) => {
      if (sled.fill > 0) {
        for (let i = 0; i < sled.fill; i++) {
          setTimeout(() => {
            setSlotStatus((prev) => {
              const updated = prev.map((row) => [...row]);
              if (updated[ri]) {
                updated[ri][i] = "on";
              }
              return updated;
            });
          }, 260 + ri * 90 + i * 45);
        }
      }
      if (sled.prov) {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            setSlotStatus((prev) => {
              const updated = prev.map((row) => [...row]);
              if (updated[ri]) {
                updated[ri][i] = "warm";
              }
              return updated;
            });
          }, 1400 + i * 130);
        }
      }
    });
  }, []);

  return (
    <div className="rack" id="rack">
      <div className="rack-head">
        <span>Rack BOM1-A14 · Mumbai</span>
        <span className="lv">
          <i className="pulse"></i> Live
        </span>
      </div>
      {SLEDS.map((sled, ri) => (
        <div className="sled" key={sled.u}>
          <span className="u">{sled.u}</span>
          <span className="model">{sled.model}</span>
          <span className="slots">
            {slotStatus[ri]?.map((status, i) => (
              <i key={i} className={`slot ${status !== "off" ? status : ""}`}></i>
            ))}
          </span>
          <span className={`st ${sled.statusClass}`}>{sled.statusText}</span>
        </div>
      ))}
      <div className="rack-foot">
        <span>
          Draw <b className="mono" style={{ color: "var(--thermal)" }}>31.4 kW</b> / 44 kW
        </span>
        <span>Inlet 22°C</span>
        <span>PUE 1.38</span>
      </div>
    </div>
  );
};
