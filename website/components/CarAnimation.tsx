'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function CarAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=350%',
          scrub: 2.5,
          pin: true,
        }
      });

      // Car enters from left - smoother
      tl.from(carRef.current, {
        x: '-180%',
        rotation: -8,
        duration: 1.2,
        ease: 'power2.out'
      })
      // Car accelerates to center with engine rev effect - more dramatic
      .to(carRef.current, {
        x: '0%',
        scale: 1.4,
        rotation: 0,
        duration: 0.6,
        ease: 'power4.in'
      })
      // Speed lines appear - smoother
      .to(speedLinesRef.current, {
        opacity: 1,
        duration: 0.3
      }, '<')
      // Car zooms across screen - more dramatic
      .to(carRef.current, {
        x: '220%',
        rotation: 5,
        scale: 1.8,
        duration: 1.2,
        ease: 'power4.out'
      })
      // Speed lines follow - smoother
      .to(speedLinesRef.current, {
        x: '120%',
        opacity: 0,
        duration: 1
      }, '<')
      // Track lines animate - smoother
      .to(trackRef.current?.querySelectorAll('.track-line') || [], {
        x: '-120%',
        stagger: 0.08,
        duration: 2,
        ease: 'none'
      }, '<')
      // Text reveal - smoother
      .from(textRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.7,
        duration: 1,
        ease: 'back.out(1.5)'
      });

      // Continuous track animation - smoother
      gsap.to(trackRef.current?.querySelectorAll('.track-line') || [], {
        x: '-100%',
        duration: 3,
        ease: 'none',
        repeat: -1,
        stagger: {
          each: 0.15,
          repeat: -1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* Animated track lines */}
      <div ref={trackRef} className="absolute inset-0 flex flex-col justify-center gap-12 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="track-line flex gap-8">
            {[...Array(20)].map((_, j) => (
              <div key={j} className="w-32 h-1 bg-white"></div>
            ))}
          </div>
        ))}
      </div>

      {/* Speed lines */}
      <div ref={speedLinesRef} className="absolute inset-0 opacity-0">
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[24%] left-[67%] w-[113px] opacity-30" style={{ transform: 'rotate(2deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[74%] left-[59%] w-[272px] opacity-70" style={{ transform: 'rotate(5deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[19%] left-[92%] w-[182px] opacity-60" style={{ transform: 'rotate(1deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[37%] left-[44%] w-[152px] opacity-40" style={{ transform: 'rotate(-5deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[83%] left-[52%] w-[288px] opacity-50" style={{ transform: 'rotate(-4deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[99%] left-[74%] w-[239px] opacity-60" style={{ transform: 'rotate(5deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[78%] left-[95%] w-[171px] opacity-65" style={{ transform: 'rotate(-2deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[91%] left-[84%] w-[289px] opacity-50" style={{ transform: 'rotate(1deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[30%] left-[77%] w-[279px] opacity-65" style={{ transform: 'rotate(-2deg)' }}></div>
        <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent top-[48%] left-[13%] w-[107px] opacity-35" style={{ transform: 'rotate(5deg)' }}></div>
      </div>

      {/* Car */}
      <div ref={carRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]">
        <Image
          src="/images/_DSC2787_Original+2.jpg"
          alt="Supercar"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </div>

      {/* Text overlay */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h2 className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
            PURE ADRENALINE
          </h2>
          <p className="text-2xl text-gray-400">Feel the rush of automotive excellence</p>
        </div>
      </div>
    </section>
  );
}

