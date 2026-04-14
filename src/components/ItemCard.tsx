import { motion } from 'motion/react';
import { Item } from '../types';
import { ArrowRight } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onClick: () => void;
  key?: string;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group relative cursor-pointer bg-brand-card overflow-hidden rounded-2xl border border-brand-border shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/5"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={item.images[0]}
          alt={item.title}
          style={{ rotate: item.rotation || 0 }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {item.status && item.status !== 'disponible' && (
          <div className={`absolute bottom-4 right-4 z-10 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-[4px] ${
            item.status === 'reservado' 
              ? 'bg-brand-muted/90 text-brand-accent border-brand-accent/30' 
              : 'bg-brand-ink/90 text-brand-bg border-brand-bg/20'
          }`}>
            {item.status}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-card/90 px-4 py-2 text-xs font-medium text-brand-ink backdrop-blur-sm">
            Ver detalles <ArrowRight size={14} />
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-accent/60">
              {item.categories.join(' • ')}
            </p>
            <h3 className="mt-1 text-xl font-medium leading-tight text-brand-ink">
              {item.title}
            </h3>
            <p className="mt-1 text-[10px] italic text-brand-ink/40">
              Curado por {item.curator || 'S. Core'}
            </p>
          </div>
          <p className="text-lg font-serif font-semibold text-brand-accent">
            {item.price.toLocaleString()}€
          </p>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-brand-muted px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-brand-accent">
            {item.condition}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
