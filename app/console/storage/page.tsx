"use client";

import React, { useState } from "react";
import { useConsole } from "../../../lib/ConsoleContext";

export default function StoragePage() {
  const { volumes, buckets, toast } = useConsole();
  const [activeTab, setActiveTab] = useState<"vol" | "buc" | "snap">("vol");

  const handleCreateVolume = () => {
    toast("Volume creation opens in the resource wizard");
  };

  const handleCreateBucket = () => {
    toast("Bucket creation opens in the resource wizard");
  };

  return (
    <div>
      {/* Tab Selectors */}
      <div className="tabs" id="stoTabs">
        <button
          className={activeTab === "vol" ? "on" : ""}
          onClick={() => setActiveTab("vol")}
        >
          Volumes
        </button>
        <button
          className={activeTab === "buc" ? "on" : ""}
          onClick={() => setActiveTab("buc")}
        >
          Buckets
        </button>
        <button
          className={activeTab === "snap" ? "on" : ""}
          onClick={() => setActiveTab("snap")}
        >
          Snapshots
        </button>
      </div>

      {/* Tab: Volumes */}
      {activeTab === "vol" && (
        <div id="tab-vol">
          <div className="panel">
            <div className="h">
              <h3>{volumes.length} volumes</h3>
              <button className="btn btn-primary btn-sm" onClick={handleCreateVolume}>
                Create volume
              </button>
            </div>
            <div className="b flush">
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Tier</th>
                      <th>Size</th>
                      <th>Used</th>
                      <th>Region</th>
                      <th>Attached to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volumes.map((v) => (
                      <tr key={v.id}>
                        <td className="n">{v.name}</td>
                        <td className="m">{v.tier}</td>
                        <td className="m">{v.size}</td>
                        <td style={{ minWidth: "150px" }}>
                          <div className="meter">
                            <i style={{ width: `${v.used}%` }}></i>
                          </div>
                          <div className="legend" style={{ marginTop: "6px" }}>
                            <span>{v.used}%</span>
                          </div>
                        </td>
                        <td className="m">{v.region}</td>
                        <td className="r">{v.attached}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Buckets */}
      {activeTab === "buc" && (
        <div id="tab-buc">
          <div className="panel">
            <div className="h">
              <h3>{buckets.length} buckets</h3>
              <button className="btn btn-primary btn-sm" onClick={handleCreateBucket}>
                Create bucket
              </button>
            </div>
            <div className="b flush">
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Tier</th>
                      <th>Size</th>
                      <th>Objects</th>
                      <th>Region</th>
                      <th>Egress charged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buckets.map((b) => (
                      <tr key={b.name}>
                        <td className="n">{b.name}</td>
                        <td className="m">{b.tier}</td>
                        <td className="m">{b.size}</td>
                        <td className="m">{b.objects}</td>
                        <td className="m">{b.region}</td>
                        <td className="r">₹0.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="panel">
            <div className="h">
              <h3>Endpoint</h3>
            </div>
            <div className="b">
              <div className="code">
                s3 = boto3.<span className="k">client</span>(<span className="s">"s3"</span>,<br />
                &nbsp;&nbsp;endpoint_url=<span className="s">"https://s3.bom1.mslproducts.com"</span>,<br />
                &nbsp;&nbsp;region_name=<span className="s">"bom1"</span>)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Snapshots */}
      {activeTab === "snap" && (
        <div id="tab-snap">
          <div className="panel">
            <div className="h">
              <h3>Snapshot policies</h3>
            </div>
            <div className="b flush">
              <div className="rows">
                <div>
                  <div>
                    <div className="t">Daily · retain 14</div>
                    <div className="s">All block volumes · 02:00 IST</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>Active
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Weekly · retain 8, cross-region to MAA1</div>
                    <div className="s">vol-4a1c · Sunday 03:00 IST</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>Active
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Pre-deploy manual</div>
                    <div className="s">Triggered from CI · last run 3 d ago</div>
                  </div>
                  <span className="b- b-stop">
                    <i></i>On demand
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="panel">
            <div className="h">
              <h3>Last restore drill</h3>
            </div>
            <div className="b">
              <dl className="kv">
                <dt>Date</dt>
                <dd>28 July 2026</dd>
                <dt>Scope</dt>
                <dd>vol-9e2f full restore to new volume</dd>
                <dt>RTO achieved</dt>
                <dd>11 minutes against a 30-minute target</dd>
                <dt>Integrity</dt>
                <dd>Checksums matched, no divergence</dd>
                <dt>Report</dt>
                <dd>Available in the trust portal</dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
