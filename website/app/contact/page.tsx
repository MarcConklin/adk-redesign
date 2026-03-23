import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#070707] text-white">
      <Navigation />

      <section className="relative overflow-hidden border-b border-white/10 pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/_DSC3551_Original.jpg"
            alt="ADK Automotive event lineup"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,7,7,0.97)_18%,rgba(7,7,7,0.8)_55%,rgba(7,7,7,0.95)_100%)]"></div>
          <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-red-400">Contact ADK Automotive</p>
            <h1 className="text-5xl font-extrabold leading-[0.94] tracking-[-0.03em] md:text-7xl">
              Let&apos;s Start
              <br />
              The Conversation.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/84 md:text-2xl">
              Questions about events, sponsorships, partnerships, or getting involved? Send us a message and we&apos;ll get back to you.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-red-300">Email</p>
                <a href="mailto:info@adkautomotive.com" className="text-lg font-semibold text-white hover:text-red-300 transition-colors">
                  info@adkautomotive.com
                </a>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-red-300">Based In</p>
                <p className="text-lg font-semibold text-white">Lancaster, PA</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_right,_#ffffff,_#f4f4f5_42%,_#ececec)] p-1 shadow-[0_32px_100px_rgba(0,0,0,0.45)]">
            <div className="h-1.5 w-full rounded-t-[28px] bg-gradient-to-r from-red-700 via-red-500 to-black"></div>
            <div className="rounded-b-[28px] px-6 py-7 md:px-8 md:py-9">
              <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-red-600">Send A Message</p>
                <h2 className="text-3xl font-black uppercase leading-tight text-black md:text-4xl">
                  Full Contact Form
                </h2>
              </div>

              <ContactForm
                idPrefix="contactPage"
                submitClassName="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-lg hover:from-red-800 hover:to-red-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
