export interface Item {
  id: string;
  title: string;
  description: string;
  condition: 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';
  price: number;
  images: string[];
  category: string;
}
