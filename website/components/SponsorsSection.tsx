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

  const half = Math.ceil(sponsors.length / 2);
  const sponsorsRow1 = sponsors.slice(0, half);
  const sponsorsRow2 = sponsors.slice(half);

  const renderPlaceholderCard = (
    name: string,
    logo: string | null,
    logoFit: 'cover' | 'contain' | undefined,
    index: number
  ) => (
    <div
      key={index}
      className="flex min-h-[160px] w-full items-center justify-center rounded-[24px] border border-gray-200 bg-white px-4 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:border-red-500 hover:shadow-[0_22px_60px_rgba(220,38,38,0.12)] sm:min-h-[200px] sm:rounded-[28px] sm:px-6 sm:py-10"
    >
      {logo ? (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="relative aspect-square w-full max-w-[132px] overflow-hidden rounded-[18px] border border-black/8 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:max-w-[156px]">
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className={logoFit === 'contain' ? 'object-contain p-3' : 'object-cover'}
            />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-black sm:text-base">
            {name}
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex aspect-square w-full max-w-[132px] flex-col items-center justify-center rounded-[18px] border border-red-200 bg-red-50/55 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:max-w-[156px]">
            <span className="rounded-full border border-red-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-red-600 sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
              Sponsor Slot
            </span>
            <div className="my-3 h-px w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
            <p className="text-base font-bold uppercase tracking-[0.14em] text-black sm:text-lg sm:tracking-[0.2em]">
              Coming Soon
            </p>
          </div>
        </div>
      )}
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
          Featured partners live here, with more sponsor spots opening soon.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 md:hidden">
        {sponsors.map((sponsor, index) => renderPlaceholderCard(sponsor.name, sponsor.logo, sponsor.logoFit, index))}
      </div>

      {/* First Marquee Row */}
      <div ref={marqueeRef1} className="relative hidden overflow-hidden border-t border-y border-gray-200 py-12 md:block">
        <div className="marquee-content inline-flex gap-20">
          {[...sponsorsRow1, ...sponsorsRow1].map((sponsor, i) => (
            <div key={i} className="inline-flex min-w-[320px] max-w-[360px] flex-1">
              {renderPlaceholderCard(sponsor.name, sponsor.logo, sponsor.logoFit, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Second Marquee Row (Opposite Direction) */}
      <div ref={marqueeRef2} className="relative hidden overflow-hidden border-b border-gray-200 py-12 md:block">
        <div className="marquee-content inline-flex gap-20">
          {[...sponsorsRow2, ...sponsorsRow2].map((sponsor, i) => (
            <div key={i} className="inline-flex min-w-[320px] max-w-[360px] flex-1">
              {renderPlaceholderCard(sponsor.name, sponsor.logo, sponsor.logoFit, i + sponsorsRow1.length)}
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
