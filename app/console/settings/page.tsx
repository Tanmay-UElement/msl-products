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
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      <div className="cols grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
        {/* Left Column */}
        <div>
          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Organisation</h3>
            </div>
            <div className="b px-6 py-5">
              <label className="field">
                <span className="lbl">Organisation name</span>
                <input
                  className="px-3.5 py-3 text-[15px]"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </label>

              <div className="f2">
                <label className="field">
                  <span className="lbl">Default region</span>
                  <select
                    className="px-3.5 py-3 text-[15px]"
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
                    className="px-3.5 py-3 text-[15px]"
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
                  className="px-3.5 py-3 text-[15px]"
                  type="email"
                  value={techContact}
                  onChange={(e) => setTechContact(e.target.value)}
                />
              </label>

              <button
                className="btn btn-primary btn-sm px-4 py-3 text-[15px]"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Notifications</h3>
            </div>
            <div className="b flush">
              <div className="rows text-[15px] [&>div]:px-6 [&>div]:py-4">
                <div>
                  <div>
                    <div className="t">Incident and status updates</div>
                    <div className="s text-sm">Email + webhook</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>On
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Spend threshold alerts</div>
                    <div className="s text-sm">At 50%, 80% and 95% of cap</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>On
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Workload failures</div>
                    <div className="s text-sm">Email to technical contact</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>On
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Maintenance windows</div>
                    <div className="s text-sm">7 days ahead, per region</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>On
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">Product announcements</div>
                    <div className="s text-sm">Monthly at most</div>
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
          <div className="panel mb-7">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Your account</h3>
            </div>
            <div className="b px-6 py-5">
              <dl className="kv [&>dt]:text-sm [&>dd]:text-sm">
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
              <div style={{ display: "flex", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
                <button
                  className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
                  onClick={changePassword}
                >
                  Change password
                </button>
                <button
                  className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
                  onClick={revokeOtherSessions}
                >
                  Sign out other sessions
                </button>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="h px-6 py-4">
              <h3 className="text-[17px]">Data and exit</h3>
            </div>
            <div className="b px-6 py-5">
              <p className="text-sm" style={{ color: "var(--ink-2)", marginBottom: "18px" }}>
                You can export everything at any time, at no charge. On closure you keep 60 days of retrieval access before we delete anything.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
                  onClick={exportData}
                >
                  Export account data
                </button>
                <button
                  className="btn btn-danger btn-sm px-4 py-3 text-[15px]"
                  onClick={closeAccount}
                >
                  Close account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}