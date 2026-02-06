'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section while text animates - smoother
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 2,
        }
      });

      // Fade in and scale text - smoother with better stagger
      gsap.from(textRef.current?.querySelectorAll('.mission-text') || [], {
        opacity: 0,
        y: 120,
        scale: 0.85,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 2,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center py-32 overflow-hidden"
      id="about"
    >
      <div ref={textRef} className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <p className="mission-text text-sm uppercase tracking-[0.3em] text-gray-500 mb-8">
          Our Mission
        </p>
        <h2 className="mission-text text-4xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight">
          Empowering the automotive community through the love of Christ
        </h2>
        <p className="mission-text text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
          ADK Automotive LLC is Southeastern PA&apos;s leading automotive event provider, connecting the community with unparalleled events.
          We offer exciting, safe events that encourage both personal bonds and professional connections.
        </p>
      </div>
    </section>
  );
}

