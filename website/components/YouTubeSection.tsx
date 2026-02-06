'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function YouTubeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 80,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 md:py-40 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/_DSC9382.jpg"
          alt="ADK Automotive YouTube Channel"
          fill
          className="object-cover"
          priority
        />
        {/* Lighter overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            ADK Automotive Channel
          </h2>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-10 max-w-3xl mx-auto">
            In August 2021, we launched the ADK Automotive YouTube channel. This channel is aimed at showcasing the cars and people that attend our events. We review and highlight some awesome cars while getting to know the drivers behind the wheel! Click the button below to view our content!
          </p>
          <a
            href="https://www.youtube.com/channel/UCYt4gtzDEDoEqBoqqdswUNQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/40 rounded font-semibold text-lg hover:bg-white/30 transition-all"
          >
            ADK Automotive Channel
          </a>
        </div>
      </div>
    </section>
  );
}

