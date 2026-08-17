'use client';

import Link from 'next/link';

interface CTABlockProps {
  ctaText: string;
  ctaRoute: string;
}

export default function CTABlock({ ctaText, ctaRoute }: CTABlockProps) {
  return (
    <Link 
      href={ctaRoute} 
      className="btn-industrial inline-block mt-2"
    >
      {ctaText}
    </Link>
  );
}
