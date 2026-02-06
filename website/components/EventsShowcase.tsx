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
    <section ref={sectionRef} className="relative bg-black py-24 md:py-32" id="events">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Our Events</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Experience Excellence</h2>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">{event.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{event.description}</p>
                <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all">
                  Learn More
                </button>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/50 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

