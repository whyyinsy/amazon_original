export interface GalleryItem {
  id: string;
  label: string;
  alt: string;
  src: string;
  isVideoSpotlight?: boolean;
  caption?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  initial: string;
  rating: number;
  title: string;
  date: string;
  location: string;
  verified: boolean;
  body: string;
  helpfulCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  priceDollars: number;
  priceCents: string;
  typicalPrice: string;
  discountPct: number;
}

export interface CatalogItem {
  id: string;
  brand: string;
  title: string;
  shortTitle: string;
  category: string;
  price: number;
  typicalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  deliveryDate: string;
}

export const MAIN_PRODUCT_GALLERY: GalleryItem[] = [
  {
    id: 'main',
    label: 'Main',
    alt: 'Razer Viper V4 Pro Wireless Gaming Mouse with 8K Wireless Dongle',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMWhondMfoYw9kYV3wIGyR67X-p2fH9LmoZYKGDU2SY5qsiPTtlHLY1-V066BaYpfaQIL53-a_WM2AKF7IEnJ50rDE_sbHMYMwjsCxH5ncNiCuxr0RMx7XlfMqDu98-X-eThRXA0kU7oiCsfqwhDWi_giH0aCD5-rZi7FzuXawFEAKHqZlfnweJ3rVdAbmdxHIUP8epyNsvmS5pYeTh6MeWJUq5jKMea-aBSu4JgU',
    caption: 'Razer Viper V4 Pro & HyperSpeed Gen-2 8K Dongle',
  },
  {
    id: 'angle',
    label: 'Angle',
    alt: 'Razer Viper V4 Pro ergonomic three-quarter angle view',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcxOisDUmg-nTCgdB2wGRcm_eYcho6IZIqmqq8tAqO0CjP3fMfPxCCdyBqP7_DAt5h97dS3zpZBGTZwGmqNNP6Y55NEfb_uDiniV9i0-YfrRxKVQkHPncWc6NCkDUmGV_ueQvUOYXLsQ7CCd-Q7KWfikgcFOG_qChy9wTR3YNmkVwN714KeVt8pfzPaLmgkNDCR8qJSvlO1krPpzAvWMfqTqPdxWhnBgAEmo-whQ4',
    caption: 'Symmetrical 49g shell sculpted for claw & fingertip grips',
  },
  {
    id: 'top',
    label: 'Top',
    alt: 'Razer Viper V4 Pro top-down symmetrical silhouette view',
    src: '/src/assets/images/viper_top_view_1795665656911.jpg',
    caption: 'Top profile with tactile optical scroll wheel',
  },
  {
    id: 'sensor',
    label: 'Sensor',
    alt: 'Razer Viper V4 Pro Focus Pro 50K optical sensor and PTFE skates underside',
    src: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    caption: 'Focus Pro 50K Optical Sensor & 100% PTFE skates',
  },
  {
    id: 'dongle',
    label: 'Dongle',
    alt: 'Razer Viper V4 Pro 8K HyperPolling wireless receiver and braided USB-C cable',
    src: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    isVideoSpotlight: true,
    caption: 'True 8,000 Hz wireless polling transmitter included',
  },
];

export const PRODUCT_SPECS: ProductSpec[] = [
  { label: 'Brand', value: 'Razer' },
  { label: 'Model Name', value: 'Viper V4 Pro' },
  { label: 'Item Weight', value: '49 Grams (Ultralight)' },
  { label: 'Connectivity', value: 'HyperSpeed Gen-2 (8K Hz)' },
  { label: 'Sensor Technology', value: 'Focus Pro 50K Optical' },
  { label: 'Hardware Platform', value: 'PC / Mac / Linux' },
];

