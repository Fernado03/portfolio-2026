import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HERO_CONTENT } from "../constants";

const Hero = () => {
    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Different parallax intensities for depth layers
    const layer1X = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
    const layer1Y = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
    const layer2X = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
    const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
    const layer3X = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
    const layer3Y = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

    // Typing effect state
    const [displayedName, setDisplayedName] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullName = HERO_CONTENT.name;

    useEffect(() => {
        // Typing effect
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullName.length) {
                setDisplayedName(fullName.slice(0, index));
                index++;
            } else {
                clearInterval(typingInterval);
                // Blink cursor after typing completes
                setTimeout(() => setShowCursor(false), 1500);
            }
        }, 120);

        return () => clearInterval(typingInterval);
    }, [fullName]);

    // Mouse move handler
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center pt-20 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Floating Decorative Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[15%] left-[10%] w-16 h-16 border-2 border-cyan-400/30 dark:border-cyan-400/20 rounded-full"
            />
            <motion.div
                animate={{
                    y: [0, 15, 0],
                    rotate: [0, -15, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute top-[25%] right-[12%] w-10 h-10 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-500/30 dark:to-pink-500/30 rounded-lg rotate-45"
            />
            <motion.div
                animate={{
                    y: [0, -12, 0],
                    x: [0, 8, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
                className="absolute bottom-[20%] right-[18%] w-6 h-6 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 dark:from-cyan-500/40 dark:to-blue-500/40 rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[30%] left-[8%] w-20 h-20 border border-indigo-400/20 dark:border-indigo-400/30 rounded-full"
            />

            <div className="container mx-auto px-6 text-center z-10 relative">
                {/* Availability Badge - Layer 1 (most movement) */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    style={{ x: layer1X, y: layer1Y }}
                    className="inline-block mb-6"
                >
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_20px_rgba(16,185,129,0.25)] dark:shadow-[0_0_25px_rgba(16,185,129,0.3)] backdrop-blur-sm">
                        {HERO_CONTENT.availability}
                    </span>
                </motion.div>

                {/* Heading with Typing Effect - Layer 2 */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ x: layer2X, y: layer2Y }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white"
                >
                    Hi, I'm{" "}
                    <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
                            {displayedName}
                        </span>
                        {showCursor && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                className="inline-block w-[4px] h-[0.9em] bg-gradient-to-b from-cyan-400 to-blue-500 ml-1 align-middle rounded-full"
                            />
                        )}
                    </span>
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">.</span>
                </motion.h1>

                {/* Subtitle - Layer 3 (least movement) */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ x: layer3X, y: layer3Y }}
                    className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    {HERO_CONTENT.title}
                    <br />
                    <span className="text-slate-500 dark:text-gray-500 text-lg mt-2 block">{HERO_CONTENT.subtitle}</span>
                </motion.p>

                {/* CTA Buttons with Enhanced Styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {/* Primary CTA - Animated Gradient Border */}
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group px-8 py-3 font-semibold rounded-lg overflow-hidden"
                    >
                        {/* Animated gradient border */}
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite] rounded-lg" />
                        {/* Inner background */}
                        <span className="absolute inset-[2px] bg-slate-900 dark:bg-slate-950 rounded-md group-hover:bg-slate-800 dark:group-hover:bg-slate-900 transition-colors" />
                        {/* Text */}
                        <span className="relative text-white">View Projects</span>
                        {/* Glow effect */}
                        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                    </motion.a>

                    {/* Secondary CTA */}
                    <motion.a
                        href={HERO_CONTENT.resumeLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 bg-slate-200/80 dark:bg-slate-800/80 text-slate-900 dark:text-white font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all backdrop-blur-sm hover:shadow-[0_0_20px_rgba(100,116,139,0.3)]"
                    >
                        Download Resume
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
