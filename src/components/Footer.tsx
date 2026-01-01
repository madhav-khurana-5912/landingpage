import { memo } from 'react';

export const Footer = memo(() => {
  return (
    <footer className="relative bg-[#080808] pt-32 pb-12 px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-primary font-serif italic text-3xl mb-4">Secure Your Table</h2>
           <p className="text-white/60 text-sm mb-8">Experience the ethereal. Tables released monthly.</p>
           <button className="bg-primary text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors nav-item">Check Availability</button>
           
           <div className="mt-16 text-white/20 text-[10px] font-mono uppercase tracking-widest">
               2024 AETHER Dining.
           </div>
      </div>
    </footer>
  );
});