export const ABOUT_BULLETS = [
  {
    lead: '49g ULTRA-LIGHTWEIGHT DESIGN',
    body: 'Engineered in collaboration with world-class esports pros to provide pixel-perfect precision, agile movement, and supreme control without structural honeycomb cutouts.',
  },
  {
    lead: 'HYPERSPEED GEN-2 8000Hz POLLING',
    body: 'True 8,000 Hz polling rate wireless transmitter dongle included for near-zero latency input speed and unbeatable responsiveness.',
  },
  {
    lead: 'FOCUS PRO 50K OPTICAL SENSOR',
    body: 'Unrivaled tracking accuracy across all surfaces including glass, with 1-DPI step adjustments and smart tracking features.',
  },
  {
    lead: 'OPTICAL MOUSE SWITCHES GEN-3',
    body: 'Zero double-clicking issues and blistering 0.2ms actuation speed with a massive 90-million click lifespan.',
  },
  {
    lead: 'UP TO 95 HOURS BATTERY LIFE',
    body: 'Optimized power efficiency keeping you powered through continuous competition and training runs.',
  },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, percent: 84 },
  { stars: 4, percent: 11 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Marcus T.',
    initial: 'M',
    rating: 5,
    title: 'Unbelievably light, 8k polling is crisp',
    date: '22 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Upgraded from my Viper V2 Pro. The coating feels noticeably grippier, and the sensor latency on 8K wireless with the included hyper-polling dongle is insane. 10/10 esports mouse.',
    helpfulCount: 38,
  },
  {
    id: 'rev-2',
    author: 'Rachel Lim',
    initial: 'R',
    rating: 5,
    title: 'Zero flex at 49g and optical scroll feels snappy',
    date: '19 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Delivered next afternoon to Tanjong Pagar. Coming from a 63g mouse, the weight reduction makes micro-adjustments in Valorant effortless without feeling hollow or creaky.',
    helpfulCount: 19,
  },
  {
    id: 'rev-3',
    author: 'Daniel Tan',
    initial: 'D',
    rating: 4,
    title: 'Top-tier sensor, 8K drains battery faster as expected',
    date: '14 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'At 1000Hz it lasts well over a week of daily ranked sessions. Running full 8000Hz cuts runtime noticeably, which is physics, though charging over USB-C is fast. Coating is a massive upgrade.',
    helpfulCount: 12,
  },
  {
    id: 'rev-4',
    author: 'Wei Jie Koh',
    initial: 'W',
    rating: 5,
    title: 'Glass pad tracking works out of the box',
    date: '09 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Tracks cleanly on my tempered glass pad without spin-outs. The Black Friday price on Amazon SG with GST included made this an instant buy.',
    helpfulCount: 9,
  },
  {
    id: 'rev-5',
    author: 'Adrian Ng',
    initial: 'A',
    rating: 3,
    title: 'Great hardware, slightly narrow for large palm grip',
    date: '02 November 2024',
    location: 'Singapore',
    verified: true,
    body: 'Clicks and sensor are faultless, but if you have 20cm+ hands and prefer full palm contact, the symmetrical hump sits low. Best suited for claw or fingertip grip.',
    helpfulCount: 6,
  },
];

export const RELATED_CATALOG: CatalogItem[] = [
  {
    id: 'viper-v4-pro',
    brand: 'Razer',
    title:
      'Razer Viper V4 Pro - Wireless Symmetric E-Sport Gaming Mouse - Ultralight 49g - HyperSpeed Gen-2 up to 8 kHz Polling - Focus Pro 50K Sensor - Optical Scroll Wheel - PC/Mac | Black',
    shortTitle: 'Razer Viper V4 Pro (Black)',
    category: 'Mice',
    price: 135.24,
    typicalPrice: 198.07,
    rating: 4.8,
    reviewCount: 242,
    image: MAIN_PRODUCT_GALLERY[0].src,
    inStock: true,
    deliveryDate: 'Friday, December 6',
  },
  {
    id: 'gigantus-v2',
    brand: 'Razer',
    title: 'Razer Gigantus V2 Cloth Gaming Mouse Mat (Large) - Textured Micro-Weave Surface',
    shortTitle: 'Razer Gigantus V2 Mouse Mat (Large)',
    category: 'Gaming Accessories',
    price: 24.90,
    typicalPrice: 29.90,
    rating: 4.7,
    reviewCount: 1840,
    image: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    inStock: true,
    deliveryDate: 'Friday, December 6',
  },
  {
    id: 'hyperpolling-dock',
    brand: 'Razer',
    title: 'Razer HyperPolling 8K Hz Wireless Dongle & Braided Speedflex USB-C Cable Kit',
    shortTitle: 'Razer 8K HyperPolling Dongle Kit',
    category: 'Computer Accessories',
    price: 42.50,
    typicalPrice: 49.90,
    rating: 4.6,
    reviewCount: 315,
    image: '/src/assets/images/viper_top_view_1795665656911.jpg',
    inStock: true,
    deliveryDate: 'Saturday, December 7',
  },
  {
    id: 'ptfe-skates',
    brand: 'Razer',
    title: 'Razer Official 100% Virgin-Grade PTFE Replacement Mouse Feet for Viper Series',
    shortTitle: 'Razer PTFE Replacement Mouse Skates',
    category: 'Computer Accessories',
    price: 16.90,
    typicalPrice: 19.90,
    rating: 4.8,
    reviewCount: 412,
    image: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    inStock: true,
    deliveryDate: 'Friday, December 6',
  },
];

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
  inStock: boolean;
}

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'gigantus-v2',
    title: 'Razer Gigantus V2 Cloth Gaming Mouse Mat (Large) - Micro-Weave Surface',
    price: 24.90,
    quantity: 1,
    image: '/src/assets/images/viper_dongle_setup_1795665658558.jpg',
    seller: 'Razer Official Flagship',
    inStock: true,
  },
  {
    id: 'ptfe-skates',
    title: 'Razer Official 100% Virgin-Grade PTFE Replacement Mouse Skates',
    price: 16.90,
    quantity: 1,
    image: '/src/assets/images/viper_sensor_view_1795665658186.jpg',
    seller: 'Amazon SG',
    inStock: true,
  },
];

export const SINGAPORE_LOCATIONS = [
  { postal: '049145', district: 'Raffles Place / Marina Bay' },
  { postal: '238801', district: 'Orchard Road' },
  { postal: '529510', district: 'Tampines Central' },
  { postal: '608526', district: 'Jurong East' },
  { postal: '118429', district: 'Clementi / Kent Ridge' },
];
