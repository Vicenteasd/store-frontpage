import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-3xl px-6 py-24 md:px-12"
    >
      <h2 className="font-serif text-4xl font-bold text-brand-ink md:text-5xl">
        Ponte en contacto<span className="text-brand-accent">.</span>
      </h2>
      <p className="mt-6 text-lg text-brand-ink/70">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="mt-16 space-y-12">
        <div className="flex items-start gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-muted text-brand-accent">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Correo electrónico</h4>
            <p className="mt-1 text-xl font-medium text-brand-ink">archives@collection.com</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-muted text-brand-accent">
            <Phone size={24} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Teléfono</h4>
            <p className="mt-1 text-xl font-medium text-brand-ink">+44 (0) 20 7946 0123</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-muted text-brand-accent">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">Estudio</h4>
            <p className="mt-1 text-xl font-medium text-brand-ink">Mayfair, Londres</p>
          </div>
        </div>
      </div>

      <div className="mt-24 rounded-3xl bg-brand-card p-8 border border-brand-border">
        <p className="text-center italic text-brand-ink/60">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        </p>
      </div>
    </motion.div>
  );
}
