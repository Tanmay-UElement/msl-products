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
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      {/* Tab Selectors */}
      <div className="tabs text-[15px]" id="stoTabs">
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
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">{volumes.length} volumes</h3>
              <button
                className="btn btn-primary btn-sm px-4 py-3 text-[15px]"
                onClick={handleCreateVolume}
              >
                Create volume
              </button>
            </div>
            <div className="b flush">
              <div className="tw">
                <table className="text-[15px]">
                  <thead>
                    <tr>
                      <th className="px-4 py-3.5">Name</th>
                      <th className="px-4 py-3.5">Tier</th>
                      <th className="px-4 py-3.5">Size</th>
                      <th className="px-4 py-3.5">Used</th>
                      <th className="px-4 py-3.5">Region</th>
                      <th className="px-4 py-3.5">Attached to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volumes.map((v) => (
                      <tr key={v.id}>
                        <td className="n px-4 py-3.5">{v.name}</td>
                        <td className="m px-4 py-3.5">{v.tier}</td>
                        <td className="m px-4 py-3.5">{v.size}</td>
                        <td className="px-4 py-3.5" style={{ minWidth: "170px" }}>
                          <div className="meter">
                            <i style={{ width: `${v.used}%` }}></i>
                          </div>
                          <div className="legend text-sm" style={{ marginTop: "7px" }}>
                            <span>{v.used}%</span>
                          </div>
                        </td>
                        <td className="m px-4 py-3.5">{v.region}</td>
                        <td className="r px-4 py-3.5">{v.attached}</td>
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
          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">{buckets.length} buckets</h3>
              <button
                className="btn btn-primary btn-sm px-4 py-3 text-[15px]"
                onClick={handleCreateBucket}
              >
                Create bucket
              </button>
            </div>
            <div className="b flush">
              <div className="tw">
                <table className="text-[15px]">
                  <thead>
                    <tr>
                      <th className="px-4 py-3.5">Name</th>
                      <th className="px-4 py-3.5">Tier</th>
                      <th className="px-4 py-3.5">Size</th>
                      <th className="px-4 py-3.5">Objects</th>
                      <th className="px-4 py-3.5">Region</th>
                      <th className="px-4 py-3.5">Egress charged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buckets.map((b) => (
                      <tr key={b.name}>
                        <td className="n px-4 py-3.5">{b.name}</td>
                        <td className="m px-4 py-3.5">{b.tier}</td>
                        <td className="m px-4 py-3.5">{b.size}</td>
                        <td className="m px-4 py-3.5">{b.objects}</td>
                        <td className="m px-4 py-3.5">{b.region}</td>
                        <td className="r px-4 py-3.5">₹0.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Endpoint</h3>
            </div>
            <div className="b px-6 py-5">
              <div className="code text-[15px] leading-7 px-5 py-4">
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
          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Snapshot policies</h3>
            </div>
            <div className="b flush">
              <div className="rows text-[15px] [&>div]:px-6 [&>div]:py-4">
                <div>
                  <div>
                    <div className="t">Daily · retain 14</div>
                    <div className="s text-sm">All block volumes · 02:00 IST</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>Active
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Weekly · retain 8, cross-region to MAA1</div>
                    <div className="s text-sm">vol-4a1c · Sunday 03:00 IST</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>Active
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Pre-deploy manual</div>
                    <div className="s text-sm">Triggered from CI · last run 3 d ago</div>
                  </div>
                  <span className="b- b-stop">
                    <i></i>On demand
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Last restore drill</h3>
            </div>
            <div className="b px-6 py-5">
              <dl className="kv [&>dt]:text-sm [&>dd]:text-sm">
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