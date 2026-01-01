import { memo } from 'react';
import { Link } from 'react-router-dom';

export const ConceptSection = memo(({ tier }: { tier: 'high' | 'low' }) => {
  return (
    <section id="concept" className="relative py-32 px-4 md:px-0 bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center relative z-10 px-6 md:px-0">
        <div className="md:col-span-5 md:col-start-2 relative group nav-item">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img loading="lazy" src={`https://lh3.googleusercontent.com/aida-public/AB6AXuCCllXyLR9rC-P7QXQ0pFt545k9SNCH_g1o1hdo_gqY_6QPDNLOvXoV3Lms3wui00TQd8D2pI0wE4SSf1_ZUdAwFtxDVRxqiA8UwfGaPgoo6v2dIhVn2p4KaSi4LIxrWOSNKbfIy6yhPi7ugztpjJcJtTYahuvVX6GH7t4if_7G9Pq3j6DeXdSNKBeZptCE-REqXD5kqjwYR8IyLv_gdaG3EP21b-45615qw-VFMBM0bQ--1ccSeM1E-KHvY0JJ3m0gcD7QoRAJhgzx?q=${tier === 'high' ? 80 : 60}&w=600`} className="w-full h-full object-cover" alt="Chef" />
          </div>
        </div>
        <div className="md:col-span-12 md:col-start-8 lg:col-span-5 flex flex-col gap-8 nav-item mt-12 md:mt-0">
          <div>
              <h3 className="text-primary font-mono text-xs tracking-widest mb-2">01. THE CONCEPT</h3>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Culinary <br/><span className="text-white/30 italic">Alchemy</span></h2>
              <div className="w-12 h-[2px] bg-primary mb-6"></div>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-6">AETHER is not merely a restaurant; it is a void where external noise fades, and the senses are amplified.</p>
          </div>
          <Link to="/concept" className="w-fit flex items-center gap-3 text-white hover:text-primary transition-colors uppercase tracking-widest text-sm font-bold nav-item">
            Explore The Story
          </Link>
        </div>
      </div>
    </section>
  );
});
