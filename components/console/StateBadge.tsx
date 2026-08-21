"use client";

import React from "react";

export const StateBadge: React.FC<{ state: string }> = ({ state }) => {
  const config: Record<string, [string, string]> = {
    running: ["b-run", "Running"],
    provisioning: ["b-prov", "Provisioning"],
    stopped: ["b-stop", "Stopped"],
    error: ["b-err", "Failed"],
  };
  const [cls, label] = config[state] || ["b-stop", state];
  
  return (
    <span className={`b- ${cls}`}>
      <i></i>{label}
    </span>
  );
};
