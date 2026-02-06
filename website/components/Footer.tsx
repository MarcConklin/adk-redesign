'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.querySelectorAll('.footer-item') || [], {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'center bottom',
          scrub: 1
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-black via-gray-900 to-black border-t border-white/10 py-20"
      id="contact"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="footer-item md:col-span-2">
            <Image
              src="/images/ADK-removebg-preview.png"
              alt="ADK Automotive"
              width={150}
              height={75}
              className="h-16 w-auto mb-6"
            />
            <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Driven by Passion
            </p>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Southeastern Pennsylvania&apos;s leading automotive event provider, connecting the community with unparalleled events.
              Empowering the automotive community through the love of Christ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#events" className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ Events</a></li>
              <li><a href="#about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ About</a></li>
              <li><a href="#sponsors" className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ Sponsors</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ Become a Vendor</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">→ Buy Tickets</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <h3 className="text-lg font-bold mb-4 text-white">Connect With Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-red-500">📍</span> Lancaster, PA
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">✉️</span>
                <a href="mailto:info@adkautomotive.com" className="hover:text-white transition-colors">
                  info@adkautomotive.com
                </a>
              </li>
              <li className="pt-4">
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/adk_automotive/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors text-xl">📷</a>
                  <a href="https://www.facebook.com/adkautomotivechannel" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors text-xl">📘</a>
                  <a href="https://www.youtube.com/@ADKAutomotiveChannel" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors text-xl">▶️</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; 2026 ADK Automotive LLC. All rights reserved.</p>
          <p className="text-red-500/70 font-semibold">Colossians 3:17</p>
        </div>
      </div>
    </footer>
  );
}

