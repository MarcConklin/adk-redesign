import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { galleryImages } from '@/data/galleryImages';

const tileClasses = [
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[4/3]',
  'aspect-[16/10]'
];

function formatLabel(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[+_]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function GalleryPage() {
  const heroImage = galleryImages[0] ? `/gallery/${encodeURIComponent(galleryImages[0])}` : '/images/DJI_0175_Original+2.jpg';

  return (
    <main className="relative min-h-screen bg-[#06070a] text-white">
      <Navigation />

      <section className="relative overflow-hidden border-b border-white/10 pt-36 md:pt-44">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="ADK gallery hero"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(5,6,8,0.97)_18%,rgba(5,6,8,0.8)_55%,rgba(5,6,8,0.95)_100%)]"></div>
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-red-600/18 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/8 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-red-400">ADK Gallery</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[0.94] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              Cars, Community,
              <br />
              And Event Moments.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 md:text-xl">
              A full event-photo gallery built from the image library in this project, focused on the people, cars, and atmosphere behind ADK.
            </p>
          </div>

          <div className="mt-10 inline-flex items-center gap-4 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white/75 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
            {galleryImages.length} photos in the gallery
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#090b10_0%,#050608_100%)] py-10 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_24%)]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {galleryImages.map((fileName, index) => {
              const src = `/gallery/${encodeURIComponent(fileName)}`;
              const label = formatLabel(fileName);

              return (
                <a
                  key={fileName}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <article className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:-translate-y-1">
                    <div className={`relative ${tileClasses[index % tileClasses.length]} overflow-hidden`}>
                      <Image
                        src={src}
                        alt={label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                    <div className="border-t border-white/8 px-4 py-3">
                      <p className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 md:text-xs">
                        {label}
                      </p>
                    </div>
                  </article>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
