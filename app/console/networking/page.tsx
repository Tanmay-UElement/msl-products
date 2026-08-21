"use client";

import React from "react";
import { useConsole } from "../../../lib/ConsoleContext";
import { StateBadge } from "../../../components/console/StateBadge";

export default function NetworkingPage() {
  const { toast } = useConsole();

  const handleCreateVpc = () => {
    toast("VPC creation opens in the resource wizard");
  };

  return (
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      {/* Virtual Networks */}
      <div className="panel mb-7">
        <div className="h px-6 py-4.5">
          <h3 className="text-[17px]">Virtual networks</h3>
          <button
            className="btn btn-primary btn-sm px-4.5 py-3 text-[15px]"
            onClick={handleCreateVpc}
          >
            Create VPC
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table className="text-[15px]">
              <thead>
                <tr>
                  <th className="px-4.5 py-3.5">Name</th>
                  <th className="px-4.5 py-3.5">CIDR</th>
                  <th className="px-4.5 py-3.5">Region</th>
                  <th className="px-4.5 py-3.5">Subnets</th>
                  <th className="px-4.5 py-3.5">Attached</th>
                  <th className="px-4.5 py-3.5">State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="n px-4.5 py-3.5">research-vpc</td>
                  <td className="m px-4.5 py-3.5">10.40.0.0/16</td>
                  <td className="m px-4.5 py-3.5">BOM1</td>
                  <td className="m px-4.5 py-3.5">3</td>
                  <td className="m px-4.5 py-3.5">1 cluster, 2 pods</td>
                  <td className="px-4.5 py-3.5">
                    <StateBadge state="running" />
                  </td>
                </tr>
                <tr>
                  <td className="n px-4.5 py-3.5">prod-vpc</td>
                  <td className="m px-4.5 py-3.5">10.50.0.0/16</td>
                  <td className="m px-4.5 py-3.5">BOM1</td>
                  <td className="m px-4.5 py-3.5">4</td>
                  <td className="m px-4.5 py-3.5">2 pods, 1 endpoint</td>
                  <td className="px-4.5 py-3.5">
                    <StateBadge state="running" />
                  </td>
                </tr>
                <tr>
                  <td className="n px-4.5 py-3.5">sim-vpc</td>
                  <td className="m px-4.5 py-3.5">10.60.0.0/16</td>
                  <td className="m px-4.5 py-3.5">PNQ1</td>
                  <td className="m px-4.5 py-3.5">2</td>
                  <td className="m px-4.5 py-3.5">1 cluster</td>
                  <td className="px-4.5 py-3.5">
                    <StateBadge state="running" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="cols grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-7 items-start">
        {/* Left column: Security Groups */}
        <div className="panel">
          <div className="h px-6 py-4.5">
            <h3 className="text-[17px]">Security groups</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table className="text-[15px]">
                <thead>
                  <tr>
                    <th className="px-4.5 py-3.5">Name</th>
                    <th className="px-4.5 py-3.5">Direction</th>
                    <th className="px-4.5 py-3.5">Rule</th>
                    <th className="px-4.5 py-3.5">Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="n px-4.5 py-3.5">sg-ssh</td>
                    <td className="m px-4.5 py-3.5">Ingress</td>
                    <td className="m px-4.5 py-3.5">TCP 22</td>
                    <td className="r px-4.5 py-3.5">203.0.113.0/24</td>
                  </tr>
                  <tr>
                    <td className="n px-4.5 py-3.5">sg-api</td>
                    <td className="m px-4.5 py-3.5">Ingress</td>
                    <td className="m px-4.5 py-3.5">TCP 443</td>
                    <td className="r px-4.5 py-3.5">0.0.0.0/0</td>
                  </tr>
                  <tr>
                    <td className="n px-4.5 py-3.5">sg-internal</td>
                    <td className="m px-4.5 py-3.5">Ingress</td>
                    <td className="m px-4.5 py-3.5">All</td>
                    <td className="r px-4.5 py-3.5">10.40.0.0/16</td>
                  </tr>
                  <tr>
                    <td className="n px-4.5 py-3.5">sg-default</td>
                    <td className="m px-4.5 py-3.5">Egress</td>
                    <td className="m px-4.5 py-3.5">All</td>
                    <td className="r px-4.5 py-3.5">0.0.0.0/0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Connectivity */}
        <div className="panel">
          <div className="h px-6 py-4.5">
            <h3 className="text-[17px]">Connectivity</h3>
          </div>
          <div className="b px-6 py-5.5">
            <dl className="kv [&>dt]:text-sm [&>dd]:text-sm">
              <dt>Direct connect</dt>
              <dd>10 Gbps to Vantara HQ, Pune — active</dd>
              <dt>Floating IPs</dt>
              <dd>4 allocated, 3 in use</dd>
              <dt>DDoS scrubbing</dt>
              <dd>Always on, no events in 90 days</dd>
              <dt>Internal transfer</dt>
              <dd>184 TB this month · ₹0.00</dd>
              <dt>Public egress</dt>
              <dd>11.4 TB this month · ₹0.00</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}