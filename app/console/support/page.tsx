"use client";

import React, { useState } from "react";
import { useConsole } from "../../../lib/ConsoleContext";

export default function SupportPage() {
  const { tickets, openTicket, toast } = useConsole();

  // Modal state
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [severity, setSeverity] = useState("P3");
  const [desc, setDesc] = useState("");

  const handleOpenTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !desc.trim()) {
      toast("Please fill in subject and description");
      return;
    }

    openTicket(subject.trim(), severity);

    setIsTicketOpen(false);
    setSubject("");
    setSeverity("P3");
    setDesc("");
  };

  return (
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      {/* Tickets List */}
      <div className="panel mb-7">
        <div className="h px-6 py-4">
          <h3 className="text-[17px]">Tickets</h3>
          <button
            className="btn btn-primary btn-sm px-4 py-3 text-[15px]"
            onClick={() => setIsTicketOpen(true)}
          >
            Open a ticket
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table className="text-[15px]">
              <thead>
                <tr>
                  <th className="px-4 py-3.5">ID</th>
                  <th className="px-4 py-3.5">Subject</th>
                  <th className="px-4 py-3.5">Severity</th>
                  <th className="px-4 py-3.5">State</th>
                  <th className="px-4 py-3.5">Updated</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="m px-4 py-3.5">{t.id}</td>
                    <td className="n px-4 py-3.5">{t.subject}</td>
                    <td className="m px-4 py-3.5">{t.sev}</td>
                    <td className="px-4 py-3.5">
                      {t.state === "Resolved" ? (
                        <span className="b- b-stop">
                          <i></i>Resolved
                        </span>
                      ) : t.state === "In progress" ? (
                        <span className="b- b-run">
                          <i></i>In progress
                        </span>
                      ) : (
                        <span className="b- b-prov">
                          <i></i>Waiting on you
                        </span>
                      )}
                    </td>
                    <td className="m px-4 py-3.5">{t.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="cols grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-7 items-start">
        {/* Left column: Response Commitments */}
        <div className="panel">
          <div className="h px-6 py-4">
            <h3 className="text-[17px]">Response commitments</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table className="text-[15px]">
                <thead>
                  <tr>
                    <th className="px-4 py-3.5">Severity</th>
                    <th className="px-4 py-3.5">Definition</th>
                    <th className="px-4 py-3.5">First response</th>
                    <th className="px-4 py-3.5">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="n px-4 py-3.5">P1</td>
                    <td className="px-4 py-3.5">Production down, no workaround</td>
                    <td className="r px-4 py-3.5">15 min</td>
                    <td className="m px-4 py-3.5">24×7</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">P2</td>
                    <td className="px-4 py-3.5">Production degraded</td>
                    <td className="r px-4 py-3.5">1 hour</td>
                    <td className="m px-4 py-3.5">24×7</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">P3</td>
                    <td className="px-4 py-3.5">Non-production issue</td>
                    <td className="r px-4 py-3.5">4 business hours</td>
                    <td className="m px-4 py-3.5">IST hours</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">P4</td>
                    <td className="px-4 py-3.5">Question or request</td>
                    <td className="r px-4 py-3.5">1 business day</td>
                    <td className="m px-4 py-3.5">IST hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Hotlines */}
        <div className="panel">
          <div className="h px-6 py-4">
            <h3 className="text-[17px]">Reach us directly</h3>
          </div>
          <div className="b px-6 py-5">
            <dl className="kv [&>dt]:text-sm [&>dd]:text-sm">
              <dt>P1 hotline</dt>
              <dd>+91 20 4900 1200, option 1 — 24×7</dd>
              <dt>Email</dt>
              <dd>support@mslproducts.com</dd>
              <dt>Named engineer</dt>
              <dd>Karthik S. — assigned to Vantara AI</dd>
              <dt>Escalation</dt>
              <dd>Head of Platform Operations after 2 hours on P1</dd>
            </dl>
            <p className="text-sm" style={{ color: "var(--ink-3)", marginTop: "18px" }}>
              Support is included at every account size. There is no premium tier to buy.
            </p>
          </div>
        </div>
      </div>

      {/* Open Ticket Modal */}
      {isTicketOpen && (
        <div className="modal on" onClick={() => setIsTicketOpen(false)}>
          <div className="modal-in max-w-[600px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h px-6 py-5">
              <h3 className="text-lg">Open a support ticket</h3>
              <button className="x" onClick={() => setIsTicketOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleOpenTicketSubmit}>
              <div className="modal-b px-6 py-5 text-[15px]">
                <label className="field">
                  <span className="lbl">Subject</span>
                  <input
                    className="px-3.5 py-3 text-[15px]"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Describe the issue briefly"
                    required
                  />
                </label>
                <label className="field">
                  <span className="lbl">Severity</span>
                  <select
                    className="px-3.5 py-3 text-[15px]"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                  >
                    <option value="P1">P1 — Critical (Production Down)</option>
                    <option value="P2">P2 — Major (Production Degraded)</option>
                    <option value="P3">P3 — Minor (Standard Issue)</option>
                    <option value="P4">P4 — Cosmetic / Question</option>
                  </select>
                </label>
                <label className="field">
                  <span className="lbl">Description</span>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Provide logs, cluster ID, or steps to reproduce..."
                    style={{
                      width: "100%",
                      minHeight: "120px",
                      background: "var(--rack)",
                      border: "1px solid var(--wire)",
                      borderRadius: "3px",
                      color: "inherit",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      padding: "10px",
                      marginTop: "5px",
                    }}
                    required
                  />
                </label>
              </div>
              <div className="modal-f px-6 py-4">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
                  onClick={() => setIsTicketOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm px-4 py-3 text-[15px]">
                  Submit ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}