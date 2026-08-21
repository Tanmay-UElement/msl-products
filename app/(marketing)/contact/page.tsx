"use client";

import React, { useState } from "react";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    need: "GPU capacity — on-demand",
    msg: "",
  });
  
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email } = formData;
    
    if (!name.trim() || !email.trim().includes("@")) {
      setStatus({
        message: "Add a name and a work email so we know where to reply.",
        isError: true,
      });
      return;
    }

    setStatus({
      message: "Sent. An engineer will reply within one working day.",
      isError: false,
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      need: "GPU capacity — on-demand",
      msg: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">Contact</p>
          <h1>
            Tell us the
            <br />
            workload
          </h1>
          <p className="lede">
            Sizing questions go to an engineer, not a queue. If you already know what you need, say so and we'll skip straight to a quote.
          </p>
        </div>
      </div>

      {/* Form Split */}
      <ScrollReveal className="band pad" style={{ marginTop: "48px" }}>
        <div className="shell split split-t">
          <form className="stack" id="cform" onSubmit={handleSubmit} noValidate>
            <div className="f2">
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="field">
                <span>Work email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="f2">
              <label className="field">
                <span>Company</span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>
              <label className="field">
                <span>What do you need</span>
                <select name="need" value={formData.need} onChange={handleChange}>
                  <option>GPU capacity — on-demand</option>
                  <option>GPU capacity — reserved cluster</option>
                  <option>Compute and storage</option>
                  <option>Managed platform</option>
                  <option>Migration from another provider</option>
                  <option>Something else</option>
                </select>
              </label>
            </div>
            <label className="field">
              <span>The workload, in your words</span>
              <textarea
                name="msg"
                value={formData.msg}
                onChange={handleChange}
                placeholder="Model size, node count, deadline, residency constraints — whatever you already know."
              ></textarea>
            </label>
            <div className="btnrow">
              <button type="submit" className="btn btn-primary">
                Send it <span className="ar">↗</span>
              </button>
            </div>
            <p
              className="note"
              id="fmsg"
              style={{ color: status ? (status.isError ? "var(--thermal)" : "var(--signal)") : "var(--ink-3)" }}
            >
              {status ? status.message : "We reply within one working day. No sequence, no drip campaign."}
            </p>
          </form>

          {/* Direct lines & Offices */}
          <div className="stack">
            <p className="eyebrow">Direct lines</p>
            <ul className="bullets">
              <li>
                <b>Sales and capacity</b> — sales@mslproducts.com
              </li>
              <li>
                <b>Support, 24×7</b> — support@mslproducts.com
              </li>
              <li>
                <b>Security and disclosure</b> — security@mslproducts.com
              </li>
              <li>
                <b>Media</b> — press@mslproducts.com
              </li>
              <li>
                <b>Phone</b> — +91 20 4900 1200
              </li>
            </ul>
            
            <p className="eyebrow" style={{ marginTop: "34px" }}>
              Offices
            </p>
            <div className="notch" style={{ padding: "24px" }}>
              <p className="mono" style={{ fontSize: "12px", color: "var(--blue-hi)", letterSpacing: ".1em" }}>
                PUNE — HEAD OFFICE
              </p>
              <p style={{ color: "var(--ink-2)", fontSize: ".9375rem", marginTop: "8px" }}>
                Hinjawadi Phase II, Pune 411057, Maharashtra
              </p>
              <p
                className="mono"
                style={{
                  fontSize: "12px",
                  color: "var(--blue-hi)",
                  letterSpacing: ".1em",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--wire)",
                }}
              >
                MUMBAI — BOM1 CAMPUS
              </p>
              <p style={{ color: "var(--ink-2)", fontSize: ".9375rem", marginTop: "8px" }}>
                Millennium Business Park, Navi Mumbai 400710
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
