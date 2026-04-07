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
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer bg-brand-card overflow-hidden rounded-2xl border border-brand-border shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-accent/5"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-card/90 px-4 py-2 text-xs font-medium text-brand-ink backdrop-blur-sm">
            Ver detalles <ArrowRight size={14} />
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-accent/60">
              {item.category}
            </p>
            <h3 className="mt-1 text-xl font-medium leading-tight text-brand-ink">
              {item.title}
            </h3>
          </div>
          <p className="text-lg font-serif font-semibold text-brand-accent">
            ${item.price.toLocaleString()}
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
