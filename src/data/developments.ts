export type DevelopmentCategory = 'All' | 'Lakeside' | 'Urban & Garden' | 'Coastal';

export interface ResidenceUnit {
  unitCode: string;
  typology: string;
  interiorSqm: number;
  terraceSqm: number;
  orientation: string;
  availability: 'Available' | 'Reserved' | 'Private Hold';
  guidePriceEur: string;
}

export interface Development {
  id: string;
  index: string;
  name: string;
  location: string;
  country: string;
  coordinates: string;
  category: Exclude<DevelopmentCategory, 'All'>;
  completionYear: string;
  architectStudio: string;
  summary: string;
  editorialEssay: string;
  image: string;
  imageAlt: string;
  materials: string[];
  totalResidences: number;
  areaRange: string;
  units: ResidenceUnit[];
}

export interface ArchitecturalChapter {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  figureCaption: string;
  image: string;
  imageAlt: string;
}

export interface LifestyleProximity {
  id: string;
  minutes: string;
  mode: string;
  destination: string;
  description: string;
  locationTag: string;
  image: string;
  imageAlt: string;
}

export interface GalleryPlate {
  id: string;
  figure: string;
  title: string;
  category: 'Exteriors' | 'Interiors' | 'Details';
  development: string;
  location: string;
  photographerNote: string;
  image: string;
  imageAlt: string;
  spanClass: string;
}

export interface CredibilityParameter {
  code: string;
  metric: string;
  label: string;
  summary: string;
  detail: string;
}

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_pavilion_twilight_1795239844739.jpg',
  alt: 'Monolithic travertine and patinated bronze cantilevered pavilion residence overlooking a calm alpine lake at twilight',
  coordinates: '45.9840° N · 9.2571° E',
  plateTitle: 'Plate 00 — Alpine Cantilever Study',
};

