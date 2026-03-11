'use client';

import { useEffect, useRef, useState } from 'react';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/info@adkautomotive.com';

export default function InquiryCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative py-24 md:py-32 overflow-hidden" id="inquiry">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-white to-red-50"></div>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-red-600 font-bold mb-5">Let&apos;s Build Something Big</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-black leading-[1.05] tracking-tight mb-8">
            Interested In Becoming A Sponsor,
            <br />
            Vendor, Or Partner?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light mb-10 leading-relaxed">
            Tell us what you&apos;re planning. Open the inquiry form and our team will follow up with next steps.
          </p>

          <button
            onClick={handleOpen}
            className="cta-glow group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-black text-white text-lg md:text-xl font-bold tracking-wide shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:bg-red-600 hover:-translate-y-1 transition-all duration-300"
          >
            Open Inquiry Form
            <span className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[2147483000] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Inquiry form modal"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          <div className="relative flex min-h-full items-center justify-center p-4 md:p-8">
            <div
              ref={modalRef}
              className="modal-pop relative w-full max-w-4xl max-h-[calc(100dvh-2rem)] md:max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-3xl border border-white/40 bg-[radial-gradient(circle_at_top_right,_#ffffff,_#f4f4f5_45%,_#ececec)] shadow-[0_32px_100px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-red-500 to-black"></div>
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 md:p-8 border-b border-black/10 bg-white/90 backdrop-blur">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-red-600 font-bold mb-3">Inquiry Form</p>
                  <h3 className="text-2xl md:text-4xl font-black uppercase text-black leading-tight">
                    Sponsor, Vendor, or Misc. Inquiry
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 w-11 shrink-0 rounded-full bg-black text-white text-2xl leading-none hover:bg-red-600 transition-colors"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="p-6 md:p-8">
                <form className="space-y-7" action={FORMSUBMIT_ENDPOINT} method="POST">
                  <input type="hidden" name="_subject" value="New Sponsor/Vendor Inquiry - ADK Automotive" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                      defaultValue=""
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="sponsor">Sponsor</option>
                      <option value="vendor">Vendor</option>
                      <option value="misc">Misc. Inquiry</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      required
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm uppercase tracking-wider font-bold text-black mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    />
                  </div>

                  <label className="inline-flex items-center gap-3 text-gray-700">
                    <input type="checkbox" name="newsletter" className="h-4 w-4 accent-red-600" />
                    Sign up for event announcements and updates
                  </label>

                  <div className="flex flex-col md:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-lg hover:from-red-800 hover:to-red-600 transition-colors"
                    >
                      Submit Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
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
