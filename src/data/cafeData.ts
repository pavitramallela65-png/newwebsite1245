export type MenuCategory = 'All' | 'Hot Coffee' | 'Cold Coffee' | 'Snacks';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  description: string;
  tastingNotes: string;
  volumeOrWeight: string;
  image: string;
  featuredNote?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  aspect: 'wide' | 'standard';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  rating: number;
  review: string;
  favoriteOrder: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  originalPrice: number;
  comboPrice: number;
  savingsText: string;
  itemsIncluded: string[];
  image: string;
}

export const IMAGES = {
  heroShowcase: '/src/assets/images/hero_coffee_showcase_1791536588958.jpg',
  baristaCraft: '/src/assets/images/about_barista_craft_1791536625493.jpg',
  espressoCup: '/src/assets/images/menu_espresso_cup_1791536636830.jpg',
  icedCaramel: '/src/assets/images/menu_iced_caramel_latte_1791536647182.jpg',
  chocolateBrownie: '/src/assets/images/menu_chocolate_brownie_1791536656618.jpg',
  cafeInterior: '/src/assets/images/gallery_cafe_interior_1791536667233.jpg',
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Hot Coffee',
    price: 99,
    description: 'Double-pulled single-origin Chikmagalur Arabica shot with a velvety hazelnut crema and rich cocoa finish.',
    tastingNotes: 'Dark Cocoa · Toasted Walnut · Citrus Peel',
    volumeOrWeight: '60 ml',
    image: IMAGES.espressoCup,
    featuredNote: 'House Signature',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot Coffee',
    price: 149,
    description: 'Equal parts rich double espresso, steamed farm-fresh milk, and dense micro-foam finished with hand-poured rosetta art.',
    tastingNotes: 'Caramelized Sugar · Velvety Milk · Roasted Almond',
    volumeOrWeight: '220 ml',
    image: IMAGES.heroShowcase,
    featuredNote: 'Most Loved',
  },
  {
    id: 'cafe-latte',
    name: 'Café Latte',
    category: 'Hot Coffee',
    price: 159,
    description: 'Smooth double ristretto cradled in silky textured milk with a delicate layer of sweet crema for a comforting cup.',
    tastingNotes: 'Sweet Cream · Butterscotch · Mild Espresso',
    volumeOrWeight: '250 ml',
    image: IMAGES.baristaCraft,
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'Hot Coffee',
    price: 119,
    description: 'Long black preparation pulling our medium-dark roast directly over hot filtered spring water to preserve aromatic crema.',
    tastingNotes: 'Roasted Hazelnut · Brown Spice · Clean Finish',
    volumeOrWeight: '240 ml',
    image: IMAGES.espressoCup,
  },
  {
    id: 'mocha',
    name: 'Mocha',
    category: 'Hot Coffee',
    price: 179,
    description: 'Artisanal 70% dark Belgian couverture chocolate melted into hot espresso and topped with micro-foamed milk.',
    tastingNotes: 'Bittersweet Ganache · Espresso · Warm Vanilla',
    volumeOrWeight: '250 ml',
    image: IMAGES.heroShowcase,
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'Cold Coffee',
    price: 169,
    description: '18-hour slow-steeped cold brew blended with chilled cream, organic cane syrup, and served over crystal ice.',
    tastingNotes: 'Silky Malt · Chilled Cream · Dark Chocolate',
    volumeOrWeight: '320 ml',
    image: IMAGES.icedCaramel,
    featuredNote: 'Slow Steeped',
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'Cold Coffee',
    price: 189,
    description: 'Layered chilled milk and vanilla bean infused cold espresso, crowned with house-made salted焦糖 caramel drizzle.',
    tastingNotes: 'Salted Caramel · Madagascar Vanilla · Bold Roast',
    volumeOrWeight: '320 ml',
    image: IMAGES.icedCaramel,
    featuredNote: 'Barista Pick',
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    category: 'Snacks',
    price: 99,
    description: 'Warm, fudgy dark chocolate brownie baked fresh every morning with flaky Maldon sea salt and molten couverture chunks.',
    tastingNotes: '70% Single-Origin Cocoa · Flaky Sea Salt · Fudge',
    volumeOrWeight: '110 g',
    image: IMAGES.chocolateBrownie,
    featuredNote: 'Freshly Baked',
  },
];

