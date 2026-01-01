import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    // Hidden state for when the mouse is off-screen
    const [isVisible, setIsVisible] = useState(false);
    
    // Core mouse positions using MotionValues for performance
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    
    // Smooth springs for the outer lag effect
    const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.tagName === 'INPUT' || 
                target.tagName === 'SELECT' || 
                target.closest('a') || 
                target.closest('button') ||
                target.closest('.nav-item') ||
                target.classList.contains('cursor-pointer');

            setIsHovered(!!isInteractive);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
        }
    }, [isVisible]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]" style={{ opacity: isVisible ? 1 : 0 }}>
            {/* Center Dot - Locked to cursor */}
            <motion.div 
                className="absolute w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,53,0.5)]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    left: 0,
                    top: 0,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />
            
            {/* Inner glow ring */}
            <motion.div
                className="absolute w-8 h-8 rounded-full border border-primary/20"
                style={{
                    x: mouseX,
                    y: mouseY,
                    left: 0,
                    top: 0,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    scale: isHovered ? 1.8 : 1,
                    opacity: isHovered ? 0.8 : 0.3,
                }}
            />

            {/* Elastic Outer Ring - Follows with lag */}
            <motion.div
                className="absolute w-12 h-12 border border-primary/50 rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    left: 0,
                    top: 0,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 1 : 0.4,
                    backgroundColor: isHovered ? "rgba(212, 175, 53, 0.15)" : "transparent",
                    borderColor: isHovered ? "rgba(212, 175, 53, 1)" : "rgba(212, 175, 53, 0.4)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        </div>
    );
};
