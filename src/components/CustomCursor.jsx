import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const cursorRef = useRef(null);

    // Mouse position with spring animation for smooth following
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Inner dot - faster response
    const springConfig = { damping: 20, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Outer ring - slightly delayed for trailing effect
    const outerSpringConfig = { damping: 25, stiffness: 300 };
    const outerXSpring = useSpring(cursorX, outerSpringConfig);
    const outerYSpring = useSpring(cursorY, outerSpringConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        // Magnetic effect for interactive elements
        const handleElementHover = (e) => {
            const target = e.target.closest('a, button, [data-magnetic]');
            if (target) {
                setIsHovering(true);

                // Magnetic pull effect
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Pull cursor toward center of element
                const pullStrength = 0.3;
                const magneticX = e.clientX + (centerX - e.clientX) * pullStrength;
                const magneticY = e.clientY + (centerY - e.clientY) * pullStrength;

                cursorX.set(magneticX);
                cursorY.set(magneticY);
            }
        };

        const handleElementLeave = (e) => {
            const target = e.target.closest('a, button, [data-magnetic]');
            if (target) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Add hover listeners to all interactive elements
        document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
            el.addEventListener('mouseenter', handleElementHover);
            el.addEventListener('mousemove', handleElementHover);
            el.addEventListener('mouseleave', handleElementLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);

            document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
                el.removeEventListener('mouseenter', handleElementHover);
                el.removeEventListener('mousemove', handleElementHover);
                el.removeEventListener('mouseleave', handleElementLeave);
            });
        };
    }, [cursorX, cursorY]);

    // Re-attach listeners when DOM changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Inner dot - fast follow */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 2.5 : 1,
                        opacity: isHidden ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3 bg-white rounded-full"
                />
            </motion.div>

            {/* Outer ring - slow follow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: outerXSpring,
                    y: outerYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                        opacity: isHidden ? 0 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${isHovering
                            ? "border-cyan-500"
                            : "border-slate-400 dark:border-white/40"
                        }`}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
