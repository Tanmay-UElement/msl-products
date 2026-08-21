"use client";

import React, { useState } from "react";
import { useConsole } from "../../../lib/ConsoleContext";

export default function TeamPage() {
  const { team, inviteMember, enforceMfa, toast } = useConsole();

  // Invite Modal state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Deployer");

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inviteEmail.trim();
    if (!email || !email.includes("@")) {
      toast("Enter a valid email address");
      return;
    }

    const name = email
      .split("@")[0]
      .replace(/\./g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    inviteMember(email, inviteRole);

    setIsInviteOpen(false);
    setInviteEmail("");
    setInviteRole("Deployer");
    toast("Invite sent to " + email);
  };

  const handleRoleChangeRequest = () => {
    toast("Role change requires owner approval — request sent");
  };

  const handleEnforceMfa = () => {
    enforceMfa();
    toast("MFA now required for all members");
  };

  // Check if any member lacks MFA
  const missingMfaMembers = team.filter((m) => !m.mfa && m.last !== "Invited");

  return (
    <div>
      {/* Team Members List */}
      <div className="panel">
        <div className="h">
          <h3>{team.length} members</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setIsInviteOpen(true)}>
            Invite member
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>MFA</th>
                  <th>Last active</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {team.map((m) => (
                  <tr key={m.email}>
                    <td className="n">{m.name}</td>
                    <td className="m">{m.email}</td>
                    <td className="m">{m.role}</td>
                    <td>
                      {m.mfa ? (
                        <span className="b- b-run">
                          <i></i>Enabled
                        </span>
                      ) : (
                        <span className="b- b-err">
                          <i></i>Missing
                        </span>
                      )}
                    </td>
                    <td className="m">{m.last}</td>
                    <td className="act">
                      {m.role === "Owner" ? (
                        <span className="m">—</span>
                      ) : (
                        <button className="btn btn-ghost btn-sm" onClick={handleRoleChangeRequest}>
                          Change role
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid Columns */}
      <div className="cols">
        {/* Left column: Roles Table */}
        <div className="panel">
          <div className="h">
            <h3>Roles</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Can do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="n">Owner</td>
                    <td>Everything, including billing and closing the account</td>
                  </tr>
                  <tr>
                    <td className="n">Admin</td>
                    <td>All resources, team and keys. Not billing.</td>
                  </tr>
                  <tr>
                    <td className="n">Deployer</td>
                    <td>Create and destroy workloads within quota</td>
                  </tr>
                  <tr>
                    <td className="n">Viewer</td>
                    <td>Read-only across resources and usage</td>
                  </tr>
                  <tr>
                    <td className="n">Billing</td>
                    <td>Invoices and spend caps only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Enforcement Details */}
        <div className="panel">
          <div className="h">
            <h3>Enforcement</h3>
          </div>
          <div className="b">
            {missingMfaMembers.length > 0 && (
              <div
                style={{
                  border: "1px solid var(--wire)",
                  borderLeft: "2px solid var(--thermal)",
                  background: "var(--steel)",
                  padding: "12px 14px",
                  borderRadius: "3px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: ".8125rem", color: "var(--ink)" }}>
                  {missingMfaMembers.length} member{missingMfaMembers.length > 1 ? "s" : ""} do{missingMfaMembers.length === 1 ? "es" : ""} not have MFA enabled.
                </div>
                {missingMfaMembers.map((m) => (
                  <div
                    key={m.email}
                    className="mono"
                    style={{
                      fontSize: "10px",
                      color: "var(--ink-3)",
                      marginTop: "5px",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {m.email}
                  </div>
                ))}
              </div>
            )}
            <dl className="kv">
              <dt>MFA required</dt>
              <dd>Not enforced — enable to block sign-in without a second factor</dd>
              <dt>SSO</dt>
              <dd>Microsoft Entra ID, connected</dd>
              <dt>SCIM</dt>
              <dd>Not configured</dd>
              <dt>Session length</dt>
              <dd>12 hours, then re-authentication</dd>
            </dl>
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: "16px" }}
              onClick={handleEnforceMfa}
            >
              Enforce MFA for everyone
            </button>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <div className="modal on" onClick={() => setIsInviteOpen(false)}>
          <div className="modal-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h">
              <h3>Invite member</h3>
              <button className="x" onClick={() => setIsInviteOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleInviteSubmit}>
              <div className="modal-b">
                <label className="field">
                  <span className="lbl">Work email</span>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="name@vantara.ai"
                    required
                  />
                </label>
                <label className="field">
                  <span className="lbl">Role</span>
                  <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
                    <option value="Deployer">Deployer</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Admin">Admin</option>
                    <option value="Billing">Billing</option>
                  </select>
                </label>
                <div className="alert">
                  The invite expires in 7 days. They will be asked to set up a second factor before their first sign-in.
                </div>
              </div>
              <div className="modal-f">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsInviteOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Send invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
