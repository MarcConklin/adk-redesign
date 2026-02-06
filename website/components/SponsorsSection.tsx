'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in section
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1
        }
      });

      // Infinite marquee animation
      const marquee = marqueeRef.current;
      if (marquee) {
        const marqueeContent = marquee.querySelector('.marquee-content');
        if (marqueeContent) {
          gsap.to(marqueeContent, {
            x: '-50%',
            duration: 30,
            ease: 'none',
            repeat: -1
          });
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sponsors = [
    'Manheim Imports',
    'Sun Protectors',
    'KP Elite',
    'Bush Auto Group',
    'CarVault',
    'JSG Graphics',
    'TPDCW',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black"
      id="sponsors"
    >
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Our Partners</p>
        <h2 className="text-5xl md:text-7xl font-bold mb-6">Powered by Excellence</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          We're proud to partner with industry-leading brands who share our passion for automotive excellence
        </p>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} className="relative overflow-hidden py-12 border-y border-white/10">
        <div className="marquee-content flex gap-16 whitespace-nowrap">
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center px-12 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
            >
              <span className="text-2xl font-bold">{sponsor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
        <button className="px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-all hover:scale-105">
          Become a Sponsor
        </button>
      </div>
    </section>
  );
}

