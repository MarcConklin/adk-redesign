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
      className="relative py-24 md:py-32 overflow-hidden"
      id="about"
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-red-600 mb-6 font-bold">
            Colossians 3:17
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black leading-[1.1] tracking-tight">
            Driven to Provide the Best<br />Automotive Experience
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            ADK Automotive LLC is Southeastern PA&apos;s leading automotive event provider, connecting the community with unparalleled events.
            Our mission is to <span className="text-black font-semibold">empower the automotive community through the love of Christ</span> by offering exciting,
            safe events that encourage both personal bonds and professional connections.
          </p>
        </div>

        {/* Biblical Principles - Three Pillars */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Community & Fellowship */}
          <div className="mission-card group">
            <div className="relative h-[400px] mb-6 overflow-hidden">
              <Image
                src="/images/_DSC7937.jpg"
                alt="Community & Fellowship"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black tracking-tight">
                Community &<br />Fellowship
              </h3>
              <p className="text-gray-700 leading-relaxed font-light">
                Creating welcoming spaces where people experience God&apos;s love through authentic relationships built around a shared passion for cars
              </p>
              <p className="text-sm text-red-600 italic font-medium border-l-2 border-red-600 pl-4">
                "For where two or three gather in my name, there am I with them" - Matthew 18:20
              </p>
            </div>
          </div>

          {/* Ministry Through Events */}
          <div className="mission-card group">
            <div className="relative h-[400px] mb-6 overflow-hidden">
              <Image
                src="/images/ADKRoadRallyII2024-107.jpeg"
                alt="Ministry Through Events"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black tracking-tight">
                Ministry Through<br />Events
              </h3>
              <p className="text-gray-700 leading-relaxed font-light">
                Every event is an opportunity to share about Jesus and show God&apos;s glory through excellence in everything we do, creating meaningful moments
              </p>
              <p className="text-sm text-red-600 italic font-medium border-l-2 border-red-600 pl-4">
                "Whatever you do, work at it with all your heart" - Colossians 3:23
              </p>
            </div>
          </div>

          {/* Serving with Love */}
          <div className="mission-card group">
            <div className="relative h-[400px] mb-6 overflow-hidden">
              <Image
                src="/images/_DSC5281_Original.jpg"
                alt="Serving with Love"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-black tracking-tight">
                Serving with Love
              </h3>
              <p className="text-gray-700 leading-relaxed font-light">
                Providing exceptional experiences that serve our community with compassion, making a positive impact that points people to Christ
              </p>
              <p className="text-sm text-red-600 italic font-medium border-l-2 border-red-600 pl-4">
                "Serve one another humbly in love" - Galatians 5:13
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
