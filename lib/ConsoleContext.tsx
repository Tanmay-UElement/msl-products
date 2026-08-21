"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
  initials: string;
  role: string;
  mfa: boolean;
}

export interface Org {
  name: string;
  project: string;
  projects: string[];
}

export interface Spend {
  used: number;
  cap: number;
}

export interface Pod {
  id: string;
  name: string;
  gpu: string;
  region: string;
  state: string;
  up: string;
  rate: number;
  img: string;
}

export interface Cluster {
  id: string;
  name: string;
  nodes: number;
  gpu: string;
  gpus: number;
  region: string;
  term: string;
  health: string;
  util: number;
}

export interface Volume {
  id: string;
  name: string;
  tier: string;
  size: string;
  used: number;
  region: string;
  attached: string;
}

export interface Bucket {
  name: string;
  tier: string;
  size: string;
  objects: string;
  region: string;
}

export interface Key {
  id: string;
  name: string;
  prefix: string;
  role: string;
  created: string;
  used: string;
}

export interface Member {
  name: string;
  email: string;
  role: string;
  mfa: boolean;
  last: string;
}

export interface Invoice {
  id: string;
  period: string;
  amount: number;
  status: string;
  due: string;
}

export interface Ticket {
  id: string;
  subject: string;
  sev: string;
  state: string;
  updated: string;
}

interface ConsoleContextType {
  user: User;
  org: Org;
  region: string;
  spend: Spend;
  pods: Pod[];
  clusters: Cluster[];
  volumes: Volume[];
  buckets: Bucket[];
  keys: Key[];
  team: Member[];
  invoices: Invoice[];
  tickets: Ticket[];
  authed: boolean;
  activeToast: string | null;
  isDeployModalOpen: boolean;
  setDeployModalOpen: (open: boolean) => void;
  
  // State Mutators
  signIn: () => void;
  signUp: (first: string, last: string, email: string, company: string, region: string) => void;
  logout: () => void;
  toast: (msg: string) => void;
  setRegion: (reg: string) => void;
  switchProject: (proj: string) => void;
  addPod: (pod: Omit<Pod, "id" | "state" | "up">) => void;
  stopPod: (id: string) => void;
  startPod: (id: string) => void;
  addKey: (name: string, role: string, expires: string) => string;
  revokeKey: (id: string) => void;
  inviteMember: (email: string, role: string) => void;
  enforceMfa: () => void;
  updateSpendCap: (cap: number) => void;
  addVolume: (vol: Omit<Volume, "id" | "used" | "attached">) => void;
  addBucket: (buc: Bucket) => void;
  openTicket: (subject: string, sev: string) => void;
  saveOrg: (name: string, region: string, technicalContact: string) => void;
  changePassword: () => void;
  revokeOtherSessions: () => void;
  exportData: () => void;
  closeAccount: () => void;
}

const ConsoleContext = createContext<ConsoleContextType | undefined>(undefined);

export const useConsole = () => {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error("useConsole must be used within a ConsoleProvider");
  }
  return context;
};

