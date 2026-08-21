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
    <div className="max-w-[1800px] w-full mx-auto text-[15px]">
      {/* Team Members List */}
      <div className="panel mb-7">
        <div className="h px-6 py-4">
          <h3 className="text-[17px]">{team.length} members</h3>
          <button
            className="btn btn-primary btn-sm px-4 py-3 text-[15px]"
            onClick={() => setIsInviteOpen(true)}
          >
            Invite member
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table className="text-[15px]">
              <thead>
                <tr>
                  <th className="px-4 py-3.5">Name</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">MFA</th>
                  <th className="px-4 py-3.5">Last active</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {team.map((m) => (
                  <tr key={m.email}>
                    <td className="n px-4 py-3.5">{m.name}</td>
                    <td className="m px-4 py-3.5">{m.email}</td>
                    <td className="m px-4 py-3.5">{m.role}</td>
                    <td className="px-4 py-3.5">
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
                    <td className="m px-4 py-3.5">{m.last}</td>
                    <td className="act px-4 py-3.5">
                      {m.role === "Owner" ? (
                        <span className="m">—</span>
                      ) : (
                        <button
                          className="btn btn-ghost btn-sm px-3.5 py-2.5 text-sm"
                          onClick={handleRoleChangeRequest}
                        >
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
      <div className="cols grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-7 items-start">
        {/* Left column: Roles Table */}
        <div className="panel">
          <div className="h px-6 py-4">
            <h3 className="text-[17px]">Roles</h3>
          </div>
          <div className="b flush">
            <div className="tw">
              <table className="text-[15px]">
                <thead>
                  <tr>
                    <th className="px-4 py-3.5">Role</th>
                    <th className="px-4 py-3.5">Can do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="n px-4 py-3.5">Owner</td>
                    <td className="px-4 py-3.5">Everything, including billing and closing the account</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">Admin</td>
                    <td className="px-4 py-3.5">All resources, team and keys. Not billing.</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">Deployer</td>
                    <td className="px-4 py-3.5">Create and destroy workloads within quota</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">Viewer</td>
                    <td className="px-4 py-3.5">Read-only across resources and usage</td>
                  </tr>
                  <tr>
                    <td className="n px-4 py-3.5">Billing</td>
                    <td className="px-4 py-3.5">Invoices and spend caps only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Enforcement Details */}
        <div className="panel">
          <div className="h px-6 py-4">
            <h3 className="text-[17px]">Enforcement</h3>
          </div>
          <div className="b px-6 py-5">
            {missingMfaMembers.length > 0 && (
              <div
                style={{
                  border: "1px solid var(--wire)",
                  borderLeft: "2px solid var(--thermal)",
                  background: "var(--steel)",
                  padding: "14px 16px",
                  borderRadius: "3px",
                  marginBottom: "18px",
                }}
              >
                <div className="text-sm" style={{ color: "var(--ink)" }}>
                  {missingMfaMembers.length} member{missingMfaMembers.length > 1 ? "s" : ""} do{missingMfaMembers.length === 1 ? "es" : ""} not have MFA enabled.
                </div>
                {missingMfaMembers.map((m) => (
                  <div
                    key={m.email}
                    className="mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--ink-3)",
                      marginTop: "6px",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {m.email}
                  </div>
                ))}
              </div>
            )}
            <dl className="kv [&>dt]:text-sm [&>dd]:text-sm">
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
              className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
              style={{ marginTop: "18px" }}
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
          <div className="modal-in max-w-[600px] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h px-6 py-5">
              <h3 className="text-lg">Invite member</h3>
              <button className="x" onClick={() => setIsInviteOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleInviteSubmit}>
              <div className="modal-b px-6 py-5 text-[15px]">
                <label className="field">
                  <span className="lbl">Work email</span>
                  <input
                    className="px-3.5 py-3 text-[15px]"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="name@vantara.ai"
                    required
                  />
                </label>
                <label className="field">
                  <span className="lbl">Role</span>
                  <select
                    className="px-3.5 py-3 text-[15px]"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                  >
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
              <div className="modal-f px-6 py-4">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm px-4 py-3 text-[15px]"
                  onClick={() => setIsInviteOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm px-4 py-3 text-[15px]">
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