'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <a href="#events" className="hover:text-gray-300 transition-colors">Events</a>
          <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
          <a href="#sponsors" className="hover:text-gray-300 transition-colors">Sponsors</a>
          <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all hover:scale-105 font-bold shadow-lg shadow-red-600/30">
            How Can We Pray For You?
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105 font-semibold">
            Buy Tickets
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Full-Screen Popup */}
      <div className={`md:hidden fixed inset-0 bg-black z-[100] transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-6 z-[110] flex flex-col gap-1.5 p-2"
          aria-label="Close menu"
        >
          <span className="w-7 h-0.5 bg-white rotate-45 translate-y-2"></span>
          <span className="w-7 h-0.5 bg-white opacity-0"></span>
          <span className="w-7 h-0.5 bg-white -rotate-45 -translate-y-2"></span>
        </button>

        {/* Menu Content */}
        <div className={`flex flex-col items-center justify-center h-full gap-8 px-8 transition-all duration-500 delay-100 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Logo */}
          <Image
            src="/images/ADK-removebg-preview.png"
            alt="ADK Automotive"
            width={200}
            height={100}
            className="h-20 w-auto brightness-125 mb-8"
          />

          {/* Navigation Links */}
          <a
            href="#events"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
          >
            Events
          </a>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
          >
            About
          </a>
          <a
            href="#sponsors"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
          >
            Sponsors
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
          >
            Contact
          </a>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-12 w-full max-w-sm">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-red-600 text-white px-8 py-5 rounded-full hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-600/30 w-full text-lg"
            >
              How Can We Pray For You?
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-white text-black px-8 py-5 rounded-full hover:bg-gray-100 transition-all font-semibold w-full text-lg"
            >
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

