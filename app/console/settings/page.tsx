"use client";

import React, { useState } from "react";
import { useConsole } from "../../../lib/ConsoleContext";

export default function SettingsPage() {
  const {
    user,
    org,
    region,
    saveOrg,
    changePassword,
    revokeOtherSessions,
    exportData,
    closeAccount,
    toast,
  } = useConsole();

  const [orgName, setOrgName] = useState("Vantara AI");
  const [defaultRegion, setDefaultRegion] = useState("BOM1");
  const [residency, setResidency] = useState("India only — enforced");
  const [techContact, setTechContact] = useState("aditi@vantara.ai");

  const handleSaveChanges = () => {
    saveOrg(orgName, defaultRegion, techContact);
  };

  return (
    <div className="cols">
      {/* Left Column */}
      <div>
        <div className="panel">
          <div className="h">
            <h3>Organisation</h3>
          </div>
          <div className="b">
            <label className="field">
              <span className="lbl">Organisation name</span>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </label>
            
            <div className="f2">
              <label className="field">
                <span className="lbl">Default region</span>
                <select
                  value={defaultRegion}
                  onChange={(e) => setDefaultRegion(e.target.value)}
                >
                  <option value="BOM1">BOM1 — Mumbai</option>
                  <option value="PNQ1">PNQ1 — Pune</option>
                  <option value="MAA1">MAA1 — Chennai</option>
                  <option value="DEL1">DEL1 — Noida</option>
                </select>
              </label>
              
              <label className="field">
                <span className="lbl">Data residency</span>
                <select
                  value={residency}
                  onChange={(e) => setResidency(e.target.value)}
                >
                  <option value="India only — enforced">India only — enforced</option>
                  <option value="No restriction">No restriction</option>
                </select>
              </label>
            </div>
            
            <label className="field">
              <span className="lbl">Technical contact</span>
              <input
                type="email"
                value={techContact}
                onChange={(e) => setTechContact(e.target.value)}
              />
            </label>
            
            <button className="btn btn-primary btn-sm" onClick={handleSaveChanges}>
              Save changes
            </button>
          </div>
        </div>

        <div className="panel">
          <div className="h">
            <h3>Notifications</h3>
          </div>
          <div className="b flush">
            <div className="rows">
              <div>
                <div>
                  <div className="t">Incident and status updates</div>
                  <div className="s">Email + webhook</div>
                </div>
                <span className="b- b-run">
                  <i></i>On
                </span>
              </div>
              <div>
                <div>
                  <div className="t">Spend threshold alerts</div>
                  <div className="s">At 50%, 80% and 95% of cap</div>
                </div>
                <span className="b- b-run">
                  <i></i>On
                </span>
              </div>
              <div>
                <div>
                  <div className="t">Workload failures</div>
                  <div className="s">Email to technical contact</div>
                </div>
                <span className="b- b-run">
                  <i></i>On
                </span>
              </div>
              <div>
                <div>
                  <div className="t">Maintenance windows</div>
                  <div className="s">7 days ahead, per region</div>
                </div>
                <span className="b- b-run">
                  <i></i>On
                </span>
              </div>
              <div>
                <div>
                  <div className="t">Product announcements</div>
                  <div className="s">Monthly at most</div>
                </div>
                <span className="b- b-stop">
                  <i></i>Off
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div>
        <div className="panel">
          <div className="h">
            <h3>Your account</h3>
          </div>
          <div className="b">
            <dl className="kv">
              <dt>Name</dt>
              <dd>{user.name}</dd>
              <dt>Email</dt>
              <dd>{user.email}</dd>
              <dt>Role</dt>
              <dd>{user.role}</dd>
              <dt>MFA</dt>
              <dd>Authenticator app · enabled</dd>
              <dt>Sessions</dt>
              <dd>2 active — Pune, Mumbai</dd>
            </dl>
            <div style={{ display: "flex", gap: "9px", marginTop: "16px", flexWrap: "wrap" }}>
              <button className="btn btn-ghost btn-sm" onClick={changePassword}>
                Change password
              </button>
              <button className="btn btn-ghost btn-sm" onClick={revokeOtherSessions}>
                Sign out other sessions
              </button>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="h">
            <h3>Data and exit</h3>
          </div>
          <div className="b">
            <p style={{ fontSize: ".8125rem", color: "var(--ink-2)", marginBottom: "16px" }}>
              You can export everything at any time, at no charge. On closure you keep 60 days of retrieval access before we delete anything.
            </p>
            <div style={{ display: "flex", gap: "9px", flexWrap: "wrap" }}>
              <button className="btn btn-ghost btn-sm" onClick={exportData}>
                Export account data
              </button>
              <button className="btn btn-danger btn-sm" onClick={closeAccount}>
                Close account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
