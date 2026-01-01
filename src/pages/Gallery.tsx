import { memo } from 'react';
import { GallerySection } from '../components/GallerySection';

const GalleryPage = memo(({ tier }: { tier: 'high' | 'low' }) => {
  return (
    <div className="pt-20 bg-background-dark min-h-screen">
      <section className="pt-32 pb-10 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Visual <span className="text-white/30 italic">Narratives</span></h2>
        <div className="w-24 h-[1px] bg-primary/50 mx-auto"></div>
      </section>
      <GallerySection tier={tier} />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
           {/* Add more static gallery items or details here if needed */}
        </div>
      </section>
    </div>
  );
});

export default GalleryPage;