export const DEVELOPMENTS: Development[] = [
  {
    id: 'villa-aurelia',
    index: '01',
    name: 'Villa Aurelia',
    location: 'Torno, Lake Como',
    country: 'Italy',
    coordinates: '45.8562° N · 9.1158° E',
    category: 'Lakeside',
    completionYear: 'Q4 2026',
    architectStudio: 'Studio Bellini & Associati',
    summary:
      'Six private waterfront residences framed by rhythmic Botticino limestone colonnades, bronze-clad glazing, and a private timber boat slip.',
    editorialEssay:
      'Anchored directly into the terraced limestone shoreline of Torno, Villa Aurelia reinterprets classical Lombard loggias through quiet modern restraint. Tall arched apertures draw morning light across honed travertine slabs while deep recessed terraces shelter residents above the water.',
    image: '/src/assets/images/dev_villa_aurelia_1795239844943.jpg',
    imageAlt: 'Warm cream limestone lakeside villa with tall arched windows and cypress terrace on Lake Como',
    materials: ['Botticino Limestone', 'Patinated Architectural Bronze', 'Brushed European Oak', 'Low-Iron Acoustic Glass'],
    totalResidences: 6,
    areaRange: '340 – 620 m²',
    units: [
      {
        unitCode: 'VA-01',
        typology: 'Garden Loggia Residence',
        interiorSqm: 342,
        terraceSqm: 118,
        orientation: 'South-West Lake',
        availability: 'Available',
        guidePriceEur: '€6,400,000',
      },
      {
        unitCode: 'VA-03',
        typology: 'Piano Nobile Duplex',
        interiorSqm: 485,
        terraceSqm: 145,
        orientation: 'West Panoramic',
        availability: 'Reserved',
        guidePriceEur: '€9,150,000',
      },
      {
        unitCode: 'VA-06',
        typology: 'Belvedere Penthouse',
        interiorSqm: 618,
        terraceSqm: 210,
        orientation: '360° Shoreline',
        availability: 'Available',
        guidePriceEur: '€12,800,000',
      },
    ],
  },
  {
    id: 'palais-solis',
    index: '02',
    name: 'Palais Solis',
    location: 'Cologny, Geneva',
    country: 'Switzerland',
    coordinates: '46.2191° N · 6.1834° E',
    category: 'Urban & Garden',
    completionYear: 'Q2 2027',
    architectStudio: 'Keller & Moreau Architekten',
    summary:
      'Twelve sculptural courtyard apartments crafted in bush-hammered Jura stone with vertical bronze brise-soleil screens and Minergie-P thermal envelopes.',
    editorialEssay:
      'Set behind mature hornbeam hedgerows in Cologny, Palais Solis organizes twelve single-level and duplex residences around a tranquil granite water court. Articulated bronze louvers filter afternoon sun, turning every facade elevation into a shifting study of shadow and mass.',
    image: '/src/assets/images/dev_palais_solis_1795239844498.jpg',
    imageAlt: 'Contemporary pale Jura limestone residence with bronze louvers overlooking a gravel and water courtyard in Geneva',
    materials: ['Bush-Hammered Jura Stone', 'Anodized Bronze Louvers', 'Smoked Larch Joinery', 'Geothermal Radiant Slabs'],
    totalResidences: 12,
    areaRange: '280 – 510 m²',
    units: [
      {
        unitCode: 'PS-02',
        typology: 'Courtyard Pavilion',
        interiorSqm: 286,
        terraceSqm: 92,
        orientation: 'South Garden',
        availability: 'Available',
        guidePriceEur: '€5,750,000',
      },
      {
        unitCode: 'PS-07',
        typology: 'Canopy Corner Residence',
        interiorSqm: 390,
        terraceSqm: 74,
        orientation: 'South-East Alps',
        availability: 'Available',
        guidePriceEur: '€7,900,000',
      },
      {
        unitCode: 'PS-11',
        typology: 'Attic Sky Residence',
        interiorSqm: 508,
        terraceSqm: 164,
        orientation: 'Lake Geneva Axis',
        availability: 'Private Hold',
        guidePriceEur: '€11,200,000',
      },
    ],
  },
  {
    id: 'maison-verre',
    index: '03',
    name: 'Maison Verre',
    location: 'Nanzenji, Kyoto',
    country: 'Japan',
    coordinates: '35.0116° N · 135.7936° E',
    category: 'Urban & Garden',
    completionYear: 'Q3 2027',
    architectStudio: 'Takahashi Spatial Studio',
    summary:
      'Four low-slung timber, basalt, and frameless glass sanctuary homes woven around curated moss gardens in eastern Kyoto.',
    editorialEssay:
      'Designed in quiet deference to neighboring temple precincts, Maison Verre pairs deep Japanese cedar eaves with seismic-isolated honed basalt piers. Floor-to-ceiling low-iron glass slides invisibly into stone pockets, dissolving the boundary between salon and moss garden.',
    image: '/src/assets/images/dev_maison_verre_1795239844397.jpg',
    imageAlt: 'Minimalist Kyoto residence with dark basalt stone pier, cedar ceiling eaves, and glass walls opening to a moss garden',
    materials: ['Honed Kurama Basalt', 'Yoshino Cedar Soffits', 'Low-Iron Structural Glass', 'Hand-Troweled Shikkui Plaster'],
    totalResidences: 4,
    areaRange: '310 – 440 m²',
    units: [
      {
        unitCode: 'MV-01',
        typology: 'East Moss Pavilion',
        interiorSqm: 318,
        terraceSqm: 155,
        orientation: 'East Garden',
        availability: 'Available',
        guidePriceEur: '€6,100,000',
      },
      {
        unitCode: 'MV-04',
        typology: 'North Ridge Compound',
        interiorSqm: 440,
        terraceSqm: 230,
        orientation: 'Higashiyama Hills',
        availability: 'Reserved',
        guidePriceEur: '€8,650,000',
      },
    ],
  },
  {
    id: 'pavilion-maris',
    index: '04',
    name: 'Pavilion Maris',
    location: 'Deià, Mallorca',
    country: 'Spain',
    coordinates: '39.7484° N · 2.6487° E',
    category: 'Coastal',
    completionYear: 'Q1 2028',
    architectStudio: 'Estudio Soler & Valls',
    summary:
      'Five cliffside dry-stone residences cantilevered over the Balearic horizon with saltwater lap pools and shaded pergolas.',
    editorialEssay:
      'Carved into the Tramuntana coastal escarpment, Pavilion Maris uses excavated Marès sandstone to construct dry-laid retaining walls that anchor contemporary cantilevered terraces. Each residence maintains complete visual privacy from sea and ridge.',
    image: '/src/assets/images/dev_pavilion_maris_1795239844596.jpg',
    imageAlt: 'Mediterranean limestone cliffside villa in Mallorca with cantilevered infinity pool overlooking the sea at golden hour',
    materials: ['Mallorcan Marès Sandstone', 'Weathered Teak Pergolas', 'Brushed Gunmetal Bronze', 'Saline Filtration Stone'],
    totalResidences: 5,
    areaRange: '420 – 690 m²',
    units: [
      {
        unitCode: 'PM-02',
        typology: 'Cliffside Horizon Villa',
        interiorSqm: 465,
        terraceSqm: 260,
        orientation: 'West Mediterranean',
        availability: 'Available',
        guidePriceEur: '€8,900,000',
      },
      {
        unitCode: 'PM-05',
        typology: 'Promontory Estate',
        interiorSqm: 688,
        terraceSqm: 340,
        orientation: '270° Sea & Tramuntana',
        availability: 'Available',
        guidePriceEur: '€14,500,000',
      },
    ],
  },
];

