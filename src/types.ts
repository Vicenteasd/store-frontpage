export interface Item {
  id: string;
  title: string;
  description: string;
  condition: 'Nuevo' | 'Como nuevo' | 'Excelente' | 'Bueno' | 'Aceptable';
  price: number;
  images: string[];
  categories: string[];
  status?: 'disponible' | 'reservado' | 'vendido';
  curator?: string;
  rotation?: number;
}
