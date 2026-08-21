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
    <div>
      {/* Tickets List */}
      <div className="panel">
        <div className="h">
          <h3>Tickets</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setIsTicketOpen(true)}>
            Open a ticket
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Severity</th>
                  <th>State</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td className="m">{t.id}</td>
                    <td className="n">{t.subject}</td>
                    <td className="m">{t.sev}</td>
                    <td>
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
                    <td className="m">{t.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="cols">
        {/* Left column: Response Commitments */}
        <div className="panel">
          <div className="h">
            <h3>Response commitments</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Definition</th>
                    <th>First response</th>
                    <th>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="n">P1</td>
                    <td>Production down, no workaround</td>
                    <td className="r">15 min</td>
                    <td className="m">24×7</td>
                  </tr>
                  <tr>
                    <td className="n">P2</td>
                    <td>Production degraded</td>
                    <td className="r">1 hour</td>
                    <td className="m">24×7</td>
                  </tr>
                  <tr>
                    <td className="n">P3</td>
                    <td>Non-production issue</td>
                    <td className="r">4 business hours</td>
                    <td className="m">IST hours</td>
                  </tr>
                  <tr>
                    <td className="n">P4</td>
                    <td>Question or request</td>
                    <td className="r">1 business day</td>
                    <td className="m">IST hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Hotlines */}
        <div className="panel">
          <div className="h">
            <h3>Reach us directly</h3>
          </div>
          <div className="b">
            <dl className="kv">
              <dt>P1 hotline</dt>
              <dd>+91 20 4900 1200, option 1 — 24×7</dd>
              <dt>Email</dt>
              <dd>support@mslproducts.com</dd>
              <dt>Named engineer</dt>
              <dd>Karthik S. — assigned to Vantara AI</dd>
              <dt>Escalation</dt>
              <dd>Head of Platform Operations after 2 hours on P1</dd>
            </dl>
            <p style={{ fontSize: ".8125rem", color: "var(--ink-3)", marginTop: "16px" }}>
              Support is included at every account size. There is no premium tier to buy.
            </p>
          </div>
        </div>
      </div>

      {/* Open Ticket Modal */}
      {isTicketOpen && (
        <div className="modal on" onClick={() => setIsTicketOpen(false)}>
          <div className="modal-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h">
              <h3>Open a support ticket</h3>
              <button className="x" onClick={() => setIsTicketOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleOpenTicketSubmit}>
              <div className="modal-b">
                <label className="field">
                  <span className="lbl">Subject</span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Describe the issue briefly"
                    required
                  />
                </label>
                <label className="field">
                  <span className="lbl">Severity</span>
                  <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
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
                      minHeight: "100px",
                      background: "var(--rack)",
                      border: "1px solid var(--wire)",
                      borderRadius: "3px",
                      color: "inherit",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      padding: "8px",
                      marginTop: "5px",
                    }}
                    required
                  />
                </label>
              </div>
              <div className="modal-f">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsTicketOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
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
