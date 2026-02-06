'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function CarAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(carRef.current, { x: '-150%' });
      gsap.set(textRef.current, { opacity: 0, filter: 'blur(20px)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
        }
      });

      // Car drives across the screen
      tl.to(carRef.current, {
        x: '150%',
        duration: 3,
        ease: 'none'
      })
      // Text reveals as car passes over it
      .to(textRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power2.out'
      }, '-=2.5');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Speed lines background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
            style={{
              top: `${15 + i * 10}%`,
              width: '100%',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Text that gets revealed */}
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <h2 className="text-7xl md:text-9xl font-black text-white tracking-tight mb-6">
          PURE SPEED
        </h2>
        <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide max-w-3xl">
          Where automotive excellence meets adrenaline
        </p>
      </div>

      {/* Car driving across */}
      <div ref={carRef} className="absolute z-20 w-[400px] md:w-[600px]">
        <Image
          src="/images/New-100_Original copy-Picsart-BackgroundRemover.jpeg"
          alt="ADK Supercar"
          width={600}
          height={400}
          className="w-full h-auto drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}

