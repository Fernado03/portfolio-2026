/**
 * Shared Framer Motion configuration.
 * SPRING is the single spring used by every interactive/entrance transition;
 * FADE_IN_VARIANTS is the hard-cut scroll-reveal pair used with whileInView;
 * CUT is the shared hard-cut transition (no bounce) for v2 reveals.
 */

export const SPRING = { type: "spring", stiffness: 100, damping: 20 };

export const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

export const CUT = { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

/**
 * v3 scrollytelling: slower chapter-level reveal. Figures and chapter text
 * rise less and settle longer than UI elements — reading pace, not UI pace.
 */
export const CHAPTER_VARIANTS = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
};
export const CHAPTER_T = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };
