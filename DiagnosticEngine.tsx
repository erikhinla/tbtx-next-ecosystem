'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, calculateScore, getProfile } from '@/config/diagnostic-tbtx';
import { getBandKey, brandProfiles } from '@/config/result-profiles';
import Link from 'next/link';
import EmailCapture from './EmailCapture';
import ResultProfile from './ResultProfile';
import CTABlock from './CTABlock';

interface DiagnosticEngineProps {
  brand?: 'tbtx' | 'bbai' | 'bbm';
  onComplete?: (score: number, profile: any) => void;
}

export default function DiagnosticEngine({ brand = 'tbtx', onComplete }: DiagnosticEngineProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const selectAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 180);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowResult(true);
        setIsTransitioning(false);
        const finalScore = calculateScore(newAnswers.filter(a => a >= 0));
        const finalProfile = getProfile(finalScore);
        if (onComplete) onComplete(finalScore, finalProfile);
      }, 300);
    }
  };

  const score = calculateScore(answers.filter(a => a >= 0));
  const profile = getProfile(score);
  const bandKey = getBandKey(score);
  const brandProfile = brandProfiles[brand][bandKey] || brandProfiles.tbtx[bandKey];

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers(Array(questions.length).fill(-1));
    setShowResult(false);
    setIsTransitioning(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
        <div className="max-w-2xl mx-auto pt-12">
          <ResultProfile 
            profile={profile} 
            score={score} 
            band={bandKey} 
            brandProfile={brandProfile}
            onReset={handleReset}
          />
          <div className="mt-8">
            <EmailCapture 
              score={score} 
              profileName={profile.profile} 
              onSuccess={() => {
                // WIN capture will be triggered here in future
                console.log('Email captured - WIN node creation triggered');
              }} 
            />
          </div>
          <div className="mt-6">
            <CTABlock ctaText={brandProfile.cta} ctaRoute={brandProfile.ctaRoute || profile.ctaRoute} />
          </div>
          <div className="mt-8 text-center">
            <button onClick={handleReset} className="text-xs tracking-widest text-white/50 hover:text-white underline">
              RETAKE DIAGNOSTIC
            </button>
            <Link href="/tbtx" className="ml-6 text-xs tracking-widest text-white/50 hover:text-white">BACK TO TBTX</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-8 pt-12 pb-24">
        <div className="flex justify-between items-center mb-8 text-xs tracking-widest text-white/50">
          <Link href="/tbtx" className="hover:text-white transition">← TBTX</Link>
          <div className="text-amber-400/80">DIGITAL FOG — {currentStep + 1} / {questions.length}</div>
        </div>
        {currentStep === 0 && answers[0] < 0 && (
          <p className="text-sm text-white/55 mb-8 max-w-lg leading-relaxed">
            15 questions. Maps where context breaks, ownership blurs, and work restarts.
            Answer for how it actually runs — not how it should.
          </p>
        )}

        {/* Progress bar with motion */}
        <div className="h-px bg-white/10 mb-10 overflow-hidden">
          <motion.div 
            className="h-px bg-white" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={isTransitioning ? 'pointer-events-none' : ''}
          >
            <div className="section-header mb-4">QUESTION {currentStep + 1}</div>
            <h2 className="question-text mb-10 pr-8">{currentQuestion.text}</h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentStep] === option.value;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => !isTransitioning && selectAnswer(option.value)}
                    className={`option ${isSelected ? 'selected' : ''}`}
                  >
                    {option.text}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-xs text-white/40 flex items-center gap-4">
          <button 
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)} 
            className="hover:text-white disabled:opacity-50"
            disabled={currentStep === 0 || isTransitioning}
          >
            PREVIOUS
          </button>
          <div>Answer honestly. Your infrastructure depends on it.</div>
        </div>
      </div>
    </div>
  );
}
