import { motion } from 'motion/react';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-3xl px-6 py-24 md:px-12"
    >
      <h2 className="font-serif text-4xl font-bold text-brand-ink md:text-5xl">
        El Archivo<span className="text-brand-accent">.</span>
      </h2>
      <div className="mt-12 space-y-8 text-lg leading-relaxed text-brand-ink/70">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-2 gap-12 border-t border-brand-border pt-16">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Establecido</h4>
          <p className="mt-2 text-xl font-medium text-brand-ink">MMXXIV</p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Ubicación</h4>
          <p className="mt-2 text-xl font-medium text-brand-ink">Londres, Reino Unido</p>
        </div>
      </div>
    </motion.div>
  );
}
