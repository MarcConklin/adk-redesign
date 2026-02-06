'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: 'ADK Supercar Show',
    description: 'Southeastern PA\'s largest supercar events',
    image: '/images/_DSC7937.jpg',
    tag: 'Monthly'
  },
  {
    title: 'ADK Road Rally',
    description: 'Epic driving experiences through scenic routes',
    image: '/images/ADKRoadRallyII2024-107.jpeg',
    tag: 'Seasonal'
  },
  {
    title: 'Cars & Coffee',
    description: 'Casual morning meetups for enthusiasts',
    image: '/images/_DSC5281_Original.jpg',
    tag: 'Weekly'
  },
  {
    title: 'Charity Events',
    description: 'Giving back to our community',
    image: '/images/_DSC7971.jpg',
    tag: 'Special'
  }
];

export default function EventsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.event-card');

      // Horizontal scroll animation - smoother
      const scrollWidth = containerRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;

      gsap.to(containerRef.current, {
        x: -(scrollWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth * 1.2}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Individual card animations - smoother
      cards?.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.85,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'left 80%',
            end: 'left 30%',
            scrub: 1,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
      id="events"
    >
      <div className="absolute top-12 left-12 z-10">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Our Events</p>
        <h2 className="text-5xl md:text-7xl font-bold">Experience Excellence</h2>
      </div>

      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-12 pt-48"
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="event-card relative flex-shrink-0 w-[500px] h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                {event.tag}
              </span>
              <h3 className="text-4xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-300 text-lg">{event.description}</p>
              <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

