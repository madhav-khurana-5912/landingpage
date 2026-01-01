import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LiquidSphereWrapper } from '../components/LiquidSphereWrapper';
import { ConceptSection } from '../components/ConceptSection';
import { GallerySection } from '../components/GallerySection';
import { FloatingDish } from '../components/FloatingDish';
import { MENU_ITEMS } from '../constants';
import { Link } from 'react-router-dom';

const Home = memo(({ tier }: { tier: 'high' | 'low' }) => {
  const highlightItems = useMemo(() => MENU_ITEMS.slice(0, 3), []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <LiquidSphereWrapper tier={tier} />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 mix-blend-difference pointer-events-none">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-primary text-sm md:text-base font-mono tracking-[0.5em] mb-4">EST. 2024</motion.h2>
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.9, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-serif font-bold leading-none tracking-tighter text-white select-none">AETHER</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 text-white/60 max-w-md text-sm md:text-base font-light tracking-wide leading-relaxed">Where culinary alchemy meets sensory design. <br/>Experience the unseen textures of taste.</motion.p>
        </div>

        <motion.div animate={tier === 'high' ? { y: [0, 10, 0] } : {}} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
        </motion.div>
      </section>

      {/* Brief Sections */}
      <ConceptSection tier={tier} />

      {/* Menu Highlight Section */}
      <section className="py-24 bg-[#18160f]/50 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 nav-item">
                <span className="text-primary text-xs font-mono tracking-[0.3em] uppercase block mb-4">Highlights</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">The Signature Collection</h2>
            </div>
            <div className="flex flex-col gap-0 mb-16">
                {highlightItems.map((item, index) => (
                    <FloatingDish key={item.id} item={item} index={index} tier={tier} />
                ))}
            </div>
            <div className="text-center">
                <Link to="/menu" className="inline-flex items-center justify-center h-12 px-10 border border-primary/30 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all nav-item">
                    View Full Menu
                </Link>
            </div>
        </div>
      </section>

      <GallerySection tier={tier} />
    </div>
  );
});

export default Home;
