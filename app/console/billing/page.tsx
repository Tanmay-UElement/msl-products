"use client";

import React, { useState } from "react";
import { useConsole } from "../../../lib/ConsoleContext";

const inr = (n: number) => {
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

const lakh = (n: number) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return inr(n);
};

export default function BillingPage() {
  const { spend, invoices, updateSpendCap, toast } = useConsole();
  const [capVal, setCapVal] = useState(spend.cap.toString());
  const [exceedAction, setExceedAction] = useState("Block new workloads, keep running ones");

  const pct = Math.round((spend.used / spend.cap) * 100);

  const handleSaveCap = () => {
    const numericCap = parseInt(capVal.replace(/[^\d]/g, ""), 10);
    if (!numericCap || numericCap < spend.used) {
      toast("Cap must be above current spend");
      return;
    }
    updateSpendCap(numericCap);
    toast("Spend cap updated to " + lakh(numericCap));
  };

  const handleDownloadInvoice = (invId: string) => {
    toast(`Downloading ${invId}.pdf`);
  };

  return (
    <div className="billing-page-wide" style={{ maxWidth: 1800, width: "100%", margin: "0 auto" }}>
      {/* Scoped size/width overrides — adjust values here to taste */}
      <style>{`
        .billing-page-wide {
          font-size: 15px;
        }
        .billing-page-wide .tiles {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 28px;
        }
        .billing-page-wide .tile {
          padding: 24px 26px;
        }
        .billing-page-wide .tile .l {
          font-size: 13px;
        }
        .billing-page-wide .tile .v {
          font-size: 30px;
          margin: 6px 0;
        }
        .billing-page-wide .tile .d {
          font-size: 13px;
        }
        .billing-page-wide .cols {
          display: grid;
          grid-template-columns: minmax(0, 2.1fr) minmax(0, 1fr);
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
        .billing-page-wide .meter {
          height: 12px;
        }
        .billing-page-wide .legend {
          font-size: 14px;
          margin-top: 10px;
        }
        .billing-page-wide .field {
          margin-top: 20px;
        }
        .billing-page-wide .field input,
        .billing-page-wide .field select {
          padding: 12px 14px;
          font-size: 15px;
        }
        .billing-page-wide .btn {
          padding: 12px 18px;
          font-size: 15px;
        }
        .billing-page-wide .kv dt,
        .billing-page-wide .kv dd {
          font-size: 14px;
        }

        @media (max-width: 1100px) {
          .billing-page-wide .cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Stat Tiles */}
      <div className="tiles">
        <div className="tile">
          <div className="l">Month to date</div>
          <div className="v">{lakh(spend.used)}</div>
          <div className="d">21 days elapsed</div>
        </div>
        <div className="tile">
          <div className="l">Forecast</div>
          <div className="v">{lakh((spend.used / 21) * 31)}</div>
          <div className={`d ${pct > 85 ? "warn" : ""}`}>Against {lakh(spend.cap)} cap</div>
        </div>
        <div className="tile">
          <div className="l">Last invoice</div>
          <div className="v">{lakh(invoices[0]?.amount || 0)}</div>
          <div className="d up">Paid 14 Aug 2026</div>
        </div>
        <div className="tile">
          <div className="l">Egress charges</div>
          <div className="v">₹0</div>
          <div className="d">All time</div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="cols">
        {/* Left column: Usage and Invoices */}
        <div>
          <div className="panel">
            <div className="h">
              <h3>Usage this period</h3>
            </div>
            <div className="b flush">
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="n">H200 SXM · reserved</td>
                      <td className="m">64 GPU × 504 h</td>
                      <td className="m">₹249/hr</td>
                      <td className="r">₹8,03,328</td>
                    </tr>
                    <tr>
                      <td className="n">H100 SXM · on-demand</td>
                      <td className="m">2,142 GPU-hr</td>
                      <td className="m">₹239/hr</td>
                      <td className="r">₹5,11,938</td>
                    </tr>
                    <tr>
                      <td className="n">A100 SXM · reserved</td>
                      <td className="m">32 GPU × 504 h</td>
                      <td className="m">₹116/hr</td>
                      <td className="r">₹1,87,085</td>
                    </tr>
                    <tr>
                      <td className="n">L40S · on-demand</td>
                      <td className="m">488 GPU-hr</td>
                      <td className="m">₹99/hr</td>
                      <td className="r">₹48,312</td>
                    </tr>
                    <tr>
                      <td className="n">Compute · vCPU</td>
                      <td className="m">18,240 vCPU-hr</td>
                      <td className="m">₹1.35/hr</td>
                      <td className="r">₹24,624</td>
                    </tr>
                    <tr>
                      <td className="n">Block NVMe</td>
                      <td className="m">6 TB × 21 d</td>
                      <td className="m">₹8.00/GB-mo</td>
                      <td className="r">₹33,290</td>
                    </tr>
                    <tr>
                      <td className="n">Shared filesystem</td>
                      <td className="m">120 TiB × 21 d</td>
                      <td className="m">₹6.20/GB-mo</td>
                      <td className="r">₹5,25,184</td>
                    </tr>
                    <tr>
                      <td className="n">Object storage</td>
                      <td className="m">462 TB × 21 d</td>
                      <td className="m">tiered</td>
                      <td className="r">₹1,13,559</td>
                    </tr>
                    <tr>
                      <td className="n">Data egress</td>
                      <td className="m">11.4 TB</td>
                      <td className="m">₹0.00</td>
                      <td className="r">₹0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h">
              <h3>Invoices</h3>
            </div>
            <div className="b flush">
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Period</th>
                      <th>Amount</th>
                      <th>Due</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="n">{inv.id}</td>
                        <td className="m">{inv.period}</td>
                        <td className="r">{inr(inv.amount)}</td>
                        <td className="m">{inv.due}</td>
                        <td>
                          <span className="b- b-paid">
                            <i></i>Paid
                          </span>
                        </td>
                        <td className="act">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleDownloadInvoice(inv.id)}
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Spend Cap and Account details */}
        <div>
          <div className="panel">
            <div className="h">
              <h3>Spend cap</h3>
            </div>
            <div className="b">
              <div className="meter">
                <i className={pct > 85 ? "warn" : ""} style={{ width: `${pct}%` }}></i>
              </div>
              <div className="legend">
                <span>
                  <b>{lakh(spend.used)}</b> used
                </span>
                <span>{lakh(spend.cap)} cap</span>
              </div>

              <label className="field" style={{ marginTop: "18px" }}>
                <span className="lbl">Monthly cap (INR)</span>
                <input
                  type="text"
                  value={capVal}
                  onChange={(e) => setCapVal(e.target.value)}
                />
              </label>

              <label className="field">
                <span className="lbl">When exceeded</span>
                <select value={exceedAction} onChange={(e) => setExceedAction(e.target.value)}>
                  <option value="Block new workloads, keep running ones">
                    Block new workloads, keep running ones
                  </option>
                  <option value="Notify only">Notify only</option>
                  <option value="Block new and stop non-production">
                    Block new and stop non-production
                  </option>
                </select>
              </label>

              <button className="btn btn-primary btn-full btn-sm" onClick={handleSaveCap}>
                Save cap
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="h">
              <h3>Billing account</h3>
            </div>
            <div className="b">
              <dl className="kv">
                <dt>Entity</dt>
                <dd>Vantara AI Private Limited</dd>
                <dt>GSTIN</dt>
                <dd>27AAJCV1234K1ZP</dd>
                <dt>Terms</dt>
                <dd>Net 30, consolidated monthly</dd>
                <dt>Currency</dt>
                <dd>INR</dd>
                <dt>PO reference</dt>
                <dd>VAN-2026-INFRA-04</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}