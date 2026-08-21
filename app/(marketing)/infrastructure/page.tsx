import React from "react";
import Link from "next/link";
import { ScrollReveal } from "../../../components/marketing/ScrollReveal";

export default function InfrastructurePage() {
  return (
    <div className="page on">
      {/* Hero */}
      <div className="shell hero">
        <div className="stack" style={{ maxWidth: "820px" }}>
          <p className="eyebrow">Datacenters</p>
          <h1>
            Buildings
            <br />
            we can
            <br />
            show you
          </h1>
          <p className="lede">
            Four regions, all in India, all Tier III or better. You can visit any of them — bring your auditor, we'll book the escort.
          </p>
          <div className="btnrow">
            <Link href="/contact" className="btn btn-ghost">
              Request a site visit <span className="ar">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Regions list */}
      <ScrollReveal className="band pad" style={{ marginTop: "56px" }}>
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Regions</p>
            <h2 className="sect">
              Where the
              <br />
              racks are
            </h2>
          </div>
          <div>
            <div className="region">
              <span className="code-t">BOM1</span>
              <div>
                <div className="city">Mumbai — Navi Mumbai campus</div>
                <div className="meta">Tier IV · 8 MW · H200 · H100 · MI300X · 400G IB</div>
              </div>
              <span className="tag">Live</span>
            </div>
            <div className="region">
              <span className="code-t">PNQ1</span>
              <div>
                <div className="city">Pune — Hinjawadi</div>
                <div className="meta">Tier III · 5 MW · H200 · H100 · L40S · RTX 6000 Ada</div>
              </div>
              <span className="tag">Live</span>
            </div>
            <div className="region">
              <span className="code-t">MAA1</span>
              <div>
                <div className="city">Chennai — Ambattur</div>
                <div className="meta">Tier III · 3 MW · H100 · A100 · L40S · subsea landing adjacent</div>
              </div>
              <span className="tag">Live</span>
            </div>
            <div className="region">
              <span className="code-t">DEL1</span>
              <div>
                <div className="city">Noida — Sector 62</div>
                <div className="meta">Tier III · 2 MW · A100 · L40S · RTX 6000 Ada</div>
              </div>
              <span className="tag">Live</span>
            </div>
            <div className="region">
              <span className="code-t">HYD1</span>
              <div>
                <div className="city">Hyderabad — Shamshabad</div>
                <div className="meta">Tier III · 6 MW planned · liquid-cooled GPU halls</div>
              </div>
              <span className="tag soon">Q1 2027</span>
            </div>
            <div className="region">
              <span className="code-t">BLR1</span>
              <div>
                <div className="city">Bengaluru — Whitefield</div>
                <div className="meta">Tier III · 4 MW planned · inference and edge</div>
              </div>
              <span className="tag soon">Q3 2027</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Facility Redundancy */}
      <ScrollReveal className="band band-tint pad">
        <div className="shell stack-lg">
          <div className="stack-sm">
            <p className="eyebrow">Facility</p>
            <h2 className="sect">
              Power, cooling,
              <br />
              and the boring
              <br />
              redundancy
            </h2>
          </div>
          <div className="cards cards-4">
            <div className="card">
              <span className="k">Power</span>
              <h4>2N to the rack</h4>
              <p>Dual utility feeds, N+1 generators with 72 hours of fuel on site, and A/B PDUs on every cabinet.</p>
            </div>
            <div className="card">
              <span className="k">Cooling</span>
              <h4>Up to 120 kW per rack</h4>
              <p>Rear-door heat exchangers on the GPU halls, direct-to-chip liquid on the H200 rows, N+1 chillers throughout.</p>
            </div>
            <div className="card">
              <span className="k">Network</span>
              <h4>Diverse fibre paths</h4>
              <p>Multiple carriers entering through separate conduits, with private peering at the major Indian exchanges.</p>
            </div>
            <div className="card">
              <span className="k">Physical</span>
              <h4>Five-layer access</h4>
              <p>Mantraps, biometrics, escorted visits and 90-day CCTV retention. Cages available for single-tenant deployments.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Compliance & SLA split */}
      <ScrollReveal className="band pad">
        <div className="shell split split-t">
          <div className="stack">
            <p className="eyebrow">Compliance</p>
            <h2 className="sect">
              Evidence, not
              <br />
              assurances
            </h2>
            <p className="lede">
              Certificates, audit reports and our shared-responsibility matrix are available under NDA through the trust portal. Ask and you'll have them the same day.
            </p>
            <div className="chips">
              <span className="chip">ISO/IEC 27001</span>
              <span className="chip">ISO 27017</span>
              <span className="chip">ISO 27018</span>
              <span className="chip">SOC 2 Type II</span>
              <span className="chip">PCI DSS 4.0</span>
              <span className="chip">MeitY empanelled</span>
              <span className="chip">RBI localisation</span>
              <span className="chip">DPDP Act 2023</span>
              <span className="chip">CERT-In directions</span>
              <span className="chip">Uptime Institute Tier III/IV</span>
            </div>
          </div>
          
          <div className="stack">
            <p className="eyebrow">Service commitments</p>
            <div className="ledger" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <p className="v">99.99<s>%</s></p>
                <p className="l">Compute availability</p>
              </div>
              <div>
                <p className="v">99.99<s>9%</s></p>
                <p className="l">Object storage availability</p>
              </div>
              <div>
                <p className="v">&lt;15<s>min</s></p>
                <p className="l">P1 response, 24×7</p>
              </div>
              <div>
                <p className="v">30<s>×</s></p>
                <p className="l">Credit multiplier on breach</p>
              </div>
            </div>
            <p className="note">Full SLA terms published in the master service agreement — no separate negotiation needed to read them.</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
