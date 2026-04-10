export type Sponsor = {
  name: string;
  website: string | null;
  logo: string | null;
  logoFit?: 'cover' | 'contain';
  description?: string;
  appStoreUrl?: string;
};

export const sponsors: Sponsor[] = [
  {
    name: 'Sniff and Shift',
    website: 'https://sniffandshift.com/',
    logo: '/sponsors/sniff-and-shift.png',
    logoFit: 'cover',
    description: 'A family-owned small-batch pet treat company based in Malvern, PA, crafting freeze-dried and air-dried snacks from 100% locally sourced, single-source proteins. Their minimally processed treats — from beef liver and quail eggs to wild-caught scallops — deliver premium nutrition for dogs and cats, with flexible subscription plans so your furry friend never runs low.'
  },
  {
    name: 'Bush Auto Group',
    website: 'https://bushautogroup.com/',
    logo: '/sponsors/bush-auto-group.png',
    logoFit: 'contain',
    description: 'A trusted multi-location Nissan and Infiniti dealer group with four locations across Pennsylvania, including Exton, Limerick, and West Chester. Bush Auto Group offers new and certified pre-owned vehicles, flexible financing, expert service, and a full collision center — all backed by a customer-first approach that has built a stellar reputation across the greater Philadelphia region.'
  },
  {
    name: 'KP Elite',
    website: 'https://www.kpelite.com/',
    logo: '/sponsors/kp-elite.jpg',
    logoFit: 'contain',
    description: "Pennsylvania's #1 top-rated ceramic coating and paint protection film specialists, with over 339 five-star Google reviews and a base in Chester Springs. As authorized FIREBALL Ceramic Coating installers, KP Elite offers certified ceramic applications, self-healing PPF, window tinting, and full paint correction for cars, SUVs, trucks, motorcycles, and boats — backed by multi-year warranties."
  },
  {
    name: 'Eagle Wireless',
    website: 'https://eaglewireless.us/',
    logo: '/sponsors/eagle-wireless.jpg',
    logoFit: 'contain',
    description: 'Since 2006, Eagle Wireless has provided government and corporate fleets with real-time GPS vehicle tracking, fleet management, routing, dispatching, and safety compliance tools. A full-service telematics provider, they handle everything from sales and installation to ongoing support — helping businesses reduce operational risk, improve efficiency, and grow their bottom line.'
  },
  {
    name: 'Refined Auto Detailing',
    website: 'https://www.refinedautodetailing.com/',
    logo: '/sponsors/refined-auto-detailing.jpg',
    logoFit: 'contain',
    description: "Refined Auto Detailing & Coatings is Lancaster, Pennsylvania's trusted destination for premium vehicle protection, holding certifications in Ceramic Pro, Fireball, and SB3 Coatings systems. Their expert team specializes in paint protection film, ceramic coatings, paint correction, and luxury detailing — all backed by thorough pre-service inspections and industry-leading warranties."
  },
  {
    name: 'Black Glass',
    website: 'https://blackglasstinting.com/',
    logo: '/sponsors/black-glass.png',
    logoFit: 'contain',
    description: "Since 2009, Black Glass Window Tinting + More has grown from a humble auto tint shop into one of Pennsylvania's most respected full-service window film companies. Operating from state-of-the-art shops in Palm and Lancaster County, they provide precision computer-cut tinting for vehicles, homes, and commercial properties, alongside PPF, ceramic coating, and Tesla-specific services."
  },
  {
    name: 'Topline Heating and Air',
    website: 'https://toplineair.com/',
    logo: '/sponsors/topline-heating-and-air.png',
    logoFit: 'contain',
    description: 'With over 1,000 five-star reviews, Topline Heating & Air is the residential HVAC company Pennsylvania homeowners trust most — serving Chester, Lancaster, Lebanon, Berks, and surrounding counties, plus New York and Ohio. Their certified technicians specialize in AC installation and repair, furnace and heat pump service, water heater replacement, and 24/7 emergency response.'
  },
  {
    name: 'Supercar Connect',
    website: 'https://www.supercar-connect.com/',
    logo: '/sponsors/supercar-connect.png',
    logoFit: 'contain',
    description: 'Supercar Connect is a premier platform dedicated to bringing together supercar owners, enthusiasts, and industry professionals through curated events, exclusive networking, and shared automotive experiences. Members gain access to luxury drive expos, elite automotive mixers, and a growing global community of passionate high-performance vehicle collectors and drivers.'
  },
  {
    name: 'Fast of West Chester',
    website: 'https://fastofwestchester.com/',
    logo: '/sponsors/fast-of-west-chester.jpg',
    logoFit: 'contain',
    description: 'With over 15 years of experience and 2,500+ vehicles serviced, FAST of West Chester is a performance-focused shop in West Chester, PA specializing in import tuning, custom engine builds, all-wheel drive dyno calibration, and full collision repair. As a COBB Pro Tuner and IAG Certified Installer, they handle everything from routine maintenance to full race builds for drivers across the country.'
  },
  {
    name: 'Bumpers Etc. Auto Body & Collision',
    website: 'https://bumpersetc.com/',
    logo: '/sponsors/bumpers-etc-logo-final-6.png',
    logoFit: 'contain',
    description: 'A unique, independently family-owned auto body and collision shop in Ephrata, Lancaster County, PA, Bumpers Etc. blends modern industry standards with old-fashioned customer dedication. Their services include collision repair, ceramic coating with a 10-year warranty, luxury auto detailing, paint correction, alloy wheel repair, and paintless dent removal — with free estimates always available.'
  },
  {
    name: 'Sauder Motors',
    website: 'https://saudermotors.com/',
    logo: '/sponsors/sauder-motors.jpeg',
    logoFit: 'contain',
    description: 'A third-generation, family-owned dealership and repair shop in Strasburg, PA, Sauder Motors has built a decades-long reputation for honest, integrity-driven service in Lancaster County. Their inventory spans quality pre-owned cars, trucks, SUVs, vans, RVs, and campers, all supported by a comprehensive automotive and RV service department open to the surrounding community.'
  },
  {
    name: 'Jason Shaffer Group',
    website: 'https://www.jasonshaffer.net/',
    logo: '/sponsors/jason-shaffer-group.png',
    logoFit: 'contain',
    description: 'Founded in 2012, the Jason Shaffer Group is an award-winning SEO and paid search agency that builds custom, data-driven campaigns turning online searches into high-quality leads, sales, and measurable revenue. Their services span Google Ads management, AI search optimization, technical SEO, and content strategy — all delivered with full transparency and no hidden fees.'
  },
  {
    name: 'Manheim Imports',
    website: 'https://manheimimports.com',
    logo: '/sponsors/Manheim+Imports+Logo.png',
    logoFit: 'contain',
    description: 'Located in Manheim, PA, Manheim Imports is a pre-owned dealership specializing in quality imported and luxury vehicles for buyers across the greater Lancaster County region. With a carefully curated inventory, flexible financing, and a personalized sales experience, their dedicated team is committed to matching every customer with the right vehicle at a fair price.'
  },
  {
    name: 'Modern Elix',
    website: 'https://modernelix.com/',
    logo: '/sponsors/cropped-IMG_20190828_150714_01.jpg',
    logoFit: 'contain',
    description: 'Based just outside West Chester, PA, Modern Elix is a premium automotive protection studio specializing in paint protection film, vinyl wraps, ceramic coatings, and XPEL window tinting for vehicles of all types. Their climate-controlled, state-of-the-art facility serves car enthusiasts across Pennsylvania, New Jersey, and Delaware — with precision workmanship on everything from daily drivers to exotic supercars.'
  },
  {
    name: 'JesusChat™',
    website: 'https://jesuschat.com',
    logo: '/sponsors/jesuschat-horizontal-full-logo.avif',
    logoFit: 'contain',
    description: 'JesusChat™ is an AI-powered Bible study platform offering Scripture reading with instant AI explanations, personalized daily devotionals, deep theological research with Greek and Hebrew word studies, and an open chat for faith-based questions. Available free on any device and downloadable on the Apple App Store, JesusChat™ meets believers and seekers alike wherever they are on their faith journey.',
    appStoreUrl: 'https://apps.apple.com/us/app/jesuschat-deep-bible-study/id6758314564'
  }
];
