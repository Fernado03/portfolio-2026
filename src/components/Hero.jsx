import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SPRING } from "../constants/animations";
import { HERO_CONTENT } from "../constants";
import Button from "./ui/Button";

// three.js is the heaviest dependency in the tree and drives one decorative object,
// so it is split out and only requested once the desktop hero is actually mounted.
const Hero3D = lazy(() => import("./Hero3D"));

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
        transition: SPRING,
    },
};

const DESKTOP_QUERY = "(min-width: 768px)";

const Hero = () => {
    // Lazily initialised so the first paint already knows, avoiding a mount-then-unmount canvas.
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
    );

    useEffect(() => {
        const mq = window.matchMedia(DESKTOP_QUERY);
        const sync = (e) => setIsDesktop(e.matches);
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

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
                        {HERO_CONTENT.title}
                    </motion.p>

                    {/* H1 */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-display text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.05] text-ink mt-5"
                    >
                        {HERO_CONTENT.name}
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
                        <Button variant="tertiary" href={HERO_CONTENT.github}>
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

                {/* 3D canvas — desktop only. Gated on matchMedia rather than `hidden md:flex`,
                   because CSS visibility still lets the canvas build a WebGL context on phones. */}
                {isDesktop && (
                    <div className="hidden md:flex md:col-span-5 items-center justify-center relative h-[400px] lg:h-[500px]">
                        <Suspense fallback={null}>
                            <Hero3D />
                        </Suspense>
                    </div>
                )}
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
                        className="absolute inset-x-0 top-0 h-3 bg-accent"
                        animate={{ y: [-12, 32] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </span>
            </motion.div>
        </section>
    );
};

export default Hero;
