"use client";

import React from "react";
import { useConsole } from "../lib/ConsoleContext";

export const Toast: React.FC = () => {
  const { activeToast } = useConsole();

  return (
    <div className={`toast ${activeToast ? "on" : ""}`}>
      {activeToast}
    </div>
  );
};
