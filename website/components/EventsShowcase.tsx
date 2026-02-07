'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: 'Supercars at Sunset',
    description: 'Southeastern PA\'s largest supercar events',
    image: '/images/IMG_2219+2.jpg',
    tag: 'Monthly'
  },
  {
    title: 'ADK Road Rally',
    description: 'Epic driving experiences through scenic routes',
    image: '/images/_DSC5861_Original.jpeg',
    tag: 'Seasonal'
  },
  {
    title: 'Cars & Coffee',
    description: 'Casual morning meetups for enthusiasts',
    image: '/images/_DSC9517.jpg',
    tag: 'Weekly'
  },
  {
    title: 'Special Events',
    description: 'Giving back to our community',
    image: '/images/_DSC8567.jpg',
    tag: 'Special'
  }
];

export default function EventsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        }
      });

      // Animate each event card
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 100,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32" id="events">
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
        <div ref={headerRef} className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-bold">Our Events</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight mb-8">Where Passion<br />Meets Purpose</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        {/* Events Grid - Magazine Layout */}
        <div className="grid md:grid-cols-2 gap-16">
          {events.map((event, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[500px] mb-6 overflow-hidden bg-gray-100">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 text-xs uppercase tracking-wider font-bold">
                  {event.tag}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tight group-hover:text-red-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  {event.description}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-black font-semibold group-hover:gap-4 transition-all">
                    Learn More
                    <span className="text-red-600">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

