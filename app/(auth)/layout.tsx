"use client";

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-body">
      <div className="auth">
        <div className="auth-l">
          {children}
        </div>
        
        <div className="auth-r">
          <div className="panel-card">
            <div className="h">
              <span>Fleet · Vantara AI</span>
              <span style={{ color: "var(--signal)" }}>
                <i className="pulse"></i> Live
              </span>
            </div>
            <div className="b" style={{ padding: 0 }}>
              <div className="rows">
                <div>
                  <div>
                    <div className="t">llama-ft-8x</div>
                    <div className="s">8 × H100 SXM · BOM1</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>Running
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">vllm-chat-prod</div>
                    <div className="s">2 × H100 SXM · BOM1</div>
                  </div>
                  <span className="b- b-run">
                    <i></i>Running
                  </span>
                </div>
                <div>
                  <div>
                    <div className="t">eval-batch</div>
                    <div className="s">4 × A100 SXM · PNQ1</div>
                  </div>
                  <span className="b- b-prov">
                    <i></i>Provisioning
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mini">
            <div>
              <div className="v">
                96<s>%</s>
              </div>
              <div className="l">Fleet utilisation</div>
            </div>
            <div>
              <div className="v">
                38<s>s</s>
              </div>
              <div className="l">Median pod start</div>
            </div>
            <div>
              <div className="v">₹0</div>
              <div className="l">Egress charges</div>
            </div>
          </div>
          
          <div>
            <p className="quote">
              "We moved 400 TB off a hyperscaler and the transfer bill was the last one we ever paid."
            </p>
            <p className="by">Head of Infrastructure · Vantara AI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
