import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FYP_CONTENT } from "../constants";
import { FADE_IN_VARIANTS, SPRING } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Chip from "./ui/Chip";
import Button from "./ui/Button";
import Lightbox from "./ui/Lightbox";
import { resizedImage } from "../utils/image";

const FYP_SLIDES = [
    ...FYP_CONTENT.gallery,
    {
        src: FYP_CONTENT.award.image,
        caption: FYP_CONTENT.award.title,
    },
];

const FYPShowcase = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [currentSlide, setCurrentSlide] = React.useState(0);

    React.useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentSlide((current) => (current + 1) % FYP_SLIDES.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <Section id="fyp" className="flex flex-col justify-center">
            <SectionHeader
                eyebrow="Final year project"
                title="Multimodal emotion recognition"
                description={FYP_CONTENT.tagline}
            />

            {/* Balanced two-column — research summary left, simple auto-carousel right. */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* Content column */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={SPRING}
                    className="lg:col-span-6 order-2 lg:order-1"
                >
                    {FYP_CONTENT.award && (
                        <button
                            type="button"
                            onClick={() => setSelectedImage(FYP_CONTENT.award.image)}
                            className="group mb-6 flex items-center gap-4 text-left"
                            aria-label={`View ${FYP_CONTENT.award.title} poster`}
                        >
                            <img
                                {...resizedImage(FYP_CONTENT.award.image)}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-16 w-auto rounded-md border border-line object-cover group-hover:border-accent/50 transition-colors"
                            />
                            <span className="border-l-2 border-accent pl-4">
                                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Award</span>
                                <span className="block text-ink font-medium text-sm">{FYP_CONTENT.award.title}</span>
                                <span className="mt-0.5 block font-mono text-[10px] text-ink-muted">View proof</span>
                            </span>
                        </button>
                    )}

                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-5 leading-tight tracking-tight">
                        {FYP_CONTENT.title}
                    </h3>

                    <p className="text-ink-muted leading-relaxed mb-7 max-w-[58ch]">
                        {FYP_CONTENT.description}
                    </p>

                    <div className="mb-7">
                        <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted mb-4">
                            Key innovations
                        </h4>
                        <ul className="space-y-3">
                            {FYP_CONTENT.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-ink-muted">
                                    <svg
                                        className="w-4 h-4 text-accent mt-0.5 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {FYP_CONTENT.techStack.map((tech, idx) => (
                            <Chip key={idx}>{tech}</Chip>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {FYP_CONTENT.demoLink ? (
                            <Button variant="primary" href={FYP_CONTENT.demoLink}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Live demo
                            </Button>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-muted cursor-not-allowed">
                                Demo coming soon
                            </span>
                        )}
                        {FYP_CONTENT.githubLink && (
                            <Button variant="secondary" href={FYP_CONTENT.githubLink}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                                </svg>
                                GitHub
                            </Button>
                        )}
                        {FYP_CONTENT.thesisLink && (
                            <Button variant="tertiary" href={FYP_CONTENT.thesisLink}>
                                Read thesis
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        )}
                    </div>
                </motion.div>

                {/* Same simple auto-carousel pattern used in About */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={SPRING}
                    className="lg:col-span-6 order-1 lg:order-2 flex items-center lg:justify-end"
                >
                    <div className="relative w-full h-80 md:h-[420px] lg:h-[500px] group">
                        <div className="absolute inset-0 rounded-xl border border-line bg-bg-subtle translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
                        <button
                            type="button"
                            onClick={() => setSelectedImage(FYP_SLIDES[currentSlide].src)}
                            className="relative block h-full w-full overflow-hidden rounded-xl border border-line bg-bg-elev"
                            aria-label={`Enlarge ${FYP_SLIDES[currentSlide].caption}`}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    {...resizedImage(FYP_SLIDES[currentSlide].src)}
                                    sizes="(min-width: 1024px) 42vw, 100vw"
                                    alt={FYP_SLIDES[currentSlide].caption}
                                    loading="lazy"
                                    decoding="async"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 h-full w-full object-contain p-4 md:p-6"
                                />
                            </AnimatePresence>

                            <span className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2" aria-hidden="true">
                                {FYP_SLIDES.map((slide, index) => (
                                    <span
                                        key={slide.src}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-4 bg-accent" : "w-1.5 bg-ink/30"}`}
                                    />
                                ))}
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>

            <Lightbox
                src={selectedImage}
                alt={
                    FYP_SLIDES.find((slide) => slide.src === selectedImage)?.caption ||
                    "Full screen preview"
                }
                onClose={() => setSelectedImage(null)}
            />
        </Section>
    );
};

export default FYPShowcase;
