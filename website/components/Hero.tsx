'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in and slide up
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8
      });

      // Image zoom out effect
      gsap.from(imageRef.current, {
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Parallax scroll effect on image
      gsap.to(imageRef.current, {
        y: 300,
        scale: 1.1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/DJI_0175_Original+2.jpg"
          alt="ADK Automotive Events"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-center leading-tight tracking-tight"
        >
          Southeastern Pennsylvania's<br />
          Premier Automotive Events
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 text-center max-w-3xl font-light tracking-wide"
        >
          Curating unforgettable experiences for automotive enthusiasts.<br />
          From road rallies to car shows, we bring the community together.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce"></div>
          </div>
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}
