/**
 * Shared Framer Motion configuration.
 * SPRING is the single spring used by every interactive/entrance transition;
 * FADE_IN_VARIANTS is the scroll-reveal pair used with whileInView.
 */

export const SPRING = { type: "spring", stiffness: 100, damping: 20 };

export const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
