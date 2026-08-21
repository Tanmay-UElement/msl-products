"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useConsole } from "../../lib/ConsoleContext";
import { DeployModal } from "../../components/console/DeployModal";

const NAV_ICONS = {
  dash: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" />
      <rect x="9" y="1.5" width="5.5" height="5.5" />
      <rect x="1.5" y="9" width="5.5" height="5.5" />
      <rect x="9" y="9" width="5.5" height="5.5" />
    </svg>
  ),
  pod: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1.5" y="3" width="13" height="4" />
      <rect x="1.5" y="9" width="13" height="4" />
      <circle cx="4.5" cy="5" r=".7" fill="currentColor" />
      <circle cx="4.5" cy="11" r=".7" fill="currentColor" />
    </svg>
  ),
  clu: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8" cy="3.5" r="2" />
      <circle cx="3.5" cy="12" r="2" />
      <circle cx="12.5" cy="12" r="2" />
      <path d="M8 5.5v2M6.5 9.5 8 7.5l1.5 2" />
    </svg>
  ),
  sto: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <ellipse cx="8" cy="3.5" rx="6" ry="2" />
      <path d="M2 3.5v9c0 1.1 2.7 2 6 2s6-.9 6-2v-9" />
      <path d="M2 8c0 1.1 2.7 2 6 2s6-.9 6-2" />
    </svg>
  ),
  net: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8h12.4M8 1.8c1.6 1.8 2.5 3.9 2.5 6.2S9.6 12.4 8 14.2c-1.6-1.8-2.5-3.9-2.5-6.2S6.4 3.6 8 1.8z" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="5" cy="11" r="3" />
      <path d="M7.1 8.9 13 3M11 5l1.5 1.5M12.5 3.5 14 5" />
    </svg>
  ),
  bill: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="1.5" width="12" height="13" />
      <path d="M5 5h6M5 8h6M5 11h3.5" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="6" cy="5" r="2.4" />
      <path d="M1.6 14c0-2.4 2-4 4.4-4s4.4 1.6 4.4 4" />
      <circle cx="12" cy="5.5" r="1.9" />
      <path d="M11.4 10.2c1.8.2 3 1.8 3 3.8" />
    </svg>
  ),
  sup: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M6.2 6.2c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1.3-1.8 1.4-1.8 2.8" />
      <circle cx="8" cy="11.4" r=".7" fill="currentColor" />
    </svg>
  ),
  set: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8" cy="8" r="2.3" />
      <path d="M8 1.4v1.8M8 12.8v1.8M14.6 8h-1.8M3.2 8H1.4M12.7 3.3l-1.3 1.3M4.6 11.4l-1.3 1.3M12.7 12.7l-1.3-1.3M4.6 4.6 3.3 3.3" />
    </svg>
  ),
};

