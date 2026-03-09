import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { sponsors } from '@/data/sponsors';

function SponsorCard({
  name,
  logo,
  website,
  index
}: {
  name: string;
  logo: string;
  website: string | null;
  index: number;
}) {
  const buttonClassName =
    'inline-flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] transition-all';

  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(17,18,22,0.96),rgba(9,10,14,0.98))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_30%)] opacity-80"></div>
      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-red-200">
            Sponsor {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-[0.26em] text-white/45">Official Partner</span>
        </div>

        <div className="relative mb-6 flex min-h-[220px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.97),rgba(244,244,245,0.9))] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent"></div>
          <div className="relative h-[120px] w-full">
            <Image
              src={logo}
              alt={name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white">{name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Featured as part of the ADK sponsor lineup. Add their live website later and this card is ready to route there.
          </p>
        </div>

        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClassName} border-red-500 bg-red-600 text-white hover:border-red-400 hover:bg-red-500`}
          >
            Visit Website
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={`${buttonClassName} cursor-not-allowed border-white/12 bg-white/6 text-white/40`}
          >
            Website Coming Soon
          </button>
        )}
      </div>
    </article>
  );
}

export default function SponsorsPage() {
  return (
    <main className="relative min-h-screen bg-[#06070a] text-white">
      <Navigation />

      <section className="relative overflow-hidden border-b border-white/10 pt-36 md:pt-44">
        <div className="absolute inset-0">
          <Image
            src="/images/background-image.jpg"
            alt="ADK sponsor backdrop"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(5,6,8,0.97)_18%,rgba(5,6,8,0.85)_55%,rgba(5,6,8,0.95)_100%)]"></div>
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-red-600/18 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/8 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-16 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-red-400">ADK Sponsors</p>
            <h1 className="max-w-5xl text-5xl font-extrabold leading-[0.94] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              The Brands Behind
              <span className="text-red-500"> The Experience.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/82 md:text-2xl">
              The companies supporting ADK events, community, and presentation. Every card below is ready for a live website link as soon as you send it over.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#inquiry"
                className="inline-flex items-center rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white transition-all hover:scale-[1.02] hover:bg-red-500"
              >
                Become A Sponsor
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                View Events
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-end md:grid-cols-3">
            <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">Active Sponsors</p>
              <p className="mt-4 text-5xl font-black">{sponsors.length}</p>
            </div>
            <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">Grid Layout</p>
              <p className="mt-4 text-5xl font-black">3</p>
              <p className="mt-2 text-sm text-white/55">Columns on desktop</p>
            </div>
            <div className="rounded-[28px] border border-white/12 bg-white/[0.05] p-5 backdrop-blur md:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">Why It Works</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/72">
                Clean logo presentation, clear calls to action, and enough visual weight to feel premium without burying the sponsors under effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#090b10_0%,#050608_100%)] py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_26%)]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-400">Sponsor Directory</p>
              <h2 className="text-3xl font-black tracking-tight md:text-5xl">Three Columns. Clean Cards. Ready For Links.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/62 md:text-base">
              Sponsor logos are centered in consistent presentation cards, and each button is already structured for outbound links once you send over the URLs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.name} index={index} {...sponsor} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
