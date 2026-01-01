import { memo } from 'react';
import { GALLERY_ITEMS } from '../constants';

export const GallerySection = memo(({ tier }: { tier: 'high' | 'low' }) => {
  const items = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  return (
    <section id="gallery" className="py-32 bg-background-dark overflow-hidden border-t border-white/5">
        <div className="relative flex">
            <div className="animate-infinite-scroll flex gap-6 px-3">
                {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="shrink-0 w-[80vw] md:w-[450px] aspect-[4/5] relative rounded-2xl overflow-hidden group border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                        <img loading="lazy" src={`${item.src}?q=${tier === 'high' ? 80 : 60}&w=800`} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute bottom-8 left-8 z-20">
                            <span className="text-primary font-mono text-[10px] tracking-[0.3em] mb-2 block uppercase origin-left">{`0${item.id}`}</span>
                            <h4 className="text-white text-xl md:text-2xl font-serif font-bold tracking-widest uppercase group-hover:text-primary transition-colors duration-500">{item.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
});
