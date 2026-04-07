import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ITEMS } from './constants';
import { Item } from './types';
import Navbar from './components/Navbar';
import ItemCard from './components/ItemCard';
import ItemModal from './components/ItemModal';
import About from './components/About';
import Contact from './components/Contact';
import { Filter, X } from 'lucide-react';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('Galería');
  const [activeStatus, setActiveStatus] = useState<'todos' | 'disponible' | 'reservado' | 'vendido'>('todos');

  const categories = [...new Set(ITEMS.flatMap((item) => item.categories))];
  
  const filteredItems = ITEMS.filter((item) => {
    const matchesCategory = activeCategories.length === 0 || 
                           item.categories.some(cat => activeCategories.includes(cat));
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (activeStatus === 'disponible') {
      matchesStatus = !item.status || item.status === 'disponible';
    } else if (activeStatus !== 'todos') {
      matchesStatus = item.status === activeStatus;
    }
    
    return matchesCategory && matchesSearch && matchesStatus;
  });

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setActiveCategories([]);
    } else {
      setActiveCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main className="mx-auto max-w-7xl px-6 pt-12 md:px-12">
        <AnimatePresence mode="wait">
          {currentPage === 'Galería' ? (
            <motion.div
              key="showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <header className="mb-16 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
                    Selección Curada
                  </p>
                  <h2 className="mt-6 font-serif text-5xl font-medium leading-tight text-brand-ink md:text-7xl">
                    Colección <br />
                    <span className="italic text-brand-accent/80">Personal</span>
                  </h2>
                  <p className="mt-8 text-lg leading-relaxed text-brand-ink/60">
                    Una galería cuidadosamente seleccionada de artículos raros, iconos del diseño y tesoros vintage 
                    de mis archivos personales. Cada pieza cuenta una historia de artesanía e historia.
                  </p>
                </motion.div>
              </header>

                {/* Filters */}
                <div className="mb-12 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                      <button
                        onClick={() => toggleCategory('All')}
                        className={`cursor-pointer whitespace-nowrap rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                          activeCategories.length === 0
                            ? 'bg-brand-ink text-brand-bg shadow-lg shadow-brand-ink/20'
                            : 'bg-brand-card text-brand-ink/40 hover:bg-brand-muted hover:text-brand-ink'
                        }`}
                      >
                        Todas las Categorías
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`cursor-pointer flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                            activeCategories.includes(category)
                              ? 'bg-brand-ink text-brand-bg shadow-lg shadow-brand-ink/20'
                              : 'bg-brand-card text-brand-ink/40 hover:bg-brand-muted hover:text-brand-ink'
                          }`}
                        >
                          {category}
                          {activeCategories.includes(category) && (
                            <X size={10} className="opacity-60" strokeWidth={3} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t border-brand-border pt-6">
                    <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-ink/40">
                      <Filter size={12} /> Estado:
                    </span>
                    <div className="flex gap-2">
                      {(['todos', 'disponible', 'reservado', 'vendido'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(status)}
                          className={`cursor-pointer rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                            activeStatus === status
                              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                              : 'border-brand-border bg-brand-card text-brand-ink/40 hover:border-brand-accent/50 hover:text-brand-ink'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              {/* Grid */}
              <motion.div 
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {filteredItems.length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <p className="font-serif text-2xl text-brand-ink/40">No se encontraron artículos en esta categoría.</p>
                  <button 
                    onClick={() => {
                      setActiveCategories([]);
                      setSearchQuery('');
                      setActiveStatus('todos');
                    }}
                    className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-accent underline underline-offset-4"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </motion.div>
          ) : currentPage === 'Sobre mí' ? (
            <About key="about" />
          ) : (
            <Contact key="contact" />
          )}
        </AnimatePresence>
      </main>

      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Footer */}
      <footer className="mt-32 border-t border-brand-border py-16">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-12">
          <h3 className="font-serif text-2xl font-medium text-brand-ink">
            COLECCIÓN<span className="text-brand-accent">.</span>
          </h3>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-ink/40">
            © 2026 Archivos Curados. Todos los derechos reservados.
          </p>
          <div className="mt-8 flex justify-center gap-8">
            {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
              <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60 hover:text-brand-accent">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

