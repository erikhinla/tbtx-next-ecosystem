"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Film from "@/components/Film";

type Decision = "ship" | "hold" | "skip";
const ASSETS = [
  { id: "hook", lane: "brand", title: "AI created a job.", use: "Category hook", src: "/media/hero-ai-created-job.jpg", format: "STILL / 16:9" },
  { id: "nobody", lane: "brand", title: "Nobody wanted.", use: "Campaign lockup", src: "/media/digital-fog-lockup-827.jpg", format: "STILL / 16:9" },
  { id: "logos", lane: "life", title: "83 logos", use: "Leftover-job scene", src: "/media/task-logos.jpg", format: "STILL + MOTION" },
  { id: "clockout", lane: "life", title: "The agents didn't clock out", use: "Recognition post", src: "/media/task-clockout.jpg", format: "STILL + MOTION" },
  { id: "personal", lane: "life", title: "Digital Fog in life", use: "Personal scan door", src: "/media/door-b2c-827v2.jpg", format: "DOOR / 9:16" },
  { id: "business", lane: "business", title: "Digital Fog in business", use: "Business scan door", src: "/media/door-b2b-827v2.jpg", format: "DOOR / 9:16" },
  { id: "warroom", lane: "business", title: "The human became the system", use: "Digital friction post", src: "/media/grok-b2b-warroom.jpg", format: "STILL / 16:9" },
  { id: "lift", lane: "approved", title: "Get the making back", use: "Lift / conversion", src: "/media/hallway-fog-lift.jpg", format: "STILL / 16:9" },
] as const;
const ROUTES = [
  { label: "Personal recognition", path: "/scan", note: "Fog Check", tone: "life" },
  { label: "Business friction", path: "/map", note: "Momentum Map", tone: "business" },
  { label: "Twenty-minute lift", path: "/tbtx/kit", note: "Fog-Free Daily", tone: "approved" },
  { label: "Public story", path: "/tbtx", note: "Cold path", tone: "brand" },
] as const;
const LINES = [
  "AI created a leftover job nobody posted. Digital Fog is that job.",
  "You don't need more AI. Clear the fog.",
  "They start. They don't close. You do.",
  "Get your attention back to the work you were made to do.",
  "Same fog. Different lives.",
];
const FLOW = [
  { stage: "Attention", signal: "AI created a job.", surface: "Hero film + social hook", next: "/tbtx#tbtx-stakes" },
  { stage: "Recognition", signal: "That leftover job has a name.", surface: "Stakes + lived scenes", next: "/tbtx#tbtx-doors" },
  { stage: "Personal diagnosis", signal: "Find the fog in life.", surface: "Fog Check", next: "/scan" },
  { stage: "Personal revenue", signal: "Clear one surface today.", surface: "Fog-Free Daily / $7.77", next: "/tbtx/kit" },
  { stage: "Business diagnosis", signal: "Find where momentum leaks.", surface: "Momentum Map", next: "/map" },
  { stage: "Business revenue", signal: "Build the operating backbone.", surface: "BizBuilders AI", next: "/bbai" },
] as const;

export default function LaunchSurface() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const [copied, setCopied] = useState("");
  useEffect(() => { const saved = window.localStorage.getItem("tbtx-launch-decisions"); if (saved) setDecisions(JSON.parse(saved)); }, []);
  const counts = useMemo(() => ({ ship: Object.values(decisions).filter((v) => v === "ship").length, hold: Object.values(decisions).filter((v) => v === "hold").length, skip: Object.values(decisions).filter((v) => v === "skip").length }), [decisions]);
  const decide = (id: string, value: Decision) => { const next = { ...decisions, [id]: value }; setDecisions(next); window.localStorage.setItem("tbtx-launch-decisions", JSON.stringify(next)); };
  const copy = async (value: string) => { await navigator.clipboard.writeText(value); setCopied(value); window.setTimeout(() => setCopied(""), 1200); };

  return <main className="launch-surface">
    <header className="launch-surface__hero">
      <Film className="launch-surface__film" src="/media/desk-fog-loop.mp4" autoPlay muted loop playsInline poster="/media/fog-context.jpg" />
      <div className="launch-surface__fog" /><nav><Link href="/tbtx">Public story</Link><span>Digital Fog / launch surface</span></nav>
      <div className="launch-surface__lockup"><p>Identify / Visualize / Lift</p><h1>Put the campaign<br />to work.</h1><div className="launch-surface__counts"><span><b>{counts.ship}</b> Ship</span><span><b>{counts.hold}</b> Hold</span><span><b>{counts.skip}</b> Skip</span></div></div>
    </header>
    <section className="launch-surface__section launch-surface__routes">
      <div className="launch-surface__intro"><p>01 / Route</p><h2>One stand.<br />Two lived realities.</h2><span>Use the bridge when a post crosses lanes: same fog, different lives.</span></div>
      <div className="launch-surface__route-list">{ROUTES.map((route) => <article key={route.path} data-tone={route.tone}><div><small>{route.note}</small><h3>{route.label}</h3></div><button onClick={() => copy(`https://transformby10x.ai${route.path}`)}>{copied.endsWith(route.path) ? "Copied" : "Copy link"}</button><Link href={route.path}>Open</Link></article>)}</div>
    </section>
    <section className="launch-surface__section launch-surface__flow">
      <div className="launch-surface__intro"><p>02 / Convert</p><h2>Attention becomes<br />a clear next move.</h2><span>The story earns recognition before a route asks for action. Personal fog lifts today. Business friction becomes operating infrastructure.</span></div>
      <div className="launch-flow">{FLOW.map((item, index) => <article key={item.stage}><small>0{index + 1}</small><div><p>{item.stage}</p><h3>{item.signal}</h3><span>{item.surface}</span></div><Link href={item.next}>Open surface</Link></article>)}</div>
    </section>
    <section className="launch-surface__section launch-surface__selects">
      <div className="launch-surface__intro"><p>03 / Select</p><h2>Every image<br />has a job.</h2><span>Green is approved. Purple is life. Blue is business. Gray carries the category.</span></div>
      <div className="launch-surface__grid">{ASSETS.map((asset) => <article key={asset.id} className="launch-asset" data-lane={asset.lane} data-decision={decisions[asset.id] || ""}><img src={asset.src} alt="" /><div className="launch-asset__meta"><small>{asset.format}</small><h3>{asset.title}</h3><p>{asset.use}</p></div><div className="launch-asset__actions">{(["ship", "hold", "skip"] as Decision[]).map((value) => <button key={value} aria-pressed={decisions[asset.id] === value} onClick={() => decide(asset.id, value)}>{value}</button>)}<a href={asset.src} download>Download</a></div></article>)}</div>
    </section>
    <section className="launch-surface__section launch-surface__lines"><div className="launch-surface__intro"><p>04 / Say</p><h2>Lines that<br />carry weight.</h2></div><div>{LINES.map((line, index) => <button key={line} onClick={() => copy(line)}><small>0{index + 1}</small><span>{line}</span><em>{copied === line ? "Copied" : "Copy"}</em></button>)}</div></section>
    <footer className="launch-surface__footer"><p>You don&rsquo;t need more AI. Clear the fog.</p><Link href="/tbtx">Return to the public story</Link></footer>
  </main>;
}
