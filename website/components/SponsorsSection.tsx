'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

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

      // First marquee animation (left to right)
      const marquee1 = marqueeRef1.current;
      if (marquee1) {
        const marqueeContent1 = marquee1.querySelector('.marquee-content');
        if (marqueeContent1) {
          gsap.to(marqueeContent1, {
            x: '-50%',
            duration: 40,
            ease: 'none',
            repeat: -1
          });
        }
      }

      // Second marquee animation (right to left - opposite direction)
      const marquee2 = marqueeRef2.current;
      if (marquee2) {
        const marqueeContent2 = marquee2.querySelector('.marquee-content');
        if (marqueeContent2) {
          gsap.fromTo(marqueeContent2,
            { x: '-50%' },
            {
              x: '0%',
              duration: 40,
              ease: 'none',
              repeat: -1
            }
          );
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Only including sponsors with verified actual logo files
  const sponsorsRow1 = [
    { name: 'Manheim Imports', logo: '/images/Manheim+Imports+Logo.png' },
    { name: 'Sun Protector Window Tinting', logo: '/images/sponsor-0.png' },
    { name: 'KP Elite', logo: '/images/KP+Elite.jpg' },
    { name: 'Bush Auto Group', logo: '/images/BushAutoGroup+Logo_Collision&Detail.png' },
  ];

  const sponsorsRow2 = [
    { name: 'CarVault', logo: '/images/CarVault_logo_lockup_tm_blue_final_2500px.png' },
    { name: 'JSG Graphics', logo: '/images/JSG-Logo.png' },
    { name: 'TPDCW', logo: '/images/Stacked+TPDCW.png' },
    { name: 'Sun Protectors - Ephrata', logo: '/images/Sun+Protectors+-+Ephrata.png' },
    { name: 'LSC', logo: '/images/lsc-removebg-preview.png' },
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

      {/* First Marquee Row */}
      <div ref={marqueeRef1} className="relative overflow-hidden py-8 border-t border-white/10">
        <div className="marquee-content flex gap-16 whitespace-nowrap">
          {[...sponsorsRow1, ...sponsorsRow1].map((sponsor, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center p-2 bg-gray-200 border border-white/10 rounded-2xl hover:bg-gray-300 transition-all min-w-[320px]"
            >
              <div className="relative w-full h-[140px]">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Marquee Row (Opposite Direction) */}
      <div ref={marqueeRef2} className="relative overflow-hidden py-8 border-b border-white/10">
        <div className="marquee-content flex gap-16 whitespace-nowrap">
          {[...sponsorsRow2, ...sponsorsRow2].map((sponsor, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center p-2 bg-gray-200 border border-white/10 rounded-2xl hover:bg-gray-300 transition-all min-w-[320px]"
            >
              <div className="relative w-full h-[140px]">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
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