export const SPECIAL_COMBO_OFFER: SpecialOffer = {
  id: 'combo-coffee-brownie',
  title: 'Coffee + Brownie Combo',
  subtitle: 'Daily Artisanal Pairing · Served 8:00 AM – 6:00 PM',
  description: 'Pair our signature handcrafted Cappuccino with a warm, sea-salt dark chocolate fudge brownie fresh from the oven.',
  originalPrice: 248,
  comboPrice: 199,
  savingsText: 'Save ₹49 Today',
  itemsIncluded: ['1× Cappuccino (220 ml)', '1× Warm Chocolate Brownie (110 g)'],
  image: IMAGES.chocolateBrownie,
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Morning Golden Hour at Brew Haven',
    category: 'Café Interior',
    caption: 'Sunlight filtering across our solid walnut communal tables and warm exposed brick lounge.',
    image: IMAGES.cafeInterior,
    aspect: 'wide',
  },
  {
    id: 'gal-2',
    title: 'Hand-Poured Rosetta Latte Art',
    category: 'Latte Art',
    caption: 'Every cappuccino is textured to 62°C for natural milk sweetness and poured by hand.',
    image: IMAGES.heroShowcase,
    aspect: 'standard',
  },
  {
    id: 'gal-3',
    title: 'Precision Espresso Extraction',
    category: 'Coffee Preparation',
    caption: 'Our head barista dialing in the morning Chikmagalur estate roast on our brass La Marzocco.',
    image: IMAGES.baristaCraft,
    aspect: 'standard',
  },
  {
    id: 'gal-4',
    title: 'Sea-Salt Couverture Brownie',
    category: 'Artisanal Desserts',
    caption: 'Small-batch fudge brownies with molten dark chocolate ribbons and flaky sea salt.',
    image: IMAGES.chocolateBrownie,
    aspect: 'standard',
  },
  {
    id: 'gal-5',
    title: 'Single-Origin Double Espresso',
    category: 'Signature Cups',
    caption: 'Rich tiger-flecked crema resting in locally hand-thrown stoneware ceramics.',
    image: IMAGES.espressoCup,
    aspect: 'standard',
  },
  {
    id: 'gal-6',
    title: 'Iced Salted Caramel Macchiato',
    category: 'Cold Craft',
    caption: 'Layered cold-pressed espresso over organic chilled milk and house-cooked caramel.',
    image: IMAGES.icedCaramel,
    aspect: 'standard',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'Aarav Mehta',
    role: 'Principal Architect',
    organization: 'Studio Verve Bengaluru',
    rating: 5,
    review: 'Switching our morning client briefings to Brew Haven transformed our routine. Their Chikmagalur single-origin Cappuccino has zero bitterness, and the warm acoustic interior lets us work comfortably for hours.',
    favoriteOrder: 'Cappuccino & Chocolate Brownie',
  },
  {
    id: 'rev-2',
    name: 'Priya Nair',
    role: 'Editorial Director',
    organization: 'Monolith Press',
    rating: 5,
    review: 'I have tasted specialty coffee across Milan and Melbourne, and Brew Haven’s Caramel Macchiato and double Espresso rival the finest roasteries. You can taste the freshness of beans roasted within 48 hours.',
    favoriteOrder: 'Caramel Macchiato',
  },
  {
    id: 'rev-3',
    name: 'Rohan Kulkarni',
    role: 'Product Designer',
    organization: 'Kinetix Labs',
    rating: 5,
    review: 'The Coffee + Brownie Combo is my afternoon ritual. The baristas remember my exact milk temperature preference, and the sea-salt dark chocolate brownie is hands-down the best in the neighborhood.',
    favoriteOrder: 'Coffee + Brownie Combo',
  },
];
