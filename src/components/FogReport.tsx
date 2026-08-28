"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { groupHours, type FogReportModel } from "@/config/fog-report";

type FogReportProps = {
  report: FogReportModel;
  onReset: () => void;
};

export default function FogReport({ report, onReset }: FogReportProps) {
  const [people, setPeople] = useState(1);
  const [showScale, setShowScale] = useState(false);
  const grouped = useMemo(
    () => groupHours(people, report.load.hoursPerPersonWeek),
    [people, report.load.hoursPerPersonWeek]
  );

  return (
    <article className="tbtx-scan__report">
      <p className="tbtx-scan__job">The job at work</p>
      <p className="tbtx-scan__mantle">Managing Digital Fog</p>
      <h1 className="tbtx-scan__profile">{report.profile.profile}</h1>
      <p className="tbtx-scan__lead">{report.profile.description}</p>

      <section className="tbtx-scan__load">
        <h2>{report.load.headline}</h2>
        <p>{report.load.body}</p>
        <p className="tbtx-scan__range">
          About {report.load.hoursPerPersonWeek[0]} to {report.load.hoursPerPersonWeek[1]} hours a
          week of second-job work for the person holding this together.
        </p>
      </section>

      {report.pressures.length > 0 && (
        <section className="tbtx-scan__pressures">
          <h2>What your answers named</h2>
          <ul>
            {report.pressures.map((item) => (
              <li key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.implication}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="tbtx-scan__scale">
        <button
          type="button"
          className="tbtx-scan__scale-toggle"
          onClick={() => setShowScale((open) => !open)}
          aria-expanded={showScale}
        >
          {showScale ? "Hide the group" : "Scale it to the group"}
        </button>
        {showScale && (
          <div className="tbtx-scan__scale-body">
            <label htmlFor="fog-people">How many people carry this load?</label>
            <div className="tbtx-scan__slider">
              <input
                id="fog-people"
                type="range"
                min={1}
                max={20}
                value={people}
                onChange={(event) => setPeople(Number(event.target.value))}
              />
              <span>{people === 1 ? "1 person" : `${people} people`}</span>
            </div>
            <p>
              Across {people === 1 ? "that person" : `those ${people} people`}, that's about{" "}
              {grouped[0]} to {grouped[1]} hours a week.
            </p>
          </div>
        )}
      </section>

      <section className="tbtx-scan__next">
        <h2>The next clear move</h2>
        <p>{report.brand.nextStep}</p>
        <div className="tbtx-scan__moves">
          <Link href={report.brand.ctaRoute} className="tbtx-scan__go">
            {report.brand.cta}
          </Link>
          <Link href="/bbai">Build the Backbone</Link>
          <Link href="/tbtx/scan">This is personal</Link>
        </div>
      </section>

      <div className="tbtx-scan__foot">
        <button type="button" onClick={onReset}>
          Again
        </button>
        <Link href="/tbtx">Start Here</Link>
      </div>
    </article>
  );
}
