'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        }
      });

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.mission-card');
      gsap.from(cards || [], {
        opacity: 0,
        y: 100,
        scale: 0.9,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-24 md:py-32 overflow-hidden"
      id="about"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-red-500 mb-4 font-semibold">
            Colossians 3:17
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Driven to Provide the Best<br />Automotive Experience
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            ADK Automotive LLC is Southeastern PA&apos;s leading automotive event provider, connecting the community with unparalleled events.
            Our mission is to <span className="text-white font-semibold">empower the automotive community through the love of Christ</span> by offering exciting,
            safe events that encourage both personal bonds and professional connections.
          </p>
        </div>

        {/* Biblical Principles - Three Pillars */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Community & Fellowship */}
          <div className="mission-card group relative h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/_DSC7937.jpg"
                alt="Community & Fellowship"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-3 h-[80px] flex items-start">
                <span>Community &<br />Fellowship</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-2">
                Creating welcoming spaces where people experience God&apos;s love through authentic relationships built around a shared passion for cars
              </p>
              <p className="text-sm text-red-400 italic">
                "For where two or three gather in my name, there am I with them" - Matthew 18:20
              </p>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-300"></div>
          </div>

          {/* Ministry Through Events */}
          <div className="mission-card group relative h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/ADKRoadRallyII2024-107.jpeg"
                alt="Ministry Through Events"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-3 h-[80px] flex items-start">
                <span>Ministry Through<br />Events</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-2">
                Every event is an opportunity to share about Jesus and show God&apos;s glory through excellence in everything we do, creating meaningful moments
              </p>
              <p className="text-sm text-red-400 italic">
                "Whatever you do, work at it with all your heart" - Colossians 3:23
              </p>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-300"></div>
          </div>

          {/* Serving with Love */}
          <div className="mission-card group relative h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/_DSC5281_Original.jpg"
                alt="Serving with Love"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-3 h-[80px] flex items-start">
                <span>Serving with Love</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-2">
                Providing exceptional experiences that serve our community with compassion, making a positive impact that points people to Christ
              </p>
              <p className="text-sm text-red-400 italic">
                "Serve one another humbly in love" - Galatians 5:13
              </p>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
