import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "portfolio-intro-seen";
const HOLD_MS = 1500; // exit starts here; +0.6s curtain = 2.1s total (< 2.2s budget)

export const REPLAY_INTRO_EVENT = "portfolio:replay-intro";

const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const storage = {
    seen() {
        try {
            return sessionStorage.getItem(STORAGE_KEY) !== null;
        } catch {
            return false; // fail open: show once in memory
        }
    },
    mark() {
        try {
            sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
            // no storage: dismissal state stays in memory only
        }
    },
    clear() {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        } catch {
            // ignore
        }
    },
};

const CinematicIntro = () => {
    const [show, setShow] = useState(() => !reducedMotion() && !storage.seen());
    const dismissed = useRef(false);
    const skipRef = useRef(null);

    const dismiss = useCallback(() => {
        if (dismissed.current) return;
        dismissed.current = true;
        storage.mark();
        setShow(false);
    }, []);

    // Replay listener (initial show state is derived lazily in useState above).
    useEffect(() => {
        const onReplay = () => {
            if (reducedMotion()) return; // replay never bypasses reduced motion
            storage.clear();
            dismissed.current = false;
            setShow(true);
        };
        window.addEventListener(REPLAY_INTRO_EVENT, onReplay);
        return () => window.removeEventListener(REPLAY_INTRO_EVENT, onReplay);
    }, []);

    // Active lifecycle: scroll lock, keyboard skip, auto-dismiss timer.
    useEffect(() => {
        if (!show) return undefined;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e) => {
            if (e.key === "Enter" || e.key === "Escape" || e.key === " ") {
                e.preventDefault();
                dismiss();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        skipRef.current?.focus();
        const timer = setTimeout(dismiss, HOLD_MS);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [show, dismiss]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-bg text-ink flex flex-col items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    onClick={dismiss}
                >
                    {/* Decorative sequence — hidden from assistive tech. */}
                    <div aria-hidden="true" className="flex flex-col items-center">
                        <motion.div
                            className="h-px w-56 md:w-80 bg-accent origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        />
                        <motion.p
                            className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-ink"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.25 }}
                        >
                            Fernado George
                        </motion.p>
                        <motion.p
                            className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.25 }}
                        >
                            Data Scientist · AI Engineer
                        </motion.p>
                        <motion.p
                            className="mt-10 font-sans font-extrabold uppercase tracking-tight text-ink text-[clamp(2.5rem,9vw,6rem)] leading-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.65, duration: 0 }}
                        >
                            Systems{" "}
                            <motion.span
                                className="text-accent2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0 }}
                            >
                                that ship
                            </motion.span>
                        </motion.p>
                    </div>

                    <button
                        type="button"
                        ref={skipRef}
                        aria-label="Skip intro"
                        onClick={(e) => {
                            e.stopPropagation();
                            dismiss();
                        }}
                        className="absolute bottom-6 right-6 border border-line rounded-none px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-accent hover:border-accent transition-colors"
                    >
                        Skip ↗
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CinematicIntro;
