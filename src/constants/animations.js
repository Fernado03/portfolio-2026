/**
 * Shared animation configurations for Framer Motion
 * Centralizes animation values for consistency across components
 */

// Spring physics configurations
export const SPRING_CONFIGS = {
    // Fast response - for cursor, buttons
    fast: { damping: 20, stiffness: 700 },
    // Standard response - for most UI elements
    standard: { damping: 25, stiffness: 300 },
    // Slow/smooth - for parallax, background elements
    smooth: { damping: 30, stiffness: 100 },
    // Bouncy - for playful interactions
    bouncy: { type: "spring", bounce: 0.4 },
};

// Scroll-triggered fade-in variants
export const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Stagger children animation
export const STAGGER_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Hover scale effect
export const HOVER_SCALE = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
};

// Floating animation for decorative elements
export const FLOATING_ANIMATION = {
    animate: {
        y: [0, -10, 0],
    },
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
    },
};

// Transition durations
export const DURATIONS = {
    fast: 0.2,
    standard: 0.3,
    slow: 0.6,
    verySlow: 1.0,
};
