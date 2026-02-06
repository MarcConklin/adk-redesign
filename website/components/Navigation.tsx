'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when at top (within 50px) or scrolling up
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down and past 50px
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } bg-black py-6 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/ADK-removebg-preview.png"
            alt="ADK Automotive"
            width={300}
            height={150}
            className="h-24 w-auto brightness-125"
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <a href="#events" className="hover:text-gray-300 transition-colors">Events</a>
          <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
          <a href="#sponsors" className="hover:text-gray-300 transition-colors">Sponsors</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105 font-semibold">
            Buy Tickets
          </button>
        </div>
      </div>
    </nav>
  );
}

