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
      Diagnose: [],
      Offer: [],
      Foundation: [],
      Held: [],
    };
    ROUTES.forEach((r) => {
      if (groups[r.group]) groups[r.group].push(r);
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
                <h1>Internal handbook</h1>
              </div>
            </header>

            <section className="launch-surface__section" id="canon" role="tabpanel" aria-labelledby="hub-tab-canon">
              <div className="launch-surface__intro">
                <p>00 / Canon</p>
                <h2>Canon and locked rules</h2>
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
                      <span className="launch-card__tag">Lockup 2 (Mantle & Door)</span>
                      <p className="launch-card__mantle">{CANON_LOCKUPS.mantle}</p>
                      <div className="launch-card__badge-cta">{CANON_LOCKUPS.cta}</div>
                    </div>
                  </div>
                </div>
                <div className="launch-card">
                  <div className="launch-card__eyebrow">Gate 01</div>
                  <h3 className="launch-card__title">{CANON_LOCKUPS.gateTitle}</h3>
                  <ul className="launch-card__list">
                    {CANON_LOCKUPS.gateChoices.map((c) => (
                      <li key={c.label}>
                        <strong>{c.label}:</strong> {c.result}
                      </li>
                    ))}
                  </ul>
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
                  <div className="launch-card__eyebrow">Operating Holds</div>
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
          <section className="launch-surface__section" id="routes" role="tabpanel" aria-labelledby="hub-tab-routes">
            <div className="launch-surface__intro">
              <p>01 / Routes</p>
              <h2>Routes and URLs</h2>
              <span>Front Door, Diagnose, Offer, Foundation, and Held.</span>
            </div>
            <div className="launch-routes__grouped-container">
              {Object.entries(routeGroups).map(([groupName, routes]) => {
                if (routes.length === 0) return null;
                return (
                  <div key={groupName} className="launch-routes__group-block">
                    <div className="launch-routes__group-header">
                      <span className="launch-routes__group-tag">{groupName}</span>
                    </div>
                    <div className="launch-surface__route-list">
                      {routes.map((route) => (
                        <article key={route.path} data-tone={route.tone} className={route.held ? "launch-route--held" : ""}>
                          <div>
                            <small>{route.group}</small>
                            <h3>{route.label}</h3>
                            <p className="text-xs text-white/60 m-0">{route.note}</p>
                            <code className="text-[11px] font-mono text-emerald-400 block mt-1">
                              https://transformby10x.ai{route.path}
                            </code>
                          </div>
                          <button onClick={() => copy(`https://transformby10x.ai${route.path}`)}>
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
          <section className="launch-surface__section launch-surface__flow" id="convert" role="tabpanel" aria-labelledby="hub-tab-convert">
            <div className="launch-surface__intro">
              <p>02 / Convert</p>
              <h2>Customer path</h2>
              <span>Recognition to governed execution. BizBot does not lead.</span>
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
          <section className="launch-surface__section" id="selects" role="tabpanel" aria-labelledby="hub-tab-selects">
            <div className="launch-surface__intro">
              <p>03 / Selects</p>
              <h2>Asset selects</h2>
              <span>Green is approved. Purple is life. Blue is business.</span>
            </div>
            <div className="launch-surface__grid">
              {ASSETS.map((asset) => (
                <article key={asset.id} className="launch-asset" data-lane={asset.lane} data-decision={decisions[asset.id] || ""}>
                  <img src={asset.src} alt="" />
                  <div className="launch-asset__meta">
                    <small>{asset.format}</small>
                    <h3>{asset.title}</h3>
                    <p>{asset.use}</p>
                  </div>
                  <div className="launch-asset__actions">
                    {(["ship", "hold", "skip"] as Decision[]).map((value) => (
                      <button key={value} aria-pressed={decisions[asset.id] === value} onClick={() => decide(asset.id, value)}>
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
          <section className="launch-surface__section launch-surface__lines" id="say" role="tabpanel" aria-labelledby="hub-tab-say">
            <div className="launch-surface__intro">
              <p>04 / Say</p>
              <h2>Approved lines</h2>
              <span>Click any line to copy.</span>
              <div className="launch-say__filters">
                {["All", "Campaign", "Ecosystem", "TBTX", "BBAI", "BBM"].map((cat) => (
                  <button key={cat} className={activeLineCategory === cat ? "active" : ""} onClick={() => setActiveLineCategory(cat)}>
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
          <section className="launch-surface__section" id="diagnose" role="tabpanel" aria-labelledby="hub-tab-diagnose">
            <div className="launch-surface__intro">
              <p>05 / Diagnose</p>
              <h2>Scan/Map Models & Scoring Logic</h2>
              <span>B2C uses 8 lived-day questions. B2B uses 15 friction vectors.</span>
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
                      <strong className="text-purple-300">{b.name}</strong>
                      <small className="text-white/50">{b.range}</small>
                      <p className="text-sm text-white/70">{b.desc}</p>
                      <span className="text-xs text-amber-300 font-mono">{b.action}</span>
                    </div>
                  ))}
                </div>
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
                      <strong className="text-blue-300">{b.name}</strong>
                      <small className="text-white/50">{b.range}</small>
                      <p className="text-sm text-white/70">{b.desc}</p>
                      <span className="text-xs text-amber-300 font-mono">{b.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "social" && (
          <section className="launch-surface__section" id="social" role="tabpanel" aria-labelledby="hub-tab-social">
            <div className="launch-surface__intro">
              <p>06 / Social</p>
              <h2>Social crops and ad chassis</h2>
              <span>Buyer order, crop rules, end card, department appendix.</span>
            </div>
            <div className="launch-social__container">
              <div className="launch-card mb-8">
                <div className="launch-card__eyebrow">Buyer order</div>
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
                <div className="launch-card__eyebrow">Spatial Grid & End Card</div>
                <ul>
                  {SOCIAL_CROP_RULES.map((c) => (
                    <li key={c.ratio}>
                      <strong>{c.ratio}:</strong> {c.rule}
                    </li>
                  ))}
                </ul>
                <div className="space-y-1 text-xs font-mono mt-4">
                  {THREE_SECOND_END_CARD.beats.map((b) => (
                    <div key={b.time}>
                      <span className="text-amber-400">{b.time}</span> {b.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="launch-card">
                <div className="launch-card__eyebrow">B2B 10-department ad chassis</div>
                <div className="launch-dept__grid">
                  {DEPARTMENT_MATRIX.map((d) => (
                    <article key={d.code} className="launch-dept__card" style={{ borderLeftColor: d.colorHex }}>
                      <div className="launch-dept__header">
                        <span className="launch-dept__code" style={{ color: d.colorHex }}>
                          {d.code}
                        </span>
                        <span className="launch-dept__accent">{d.accent}</span>
                      </div>
                      <h4>{d.moniker}</h4>
                      <p className="launch-dept__dept-name">{d.dept}</p>
                      <p className="launch-dept__motion">{d.motion}</p>
                      <p className="launch-dept__irony">{d.irony}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "files" && (
          <section className="launch-surface__section" id="files" role="tabpanel" aria-labelledby="hub-tab-files">
            <div className="launch-surface__intro">
              <p>07 / Files</p>
              <h2>File directory</h2>
              <span>Each card opens the live file, route, or download.</span>
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
                  {f.href ? (
                    <a
                      className="launch-file__open"
                      href={f.href}
                      target={f.href.startsWith("http") ? "_blank" : undefined}
                      rel={f.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      Open file
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="launch-surface__footer">
          <div className="flex gap-6 items-center flex-wrap">
            <Link href="/tbtx">Return to the public story</Link>
            <Link href="/tbtx/scan" className="text-purple-300">
              Personal Scan
            </Link>
            <Link href="/tbtx/map" className="text-blue-300">
              Business Map
            </Link>
            <Link href="/tbtx/kit" className="text-emerald-300">
              Fog-Free Daily
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
