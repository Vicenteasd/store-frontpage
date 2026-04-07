import { Item } from './types';

export const ITEMS: Item[] = [
  {
    id: '1',
    title: 'Vintage Leica M6 Camera',
    description: 'A classic 35mm rangefinder camera in pristine condition. Includes original leather case and strap. Perfect for street photography enthusiasts.',
    condition: 'Excellent',
    price: 3200,
    images: [
      'https://picsum.photos/seed/leica1/800/600',
      'https://picsum.photos/seed/leica2/800/600',
      'https://picsum.photos/seed/leica3/800/600'
    ],
    category: 'Photography'
  },
  {
    id: '2',
    title: 'Herman Miller Eames Lounge Chair',
    description: 'Authentic mid-century modern icon. Walnut shell with black leather upholstery. Minor wear on the armrests, otherwise beautiful.',
    condition: 'Good',
    price: 4500,
    images: [
      'https://picsum.photos/seed/eames1/800/600',
      'https://picsum.photos/seed/eames2/800/600'
    ],
    category: 'Furniture'
  },
  {
    id: '3',
    title: 'First Edition: The Great Gatsby',
    description: 'Rare 1925 first edition, second printing. A cornerstone of American literature. Well-preserved with some aging on the spine.',
    condition: 'Fair',
    price: 1200,
    images: [
      'https://picsum.photos/seed/book1/800/600',
      'https://picsum.photos/seed/book2/800/600'
    ],
    category: 'Books'
  },
  {
    id: '4',
    title: 'Rolex Submariner 16610',
    description: 'Classic diver watch from the late 90s. Recently serviced, keeping excellent time. Comes with box and papers.',
    condition: 'Like New',
    price: 9800,
    images: [
      'https://picsum.photos/seed/watch1/800/600',
      'https://picsum.photos/seed/watch2/800/600',
      'https://picsum.photos/seed/watch3/800/600'
    ],
    category: 'Watches'
  },
  {
    id: '5',
    title: 'Moog Matriarch Synthesizer',
    description: 'Patchable 4-note paraphonic analog synthesizer with built-in sequencer, arpeggiator, and stereo analog delay.',
    condition: 'New',
    price: 1900,
    images: [
      'https://picsum.photos/seed/synth1/800/600',
      'https://picsum.photos/seed/synth2/800/600'
    ],
    category: 'Music'
  },
  {
    id: '6',
    title: 'Original Eero Saarinen Tulip Table',
    description: 'White laminate top with heavy molded aluminum base. A timeless piece of design history.',
    condition: 'Excellent',
    price: 2100,
    images: [
      'https://picsum.photos/seed/table1/800/600',
      'https://picsum.photos/seed/table2/800/600'
    ],
    category: 'Furniture'
  }
];
