import { Item } from './types';

export const ITEMS: Item[] = [
  {
    id: '1',
    title: 'Cámara Leica M6 Vintage',
    description: 'Una cámara telemétrica clásica de 35 mm en estado impecable. Incluye funda y correa de cuero originales. Perfecta para entusiastas de la fotografía callejera.',
    condition: 'Excelente',
    price: 3200,
    images: [
      'https://picsum.photos/seed/leica1/800/600',
      'https://picsum.photos/seed/leica2/800/600',
      'https://picsum.photos/seed/leica3/800/600'
    ],
    category: 'Fotografía'
  },
  {
    id: '2',
    title: 'Sillón Eames de Herman Miller',
    description: 'Icono auténtico del diseño moderno de mediados de siglo. Carcasa de nogal con tapicería de cuero negro. Desgaste menor en los reposabrazos, por lo demás hermoso.',
    condition: 'Bueno',
    price: 4500,
    images: [
      'https://picsum.photos/seed/eames1/800/600',
      'https://picsum.photos/seed/eames2/800/600'
    ],
    category: 'Muebles'
  },
  {
    id: '3',
    title: 'Primera Edición: El Gran Gatsby',
    description: 'Rara primera edición de 1925, segunda impresión. Una piedra angular de la literatura estadounidense. Bien conservada con algo de envejecimiento en el lomo.',
    condition: 'Aceptable',
    price: 1200,
    images: [
      'https://picsum.photos/seed/book1/800/600',
      'https://picsum.photos/seed/book2/800/600'
    ],
    category: 'Libros'
  },
  {
    id: '4',
    title: 'Rolex Submariner 16610',
    description: 'Reloj de buceo clásico de finales de los 90. Recientemente revisado, mantiene una hora excelente. Viene con caja y papeles.',
    condition: 'Como nuevo',
    price: 9800,
    images: [
      'https://picsum.photos/seed/watch1/800/600',
      'https://picsum.photos/seed/watch2/800/600',
      'https://picsum.photos/seed/watch3/800/600'
    ],
    category: 'Relojes'
  },
  {
    id: '5',
    title: 'Sintetizador Moog Matriarch',
    description: 'Sintetizador analógico parafónico de 4 notas con secuenciador integrado, arpegiador y retardo analógico estéreo.',
    condition: 'Nuevo',
    price: 1900,
    images: [
      'https://picsum.photos/seed/synth1/800/600',
      'https://picsum.photos/seed/synth2/800/600'
    ],
    category: 'Música'
  },
  {
    id: '6',
    title: 'Mesa Tulip Original de Eero Saarinen',
    description: 'Tapa de laminado blanco con base de aluminio moldeado pesado. Una pieza atemporal de la historia del diseño.',
    condition: 'Excelente',
    price: 2100,
    images: [
      'https://picsum.photos/seed/table1/800/600',
      'https://picsum.photos/seed/table2/800/600'
    ],
    category: 'Muebles'
  }
];
