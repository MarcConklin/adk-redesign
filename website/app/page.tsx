'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import MissionSection from '@/components/MissionSection';
import EventsShowcase from '@/components/EventsShowcase';
import YouTubeSection from '@/components/YouTubeSection';
import SponsorsSection from '@/components/SponsorsSection';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Prevent scroll restoration on page load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <MissionSection />
      <EventsShowcase />
      <SponsorsSection />
      <YouTubeSection />
      <Footer />
    </main>
  );
}

