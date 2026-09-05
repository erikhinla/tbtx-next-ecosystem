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
    <article className="tbtx-scan__report is-in">
      <div className="tbtx-scan__top">
        <Link href="/tbtx#tbtx-stakes" className="tbtx-scan__back" aria-label="Back to choose your path">
          <span aria-hidden="true">&lt;</span>
        </Link>
        <p className="tbtx-scan__job">Digital Fog in Business</p>
      </div>
      <h1 className="tbtx-scan__profile">{report.profile.profile}</h1>
      <section className="tbtx-peel is-in">
        <p className="tbtx-peel__title">Where momentum is stalling</p>
        <div className="tbtx-peel__fog">
          <p className="tbtx-scan__lead">{report.profile.description}</p>
        </div>
      </section>

      <section className="tbtx-scan__load tbtx-peel is-in">
        <h2>{report.load.headline}</h2>
        <div className="tbtx-peel__fog">
          <p>{report.load.body}</p>
          <p className="tbtx-scan__range">
            About {report.load.hoursPerPersonWeek[0]} to {report.load.hoursPerPersonWeek[1]} hours a
            week finishing what the agents started. Hours that should have been the work you&rsquo;re made to do.
          </p>
        </div>
      </section>

      {report.pressures.length > 0 && (
        <section className="tbtx-scan__pressures tbtx-peel is-in">
          <h2>What your answers named</h2>
          <ul className="tbtx-peel__fog">
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
          {showScale ? "Hide the group" : "See this for the group"}
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
              Across {people === 1 ? "that person" : `those ${people} people`}, that&rsquo;s about{" "}
              {grouped[0]} to {grouped[1]} hours a week.
            </p>
          </div>
        )}
      </section>

      <section className="tbtx-scan__next is-in">
        <h2>The next clear move</h2>
        <p>{report.brand.nextStep}</p>
        <div className="tbtx-scan__moves">
          <Link
            href={
              report.brand.ctaRoute.includes("/tbtx/blueprint")
                ? `/tbtx/blueprint?archetype=${report.archetype}`
                : report.brand.ctaRoute
            }
            className="tbtx-scan__go tbtx-fog-go"
          >
            {report.brand.cta}
          </Link>
        </div>
      </section>

      <div className="tbtx-scan__foot">
        <button type="button" onClick={onReset} className="tbtx-fog-link">
          Map again
        </button>
      </div>
    </article>
  );
}
