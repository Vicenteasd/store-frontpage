import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navItems = ['Showcase', 'Categories', 'About', 'Contact'];

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-12">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer font-serif text-2xl font-bold tracking-tight text-brand-ink"
          >
            COLLECTION<span className="text-brand-accent">.</span>
          </motion.h1>
          
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink/40 transition-colors hover:text-brand-accent"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    ref={searchInputRef}
                    autoFocus
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[140px] rounded-full bg-brand-muted px-4 py-2 text-xs text-brand-ink outline-none border border-brand-border focus:border-brand-accent/30 sm:w-[240px]"
                  />
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
                <a
                  key={item}
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-brand-ink/60 transition-colors hover:text-brand-accent"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
