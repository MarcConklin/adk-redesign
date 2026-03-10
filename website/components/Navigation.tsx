'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/marc@5k.co';

export default function Navigation() {
  type ModalMode = 'contact' | 'prayer';

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('contact');
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Prevent body scroll when mobile menu or contact modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isContactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isContactModalOpen]);

  useEffect(() => {
    if (!isContactModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsContactModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isContactModalOpen]);

  const openContactModal = (mode: ModalMode = 'contact') => {
    setModalMode(mode);
    setIsMobileMenuOpen(false);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const isPrayerMode = modalMode === 'prayer';

  useEffect(() => {
    if (isContactModalOpen && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [isContactModalOpen, modalMode]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-black py-6 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Go to home page">
          <Image
            src="/images/ADK-removebg-preview.png"
            alt="ADK Automotive"
            width={300}
            height={150}
            className="h-24 w-auto brightness-125"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          <a href="/events" className="hover:text-gray-300 transition-colors">Events</a>
          <a href="/about" className="hover:text-gray-300 transition-colors">About</a>
          <a href="/sponsors" className="hover:text-gray-300 transition-colors">Sponsors</a>
          <button onClick={() => openContactModal('contact')} className="hover:text-gray-300 transition-colors">Contact</button>
          <button
            onClick={() => openContactModal('prayer')}
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all hover:scale-105 font-bold shadow-lg shadow-red-600/30"
          >
            How Can We Pray For You?
          </button>
          <a
            href="https://renndvous.com/event/adk-road-rally-august/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-all hover:scale-105 font-semibold"
          >
            Buy Tickets
          </a>
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

      {/* Mobile Menu Full-Screen Popup - Separate from nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-[9999] w-screen h-screen overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-6 z-[10000] flex flex-col gap-1.5 p-2"
            aria-label="Close menu"
          >
            <span className="w-7 h-0.5 bg-white rotate-45 translate-y-2"></span>
            <span className="w-7 h-0.5 bg-white opacity-0"></span>
            <span className="w-7 h-0.5 bg-white -rotate-45 -translate-y-2"></span>
          </button>

          {/* Menu Content */}
          <div className="flex flex-col items-center justify-center h-screen w-screen gap-8 px-8">
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
              href="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
            >
              Events
            </a>
            <a
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
            >
              About
            </a>
            <a
              href="/sponsors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
            >
              Sponsors
            </a>
            <button
              onClick={() => openContactModal('contact')}
              className="text-white text-3xl font-bold hover:text-red-500 transition-colors tracking-tight"
            >
              Contact
            </button>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-12 w-full max-w-sm">
              <button
                onClick={() => openContactModal('prayer')}
                className="bg-red-600 text-white px-8 py-5 rounded-full hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-600/30 w-full text-lg"
              >
                How Can We Pray For You?
              </button>
              <a
                href="https://renndvous.com/event/adk-road-rally-august/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white text-black px-8 py-5 rounded-full hover:bg-gray-100 transition-all font-semibold w-full text-lg text-center"
              >
                Buy Tickets
              </a>
            </div>
          </div>
        </div>
      )}

      </nav>

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-[2147483000] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Contact form modal"
          onClick={closeContactModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
            <div
              ref={modalRef}
              className="modal-pop relative w-full max-w-3xl max-h-[calc(100dvh-2rem)] md:max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-3xl border border-white/40 bg-[radial-gradient(circle_at_top_right,_#ffffff,_#f4f4f5_45%,_#ececec)] shadow-[0_32px_100px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-red-500 to-black"></div>
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 md:p-8 border-b border-black/10 bg-white/90 backdrop-blur">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-red-600 font-bold mb-3">
                    {isPrayerMode ? 'Prayer Request' : 'Contact Us'}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-black uppercase text-black leading-tight">
                    {isPrayerMode ? 'How Can We Pray For You?' : 'Send A Message'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="h-11 w-11 shrink-0 rounded-full bg-black text-white text-2xl leading-none hover:bg-red-600 transition-colors"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="p-6 md:p-8">
                <form key={modalMode} className="space-y-6" action={FORMSUBMIT_ENDPOINT} method="POST">
                  <input
                    type="hidden"
                    name="_subject"
                    value={isPrayerMode ? 'New Prayer Request - ADK Automotive' : 'New Contact Form Submission - ADK Automotive'}
                  />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="formType" value={isPrayerMode ? 'prayer' : 'contact'} />

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contactFirstName" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                        First Name
                      </label>
                      <input
                        id="contactFirstName"
                        name="firstName"
                        required
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactLastName" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                        Last Name
                      </label>
                      <input
                        id="contactLastName"
                        name="lastName"
                        required
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Email
                    </label>
                    <input
                      id="contactEmail"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Subject
                    </label>
                    <input
                      id="contactSubject"
                      name="subject"
                      required
                      defaultValue={isPrayerMode ? 'Prayer Request' : ''}
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Message
                    </label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-lg hover:from-red-800 hover:to-red-600 transition-colors"
                    >
                      {isPrayerMode ? 'Send Prayer Request' : 'Send Message'}
                    </button>
                    <button
                      type="button"
                      onClick={closeContactModal}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-black/20 text-black font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
