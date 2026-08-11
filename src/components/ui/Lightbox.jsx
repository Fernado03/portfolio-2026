import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

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

    if (!src) return null;

    return createPortal(
        <motion.div
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 md:p-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex max-h-full w-full max-w-5xl flex-col items-center justify-center"
            >
                <div onClick={(event) => event.stopPropagation()} className="flex max-h-full flex-col items-center">
                    <img
                        src={src}
                        alt=""
                        className="max-h-[85dvh] max-w-full border border-line object-contain"
                    />
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">{alt}</p>
                </div>
            </motion.div>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-none border border-white/20 text-white transition-colors hover:border-white hover:text-white md:right-8 md:top-8"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>,
        document.body
    );
};

export default Lightbox;
