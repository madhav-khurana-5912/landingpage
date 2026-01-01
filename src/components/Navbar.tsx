import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'The Concept', href: '/concept' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 py-4 md:py-6 px-6 md:px-12 flex justify-between items-center border-b",
        scrolled || isOpen ? "bg-background-dark/95 backdrop-blur-md border-white/10" : "bg-transparent border-transparent"
      )}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer z-50 nav-item">
          <span className="material-symbols-outlined text-primary">diamond</span>
          <span className="font-serif font-bold tracking-widest text-lg text-white">AETHER</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em] transition-colors nav-item",
                location.pathname === item.href ? "text-primary" : "text-white/70 hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Action (Desktop) */}
        <div className="hidden md:block">
          <button className="bg-primary/10 border border-primary/30 text-primary px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all nav-item">
            Reserve Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background-dark z-40 md:hidden flex flex-col items-center justify-center gap-12"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((item) => (
                <Link 
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-serif font-bold tracking-widest transition-colors",
                    location.pathname === item.href ? "text-primary" : "text-white hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <button className="bg-primary text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs">
              Reserve Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
