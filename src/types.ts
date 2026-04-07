export interface Item {
  id: string;
  title: string;
  description: string;
  condition: 'Nuevo' | 'Como nuevo' | 'Excelente' | 'Bueno' | 'Aceptable';
  price: number;
  images: string[];
  category: string;
}
