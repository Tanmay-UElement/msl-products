"use client";

import React, { useState } from "react";

interface CodeBlockProps {
  title: string;
  codeText: string;
  displayCode: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, codeText, displayCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code">
      <div className="code-h">
        <span>{title}</span>
        <button className="copy" onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="code-b">{displayCode}</div>
    </div>
  );
};
