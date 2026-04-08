import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Item } from '../types';

interface BasketContextType {
  items: Item[];
  addToBasket: (item: Item) => void;
  removeFromBasket: (itemId: string) => void;
  isInBasket: (itemId: string) => boolean;
  clearBasket: () => void;
  totalItems: number;
  totalPrice: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  const addToBasket = (item: Item) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) return prev;
      return [...prev, item];
    });
  };

  const removeFromBasket = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const isInBasket = (itemId: string) => items.some(i => i.id === itemId);

  const clearBasket = () => setItems([]);

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <BasketContext.Provider
      value={{
        items,
        addToBasket,
        removeFromBasket,
        isInBasket,
        clearBasket,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}