export const ARCHITECTURAL_CHAPTERS: ArchitecturalChapter[] = [
  {
    index: '01',
    title: 'Proportion & Daylight',
    subtitle: 'Solar Geometry as Structural Form',
    description:
      'Every commission begins with a twelve-month solar path study. Deep cantilevered eaves, recessed colonnades, and 4.2-meter ceiling planes calibrate natural light across seasons without artificial glare.',
    metricLabel: 'Clear Floor-to-Ceiling',
    metricValue: '4.20 m',
    figureCaption: 'Plate I — Twilight Horizon Cantilever',
    image: '/src/assets/images/hero_pavilion_twilight_1795239844739.jpg',
    imageAlt: 'Cantilevered travertine pavilion calibrated to twilight horizon reflection',
  },
  {
    index: '02',
    title: 'Monolithic Quarry Stone',
    subtitle: 'Load-Bearing & Tactile Permanence',
    description:
      'We specify single-quarry travertine, Jura limestone, and Kurama basalt cut in thick structural blocks rather than thin veneers—allowing facades to weather gracefully across decades.',
    metricLabel: 'Minimum Cladding Depth',
    metricValue: '120 mm',
    figureCaption: 'Plate II — Honed Limestone & Colonnade',
    image: '/src/assets/images/dev_villa_aurelia_1795239844943.jpg',
    imageAlt: 'Thick limestone arches and carved shoreline plinth at Villa Aurelia',
  },
  {
    index: '03',
    title: 'Patinated Bronze & Craft',
    subtitle: 'Hardware Cast for Human Touch',
    description:
      'Custom architectural bronze mullions, curved stair balustrades, and concealed pivot hinges are sand-cast and hand-waxed so every point of daily physical contact deepens in character.',
    metricLabel: 'Acoustic Glazing Rating',
    metricValue: '46 dB',
    figureCaption: 'Plate III — Curved Travertine & Bronze Stair',
    image: '/src/assets/images/detail_stone_bronze_1795239844428.jpg',
    imageAlt: 'Curved travertine staircase with custom patinated bronze handrail in natural skylight',
  },
  {
    index: '04',
    title: 'Landscape Continuity',
    subtitle: 'Architecture Subordinate to Terrain',
    description:
      'Buildings step with natural contours rather than flattening them. Native olive groves, moss courts, and rainwater reflection basins cool the microclimate while anchoring each residence to place.',
    metricLabel: 'Permeable Native Terrain',
    metricValue: '68 %',
    figureCaption: 'Plate IV — Moss Courtyard Threshold',
    image: '/src/assets/images/dev_maison_verre_1795239844397.jpg',
    imageAlt: 'Frameless glass living pavilion opening directly onto a Japanese moss garden',
  },
];

