'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { sponsors } from '@/data/sponsors';

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

  const sponsorsRow1 = sponsors.slice(0, 4);
  const sponsorsRow2 = sponsors.slice(4);

  const renderPlaceholderCard = (index: number) => (
    <div
      key={index}
      className="flex min-h-[200px] w-full items-center justify-center rounded-[28px] border border-gray-200 bg-white px-6 py-10 text-center shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_22px_60px_rgba(220,38,38,0.12)]"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="rounded-full border border-red-200 bg-red-50 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-red-600">
          Sponsor Slot
        </span>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
        <p className="text-2xl font-bold uppercase tracking-[0.22em] text-black sm:text-3xl">
          Coming Soon
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32"
      id="sponsors"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background-image.jpg"
          alt="Background"
          fill
          className="object-cover opacity-50"
          quality={100}
        />
      </div>

      {/* White background base */}
      <div className="absolute inset-0 bg-white -z-10"></div>

      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-6 text-center md:mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Our Partners</p>
        <h2 className="mb-8 text-4xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">Built on<br />Trusted Partnerships</h2>
        <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
        <p className="mx-auto max-w-3xl text-base font-light text-gray-700 sm:text-lg md:text-xl">
          We&apos;re preparing this section now. Featured sponsor spots will appear here soon.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:hidden">
        {sponsors.map((_, index) => renderPlaceholderCard(index))}
      </div>

      {/* First Marquee Row */}
      <div ref={marqueeRef1} className="relative hidden overflow-hidden border-t border-y border-gray-200 py-12 md:block">
        <div className="marquee-content flex gap-20 whitespace-nowrap">
          {[...sponsorsRow1, ...sponsorsRow1].map((_, i) => (
            <div key={i} className="inline-flex min-w-[320px] max-w-[360px] flex-1">
              {renderPlaceholderCard(i)}
            </div>
          ))}
        </div>
      </div>

      {/* Second Marquee Row (Opposite Direction) */}
      <div ref={marqueeRef2} className="relative hidden overflow-hidden border-b border-gray-200 py-12 md:block">
        <div className="marquee-content flex gap-20 whitespace-nowrap">
          {[...sponsorsRow2, ...sponsorsRow2].map((_, i) => (
            <div key={i} className="inline-flex min-w-[320px] max-w-[360px] flex-1">
              {renderPlaceholderCard(i + sponsorsRow1.length)}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-7xl px-6 text-center md:mt-20">
        <Link
          href="/sponsors"
          className="inline-block px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-red-600 bg-black md:px-10 md:text-lg"
        >
          Become a Sponsor
        </Link>
      </div>
    </section>
  );
}