export const ConsoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [isDeployModalOpen, setDeployModalOpen] = useState(false);

  const [user, setUser] = useState<User>({
    name: "Aditi Rao",
    email: "aditi@vantara.ai",
    initials: "AR",
    role: "Owner",
    mfa: true,
  });

  const [org, setOrg] = useState<Org>({
    name: "Vantara AI",
    project: "proj_research",
    projects: ["Research", "Production", "Sandbox"],
  });

  const [region, setRegionState] = useState("BOM1");

  const [spend, setSpend] = useState<Spend>({
    used: 1847320,
    cap: 2500000,
  });

  const [pods, setPods] = useState<Pod[]>([
    { id: "pod-7fk29d", name: "llama-ft-8x", gpu: "8 × H100 SXM", region: "BOM1", state: "running", up: "4d 02h", rate: 1912, img: "msl/pytorch:2.4-cu124" },
    { id: "pod-3c9x1a", name: "vllm-chat-prod", gpu: "2 × H100 SXM", region: "BOM1", state: "running", up: "19d 11h", rate: 478, img: "msl/vllm:0.6" },
    { id: "pod-b21m7e", name: "embed-service", gpu: "1 × L40S", region: "PNQ1", state: "running", up: "19d 11h", rate: 99, img: "msl/vllm:0.6" },
    { id: "pod-k48z0q", name: "eval-batch", gpu: "4 × A100 SXM", region: "PNQ1", state: "provisioning", up: "—", rate: 596, img: "msl/pytorch:2.4-cu124" },
    { id: "pod-x92w5r", name: "dev-notebook", gpu: "1 × RTX 4090", region: "PNQ1", state: "stopped", up: "—", rate: 0, img: "msl/pytorch:2.4-cu124" },
    { id: "pod-f10t3y", name: "render-test", gpu: "2 × RTX 6000 Ada", region: "PNQ1", state: "error", up: "—", rate: 0, img: "msl/render:ada" },
  ]);

  const [clusters] = useState<Cluster[]>([
    { id: "clu-9a4b2c", name: "llama-70b-train", nodes: 8, gpu: "H200 SXM", gpus: 64, region: "BOM1", term: "Reserved 12 mo", health: "8/8 healthy", util: 87 },
    { id: "clu-2f8e6d", name: "cfd-sim", nodes: 4, gpu: "A100 SXM", gpus: 32, region: "PNQ1", term: "Reserved 12 mo", health: "4/4 healthy", util: 41 },
  ]);

  const [volumes, setVolumes] = useState<Volume[]>([
    { id: "vol-4a1c", name: "runs", tier: "Shared filesystem", size: "120 TiB", used: 68, region: "BOM1", attached: "clu-9a4b2c" },
    { id: "vol-9e2f", name: "scratch", tier: "Block NVMe", size: "2 TiB", used: 34, region: "BOM1", attached: "pod-7fk29d" },
    { id: "vol-7b3d", name: "vectordb", tier: "Block NVMe", size: "4 TiB", used: 71, region: "PNQ1", attached: "pod-b21m7e" },
  ]);

  const [buckets, setBuckets] = useState<Bucket[]>([
    { name: "vantara-datasets", tier: "Object Standard", size: "41.2 TB", objects: "8.4 M", region: "BOM1" },
    { name: "vantara-checkpoints", tier: "Object Standard", size: "112.8 TB", objects: "214 K", region: "BOM1" },
    { name: "vantara-archive", tier: "Object Archive", size: "308.1 TB", objects: "1.2 M", region: "MAA1" },
  ]);

  const [keys, setKeys] = useState<Key[]>([
    { id: "key_7f2a", name: "terraform-ci", prefix: "msl_live_7f2a", role: "Deployer", created: "12 Mar 2026", used: "2 min ago" },
    { id: "key_1b9c", name: "training-jobs", prefix: "msl_live_1b9c", role: "Deployer", created: "04 Jan 2026", used: "11 h ago" },
    { id: "key_d40e", name: "readonly-dashboards", prefix: "msl_live_d40e", role: "Viewer", created: "22 Nov 2025", used: "3 d ago" },
  ]);

  const [team, setTeam] = useState<Member[]>([
    { name: "Aditi Rao", email: "aditi@vantara.ai", role: "Owner", mfa: true, last: "Now" },
    { name: "Karan Mehta", email: "karan@vantara.ai", role: "Admin", mfa: true, last: "2 h ago" },
    { name: "Sneha Iyer", email: "sneha@vantara.ai", role: "Deployer", mfa: true, last: "Yesterday" },
    { name: "Rohit Nair", email: "rohit@vantara.ai", role: "Deployer", mfa: false, last: "4 d ago" },
    { name: "Priya Das", email: "priya@vantara.ai", role: "Viewer", mfa: true, last: "2 w ago" },
  ]);

  const [invoices] = useState<Invoice[]>([
    { id: "INV-2026-0731", period: "July 2026", amount: 2104880, status: "paid", due: "15 Aug 2026" },
    { id: "INV-2026-0630", period: "June 2026", amount: 1988240, status: "paid", due: "15 Jul 2026" },
    { id: "INV-2026-0531", period: "May 2026", amount: 1743100, status: "paid", due: "15 Jun 2026" },
    { id: "INV-2026-0430", period: "April 2026", amount: 1512760, status: "paid", due: "15 May 2026" },
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "TKT-4192", subject: "NCCL timeout on clu-9a4b2c node 6", sev: "P2", state: "In progress", updated: "38 min ago" },
    { id: "TKT-4177", subject: "Request additional H200 quota in BOM1", sev: "P4", state: "Waiting on you", updated: "6 h ago" },
    { id: "TKT-4109", subject: "Invoice INV-2026-0630 GSTIN correction", sev: "P4", state: "Resolved", updated: "12 d ago" },
  ]);

  // Toast System
  const toast = (msg: string) => {
    setActiveToast(msg);
  };

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  // Auth methods
  const signIn = () => {
    setAuthed(true);
    router.push("/console");
  };

  const signUp = (first: string, last: string, email: string, company: string, reg: string) => {
    setUser({
      name: `${first} ${last}`,
      email,
      initials: (first[0] || "A") + (last[0] || "B"),
      role: "Owner",
      mfa: false,
    });
    setOrg((prev) => ({
      ...prev,
      name: company || prev.name,
    }));
    setRegionState(reg.split(" ")[0]);
    setAuthed(true);
    toast("Account created. Evaluation credits applied.");
    router.push("/console");
  };

  const logout = () => {
    setAuthed(false);
    toast("Signed out");
    router.push("/login");
  };

  // State mutators
  const setRegion = (reg: string) => {
    setRegionState(reg);
    toast(`Default region set to ${reg}`);
  };

  const switchProject = (proj: string) => {
    setOrg((prev) => ({
      ...prev,
      project: `proj_${proj.toLowerCase()}`,
    }));
    toast(`Switched to ${proj}`);
  };

  const addPod = (pod: Omit<Pod, "id" | "state" | "up">) => {
    const id = "pod-" + Math.random().toString(36).substring(2, 8);
    const newPod: Pod = {
      ...pod,
      id,
      state: "provisioning",
      up: "—",
    };
    setPods((prev) => [newPod, ...prev]);
    toast(`Provisioning ${id}…`);

    // Simulate transition to running
    setTimeout(() => {
      setPods((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                state: "running",
                up: "0d 00h",
                rate: pod.rate, // ensure rate is set correctly
              }
            : p
        )
      );
      toast(`${id} running in 38s`);
    }, 2400);
  };

  const stopPod = (id: string) => {
    setPods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, state: "stopped", up: "—", rate: 0 } : p))
    );
    const name = pods.find((p) => p.id === id)?.name || id;
    toast(`${name} stopped — volumes retained`);
  };

  const startPod = (id: string) => {
    setPods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, state: "provisioning" } : p))
    );
    const name = pods.find((p) => p.id === id)?.name || id;
    toast(`Provisioning ${name}…`);

    setTimeout(() => {
      setPods((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const isH100 = p.gpu.includes("H100");
            const is4090 = p.gpu.includes("4090");
            const rate = isH100 ? 239 : is4090 ? 44 : 99;
            return {
              ...p,
              state: "running",
              up: "0d 00h",
              rate,
            };
          }
          return p;
        })
      );
      toast(`${name} running in 38s`);
    }, 2200);
  };

  const addKey = (name: string, role: string, expires: string) => {
    const suffix = Math.random().toString(16).substring(2, 6);
    const secret = "msl_live_" + suffix + Math.random().toString(16).substring(2, 26);
    const newKey: Key = {
      id: "key_" + suffix,
      name: name || "untitled-key",
      prefix: "msl_live_" + suffix,
      role,
      created: "21 Aug 2026",
      used: "Never",
    };
    setKeys((prev) => [newKey, ...prev]);
    return secret;
  };

  const revokeKey = (id: string) => {
    const key = keys.find((k) => k.id === id);
    setKeys((prev) => prev.filter((k) => k.id !== id));
    if (key) toast(`${key.name} revoked`);
  };

  const inviteMember = (email: string, role: string) => {
    const name = email
      .split("@")[0]
      .replace(/\./g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const newMember: Member = {
      name,
      email,
      role,
      mfa: false,
      last: "Invited",
    };
    setTeam((prev) => [...prev, newMember]);
    toast(`Invite sent to ${email}`);
  };

  const enforceMfa = () => {
    setTeam((prev) => prev.map((m) => ({ ...m, mfa: true })));
    toast("MFA now required for all members");
  };

  const updateSpendCap = (cap: number) => {
    setSpend((prev) => ({ ...prev, cap }));
    // format as Lakh/Cr or direct inr
    const capStr = cap >= 100000 ? `₹${(cap / 100000).toFixed(2)} L` : `₹${cap.toLocaleString()}`;
    toast(`Spend cap updated to ${capStr}`);
  };

  const addVolume = (vol: Omit<Volume, "id" | "used" | "attached">) => {
    const id = "vol-" + Math.random().toString(36).substring(2, 6);
    const newVol: Volume = {
      ...vol,
      id,
      used: 0,
      attached: "—",
    };
    setVolumes((prev) => [...prev, newVol]);
    toast("Volume creation opens in the resource wizard");
  };

  const addBucket = (buc: Bucket) => {
    setBuckets((prev) => [...prev, buc]);
    toast("Bucket creation opens in the resource wizard");
  };

  const openTicket = (subject: string, sev: string) => {
    const id = "TKT-" + Math.floor(4000 + Math.random() * 1000);
    const newTkt: Ticket = {
      id,
      subject,
      sev,
      state: "In progress",
      updated: "Just now",
    };
    setTickets((prev) => [newTkt, ...prev]);
    toast("Ticket form opened");
  };

  const saveOrg = (name: string, reg: string, technicalContact: string) => {
    setOrg((prev) => ({ ...prev, name }));
    toast("Organisation settings saved");
  };

  const changePassword = () => {
    toast("Password change link sent to your email");
  };

  const revokeOtherSessions = () => {
    toast("All other sessions signed out");
  };

  const exportData = () => {
    toast("Export started — you will get a link within the hour");
  };

  const closeAccount = () => {
    toast("Account closure requires owner confirmation by email");
  };

  return (
    <ConsoleContext.Provider
      value={{
        user,
        org,
        region,
        spend,
        pods,
        clusters,
        volumes,
        buckets,
        keys,
        team,
        invoices,
        tickets,
        authed,
        activeToast,
        isDeployModalOpen,
        setDeployModalOpen,
        signIn,
        signUp,
        logout,
        toast,
        setRegion,
        switchProject,
        addPod,
        stopPod,
        startPod,
        addKey,
        revokeKey,
        inviteMember,
        enforceMfa,
        updateSpendCap,
        addVolume,
        addBucket,
        openTicket,
        saveOrg,
        changePassword,
        revokeOtherSessions,
        exportData,
        closeAccount,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};