export const LIFESTYLE_PROXIMITIES: LifestyleProximity[] = [
  {
    id: 'promenade',
    minutes: '04',
    mode: 'minutes walk',
    destination: 'to the lakeside limestone promenade',
    description:
      'Morning swims and unhurried coastal walks begin directly below the garden terraces via private keycard shoreline access.',
    locationTag: 'Lake Como · Torno Shoreline',
    image: '/src/assets/images/dev_villa_aurelia_1795239844943.jpg',
    imageAlt: 'Lakeside limestone terrace and wooden boat pier at Villa Aurelia',
  },
  {
    id: 'salon',
    minutes: '00',
    mode: 'steps from home',
    destination: 'to double-height private gallery salons',
    description:
      'Museum-grade humidity regulation, recessed linear illumination, and 4.2-meter hearth walls curated for private collections.',
    locationTag: 'Interior Architecture · Living Wing',
    image: '/src/assets/images/interior_grand_salon_1795239844680.jpg',
    imageAlt: 'Double-height travertine salon with bronze windows and oak herringbone floor',
  },
  {
    id: 'terrace',
    minutes: '02',
    mode: 'minutes ascent',
    destination: 'to twilight rooftop hearth terraces',
    description:
      'Private elevator lobbies open directly onto travertine sky decks with recessed fire bowls and unobstructed horizon sightlines.',
    locationTag: 'Penthouse Elevation · Dusk Lounge',
    image: '/src/assets/images/lifestyle_terrace_dusk_1795239845297.jpg',
    imageAlt: 'Rooftop stone terrace with fireplace glow overlooking calm evening water',
  },
  {
    id: 'courtyard',
    minutes: '06',
    mode: 'minutes walk',
    destination: 'to quiet botanical and cultural quarters',
    description:
      'Positioned along serene residential avenues beside historic conservatories, art foundations, and contemplative gardens.',
    locationTag: 'Geneva & Kyoto · Quiet Enclaves',
    image: '/src/assets/images/dev_palais_solis_1795239844498.jpg',
    imageAlt: 'Sculptural landscaped courtyard garden surrounded by limestone apartments',
  },
  {
    id: 'horizon',
    minutes: '18',
    mode: 'minutes drive',
    destination: 'to private marine & executive terminals',
    description:
      'Discreet concierge transfers connect secluded coastal and alpine retreats with regional private aviation within twenty minutes.',
    locationTag: 'Mallorca & Alpine · Regional Access',
    image: '/src/assets/images/dev_pavilion_maris_1795239844596.jpg',
    imageAlt: 'Cliffside villa infinity terrace overlooking coastal horizon at sunset',
  },
];

