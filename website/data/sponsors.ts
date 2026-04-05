export type Sponsor = {
  name: string;
  website: string | null;
  logo: string | null;
  logoFit?: 'cover' | 'contain';
  description?: string;
};

export const sponsors: Sponsor[] = [
  {
    name: 'Sniff and Shift',
    website: 'https://sniffandshift.com/',
    logo: '/sponsors/sniff-and-shift.png',
    logoFit: 'cover',
    description: 'Small-batch, locally sourced pet treats and healthy snacks.'
  },
  {
    name: 'Bush Auto Group',
    website: 'https://bushautogroup.com/',
    logo: '/sponsors/bush-auto-group.png',
    logoFit: 'contain',
    description: 'Pennsylvania Nissan dealerships and collision repair services.'
  },
  {
    name: 'KP Elite',
    website: 'https://www.kpelite.com/',
    logo: '/sponsors/kp-elite.jpg',
    logoFit: 'contain',
    description: 'Ceramic coating, paint protection film, detailing, and window tint.'
  },
  {
    name: 'Eagle Wireless',
    website: 'https://eaglewireless.us/',
    logo: '/sponsors/eagle-wireless.jpg',
    logoFit: 'contain',
    description: 'GPS tracking, fleet management, routing, dispatching, and safety tools.'
  },
  {
    name: 'Refined Auto Detailing',
    website: 'https://www.refinedautodetailing.com/',
    logo: '/sponsors/refined-auto-detailing.jpg',
    logoFit: 'contain',
    description: 'Premium ceramic coating, PPF, detailing, paint correction, and tint.'
  },
  {
    name: 'Black Glass',
    website: 'https://blackglasstinting.com/',
    logo: '/sponsors/black-glass.png',
    logoFit: 'contain',
    description: 'Auto, home, and commercial tinting, detailing, PPF, and coatings.'
  },
  {
    name: 'Topline Heating and Air',
    website: 'https://toplineair.com/',
    logo: '/sponsors/topline-heating-and-air.png',
    logoFit: 'contain',
    description: 'Heating and air conditioning service, repair, and installation.'
  },
  {
    name: 'Supercar Connect',
    website: 'https://www.supercar-connect.com/',
    logo: '/sponsors/supercar-connect.png',
    logoFit: 'contain',
    description: 'A supercar community app for events, social sharing, and businesses.'
  },
  {
    name: 'Fast of West Chester',
    website: 'https://fastofwestchester.com/',
    logo: '/sponsors/fast-of-west-chester.jpg',
    logoFit: 'contain',
    description: 'Auto repair, performance builds, custom tuning, and collision work.'
  },
  {
    name: 'Bumpers Etc. Auto Body & Collision',
    website: 'https://bumpersetc.com/',
    logo: '/sponsors/bumpers-etc-auto-body-collision.webp',
    logoFit: 'contain',
    description: 'Family-owned auto body, collision repair, and ceramic coating services.'
  },
  {
    name: 'Sauder Motors',
    website: 'https://saudermotors.com/',
    logo: '/sponsors/sauder-motors.jpeg',
    logoFit: 'contain',
    description: 'Family-owned used vehicle sales with automotive and RV repair services.'
  },
  {
    name: 'Jason Shaffer Group',
    website: 'https://www.jasonshaffer.net/',
    logo: '/sponsors/jason-shaffer-group.png',
    logoFit: 'contain',
    description: 'SEO, Google Ads, and search marketing for lead and revenue growth.'
  }
];
