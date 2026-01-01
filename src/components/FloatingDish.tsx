import { useRef, memo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface MenuItem {
    id: number;
    title: string;
    price: string;
    desc: string;
    image: string;
}

interface FloatingDishProps {
    item: MenuItem;
    index: number;
    tier: 'high' | 'low';
}

export const FloatingDish = memo(({ item, index, tier }: FloatingDishProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 40, damping: 25 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [45, 0, -45]);
    const rotateY = useTransform(smoothProgress, [0, 1], index % 2 === 0 ? [-15, 15] : [15, -15]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const isHighTier = tier === 'high';

    return (
        <div ref={containerRef} className="perspective-[1200px] w-full min-h-[400px] flex items-center justify-center py-12">
            <motion.div
                style={{
                    rotateX: isHighTier ? rotateX : 0,
                    rotateY: isHighTier ? rotateY : 0,
                    opacity,
                    scale,
                    transformStyle: "preserve-3d",
                }}
                className="will-change-transform relative w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 bg-black/40 backdrop-blur-md rounded-xl border border-primary/20 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <img src={`${item.image}?q=${isHighTier ? 80 : 60}&w=800`} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <motion.div style={{ translateZ: 50 }} className="flex-1 text-center md:text-left z-20">
                    <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-primary/20 pb-4 mb-6">
                        <h3 className="text-3xl font-serif font-bold text-white tracking-wide">{item.title}</h3>
                        <span className="text-xl font-mono text-primary mt-2 md:mt-0">{item.price}</span>
                    </div>
                    <p className="text-white/70 text-lg font-light leading-relaxed">{item.desc}</p>
                    <button className="mt-8 px-6 py-2 border border-primary/50 rounded-full text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all nav-item">Order Now</button>
                </motion.div>
            </motion.div>
        </div>
    );
});
