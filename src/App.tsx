import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ITEMS } from './constants';
import { Item } from './types';
import Navbar from './components/Navbar';
import ItemCard from './components/ItemCard';
import ItemModal from './components/ItemModal';
import About from './components/About';
import Contact from './components/Contact';
import { Filter } from 'lucide-react';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('Galería');

  const categories = ['All', ...new Set(ITEMS.map((item) => item.category))];
  
  const filteredItems = ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
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
              <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap rounded-full px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-brand-ink text-brand-bg shadow-lg shadow-brand-ink/20'
                          : 'bg-brand-card text-brand-ink/40 hover:bg-brand-muted hover:text-brand-ink'
                      }`}
                    >
                      {category === 'All' ? 'Todos' : category}
                    </button>
                  ))}
                </div>
                
                <button className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-ink transition-colors hover:bg-brand-muted">
                  <Filter size={14} />
                  Filtrar
                </button>
              </div>

              {/* Grid */}
              <motion.div 
                layout
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
                      setActiveCategory('All');
                      setSearchQuery('');
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

