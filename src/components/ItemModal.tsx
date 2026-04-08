import { motion, AnimatePresence } from 'motion/react';
import { Item } from '../types';
import { X, ChevronLeft, ChevronRight, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useBasket } from '../context/BasketContext';

interface ItemModalProps {
  item: Item | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const { addToBasket, isInBasket } = useBasket();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isConsulted, setIsConsulted] = useState(false);
  const inBasket = item ? isInBasket(item.id) : false;

  const handleConsult = () => {
    setIsConsulted(true);
    setTimeout(() => {
      setIsConsulted(false);
    }, 3000);
  };

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative grid h-full max-h-[900px] w-full max-w-6xl overflow-hidden rounded-3xl bg-brand-card shadow-2xl md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 cursor-pointer rounded-full bg-brand-card/80 p-2 text-brand-ink shadow-sm backdrop-blur-md transition-colors hover:bg-brand-card"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="relative h-[40vh] bg-brand-muted md:h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={item.images[currentImageIndex]}
                  alt={`${item.title} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {item.images.length > 1 && (
                <>
                  <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
                    {item.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                          idx === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col overflow-y-auto p-8 md:p-12">
              <div className="mb-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  {item.categories.join(' • ')}
                </p>
                <h2 className="mt-4 break-words font-serif text-4xl font-medium leading-tight text-brand-ink md:text-5xl">
                  {item.title}
                </h2>
                
                <div className="mt-6 flex items-center gap-4">
                  <p className="font-serif text-3xl font-semibold text-brand-accent">
                    {item.price.toLocaleString()}€
                  </p>
                  <span className="rounded-full border border-brand-accent/20 bg-brand-muted px-4 py-1 text-xs font-medium uppercase tracking-wider text-brand-accent">
                    {item.condition}
                  </span>
                </div>

                <div className="mt-10 space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">
                      Descripción
                    </h4>
                    <p className="mt-2 text-lg leading-relaxed text-brand-ink/70">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">
                        Curador
                      </h4>
                      <p className="mt-2 font-serif text-lg italic text-brand-accent">
                        {item.curator || 'S. Core'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">
                        Disponibilidad
                      </h4>
                      <p className={`mt-2 text-sm font-medium ${
                        item.status === 'vendido' ? 'text-brand-ink' : 
                        item.status === 'reservado' ? 'text-brand-accent' : 
                        'text-green-600'
                      }`}>
                        {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Disponible'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button 
                  onClick={() => item && addToBasket(item)}
                  disabled={inBasket}
                  className={`group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl py-5 text-sm font-semibold transition-all active:scale-[0.98] ${
                    inBasket 
                      ? 'bg-brand-muted text-brand-accent cursor-default' 
                      : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                  }`}
                >
                  <ShoppingBasket size={18} />
                  {inBasket ? 'En la cesta' : 'Añadir a la cesta'}
                </button>
                <button 
                  onClick={handleConsult}
                  disabled={isConsulted}
                  className={`group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl py-5 text-sm font-semibold transition-all active:scale-[0.98] ${
                    isConsulted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-brand-ink text-brand-bg hover:bg-brand-accent'
                  }`}
                >
                  {isConsulted ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Consulta enviada
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Consultar sobre el artículo
                      <motion.span initial={{ opacity: 1 }}>
                        <ArrowRight size={16} />
                      </motion.span>
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-brand-ink/40">
                  Transacción segura mediante recogida personal o envío.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
