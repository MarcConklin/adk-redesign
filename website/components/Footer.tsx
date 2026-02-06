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
      gsap.from(footerRef.current?.querySelectorAll('.footer-item'), {
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
      className="relative bg-black border-t border-white/10 py-20"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
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
            <p className="text-2xl font-bold mb-4">Driven by Passion</p>
            <p className="text-gray-400 max-w-md">
              Southeastern Pennsylvania's leading automotive event provider, connecting the community with unparalleled events.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-item">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Vendor</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lancaster, PA</li>
              <li><a href="mailto:info@adkautomotive.com" className="hover:text-white transition-colors">info@adkautomotive.com</a></li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; 2026 ADK Automotive LLC. All rights reserved.</p>
          <p>Colossians 3:17</p>
        </div>
      </div>
    </footer>
  );
}

