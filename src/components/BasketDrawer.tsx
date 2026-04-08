import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBasket, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useBasket } from '../context/BasketContext';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BasketDrawer({ isOpen, onClose }: BasketDrawerProps) {
  const { items, removeFromBasket, totalPrice, totalItems, clearBasket } = useBasket();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleCheckout = () => {
    // Simulate order process
    setTimeout(() => {
      setIsOrdered(true);
      setTimeout(() => {
        clearBasket();
        setIsOrdered(false);
        onClose();
      }, 3000);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-brand-ink/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-brand-bg shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-border px-8 py-6">
                <div className="flex items-center gap-3">
                  <ShoppingBasket className="text-brand-accent" size={24} />
                  <h2 className="font-serif text-2xl font-medium text-brand-ink">Tu Cesta</h2>
                  <span className="rounded-full bg-brand-accent/10 px-2 py-0.5 text-[10px] font-bold text-brand-accent">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-full p-2 text-brand-ink/40 transition-colors hover:bg-brand-muted hover:text-brand-ink"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-8 py-6 no-scrollbar">
                {isOrdered ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center text-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-brand-ink">¡Pedido Recibido!</h3>
                    <p className="mt-4 text-sm text-brand-ink/60">
                      Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto para coordinar los detalles.
                    </p>
                  </motion.div>
                ) : items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-6 rounded-full bg-brand-muted p-6 text-brand-ink/20">
                      <ShoppingBasket size={48} />
                    </div>
                    <p className="font-serif text-xl text-brand-ink/60">Tu cesta está vacía</p>
                    <button
                      onClick={onClose}
                      className="mt-4 cursor-pointer text-xs font-bold uppercase tracking-widest text-brand-accent underline underline-offset-4"
                    >
                      Volver a la galería
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-brand-border bg-brand-card">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div>
                            <div className="flex items-start justify-between">
                              <h3 className="text-sm font-medium text-brand-ink">{item.title}</h3>
                              <button
                                onClick={() => removeFromBasket(item.id)}
                                className="cursor-pointer text-brand-ink/20 transition-colors hover:text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <p className="mt-1 text-[10px] uppercase tracking-widest text-brand-ink/40">
                              {item.categories[0]}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-brand-accent">
                              {item.price.toLocaleString()}€
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && !isOrdered && (
                <div className="border-t border-brand-border bg-brand-card/50 p-8">
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-ink/40">
                      <span>Subtotal</span>
                      <span>{totalPrice.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-ink/40">
                      <span>Envío</span>
                      <span>Calculado al finalizar</span>
                    </div>
                    <div className="pt-4 flex justify-between">
                      <span className="font-serif text-xl font-medium text-brand-ink">Total</span>
                      <span className="font-serif text-xl font-bold text-brand-accent">
                        {totalPrice.toLocaleString()}€
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full cursor-pointer rounded-full bg-brand-ink py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-bg transition-all hover:bg-brand-accent hover:shadow-xl hover:shadow-brand-accent/20"
                  >
                    Finalizar Pedido
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
