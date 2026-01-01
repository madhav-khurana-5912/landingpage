import { memo } from 'react';
import { ConceptSection } from '../components/ConceptSection';

const Concept = memo(({ tier }: { tier: 'high' | 'low' }) => {
  return (
    <div className="pt-20">
      <ConceptSection tier={tier} />
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Our philosophy is rooted in the intersection of molecular gastronomy and atmospheric design. We believe that a meal should be a journey through textures and emotions, not just flavors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <div>
              <h4 className="text-primary font-serif italic text-2xl mb-4">Texture</h4>
              <p className="text-white/40 text-sm">Deconstructing the physical sensations of every bite.</p>
            </div>
            <div>
              <h4 className="text-primary font-serif italic text-2xl mb-4">Void</h4>
              <p className="text-white/40 text-sm">Removing noise to amplify the essence of taste.</p>
            </div>
            <div>
              <h4 className="text-primary font-serif italic text-2xl mb-4">Alchemy</h4>
              <p className="text-white/40 text-sm">Transforming raw elements into ethereal experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Concept;
