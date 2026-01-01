import { memo } from 'react';
import { FloatingDish } from '../components/FloatingDish';
import { MENU_ITEMS } from '../constants';

const MenuPage = memo(({ tier }: { tier: 'high' | 'low' }) => {
  return (
    <section id="menu" className="relative pt-40 pb-32 bg-[#18160f] border-t border-white/5 overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 nav-item">
          <span className="text-primary text-xs font-mono tracking-[0.3em] uppercase block mb-4">Current Season</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">The Tasting Menu</h2>
        </div>
        <div className="flex flex-col gap-0">
          {MENU_ITEMS.map((item, index) => (
            <FloatingDish key={item.id} item={item} index={index} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default MenuPage;
