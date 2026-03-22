'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { galleryImages } from '@/data/galleryImages';

function formatLabel(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[+_]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const heroImage = galleryImages[0] ? `/gallery/${encodeURIComponent(galleryImages[0])}` : '/images/DJI_0175_Original+2.jpg';
  const selectedFileName = selectedIndex !== null ? galleryImages[selectedIndex] : null;
  const selectedImage = selectedFileName ? `/gallery/${encodeURIComponent(selectedFileName)}` : null;

  useEffect(() => {
    if (selectedIndex === null) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => (current === null ? current : (current + 1) % galleryImages.length));
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => (current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

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
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {galleryImages.map((fileName, index) => {
              const src = `/gallery/${encodeURIComponent(fileName)}`;

              return (
                <button
                  key={fileName}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group block overflow-hidden rounded-[18px] bg-black text-left"
                  aria-label={`Open ${formatLabel(fileName)}`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={src}
                      alt={formatLabel(fileName)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/12"></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedImage && selectedFileName && (
        <div
          className="fixed inset-0 z-[2147483000] bg-black/94 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={formatLabel(selectedFileName)}
          onClick={() => setSelectedIndex(null)}
        >
          <div className="flex h-full w-full items-center justify-center">
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-20 h-12 w-12 rounded-full bg-white/10 text-3xl leading-none text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
              aria-label="Close gallery image"
            >
              ×
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex((current) => (current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length));
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 md:left-8"
              aria-label="Previous image"
            >
              ‹
            </button>

            <div
              className="relative h-full w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={formatLabel(selectedFileName)}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex((current) => (current === null ? current : (current + 1) % galleryImages.length));
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 md:right-8"
              aria-label="Next image"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 text-center text-xs uppercase tracking-[0.22em] text-white/80 md:bottom-8">
              {selectedIndex !== null ? `${selectedIndex + 1} / ${galleryImages.length}` : null}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
