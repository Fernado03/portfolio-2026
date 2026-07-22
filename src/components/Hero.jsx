import React from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import Hero3D from "./Hero3D";
import Button from "./ui/Button";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};

const Hero = () => {
    return (
        <section className="min-h-[100dvh] flex items-center relative">
            <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 items-center">
                {/* Content — left aligned */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="md:col-span-7"
                >
                    {/* Eyebrow */}
                    <motion.p
                        variants={itemVariants}
                        className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
                    >
                        Fernado George — Data scientist &amp; developer
                    </motion.p>

                    {/* H1 */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-display text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.05] text-ink mt-5"
                    >
                        {HERO_CONTENT.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-ink-muted max-w-[55ch] mt-6 leading-relaxed"
                    >
                        {HERO_CONTENT.subtitle}
                    </motion.p>

                    {/* Availability chip */}
                    <motion.div variants={itemVariants} className="mt-8">
                        <span className="inline-flex items-center gap-2 rounded-md border border-line bg-bg-subtle px-3 py-1.5 font-mono text-xs text-ink-muted">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                            </span>
                            {HERO_CONTENT.availability}
                        </span>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center gap-4 mt-10"
                    >
                        <Button variant="primary" href={HERO_CONTENT.resumeLink}>
                            Download resume
                        </Button>
                        <Button
                            variant="secondary"
                            href={`mailto:${HERO_CONTENT.email}`}
                        >
                            Get in touch
                        </Button>
                        <Button
                            variant="tertiary"
                            href={HERO_CONTENT.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M7 17 17 7" />
                                <path d="M7 7h10v10" />
                            </svg>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* 3D canvas — right column */}
                <div className="hidden md:flex md:col-span-5 items-center justify-center relative h-[400px] lg:h-[500px]">
                    <Hero3D />
                </div>
            </div>

            {/* Scroll cue — bottom left */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-6 md:left-[max(1.5rem,calc((100vw_-_72rem)_/_2_+_1.5rem))] flex flex-col items-center gap-3"
            >
                <span className="font-mono text-xs text-ink-muted tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
                    Scroll
                </span>
                <span className="relative h-8 w-px bg-line overflow-hidden">
                    <motion.span
                        animate={{ y: [-8, 32] }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute left-0 top-0 h-2 w-px bg-accent"
                    />
                </span>
            </motion.div>
        </section>
    );
};

export default Hero;