export const CREDIBILITY_PARAMETERS: CredibilityParameter[] = [
  {
    code: '01',
    metric: '04',
    label: 'Active Architectural Commissions',
    summary: 'Deliberately capped portfolio',
    detail:
      'Atelier Estates accepts no more than four simultaneous developments worldwide so senior partners oversee every quarry selection and site detail.',
  },
  {
    code: '02',
    metric: '27',
    label: 'Total Private Residences',
    summary: 'Low-density spatial privacy',
    detail:
      'Across Lake Como, Geneva, Kyoto, and Mallorca, our 2026–2028 pipeline comprises just 27 bespoke homes with dedicated lift cores.',
  },
  {
    code: '03',
    metric: '100%',
    label: 'Permitted & Escrow-Protected',
    summary: 'Full public dossier transparency',
    detail:
      'Every commission holds active municipal building permits prior to private release, with construction milestones audited quarterly.',
  },
  {
    code: '04',
    metric: '2026–28',
    label: 'Verified Delivery Horizon',
    summary: 'Phased turnkey completion',
    detail:
      'Structured delivery schedules backed by fixed-price general contracting and five-year architectural structural warranties.',
  },
];

export const GALLERY_PLATES: GalleryPlate[] = [
  {
    id: 'plate-01',
    figure: 'Fig. 01',
    title: 'Twilight Cantilever & Reflection Basin',
    category: 'Exteriors',
    development: 'Alpine Concept Study',
    location: 'Engadin Horizon',
    photographerNote: '35mm Medium Format · Blue Hour',
    image: '/src/assets/images/hero_pavilion_twilight_1795239844739.jpg',
    imageAlt: 'Monolithic travertine cantilevered villa at dusk over an alpine reflection pool',
    spanClass: 'md:col-span-7 md:row-span-2',
  },
  {
    id: 'plate-02',
    figure: 'Fig. 02',
    title: 'Helical Travertine & Bronze Balustrade',
    category: 'Details',
    development: 'Villa Aurelia',
    location: 'Torno, Lake Como',
    photographerNote: 'Natural Skylight Study',
    image: '/src/assets/images/detail_stone_bronze_1795239844428.jpg',
    imageAlt: 'Curved travertine stair with sculpted patinated bronze handrail',
    spanClass: 'md:col-span-5 md:row-span-2',
  },
  {
    id: 'plate-03',
    figure: 'Fig. 03',
    title: 'Double-Height Limestone Hearth Salon',
    category: 'Interiors',
    development: 'Palais Solis',
    location: 'Cologny, Geneva',
    photographerNote: 'Morning East Elevation Light',
    image: '/src/assets/images/interior_grand_salon_1795239844680.jpg',
    imageAlt: 'Grand double-height living room with travertine fireplace and bronze windows',
    spanClass: 'md:col-span-6',
  },
  {
    id: 'plate-04',
    figure: 'Fig. 04',
    title: 'Kurama Basalt & Moss Courtyard',
    category: 'Exteriors',
    development: 'Maison Verre',
    location: 'Nanzenji, Kyoto',
    photographerNote: 'Diffused Overcast Daylight',
    image: '/src/assets/images/dev_maison_verre_1795239844397.jpg',
    imageAlt: 'Basalt and cedar glass pavilion opening to a Kyoto moss courtyard',
    spanClass: 'md:col-span-6',
  },
  {
    id: 'plate-05',
    figure: 'Fig. 05',
    title: 'Tramuntana Cliffside Infinity Terrace',
    category: 'Exteriors',
    development: 'Pavilion Maris',
    location: 'Deià, Mallorca',
    photographerNote: 'Late Afternoon Golden Hour',
    image: '/src/assets/images/dev_pavilion_maris_1795239844596.jpg',
    imageAlt: 'Cliffside limestone residence with infinity pool overlooking the sea',
    spanClass: 'md:col-span-5',
  },
  {
    id: 'plate-06',
    figure: 'Fig. 06',
    title: 'Evening Sky Deck & Hearth',
    category: 'Interiors',
    development: 'Villa Aurelia Penthouse',
    location: 'Torno, Lake Como',
    photographerNote: 'Dusk Ambient Study',
    image: '/src/assets/images/lifestyle_terrace_dusk_1795239845297.jpg',
    imageAlt: 'Rooftop stone terrace lounge with linear fire feature at dusk',
    spanClass: 'md:col-span-7',
  },
];
