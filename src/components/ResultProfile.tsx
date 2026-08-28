'use client';

interface ResultProfileProps {
  profile: any;
  score: number;
  band: string;
  brandProfile: any;
  onReset?: () => void;
}

export default function ResultProfile({ profile, score, band, brandProfile }: ResultProfileProps) {
  return (
    <>
      <div className="section-header mb-4">DIAGNOSTIC COMPLETE</div>
      <div className="macro-display text-6xl tracking-[-2.5px] mb-4">{profile.profile}</div>
      <div className="text-xs tracking-[3px] text-white/50 mb-8">SCORE: {score} / 30. {band}</div>

      <div className="copy-block mb-10 text-[15px] leading-relaxed border-l-2 border-white/20 pl-6">
        {profile.description}
      </div>

      <div className="mb-10">
        <div className="section-header mb-3">YOUR NEXT STEP</div>
        <div className="text-2xl tracking-tight mb-2">{brandProfile.nextStep}</div>
      </div>
    </>
  );
}
