"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Film from "@/components/Film";
import {
  CANON_LOCKUPS,
  ROUTES,
  CONVERT_SPINE,
  ASSETS,
  APPROVED_LINES,
  DIAGNOSTIC_SYSTEM,
  BUYER_ORDER_STEPS,
  SOCIAL_CROP_RULES,
  THREE_SECOND_END_CARD,
  DEPARTMENT_MATRIX,
  COMMAND_CENTER_FILES,
  HUB_SECTIONS,
  type HubSection,
} from "@/config/hub-handbook";

type Decision = "ship" | "hold" | "skip";

function laneFromHash(): HubSection["id"] {
  if (typeof window === "undefined") return "canon";
  const hash = window.location.hash.replace("#", "");
  return HUB_SECTIONS.some((s) => s.id === hash) ? (hash as HubSection["id"]) : "canon";
}

export default function LaunchHandbook() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [copied, setCopied] = useState("");
  const [activeLineCategory, setActiveLineCategory] = useState<string>("All");
  const [activeSection, setActiveSection] = useState<HubSection["id"]>("canon");

  useEffect(() => {
    const saved = window.localStorage.getItem("tbtx-launch-decisions");
    if (saved) {
      try {
        setDecisions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    const fromHash = laneFromHash();
    if (fromHash !== "canon") setActiveSection(fromHash);
  }, []);

  const counts = useMemo(
    () => ({
      ship: Object.values(decisions).filter((v) => v === "ship").length,
      hold: Object.values(decisions).filter((v) => v === "hold").length,
      skip: Object.values(decisions).filter((v) => v === "skip").length,
    }),
    [decisions]
  );

  const decide = (id: string, value: Decision) => {
    const next = { ...decisions, [id]: value };
    setDecisions(next);
    window.localStorage.setItem("tbtx-launch-decisions", JSON.stringify(next));
  };

  const copy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1400);
  };

  const selectLane = (id: HubSection["id"]) => {
    setActiveSection(id);
    window.scrollTo(0, 0);
  };

  const filteredLines = useMemo(() => {
    if (activeLineCategory === "All") return APPROVED_LINES;
    return APPROVED_LINES.filter((l) => l.category === activeLineCategory);
  }, [activeLineCategory]);

  const routeGroups = useMemo(() => {
    const groups: Record<string, typeof ROUTES> = {
      "Front Door": [],
      "Diagnose": [],
      "Offer": [],
      "Foundation": [],
      "Held": [],
    };
    ROUTES.forEach((r) => {
      if (groups[r.group]) {
        groups[r.group].push(r);
      }
    });
    return groups;
  }, []);

  const activeLane = HUB_SECTIONS.find((s) => s.id === activeSection) ?? HUB_SECTIONS[0];

  return (
    <div className="launch-hub-root">
      <nav className="launch-hub__rail" aria-label="Hub workstreams" role="tablist">
        {HUB_SECTIONS.map((lane) => {
          const isSelected = lane.id === activeSection;
          return (
            <button
              key={lane.id}
              type="button"
              role="tab"
              id={`hub-tab-${lane.id}`}
              aria-selected={isSelected}
              aria-controls={lane.id}
              tabIndex={0}
              className={`launch-hub__tab ${isSelected ? "is-active" : ""}`}
              onClick={() => selectLane(lane.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectLane(lane.id);
                }
              }}
            >
              <span className="launch-hub__tab-index">{lane.index}</span>
              <span className="launch-hub__tab-label">{lane.label}</span>
            </button>
          );
        })}
      </nav>

      <main className="launch-surface">
        <div className="launch-hub__masthead">
          <Link href="/tbtx">Public story</Link>
          <span>TBTX Command Center / Internal Handbook</span>
          <strong className="launch-hub__masthead-lane">
            {activeLane.index} / {activeLane.label}
          </strong>
          <div className="launch-hub__masthead-counts">
            <span>
              <b>{counts.ship}</b> Ship
            </span>
            <span>
              <b>{counts.hold}</b> Hold
            </span>
            <span>
              <b>{counts.skip}</b> Skip
            </span>
          </div>
        </div>

        {activeSection === "canon" && (
          <>
            <header className="launch-surface__hero">
              <Film
                className="launch-surface__film"
                src="/media/desk-fog-loop.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/media/fog-context.jpg"
              />
              <div className="launch-surface__fog" />
              <div className="launch-surface__lockup">
                <p>MASTER 2026.09.02 / Internal Handbook</p>
                <h1>
                  Put the campaign
                  <br />
                  to work.
                </h1>
              </div>
            </header>

            <section
              className="launch-surface__section launch-surface__canon"
              id="canon"
              role="tabpanel"
              aria-labelledby="hub-tab-canon"
            >
              <div className="launch-surface__intro">
                <p>00 / Canon</p>
                <h2>
                  Foundations &amp;
                  <br />
                  Locked Rules.
                </h2>
                <span>
                  The authoritative rules from TBTX_MASTER.md. Two public lockups, the locked CTA,
                  Noah&rsquo;s identity, and strict operating holds.
                </span>
              </div>

              <div className="launch-handbook__canon-grid">
                <div className="launch-card">
                  <div className="launch-card__eyebrow">Public Lockups (Two Units Only)</div>
                  <div className="launch-card__lockup-preview">
                    <div className="launch-card__lockup-unit">
                      <span className="launch-card__tag">Lockup 1 (Headline + Mutter)</span>
                      <h3>{CANON_LOCKUPS.hook}</h3>
                      <h4 className="text-amber-300">{CANON_LOCKUPS.mutter}</h4>
                    </div>
                    <div className="launch-card__lockup-unit">
                      <span className="launch-card__tag">Lockup 2 (Mantle &amp; Door)</span>
                      <p className="launch-card__mantle">{CANON_LOCKUPS.mantle}</p>
                      <div className="launch-card__badge-cta">{CANON_LOCKUPS.cta}</div>
                    </div>
                  </div>
                  <p className="launch-card__note">
                    Hook is largest. Mutter sits tight under it. Do not put &ldquo;Managing Digital Fog&rdquo;
                    between them. Public CTA is strictly <strong>Start Here</strong>.
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/10 text-xs">
                    <span className="text-white/50 block mb-0.5">TYPE PULL:</span>
                    <strong className="text-amber-300 font-mono tracking-wider">{CANON_LOCKUPS.typePull}</strong>
                    <p className="text-white/60 text-[11px] mt-1 mb-0">
                      After-state: <em>{CANON_LOCKUPS.afterState}</em>
                    </p>
                  </div>
                </div>

                <div className="launch-card">
                  <div className="launch-card__eyebrow">Gate 01 — Front Door Choice</div>
                  <h3 className="launch-card__title">{CANON_LOCKUPS.gateTitle}</h3>
                  <ul className="launch-card__list">
                    {CANON_LOCKUPS.gateChoices.map((c) => (
                      <li key={c.label}>
                        <strong className={c.label === "Stand up" ? "text-emerald-400" : "text-white/60"}>
                          {c.label}:
                        </strong>{" "}
                        <span>{c.result}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="launch-card__note">
                    The visitor must choose. Sit out and Sit back show consequence. Only Stand up opens the
                    site.
                  </p>
                </div>

                <div className="launch-card">
                  <div className="launch-card__eyebrow">Campaign Persona</div>
                  <h3 className="launch-card__title">{CANON_LOCKUPS.persona.name}</h3>
                  <p className="launch-card__subtitle">
                    aka <strong>{CANON_LOCKUPS.persona.alias}</strong> • {CANON_LOCKUPS.persona.title}
                  </p>
                  <p className="launch-card__body">{CANON_LOCKUPS.persona.note}</p>
                </div>

                <div className="launch-card launch-card--span2">
                  <div className="launch-card__eyebrow">Operating Holds (True in the Work)</div>
                  <div className="launch-card__holds-list">
                    {CANON_LOCKUPS.holds.map((h) => (
                      <div key={h.title} className="launch-card__hold-item">
                        <div className="launch-card__hold-header">
                          <strong>{h.title}</strong>
                          <span className="launch-card__hold-badge">{h.status}</span>
                        </div>
                        <p>{h.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === "routes" && (
          <section
            className="launch-surface__section launch-surface__routes"
            id="routes"
            role="tabpanel"
            aria-labelledby="hub-tab-routes"
          >
            <div className="launch-surface__intro">
              <p>01 / Routes</p>
              <h2>
                Grouped Surfaces &amp;
                <br />
                Authoritative Paths.
              </h2>
              <span>
                Categorized by Front Door, Diagnose, Offer, Foundation, and Held. Digital De-Fog Daily is the
                canonical personal offer label.
              </span>
            </div>

            <div className="launch-routes__grouped-container">
              {Object.entries(routeGroups).map(([groupName, routes]) => {
                if (routes.length === 0) return null;
                return (
                  <div key={groupName} className="launch-routes__group-block">
                    <div className="launch-routes__group-header">
                      <span className="launch-routes__group-tag">{groupName}</span>
                      <div className="launch-routes__group-divider" />
                    </div>
                    <div className="launch-surface__route-list">
                      {routes.map((route) => (
                        <article
                          key={route.path}
                          data-tone={route.tone}
                          className={route.held ? "launch-route--held" : ""}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <small>{route.group}</small>
                              {route.held && <span className="launch-route__held-tag">HELD</span>}
                            </div>
                            <h3>{route.label}</h3>
                            <p className="text-xs text-white/60 m-0">{route.note}</p>
                            <code className="text-[11px] font-mono text-emerald-400 block mt-1 break-all">
                              https://transformby10x.ai{route.path}
                            </code>
                          </div>
                          <button
                            onClick={() => copy(`https://transformby10x.ai${route.path}`)}
                            aria-label={`Copy link for ${route.label}`}
                          >
                            {copied.endsWith(route.path) ? "Copied" : "Copy link"}
                          </button>
                          <Link href={route.path}>{route.held ? "Preview" : "Open"}</Link>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeSection === "convert" && (
          <section
            className="launch-surface__section launch-surface__flow"
            id="convert"
            role="tabpanel"
            aria-labelledby="hub-tab-convert"
          >
            <div className="launch-surface__intro">
              <p>02 / Convert</p>
              <h2>
                The Conversion
                <br />
                Spine.
              </h2>
              <span>
                Recognition &rarr; Scan/Map &rarr; Digital De-Fog Daily or Blueprint &rarr; Aligned
                Infrastructure &rarr; Governed Execution. BizBot does not lead.
              </span>
            </div>

            <div className="launch-flow">
              {CONVERT_SPINE.map((item) => (
                <article key={item.step} className={item.held ? "launch-flow__item--held" : ""}>
                  <small>{item.step}</small>
                  <div>
                    <p>{item.phase}</p>
                    <h3>{item.summary}</h3>
                    <span>{item.details}</span>
                  </div>
                  <div className="launch-flow__doors">
                    {item.doors.map((door) => (
                      <Link key={door.path} href={door.path} className="launch-flow__door-btn">
                        {door.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "selects" && (
          <section
            className="launch-surface__section launch-surface__selects"
            id="selects"
            role="tabpanel"
            aria-labelledby="hub-tab-selects"
          >
            <div className="launch-surface__intro">
              <p>03 / Selects</p>
              <h2>
                Every image
                <br />
                has a job.
              </h2>
              <span>
                Green is approved. Purple is life. Blue is business. Gray carries category. State persists in
                localStorage.
              </span>
            </div>

            <div className="launch-surface__grid">
              {ASSETS.map((asset) => (
                <article
                  key={asset.id}
                  className="launch-asset"
                  data-lane={asset.lane}
                  data-decision={decisions[asset.id] || ""}
                >
                  <img src={asset.src} alt="" />
                  <div className="launch-asset__meta">
                    <small>{asset.format}</small>
                    <h3>{asset.title}</h3>
                    <p>{asset.use}</p>
                  </div>
                  <div className="launch-asset__actions">
                    {(["ship", "hold", "skip"] as Decision[]).map((value) => (
                      <button
                        key={value}
                        aria-pressed={decisions[asset.id] === value}
                        onClick={() => decide(asset.id, value)}
                      >
                        {value}
                      </button>
                    ))}
                    <a href={asset.src} download>
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "say" && (
          <section
            className="launch-surface__section launch-surface__lines"
            id="say"
            role="tabpanel"
            aria-labelledby="hub-tab-say"
          >
            <div className="launch-surface__intro">
              <p>04 / Say</p>
              <h2>
                Lines that
                <br />
                carry weight.
              </h2>
              <span>
                2026.09.02 campaign lines &amp; MASTER Section 5.6. Contractions by default, no em dashes,
                human voice. Click any line to copy.
              </span>
              <div className="launch-say__filters">
                {["All", "Campaign", "Ecosystem", "TBTX", "BBAI", "BBM"].map((cat) => (
                  <button
                    key={cat}
                    className={activeLineCategory === cat ? "active" : ""}
                    onClick={() => setActiveLineCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="launch-say__list">
              {filteredLines.map((item, index) => (
                <button key={item.line} onClick={() => copy(item.line)}>
                  <small>
                    0{index + 1} / {item.category}
                  </small>
                  <span>{item.line}</span>
                  <em>{copied === item.line ? "Copied" : "Copy"}</em>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeSection === "diagnose" && (
          <section
            className="launch-surface__section launch-surface__diagnose"
            id="diagnose"
            role="tabpanel"
            aria-labelledby="hub-tab-diagnose"
          >
            <div className="launch-surface__intro">
              <p>05 / Diagnose</p>
              <h2>
                Scoring Models &amp;
                <br />
                Prescriptions.
              </h2>
              <span>
                Public calculation standards without invented algorithm pillars. B2C uses 8 lived-day
                questions (MUST order). B2B uses 15 friction vectors.
              </span>
            </div>

            <div className="launch-handbook__diagnose-grid">
              <div className="launch-card">
                <div className="launch-card__eyebrow">B2C Personal Path</div>
                <h3 className="launch-card__title">{DIAGNOSTIC_SYSTEM.b2c.name}</h3>
                <p className="launch-card__subtitle">
                  {DIAGNOSTIC_SYSTEM.b2c.questionCount} Questions • {DIAGNOSTIC_SYSTEM.b2c.scoringType}
                </p>
                <div className="launch-card__bands">
                  {DIAGNOSTIC_SYSTEM.b2c.bands.map((b) => (
                    <div key={b.name} className="launch-card__band-item">
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-purple-300">{b.name}</strong>
                        <small className="text-white/50">{b.range}</small>
                      </div>
                      <p className="text-sm text-white/70 mb-1">{b.desc}</p>
                      <span className="text-xs text-amber-300 font-mono">{b.action}</span>
                    </div>
                  ))}
                </div>
                <p className="launch-card__note mt-3">{DIAGNOSTIC_SYSTEM.b2c.standard}</p>
              </div>

              <div className="launch-card">
                <div className="launch-card__eyebrow">B2B Business Path</div>
                <h3 className="launch-card__title">{DIAGNOSTIC_SYSTEM.b2b.name}</h3>
                <p className="launch-card__subtitle">
                  {DIAGNOSTIC_SYSTEM.b2b.questionCount} Questions • {DIAGNOSTIC_SYSTEM.b2b.scoringType}
                </p>
                <div className="launch-card__bands">
                  {DIAGNOSTIC_SYSTEM.b2b.bands.map((b) => (
                    <div key={b.name} className="launch-card__band-item">
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-blue-300">{b.name}</strong>
                        <small className="text-white/50">{b.range}</small>
                      </div>
                      <p className="text-sm text-white/70 mb-1">{b.desc}</p>
                      <span className="text-xs text-amber-300 font-mono">{b.action}</span>
                    </div>
                  ))}
                </div>
                <p className="launch-card__note mt-3">{DIAGNOSTIC_SYSTEM.b2b.standard}</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === "social" && (
          <section
            className="launch-surface__section launch-surface__social"
            id="social"
            role="tabpanel"
            aria-labelledby="hub-tab-social"
          >
            <div className="launch-surface__intro">
              <p>06 / Social</p>
              <h2>
                Buyer Order, Crop Rules
                <br />
                &amp; Ad Chassis.
              </h2>
              <span>
                B2C buyer progression, spatial crop invariants, and the 10-department B2B ad matrix as a
                campaign appendix — targeting copy for ads, not hub navigation.
              </span>
            </div>

            <div className="launch-social__container">
              <div className="launch-card mb-8">
                <div className="launch-card__eyebrow">
                  Buyer order (6 steps) — B2C Recognition &amp; Progression
                </div>
                <p className="text-xs text-white/50 mb-3">
                  MUST is the 4-stage writing law (Mirror &rarr; Understand &rarr; Solve &rarr; Transform)
                  documented in Section 05. The buyer progresses through these 6 lived stages:
                </p>
                <div className="launch-psychology__grid">
                  {BUYER_ORDER_STEPS.map((step) => (
                    <div key={step.step} className="launch-psychology__item">
                      <span className="launch-psychology__num">0{step.step}</span>
                      <p>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="launch-card mb-8">
                <div className="launch-card__eyebrow">Spatial Grid &amp; End Card Cheat</div>
                <div className="launch-social__cheat-grid">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-2">
                      Responsive Crop Rules
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80">
                      {SOCIAL_CROP_RULES.map((c) => (
                        <li key={c.ratio} className="border-l-2 border-white/20 pl-3 py-1">
                          <strong className="text-white font-mono">{c.ratio}:</strong> {c.rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-2">
                      Three-Second Campaign End Card
                    </h4>
                    <div className="space-y-1 text-xs font-mono">
                      {THREE_SECOND_END_CARD.beats.map((b) => (
                        <div key={b.time} className="flex gap-2">
                          <span className="text-amber-400 shrink-0">{b.time}</span>
                          <span className="text-white/85">{b.text}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-white/50 mt-3 pt-2 border-t border-white/10">
                      Live destination route:{" "}
                      <strong className="text-emerald-400 font-mono">
                        https://transformby10x.ai{THREE_SECOND_END_CARD.liveRoute}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="launch-card">
                <div className="launch-card__eyebrow">
                  Campaign appendix — B2B 10-department ad chassis{" "}
                  <span className="text-white/40 font-normal normal-case">
                    (ACC–OPS lockups &amp; motion for ads; accent names are canon; colors are working preview)
                  </span>
                </div>
                <div className="launch-dept__grid">
                  {DEPARTMENT_MATRIX.map((d) => (
                    <article
                      key={d.code}
                      className="launch-dept__card"
                      style={{ borderLeftColor: d.colorHex }}
                    >
                      <div className="launch-dept__header">
                        <span
                          className="launch-dept__code"
                          style={{ backgroundColor: `${d.colorHex}22`, color: d.colorHex }}
                        >
                          {d.code}
                        </span>
                        <span className="launch-dept__accent">
                          {d.accent} <small className="text-white/40">(preview)</small>
                        </span>
                      </div>
                      <h4>{d.moniker}</h4>
                      <p className="launch-dept__dept-name">{d.dept}</p>
                      <div className="launch-dept__signal">
                        <small>Signal:</small> {d.signal}
                      </div>
                      <p className="launch-dept__motion">{d.motion}</p>
                      {d.visualBehavior && (
                        <p className="launch-dept__behavior">{d.visualBehavior}</p>
                      )}
                      <p className="launch-dept__irony">
                        {d.code === "FIN" ? (
                          <>
                            AUTOMATION SAVED EVERYONE TIME. {d.irony}
                          </>
                        ) : (
                          d.irony
                        )}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "files" && (
          <section
            className="launch-surface__section launch-surface__files"
            id="files"
            role="tabpanel"
            aria-labelledby="hub-tab-files"
          >
            <div className="launch-surface__intro">
              <p>07 / Files</p>
              <h2>
                Command Center
                <br />
                Path Directory.
              </h2>
              <span>
                Structured cards for authoritative Command Center workspaces and repos. No raw file dumps.
              </span>
            </div>

            <div className="launch-files__grid">
              {COMMAND_CENTER_FILES.map((f) => (
                <article key={f.name} className="launch-file__card">
                  <div className="launch-file__meta">
                    <span className="launch-file__tag">{f.category}</span>
                    <h3>{f.name}</h3>
                    <code className="launch-file__path">{f.path}</code>
                  </div>
                  <p>{f.role}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="launch-surface__footer">
          <p>You don&rsquo;t need more AI. Clear the fog.</p>
          <div className="flex gap-6 items-center flex-wrap">
            <Link href="/tbtx">Return to the public story</Link>
            <Link href="/scan" className="text-purple-300">
              Personal Scan
            </Link>
            <Link href="/map" className="text-blue-300">
              Business Map
            </Link>
            <Link href="/tbtx/kit" className="text-emerald-300">
              Digital De-Fog Daily
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
