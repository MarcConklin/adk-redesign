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
      className="relative border-t-2 border-black py-24"
      id="contact"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background-image.jpg"
          alt="Background"
          fill
          className="object-cover opacity-50"
          quality={100}
        />
      </div>

      {/* White background base */}
      <div className="absolute inset-0 bg-white -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Logo & Tagline */}
          <div className="footer-item md:col-span-2">
            <Image
              src="/images/ADK-removebg-preview.png"
              alt="ADK Automotive"
              width={150}
              height={75}
              className="h-20 w-auto mb-8 brightness-0"
            />
            <p className="text-3xl font-bold mb-6 text-black tracking-tight">
              Driven by Passion
            </p>
            <p className="text-gray-700 max-w-md leading-relaxed font-light text-lg">
              Southeastern Pennsylvania&apos;s leading automotive event provider, connecting the community with unparalleled events.
              Empowering the automotive community through the love of Christ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-black">Quick Links</h3>
            <ul className="space-y-3 text-gray-700">
              <li><a href="#events" className="hover:text-red-600 transition-colors font-light">Events</a></li>
              <li><a href="#about" className="hover:text-red-600 transition-colors font-light">About</a></li>
              <li><a href="#sponsors" className="hover:text-red-600 transition-colors font-light">Sponsors</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors font-light">Become a Vendor</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors font-light">Buy Tickets</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-black">Connect With Us</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3 font-light">
                <span className="text-red-600 text-lg">📍</span>
                <span>Lancaster, PA</span>
              </li>
              <li className="flex items-start gap-3 font-light">
                <span className="text-red-600 text-lg">✉️</span>
                <a href="mailto:info@adkautomotive.com" className="hover:text-red-600 transition-colors">
                  info@adkautomotive.com
                </a>
              </li>
              <li className="pt-2">
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/adk_automotive/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors text-2xl">📷</a>
                  <a href="https://www.facebook.com/adkautomotivechannel" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors text-2xl">📘</a>
                  <a href="https://www.youtube.com/@ADKAutomotiveChannel" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors text-2xl">▶️</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <p className="font-light">&copy; 2026 ADK Automotive LLC. All rights reserved.</p>
          <p className="text-red-600 font-bold tracking-wider">COLOSSIANS 3:17</p>
        </div>
      </div>
    </footer>
  );
}

