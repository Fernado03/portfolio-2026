import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { SPRING } from "../../constants/animations";
import { resizedImage } from "../../utils/image";

/**
 * Shared full-screen image viewer.
 * Owns dialog semantics: Escape to close, focus trap, focus restore, body scroll lock.
 */
const Lightbox = ({ src, alt, onClose }) => {
    const panelRef = useRef(null);
    const restoreRef = useRef(null);

    useEffect(() => {
        if (!src) return;

        restoreRef.current = document.activeElement;
        panelRef.current?.querySelector('[aria-label="Close preview"]')?.focus();
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab") return;

            const focusable = panelRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            restoreRef.current?.focus?.();
        };
    }, [src, onClose]);

    return createPortal(
        <AnimatePresence>
            {src && (
                <motion.div
                    ref={panelRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={alt}
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0B0A09]/90 p-4 md:p-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={SPRING}
                        onClick={(event) => event.stopPropagation()}
                        className="relative flex max-h-full w-full max-w-5xl items-center justify-center"
                    >
                        <img
                            {...resizedImage(src)}
                            sizes="90vw"
                            alt={alt}
                            className="max-h-[85dvh] max-w-full object-contain"
                        />
                    </motion.div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close preview"
                        className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B0A09] text-[#F5F3EF] transition-transform hover:scale-105 active:scale-95 md:right-8 md:top-8"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Lightbox;
