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
    <div>
      {/* Virtual Networks */}
      <div className="panel">
        <div className="h">
          <h3>Virtual networks</h3>
          <button className="btn btn-primary btn-sm" onClick={handleCreateVpc}>
            Create VPC
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>CIDR</th>
                  <th>Region</th>
                  <th>Subnets</th>
                  <th>Attached</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="n">research-vpc</td>
                  <td className="m">10.40.0.0/16</td>
                  <td className="m">BOM1</td>
                  <td className="m">3</td>
                  <td className="m">1 cluster, 2 pods</td>
                  <td>
                    <StateBadge state="running" />
                  </td>
                </tr>
                <tr>
                  <td className="n">prod-vpc</td>
                  <td className="m">10.50.0.0/16</td>
                  <td className="m">BOM1</td>
                  <td className="m">4</td>
                  <td className="m">2 pods, 1 endpoint</td>
                  <td>
                    <StateBadge state="running" />
                  </td>
                </tr>
                <tr>
                  <td className="n">sim-vpc</td>
                  <td className="m">10.60.0.0/16</td>
                  <td className="m">PNQ1</td>
                  <td className="m">2</td>
                  <td className="m">1 cluster</td>
                  <td>
                    <StateBadge state="running" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="cols">
        {/* Left column: Security Groups */}
        <div className="panel">
          <div className="h">
            <h3>Security groups</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Direction</th>
                    <th>Rule</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="n">sg-ssh</td>
                    <td className="m">Ingress</td>
                    <td className="m">TCP 22</td>
                    <td className="r">203.0.113.0/24</td>
                  </tr>
                  <tr>
                    <td className="n">sg-api</td>
                    <td className="m">Ingress</td>
                    <td className="m">TCP 443</td>
                    <td className="r">0.0.0.0/0</td>
                  </tr>
                  <tr>
                    <td className="n">sg-internal</td>
                    <td className="m">Ingress</td>
                    <td className="m">All</td>
                    <td className="r">10.40.0.0/16</td>
                  </tr>
                  <tr>
                    <td className="n">sg-default</td>
                    <td className="m">Egress</td>
                    <td className="m">All</td>
                    <td className="r">0.0.0.0/0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Connectivity */}
        <div className="panel">
          <div className="h">
            <h3>Connectivity</h3>
          </div>
          <div className="b">
            <dl className="kv">
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
