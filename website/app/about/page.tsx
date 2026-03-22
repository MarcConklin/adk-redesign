'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type Pillar = {
  id: string;
  label: string;
  title: string;
  summary: string;
  image: string;
  quote: string;
  points: string[];
};

const pillars: Pillar[] = [
  {
    id: 'purpose',
    label: '01 Purpose',
    title: 'Faith-Led Purpose',
    summary:
      'At the heart of ADK is a commitment to uplift the automotive community through the love of Christ and meaningful connection.',
    image: '/images/DJI_0313_Original.jpg',
    quote: 'Driven by Christ. United by passion.',
    points: [
      'Christ-centered culture and values',
      'Events designed for belonging and encouragement',
      'A mission that goes beyond car meets'
    ]
  },
  {
    id: 'experience',
    label: '02 Experience',
    title: 'World-Class Experiences',
    summary:
      'From road rallies to supercar shows, every ADK event is designed to create memorable moments with energy, safety, and excellence.',
    image: '/images/_DSC5861_Original.jpeg',
    quote: 'Memorable events. Professional execution.',
    points: [
      'Thoughtful planning and event operations',
      'High-energy environments with premium presentation',
      'Experiences that feel exciting and organized'
    ]
  },
  {
    id: 'community',
    label: '03 Community',
    title: 'Community That Lasts',
    summary:
      'We create spaces where personal and professional relationships grow naturally around a shared love for cars.',
    image: '/images/_DSC9517.jpg',
    quote: 'People first. Cars bring us together.',
    points: [
      'Real relationships across the community',
      'Welcoming to newcomers and long-time enthusiasts',
      'A stronger local automotive culture'
    ]
  }
];

