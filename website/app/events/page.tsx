import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type EventCategory = 'Supercars at Sunset' | 'Cars and Coffee' | 'Road Rally';

type EventItem = {
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  time: string;
  image: string;
  isHolidayFeature?: boolean;
};

const freshGallery = [
  '/images/DJI_0362_Original.jpg',
  '/images/New-100_Original.jpeg',
  '/images/_DSC2787_Original+2.jpg',
  '/images/_DSC7971.jpg'
] as const;

const events: EventItem[] = [
  {
    title: 'Freedom Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-04-25',
    location: 'Freedom Life Church, Gap PA',
    time: '5:00 PM to 9:00 PM',
    image: '/images/DJI_0175_Original+2.jpg'
  },
  {
    title: 'Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-05-31',
    location: 'Classic Auto Mall, Morgantown PA',
    time: '5:00 PM to 9:00 PM',
    image: '/images/_DSC3551_Original.jpg'
  },
  {
    title: 'Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-07-11',
    location: 'Classic Auto Mall, Morgantown PA',
    time: '5:00 PM to 9:00 PM',
    image: '/images/ADKSupercarShow1-20.JPG',
    isHolidayFeature: true
  },
  {
    title: 'Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-07-25',
    location: 'Calvary Chapel, Chester Springs PA',
    time: '5:00 PM to 9:00 PM',
    image: freshGallery[3]
  },
  {
    title: 'Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-08-16',
    location: 'DOVE Westgate Church, Ephrata PA',
    time: '5:00 PM to 9:00 PM',
    image: '/images/ADKSupercarShow1-33.JPG'
  },
  {
    title: 'Freedom Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-09-12',
    location: 'Freedom Life Church, Gap PA',
    time: '5:00 PM to 9:00 PM',
    image: '/images/_DSC4541.JPG'
  },
  {
    title: 'Supercars at Sunset',
    category: 'Supercars at Sunset',
    date: '2026-09-26',
    location: 'Chester County Airport, Coatesville PA',
    time: '3:00 PM to 8:00 PM',
    image: '/images/DJI_0810.JPG'
  },
  {
    title: 'Road Rally',
    category: 'Road Rally',
    date: '2026-10-17',
    location: 'Destinations TBD',
    time: '4:00 AM to 7:00 PM',
    image: '/images/_DSC3132_Original+2.jpg'
  },
  {
    title: 'Cars and Coffee',
    category: 'Cars and Coffee',
    date: '2026-11-01',
    location: 'Classic Auto Mall, Morgantown PA',
    time: '9:00 AM to 12:00 PM',
    image: '/images/0CA4A52AB94D37BB0CAF481AC7E6A650.jpg'
  },
  {
    title: 'Road Rally',
    category: 'Road Rally',
    date: '2026-11-22',
    location: 'Destinations TBD',
    time: '8:00 AM to 12:00 PM',
    image: '/images/ADKRoadRallyII2024-56.jpeg'
  }
];

const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

function categoryStyle(category: EventCategory) {
  if (category === 'Cars and Coffee') {
    return 'bg-[#14312a] text-[#9cf0d7] border-[#2f7a68]';
  }

  if (category === 'Road Rally') {
    return 'bg-[#2c2010] text-[#ffcf93] border-[#7a5630]';
  }

  return 'bg-[#301418] text-[#ffb4b4] border-[#8c2f3a]';
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <article className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[#10131b] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="grid lg:grid-cols-[1.15fr_1fr] min-h-[490px]">
        <div className="relative min-h-[280px] lg:min-h-full">
          <Image
            src={event.image}
            alt={`${event.title} at ${event.location}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30"></div>
          <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
              Event {String(index + 1).padStart(2, '0')}
            </span>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${categoryStyle(event.category)}`}>
              {event.category}
            </span>
          </div>
        </div>

        <div className="relative flex flex-col justify-between p-7 md:p-9">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-red-300 font-bold mb-4">{formatDate(event.date)}</p>
            <h3 className="text-3xl md:text-4xl font-black leading-[1.02] text-white mb-5">{event.title}</h3>
            <p className="text-white/85 text-lg md:text-xl mb-3">{event.location}</p>
            <p className="text-white/70 text-base md:text-lg mb-6">{event.time}</p>
            {event.isHolidayFeature && (
              <span className="inline-flex rounded-full border border-red-300/40 bg-red-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-200">
                Fourth of July Feature Show
              </span>
            )}
          </div>

          <p className="text-white/55 text-sm uppercase tracking-[0.2em] mt-6">Tentative 2026 schedule</p>
        </div>
      </div>
    </article>
  );
}

export default function EventsPage() {
  return (
    <main className="relative min-h-screen bg-[#06070a] text-white">
      <Navigation />

      <section className="relative overflow-hidden border-b border-white/10 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/_DSC2787_Original+2.jpg"
            alt="ADK event lineup"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(5,6,8,0.96)_20%,rgba(5,6,8,0.8)_55%,rgba(5,6,8,0.94)_100%)]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-red-400">ADK 2026 Events</p>
          <h1 className="mb-8 max-w-5xl text-5xl font-extrabold leading-[0.94] tracking-[-0.03em] md:text-7xl lg:text-8xl">
            Every Event. Fully Loaded.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/84 md:text-2xl">
            Upcoming ADK evening shows, morning shows, and road rallies sorted from closest date to furthest date.
          </p>
        </div>
      </section>

      <section className="bg-[#090b10] py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-8 md:space-y-10">
            {sortedEvents.map((event, index) => (
              <EventCard key={`${event.date}-${event.title}-${event.location}`} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f3f3] py-10 text-black md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            Disclaimer: All event dates, times, and locations are subject to change due to weather, venue availability, safety considerations, and other unforeseen circumstances.
            ADK Automotive reserves the right to make adjustments as necessary to ensure the quality and safety of each event.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
