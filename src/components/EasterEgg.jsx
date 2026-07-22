import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA"
];

const EasterEgg = () => {
    const [inputSequence, setInputSequence] = useState([]);
    const [isTriggered, setIsTriggered] = useState(false);
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const newSequence = [...inputSequence, e.code].slice(-10);
            setInputSequence(newSequence);

            // Check if sequence matches Konami Code
            if (newSequence.length === 10 &&
                newSequence.every((key, i) => key === KONAMI_CODE[i])) {
                triggerEasterEgg();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [inputSequence]);

    const triggerEasterEgg = () => {
        setIsTriggered(true);

        // Generate confetti particles
        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                id: i,
                x: Math.random() * window.innerWidth,
                y: -20,
                color: ["#34d399", "#059669", "#fafaf9", "#a8a29e"][Math.floor(Math.random() * 4)],
                size: Math.random() * 10 + 5,
                delay: Math.random() * 0.5,
            });
        }
        setConfetti(particles);

        // Reset after animation
        setTimeout(() => {
            setIsTriggered(false);
            setConfetti([]);
            setInputSequence([]);
        }, 5000);
    };

    return (
        <AnimatePresence>
            {isTriggered && (
                <>
                    {/* Confetti */}
                    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
                        {confetti.map((particle) => (
                            <motion.div
                                key={particle.id}
                                initial={{ x: particle.x, y: particle.y, rotate: 0, opacity: 1 }}
                                animate={{
                                    y: window.innerHeight + 50,
                                    rotate: Math.random() * 720 - 360,
                                    opacity: [1, 1, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    delay: particle.delay,
                                    ease: "easeOut",
                                }}
                                style={{
                                    position: "absolute",
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: particle.color,
                                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                                }}
                            />
                        ))}
                    </div>

                    {/* Secret Message */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-bg-elev border border-line rounded-xl text-ink px-8 py-6 shadow-2xl text-center">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">Konami accepted</p>
                            <p className="font-display text-2xl font-semibold tracking-tight">30 extra lives not included.</p>
                            <p className="font-mono text-xs text-ink-muted mt-3">↑↑↓↓←→←→BA — Fernado</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EasterEgg;
