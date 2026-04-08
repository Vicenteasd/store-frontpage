import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, Sun, Moon, X, ShoppingBasket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useBasket } from '../context/BasketContext';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenBasket: () => void;
}

export default function Navbar({ searchQuery, setSearchQuery, currentPage, setCurrentPage, onOpenBasket }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useBasket();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navItems = ['Galería', 'Sobre mí', 'Contacto'];

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchQuery]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 w-full bg-brand-bg/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 md:py-6">
        <div className="flex items-center gap-4 md:gap-12">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setCurrentPage('Galería');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer font-serif text-2xl font-bold tracking-tight text-brand-ink"
          >
            COLECCIÓN<span className="text-brand-accent">.</span>
          </motion.h1>
          
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`cursor-pointer text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-brand-accent ${
                  currentPage === item ? 'text-brand-accent' : 'text-brand-ink/40'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative flex items-center overflow-hidden"
                >
                  <input
                    ref={searchInputRef}
                    autoFocus
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[120px] rounded-full bg-brand-muted pl-3 pr-8 py-1.5 text-[10px] text-brand-ink outline-none border border-brand-border focus:border-brand-accent/30 xs:w-[160px] sm:w-[240px]"
                  />
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 cursor-pointer text-brand-ink/40 hover:text-brand-accent"
                      >
                        <X size={14} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearchQuery('');
              }}
              className="ml-2 cursor-pointer text-brand-ink/60 transition-colors hover:text-brand-accent"
              aria-label="Toggle search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>

          <button 
            onClick={toggleTheme}
            className="cursor-pointer text-brand-ink/60 transition-colors hover:text-brand-accent"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button 
            onClick={onOpenBasket}
            className="group relative cursor-pointer text-brand-ink/60 transition-colors hover:text-brand-accent"
            aria-label="Open basket"
          >
            <ShoppingBasket size={20} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[8px] font-bold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer text-brand-ink/60 transition-colors hover:text-brand-accent md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-brand-bg border-t border-brand-border md:hidden"
          >
            <div className="flex flex-col gap-6 p-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer text-left text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:text-brand-accent ${
                    currentPage === item ? 'text-brand-accent' : 'text-brand-ink/60'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
