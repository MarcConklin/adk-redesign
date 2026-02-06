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
      // Set initial state for image to prevent glitch
      gsap.set(imageRef.current, {
        scale: 1,
        y: 0,
      });

      // Split title into words for staggered animation
      const titleWords = titleRef.current?.querySelectorAll('.word');

      // Title fade in with stagger
      gsap.from(titleWords || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8
      });

      // Parallax scroll effect on image - smooth and subtle
      gsap.to(imageRef.current, {
        y: 200,
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
          className="object-cover opacity-70"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 max-w-6xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-center leading-tight tracking-tight"
          style={{ perspective: '1000px' }}
        >
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>Driven</span>{' '}
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>by</span>{' '}
          <span className="word inline-block text-red-500" style={{ transformStyle: 'preserve-3d' }}>Christ,</span>
          <br />
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>United</span>{' '}
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>by</span>{' '}
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>a</span>{' '}
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>Love</span>{' '}
          <span className="word inline-block" style={{ transformStyle: 'preserve-3d' }}>for</span>{' '}
          <span className="word inline-block text-red-500" style={{ transformStyle: 'preserve-3d' }}>Cars</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 text-center max-w-3xl font-light tracking-wide"
        >
          Southeastern PA&apos;s leading automotive event provider.<br />
          Connecting the community through world-class supercar shows, road rallies, and unforgettable experiences.
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
