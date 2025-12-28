import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate minimum loading time for effect, then check if page is ready
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 500); // Wait for exit animation
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center"
                >
                    {/* Animated Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 blur-3xl opacity-50">
                            <div className="w-32 h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full animate-pulse" />
                        </div>

                        {/* Logo Text */}
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_2s_ease-in-out_infinite]">
                                Fernado
                            </span>
                            <span className="text-cyan-400">.</span>
                        </motion.h1>
                    </motion.div>

                    {/* Loading Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 w-48"
                    >
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                            />
                        </div>
                        <p className="text-slate-500 text-sm mt-4 text-center tracking-wider">
                            Loading
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                ...
                            </motion.span>
                        </p>
                    </motion.div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight + 50,
                                    opacity: 0.3,
                                }}
                                animate={{
                                    y: -50,
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "linear",
                                }}
                                className={`absolute w-2 h-2 rounded-full ${i % 3 === 0
                                        ? "bg-cyan-500"
                                        : i % 3 === 1
                                            ? "bg-blue-500"
                                            : "bg-purple-500"
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
