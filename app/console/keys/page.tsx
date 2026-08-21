"use client";

import React, { useState } from "react";
import { useConsole } from "../../../lib/ConsoleContext";

export default function KeysPage() {
  const { keys, addKey, revokeKey, toast } = useConsole();

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [roleInput, setRoleInput] = useState("Deployer");
  const [expiryInput, setExpiryInput] = useState("Never");

  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const [revokeTarget, setRevokeTarget] = useState<{ id: string; name: string } | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameInput.trim() || "untitled-key";

    // Add to context list
    const secret = addKey(name, roleInput, expiryInput);

    // Close create modal, open generated modal
    setIsCreateOpen(false);
    setGeneratedKey(secret);

    // Reset inputs
    setNameInput("");
    setRoleInput("Deployer");
    setExpiryInput("Never");
  };

  const handleCopySecret = () => {
    if (generatedKey) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(generatedKey);
      }
      toast("Secret copied to clipboard");
    }
  };

  const confirmRevoke = () => {
    if (revokeTarget) {
      revokeKey(revokeTarget.id);
      toast(`${revokeTarget.name} revoked`);
      setRevokeTarget(null);
    }
  };

  return (
    <div className="billing-page-wide" style={{ maxWidth: 1800, width: "100%", margin: "0 auto" }}>
      {/* Scoped size/width overrides — matches Billing/Clusters pages */}
      <style>{`
        .billing-page-wide {
          font-size: 15px;
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
        .billing-page-wide .btn {
          padding: 12px 18px;
          font-size: 15px;
        }
        .billing-page-wide .kv dt,
        .billing-page-wide .kv dd {
          font-size: 14px;
        }
        .billing-page-wide .field {
          margin-top: 20px;
        }
        .billing-page-wide .field input,
        .billing-page-wide .field select {
          padding: 12px 14px;
          font-size: 15px;
        }
        .billing-page-wide .modal-in {
          max-width: 560px;
          width: 100%;
        }
        .billing-page-wide .modal-h {
          padding: 20px 26px;
        }
        .billing-page-wide .modal-h h3 {
          font-size: 18px;
        }
        .billing-page-wide .modal-b {
          padding: 22px 26px;
          font-size: 15px;
        }
        .billing-page-wide .modal-f {
          padding: 18px 26px;
        }
        .billing-page-wide .alert {
          padding: 14px 16px;
          font-size: 14px;
        }
        .billing-page-wide .code {
          padding: 16px 18px;
          font-size: 14px;
        }
      `}</style>

      {/* Active Keys Panel */}
      <div className="panel">
        <div className="h">
          <h3>{keys.length} active keys</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setIsCreateOpen(true)}>
            Create key
          </button>
        </div>
        <div className="b flush">
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Prefix</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Last used</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id}>
                    <td className="n">{k.name}</td>
                    <td className="m">{k.prefix}…</td>
                    <td className="m">{k.role}</td>
                    <td className="m">{k.created}</td>
                    <td className="m">{k.used}</td>
                    <td className="act">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setRevokeTarget({ id: k.id, name: k.name })}
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hygiene Specs Panel */}
      <div className="panel">
        <div className="h">
          <h3>Key hygiene</h3>
        </div>
        <div className="b">
          <dl className="kv">
            <dt>Rotation policy</dt>
            <dd>Warn at 180 days, no forced expiry</dd>
            <dt>Scope</dt>
            <dd>Keys are bound to one project and one role</dd>
            <dt>Storage</dt>
            <dd>We store a hash. The secret is shown once, at creation.</dd>
            <dt>Audit</dt>
            <dd>Every request is logged against the key that made it</dd>
            <dt>Leak detection</dt>
            <dd>We scan public repositories and auto-revoke on a match</dd>
          </dl>
        </div>
      </div>

      {/* MODAL 1: Create Key */}
      {isCreateOpen && (
        <div className="modal on" onClick={() => setIsCreateOpen(false)}>
          <div className="modal-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h">
              <h3>Create API key</h3>
              <button className="x" onClick={() => setIsCreateOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-b">
                <label className="field">
                  <span className="lbl">Name</span>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="ci-deploy"
                    required
                  />
                </label>
                <label className="field">
                  <span className="lbl">Role</span>
                  <select value={roleInput} onChange={(e) => setRoleInput(e.target.value)}>
                    <option value="Deployer">Deployer</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </label>
                <label className="field">
                  <span className="lbl">Expires</span>
                  <select value={expiryInput} onChange={(e) => setExpiryInput(e.target.value)}>
                    <option value="Never">Never</option>
                    <option value="90 days">90 days</option>
                    <option value="1 year">1 year</option>
                  </select>
                </label>
                <div className="alert">
                  The secret is shown once, at creation. We store only a hash — if you lose it, create a new key.
                </div>
              </div>
              <div className="modal-f">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Display Generated Key */}
      {generatedKey && (
        <div className="modal on" onClick={() => setGeneratedKey(null)}>
          <div className="modal-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h">
              <h3>Key created</h3>
              <button className="x" onClick={() => setGeneratedKey(null)}>
                ✕
              </button>
            </div>
            <div className="modal-b">
              <div className="alert ok">Copy this now. It will not be shown again.</div>
              <div className="code" style={{ wordBreak: "break-all" }}>
                {generatedKey}
              </div>
              <button
                className="btn btn-ghost btn-sm btn-full"
                style={{ marginTop: "14px" }}
                onClick={handleCopySecret}
              >
                Copy secret
              </button>
            </div>
            <div className="modal-f">
              <button className="btn btn-primary btn-sm" onClick={() => setGeneratedKey(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Confirm Revocation */}
      {revokeTarget && (
        <div className="modal on" onClick={() => setRevokeTarget(null)}>
          <div className="modal-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-h">
              <h3>Revoke key</h3>
              <button className="x" onClick={() => setRevokeTarget(null)}>
                ✕
              </button>
            </div>
            <div className="modal-b">
              <p style={{ fontSize: ".9375rem", color: "var(--ink-2)" }}>
                Revoking <b style={{ color: "var(--ink)" }}>{revokeTarget.name}</b> takes effect
                immediately. Anything using it — CI, Terraform, running jobs that re-authenticate
                — will start failing.
              </p>
              <div className="alert err">This cannot be undone.</div>
            </div>
            <div className="modal-f">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setRevokeTarget(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger btn-sm" onClick={confirmRevoke}>
                Revoke {revokeTarget.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}