const missionParagraphs = [
  'Since 2021, ADK Automotive LLC has been built on a foundation of giving back, driven by a deep love for the automotive industry and the incredible community it supports.',
  'At the heart of our mission is a commitment to empower and uplift the automotive community through the love of Christ. We strive to create memorable experiences by hosting events that foster genuine connections, both personal and professional, while promoting an environment of excitement and safety.',
  'Whether you are attending our laid-back cars and coffee gathering, an exhilarating road rally, or a grand supercar show, we believe there is something for everyone. Every event we organize is designed to inspire, bring people together, and celebrate the passion that fuels this vibrant community.',
  'We welcome all who share this enthusiasm and cannot wait to see you at our next event. Together, we will continue to drive this community forward, united by our love for cars and the spirit of fellowship in Christ.'
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stackAnimKey, setStackAnimKey] = useState(0);
  const orderedPillars = pillars.map((_, position) => pillars[(activeIndex + position) % pillars.length]);

  return (
    <main className="relative min-h-screen bg-[#060606] text-white">
      <Navigation />

      <section className="relative min-h-[92vh] pt-36 md:pt-44 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/DJI_0175_Original+2.jpg"
            alt="ADK event overview"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,6,6,0.95)_25%,rgba(6,6,6,0.65)_55%,rgba(6,6,6,0.9)_100%)]"></div>
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-red-600/25 blur-3xl"></div>
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-red-500/20 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.34em] text-red-400 font-bold mb-5">About ADK Automotive</p>
            <h1 className="text-[3rem] md:text-[5.4rem] leading-[0.95] tracking-[-0.03em] font-extrabold max-w-4xl">
              Built To Unite
              <br />
              Car Culture With
              <span className="text-red-500"> Purpose.</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-white/84 max-w-2xl leading-relaxed font-light">
              A Christ-centered automotive movement creating unforgettable events, deep community, and meaningful impact.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors"
              >
                View Events
                <span>→</span>
              </Link>
              <Link
                href="/#inquiry"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/35 text-white font-semibold text-lg hover:bg-white hover:text-black transition-colors"
              >
                Work With ADK
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-red-300 mb-2">Founded</p>
              <p className="text-3xl md:text-4xl font-bold">2021</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-red-300 mb-2">Based In</p>
              <p className="text-2xl md:text-3xl font-bold">Lancaster, PA</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-red-300 mb-3">Mission Focus</p>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
                Empowering the automotive community through the love of Christ with events that inspire, connect, and uplift.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0f0f10]"></div>
      </section>

      <section className="relative bg-[#0f0f10] py-16 md:py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-bold mb-5">What Defines ADK</p>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.02] tracking-tight mb-8">
              How We Bring
              <br />
              The Mission To Life
            </h2>
            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Click a pillar and the deck flips to the front card, showing exactly how ADK delivers impact through purpose, experience, and community.
            </p>

            <div className="hidden space-y-3 lg:block">
              {pillars.map((pillar, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setStackAnimKey((value) => value + 1);
                    }}
                    className={`w-full text-left rounded-2xl border px-5 py-4 transition-all ${
                      isActive
                        ? 'border-red-500 bg-red-500/10 shadow-[0_0_0_1px_rgba(239,68,68,0.4)]'
                        : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-red-300 mb-2">{pillar.label}</p>
                    <p className="text-xl md:text-2xl font-bold">{pillar.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-5 lg:hidden">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.id}
                  className="overflow-hidden rounded-3xl border border-white/15 bg-[#1a1b20] shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
                >
                  <div className="relative h-[260px]">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                    <p className="absolute left-6 right-6 bottom-5 text-white text-xl font-semibold leading-tight">
                      {pillar.quote}
                    </p>
                  </div>

                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-red-300 mb-3">{pillar.label}</p>
                    <h3 className="text-3xl font-black leading-tight text-white">{pillar.title}</h3>
                    <p className="mt-4 text-white/85 text-lg leading-relaxed font-light">
                      {pillar.summary}
                    </p>
                    <div className="mt-6 space-y-3">
                      {pillar.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                          <p className="text-white/78 text-base">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
          </div>

          <div className="relative hidden h-[740px] lg:block lg:h-[810px]">
            {orderedPillars.map((pillar, stackPosition) => {
              const isFront = stackPosition === 0;
              const rotation = stackPosition === 0 ? -2 : stackPosition === 1 ? 3.2 : 7;
              const widthPercent = 92;
              const topOffset = stackPosition * 44;
              const leftOffset = stackPosition * 10;
              const xOffset = stackPosition * 18;
              return (
                <article
                  key={`${pillar.id}-${stackPosition}-${isFront ? stackAnimKey : 'stable'}`}
                  className={`absolute rounded-3xl border border-white/15 ${isFront ? 'bg-[#1a1b20]' : 'bg-[#1f2026]'} overflow-hidden transition-all duration-500 ease-out ${
                    isFront ? 'deck-shuffle shadow-[0_28px_70px_rgba(0,0,0,0.42)]' : 'shadow-[0_14px_38px_rgba(0,0,0,0.32)]'
                  }`}
                  style={{
                    width: `${widthPercent}%`,
                    left: `${leftOffset}px`,
                    top: `${topOffset}px`,
                    zIndex: 30 - stackPosition,
                    transform: `translateX(${xOffset}px) rotate(${rotation}deg)`,
                    transformOrigin: 'top center',
                    opacity: 1
                  }}
                >
                  <div className="relative h-[220px] md:h-[290px]">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                    <p className="absolute left-6 right-6 bottom-5 text-white text-lg md:text-2xl font-semibold leading-tight">
                      {pillar.quote}
                    </p>
                  </div>

                  <div className={`p-6 md:p-8 ${isFront ? '' : 'opacity-0'}`}>
                    <p className="text-white/85 text-lg md:text-xl leading-relaxed font-light mb-6">
                      {pillar.summary}
                    </p>
                    <div className="space-y-3">
                      {pillar.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                          <p className="text-white/78 text-base md:text-lg">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3] text-black py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-red-600 font-bold mb-5">Our Full Mission</p>
          <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-12 shadow-[0_24px_70px_rgba(0,0,0,0.1)]">
            <div className="space-y-7">
              {missionParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-xl md:text-2xl leading-[1.7] text-gray-900 font-light">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-12 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-red-600 text-white text-lg font-bold hover:bg-red-700 transition-colors"
              >
                Explore Events
                <span>→</span>
              </Link>
              <Link
                href="/#inquiry"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-black/20 text-black text-lg font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Become A Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
