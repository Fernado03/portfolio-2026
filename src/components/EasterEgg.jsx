import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
];

// v3 palette — ember, blue, paper, ink so particles read on both themes.
const CONFETTI_COLORS = ["#ff8a5c", "#7db8ff", "#e8e6e0", "#101014"];

// Every random value is drawn once here, so render stays pure and a re-render
// cannot reshuffle particles mid-flight.
const makeConfetti = () =>
    Array.from({ length: 100 }, (_, id) => ({
        id,
        x: Math.random() * window.innerWidth,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.random() * 10 + 5,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
        rotate: Math.random() * 720 - 360,
        round: Math.random() > 0.5,
    }));

const EasterEgg = () => {
    const [isTriggered, setIsTriggered] = useState(false);
    const [confetti, setConfetti] = useState([]);
    // Kept in a ref so the keydown listener is attached once instead of on every keypress.
    const sequenceRef = useRef([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            sequenceRef.current = [...sequenceRef.current, e.code].slice(-KONAMI_CODE.length);
            const matched =
                sequenceRef.current.length === KONAMI_CODE.length &&
                sequenceRef.current.every((key, i) => key === KONAMI_CODE[i]);
            if (!matched) return;

            sequenceRef.current = [];
            setConfetti(makeConfetti());
            setIsTriggered(true);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!isTriggered) return;
        const timer = window.setTimeout(() => {
            setIsTriggered(false);
            setConfetti([]);
        }, 5000);
        return () => window.clearTimeout(timer);
    }, [isTriggered]);

    return (
        <AnimatePresence>
            {isTriggered && (
                <div key="confetti" className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
                    {confetti.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{ x: particle.x, y: -20, rotate: 0, opacity: 1 }}
                            animate={{
                                y: window.innerHeight + 50,
                                rotate: particle.rotate,
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                ease: "easeOut",
                            }}
                            style={{
                                position: "absolute",
                                width: particle.size,
                                height: particle.size,
                                backgroundColor: particle.color,
                                borderRadius: particle.round ? "50%" : "0",
                            }}
                        />
                    ))}
                </div>
            )}

            {isTriggered && (
                <motion.div
                    key="message"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
                >
                    <div className="bg-bg-elev border border-line rounded-none text-ink px-8 py-6 shadow-lg text-center">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">Konami accepted</p>
                        <p className="font-mono text-xl font-bold uppercase tracking-tight">30 extra lives not included.</p>
                        <p className="font-mono text-xs text-ink-muted mt-3">↑↑↓↓←→←→BA — Fernado</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
