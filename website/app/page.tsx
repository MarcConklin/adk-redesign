'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import MissionSection from '@/components/MissionSection';
import EventsShowcase from '@/components/EventsShowcase';
import CarAnimation from '@/components/CarAnimation';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('body', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      ScrollTrigger.config({
        syncInterval: 1,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative">
      <Navigation />
      <Hero />
      <MissionSection />
      <EventsShowcase />
      <CarAnimation />
      <SponsorsSection />
      <Footer />
    </main>
  );
}

