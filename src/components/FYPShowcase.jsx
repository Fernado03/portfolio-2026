import React from "react";
import { motion } from "framer-motion";
import { FYP_CONTENT } from "../constants";
import { FADE_IN_VARIANTS } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Chip from "./ui/Chip";
import Button from "./ui/Button";
import { resizedImage } from "../utils/image";

const spring = { type: "spring", stiffness: 100, damping: 20 };

const FYPShowcase = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);

    return (
        <Section id="fyp" className="min-h-[100dvh] flex flex-col justify-center py-20">
            <SectionHeader
                eyebrow="Final year project"
                title="Multimodal emotion recognition"
                description={FYP_CONTENT.tagline}
            />

            {FYP_CONTENT.award && (
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={spring}
                    className="border-y border-line py-4 mb-12 flex items-center gap-4"
                >
                    <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-1">Award</p>
                        <p className="text-ink font-medium">{FYP_CONTENT.award.title}</p>
                    </div>
                    {FYP_CONTENT.award.image && (
                        <button
                            type="button"
                            onClick={() => setSelectedImage(FYP_CONTENT.award.image)}
                            className="shrink-0 focus-visible:outline-accent"
                            aria-label="View award poster"
                        >
                            <img
                                {...resizedImage(FYP_CONTENT.award.image)}
                                alt={FYP_CONTENT.award.title}
                                loading="lazy"
                                decoding="async"
                                className="h-28 md:h-32 w-auto rounded-lg border border-line object-cover hover:border-accent/50 transition-colors"
                            />
                        </button>
                    )}
                </motion.div>
            )}

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Visual Side */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={spring}
                >
                    <div
                        className="group cursor-pointer"
                        onClick={() => setSelectedImage(FYP_CONTENT.image)}
                    >
                        <div className="rounded-xl border border-line overflow-hidden bg-bg-subtle aspect-video">
                            <img
                                {...resizedImage(FYP_CONTENT.image)}
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                alt={FYP_CONTENT.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                        <p className="mt-3 font-mono text-xs text-ink-muted flex items-center gap-2 group-hover:text-accent transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            Click to enlarge
                        </p>
                    </div>

                    {FYP_CONTENT.gallery?.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {FYP_CONTENT.gallery.map((item, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedImage(item.src)}
                                    className="rounded-lg border border-line overflow-hidden aspect-video bg-bg-subtle hover:border-accent/50 transition-colors focus-visible:outline-accent"
                                    aria-label={item.caption}
                                >
                                    <img
                                        {...resizedImage(item.src)}
                                        alt={item.caption}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Content Side */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={spring}
                >
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6 leading-tight">
                        {FYP_CONTENT.title}
                    </h3>

                    <p className="text-ink-muted leading-relaxed mb-8">{FYP_CONTENT.description}</p>

                    <div className="mb-8">
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
                            <Button variant="secondary" href={FYP_CONTENT.demoLink}>
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
                        {FYP_CONTENT.githubLink ? (
                            <Button variant="secondary" href={FYP_CONTENT.githubLink}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                GitHub repo
                            </Button>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-muted cursor-not-allowed">
                                Repo coming soon
                            </span>
                        )}
                        {FYP_CONTENT.thesisLink && (
                            <Button variant="tertiary" href={FYP_CONTENT.thesisLink}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Read thesis
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={spring}
                        className="relative max-w-7xl w-auto max-h-[90vh] flex items-center justify-center p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-50 focus-visible:outline-accent"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close preview"
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full screen preview"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg border border-line bg-bg-elev"
                        />
                    </motion.div>
                </div>
            )}
        </Section>
    );
};

export default FYPShowcase;
