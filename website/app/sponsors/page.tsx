import Image from 'next/image';
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-extrabold leading-[0.94] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Our Sponsors
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 md:text-xl">
              The brands helping ADK bring premium automotive events to life.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#090b10_0%,#050608_100%)] py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_26%)]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
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