interface NavRoute {
  seg: string;
  title: string;
  desc: string;
  icon: keyof typeof NAV_ICONS;
  group: string;
}

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    org,
    region,
    pods,
    clusters,
    tickets,
    authed,
    logout,
    setRegion,
    switchProject,
    setDeployModalOpen,
  } = useConsole();

  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);

  // Authentication Guard
  useEffect(() => {
    setMounted(true);
    if (!authed) {
      router.push("/login");
    }
  }, [authed, router]);

  if (!mounted || !authed) {
    return null; // Avoid flashing dashboard during redirect
  }

  // Get active route segment (e.g. /console/pods -> 'pods')
  const activeSeg = pathname.replace(/^\/console\/?/, "") || "";

  const ROUTES: NavRoute[] = [
    { seg: "", title: "Overview", desc: "Everything running under " + org.name + " right now.", icon: "dash", group: "Workspace" },
    { seg: "pods", title: "Pods", desc: "Containerised GPU workloads. Billed per second while running.", icon: "pod", group: "Compute" },
    { seg: "clusters", title: "Clusters", desc: "Reserved multi-node environments with a dedicated fabric.", icon: "clu", group: "Compute" },
    { seg: "storage", title: "Storage", desc: "Volumes and buckets. Egress and requests are never charged.", icon: "sto", group: "Compute" },
    { seg: "networking", title: "Networking", desc: "VPCs, subnets, security groups and floating addresses.", icon: "net", group: "Compute" },
    { seg: "keys", title: "API keys", desc: "Scoped credentials for the API, CLI, SDKs and Terraform.", icon: "key", group: "Access" },
    { seg: "team", title: "Team", desc: "Members, roles and multi-factor enforcement.", icon: "team", group: "Access" },
    { seg: "billing", title: "Billing", desc: "Usage, invoices and spend caps for this project.", icon: "bill", group: "Account" },
    { seg: "support", title: "Support", desc: "Tickets. P1 gets a human within fifteen minutes, always.", icon: "sup", group: "Account" },
    { seg: "settings", title: "Settings", desc: "Organisation, security and notification preferences.", icon: "set", group: "Account" },
  ];

  // Group routes for render
  const routeGroups: { [key: string]: NavRoute[] } = {};
  const groupOrder: string[] = [];
  ROUTES.forEach((r) => {
    if (!routeGroups[r.group]) {
      routeGroups[r.group] = [];
      groupOrder.push(r.group);
    }
    routeGroups[r.group].push(r);
  });

  // Dynamic status counters for navigation menu
  const getNavCounter = (seg: string) => {
    if (seg === "pods") {
      return pods.filter((p) => p.state === "running").length;
    }
    if (seg === "clusters") {
      return clusters.length;
    }
    if (seg === "support") {
      return tickets.filter((t) => t.state !== "Resolved").length;
    }
    return 0;
  };

  const currentRoute = ROUTES.find((r) => r.seg === activeSeg) || ROUTES[0];

  const handleProjectSelect = (p: string) => {
    switchProject(p);
    setProjectMenuOpen(false);
  };

  return (
    <div className="console-body">
      <div className="app-container">
        {/* Mobile scrim */}
        <div
          className={`scrim ${sidebarOpen ? "on" : ""}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar navigation */}
        <aside className={`side ${sidebarOpen ? "open" : ""}`} id="side">
          <div className="side-top">
            <Link className="brand" href="/">
              <svg viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <rect x=".5" y=".5" width="25" height="25" stroke="#2E6BFF" />
                <rect x="5" y="5" width="7" height="7" fill="#2E6BFF" />
                <rect x="14" y="5" width="7" height="7" fill="#4DE1FF" opacity=".55" />
                <rect x="5" y="14" width="7" height="7" fill="#4DE1FF" opacity=".55" />
                <rect x="14" y="14" width="7" height="7" fill="#2E6BFF" />
              </svg>
              <span>
                MSL <s>/ Console</s>
              </span>
            </Link>
            
            <div style={{ position: "relative" }}>
              <button
                className="proj"
                onClick={() => setProjectMenuOpen(!projectMenuOpen)}
              >
                <span>
                  {org.name} / {org.project === "proj_research" ? "Research" : org.project === "proj_production" ? "Production" : "Sandbox"}
                </span>
                <i>▼</i>
              </button>
              {projectMenuOpen && (
                <div
                  className="notch"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    background: "var(--steel)",
                    border: "1px solid var(--wire-2)",
                    borderRadius: "3px",
                    zIndex: 60,
                    marginTop: "5px",
                  }}
                >
                  {org.projects.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleProjectSelect(p)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 12px",
                        fontSize: "11px",
                        fontFamily: "var(--mono)",
                        borderBottom: "1px solid var(--wire)",
                        transition: ".15s",
                      }}
                      className="proj-item"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav>
            {groupOrder.map((group) => (
              <div key={group}>
                <h6>{group}</h6>
                {routeGroups[group].map((r) => {
                  const isSelected = activeSeg === r.seg;
                  const counter = getNavCounter(r.seg);
                  return (
                    <Link
                      key={r.seg}
                      href={`/console${r.seg ? `/${r.seg}` : ""}`}
                      className={isSelected ? "on" : ""}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {NAV_ICONS[r.icon]}
                      <span>{r.title}</span>
                      {counter > 0 && <span className="cnt">{counter}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="side-foot">
            <div className="usr">
              <div className="avatar">{user.initials}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="n">{user.name}</div>
                <div className="e">{user.email}</div>
              </div>
              <button
                className="x"
                id="signout"
                title="Sign out"
                onClick={logout}
              >
                ⏻
              </button>
            </div>
          </div>
        </aside>

        {/* Main content body */}
        <div className="main-content">
          {/* Top Headerbar */}
          <header className="topbar">
            <button className="burger" onClick={() => setSidebarOpen(true)}>
              <span></span>
            </button>
            
            <div className="where">
              {currentRoute.group} / <b>{currentRoute.title}</b>
            </div>

            <div className="tools">
              <div className="pill live">
                <span className="pulse"></span> live
              </div>
              
              <select
                className="pill"
                style={{ border: "1px solid var(--wire)", padding: "4px 8px", background: "var(--rack)", color: "inherit", textTransform: "uppercase" }}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="BOM1">BOM1 — Mumbai</option>
                <option value="PNQ1">PNQ1 — Pune</option>
                <option value="MAA1">MAA1 — Chennai</option>
                <option value="DEL1">DEL1 — Noida</option>
              </select>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setDeployModalOpen(true)}
              >
                Deploy <span className="ar">↗</span>
              </button>
            </div>
          </header>

          {/* Console View body */}
          <main className="console-body-content">
            <div className="phead">
              <div>
                <h1>{currentRoute.title}</h1>
                <p>{currentRoute.desc}</p>
              </div>
            </div>
            <div className="view on">
              {children}
            </div>
          </main>
        </div>
        <DeployModal />
      </div>
    </div>
  );
}
