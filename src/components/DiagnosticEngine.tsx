"use client";

import { useMemo, useState, type ReactNode } from "react";
import { questions as businessQuestions, calculateScore, getProfile } from "@/config/diagnostic-tbtx";
import { personalQuestions, personalBands } from "@/config/scan-personal";
import { getBandKey, brandProfiles } from "@/config/result-profiles";
import { deriveFogReport } from "@/config/fog-report";
import Link from "next/link";
import FogReport from "./FogReport";
import ScanThreshold from "./ScanThreshold";

interface DiagnosticEngineProps {
  brand?: "tbtx" | "bbai" | "bbm";
  lane?: "personal" | "business";
  onComplete?: (score: number, profile: unknown) => void;
}

function ScanShell({
  isPersonal,
  children,
}: {
  isPersonal: boolean;
  children: ReactNode;
}) {
  const src = isPersonal ? "/media/door-b2c-827v2.mp4" : "/media/door-b2b-827v2.mp4";
  const poster = isPersonal ? "/media/door-b2c-827v2.jpg" : "/media/door-b2b-827v2.jpg";

  return (
    <div className="tbtx-scan">
      <div className="tbtx-scan__stage" aria-hidden="true">
        <video autoPlay muted loop playsInline poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <div className="tbtx-scan__veil" aria-hidden="true" />
      <div className="tbtx-scan__frame">{children}</div>
    </div>
  );
}

export default function DiagnosticEngine({
  brand = "tbtx",
  lane = "business",
  onComplete,
}: DiagnosticEngineProps) {
  const isPersonal = lane === "personal";
  const questions = isPersonal ? personalQuestions : businessQuestions;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [ready, setReady] = useState(false);

  const currentQuestion = questions[currentStep];
  const report = useMemo(() => deriveFogReport(answers), [answers]);
  const jobLine = isPersonal ? "Social Life" : "Work Life";
  const mantle = isPersonal ? "Digital Fog" : "Digital Friction";

  const selectAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      const finalScore = calculateScore(newAnswers.filter((a) => a >= 0));
      const health = Math.round((finalScore / (questions.length * 2)) * 100);
      const finalProfile = getProfile(health);
      if (onComplete) onComplete(finalScore, finalProfile);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers(Array(questions.length).fill(-1));
    setShowResult(false);
    setReady(true);
  };

  if (!ready && !showResult) {
    return (
      <ScanShell isPersonal={isPersonal}>
        <ScanThreshold isPersonal={isPersonal} onBegin={() => setReady(true)} />
      </ScanShell>
    );
  }

  if (showResult && isPersonal) {
    const score = calculateScore(answers.filter((a) => a >= 0));
    const health = Math.round((score / (questions.length * 2)) * 100);
    const band = personalBands.find((item) => health >= item.min && health <= item.max) || personalBands[0];
    return (
      <ScanShell isPersonal>
        <p className="tbtx-scan__job">Social Life</p>
        <p className="tbtx-scan__mantle">Digital Fog</p>
        <h1 className="tbtx-scan__profile">{band.profile}</h1>
        <section className="tbtx-peel">
          <p className="tbtx-peel__title">You named it</p>
          <div className="tbtx-peel__fog">
            <p className="tbtx-scan__lead">{band.description}</p>
          </div>
        </section>
        <div className="tbtx-scan__moves">
          <Link href={band.ctaRoute} className="tbtx-scan__go tbtx-fog-go">
            {band.cta}
          </Link>
          <Link href="/tbtx/map" className="tbtx-fog-link">
            This is Digital Friction
          </Link>
        </div>
        <div className="tbtx-scan__foot">
          <button type="button" onClick={handleReset} className="tbtx-fog-link">
            Again
          </button>
          <Link href="/tbtx#tbtx-stakes" className="tbtx-fog-link">
            The why
          </Link>
        </div>
      </ScanShell>
    );
  }

  if (showResult && brand === "tbtx") {
    return (
      <ScanShell isPersonal={false}>
        <FogReport report={report} onReset={handleReset} />
      </ScanShell>
    );
  }

  if (showResult) {
    const score = calculateScore(answers.filter((a) => a >= 0));
    const health = Math.round((score / (questions.length * 2)) * 100);
    const profile = getProfile(health);
    const bandKey = getBandKey(health);
    const brandProfile = brandProfiles[brand][bandKey] || brandProfiles.tbtx[bandKey];

    return (
      <ScanShell isPersonal={false}>
        <p className="tbtx-scan__job">Work Life</p>
        <p className="tbtx-scan__mantle">Digital Friction</p>
        <h1 className="tbtx-scan__profile">{profile.profile}</h1>
        <p className="tbtx-scan__lead">{profile.description}</p>
        <div className="tbtx-scan__moves">
          <Link href={brandProfile.ctaRoute || profile.ctaRoute} className="tbtx-scan__go tbtx-fog-go">
            {brandProfile.cta}
          </Link>
          <Link href="/tbtx#tbtx-stakes" className="tbtx-fog-link">
            The why
          </Link>
        </div>
        <div className="tbtx-scan__foot">
          <button type="button" onClick={handleReset}>
            Again
          </button>
        </div>
      </ScanShell>
    );
  }

  const n = String(currentStep + 1).padStart(2, "0");
  const total = String(questions.length).padStart(2, "0");

  return (
    <ScanShell isPersonal={isPersonal}>
      <div className="tbtx-scan__top">
        <Link href="/tbtx" className="tbtx-fog-link">
          Back
        </Link>
        <p className="tbtx-scan__job">{jobLine}</p>
        <div className="tbtx-scan__count" aria-current="step">
          <span>{n}</span>
          <small>of {total}</small>
        </div>
      </div>

      <p className="tbtx-scan__mantle">{mantle}</p>
      {currentStep === 0 ? (
        <p className="tbtx-scan__frame-line">
          We&rsquo;re not scoring how you work. We&rsquo;re finding the leftover job.
        </p>
      ) : null}
      <h1 className="tbtx-scan__question">{currentQuestion.text}</h1>

      <div className="tbtx-scan__choices">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = answers[currentStep] === option.value;
          return (
            <button
              key={`${currentQuestion.id}-${idx}`}
              type="button"
              className="tbtx-scan__choice"
              aria-pressed={isSelected}
              onClick={() => selectAnswer(option.value)}
            >
              <span className="tbtx-scan__choice-num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="tbtx-scan__choice-line">{option.text}</span>
            </button>
          );
        })}
      </div>

      <div className="tbtx-scan__nav">
        <button
          type="button"
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
              return;
            }
            setReady(false);
          }}
        >
          {currentStep === 0 ? "The stand" : "Previous"}
        </button>
      </div>
    </ScanShell>
  );
}
