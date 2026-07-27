import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FYP_CONTENT } from "../constants";
import { MODAL_RELIANCE, MODALITY_CONDITIONS, EMOTIONS } from "../constants/thesis";
import { FADE_IN_VARIANTS, SPRING } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Chip from "./ui/Chip";
import Button from "./ui/Button";
import Lightbox from "./ui/Lightbox";
import ThesisFigures from "./ThesisFigures";
import { resizedImage } from "../utils/image";

// Derived from thesis.js, never hardcoded — these are the paper's headline numbers.
const RESULT_RAIL = [
    { value: `${Math.max(...MODAL_RELIANCE.map((row) => row[2]))}%`, label: "Best F1 (ensemble)" },
    { value: MODAL_RELIANCE.length, label: "Models benchmarked" },
    { value: MODALITY_CONDITIONS.length, label: "Modality conditions" },
    { value: EMOTIONS.length, label: "Emotion classes" },
];

const FYPShowcase = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const closePreview = useCallback(() => setSelectedImage(null), []);

    return (
        <Section id="fyp" className="flex flex-col justify-center">
            <SectionHeader
                index="01"
                eyebrow="Thesis"
                title="Multimodal emotion recognition"
                description={FYP_CONTENT.description}
                scale="major"
            />

            <motion.dl
                variants={FADE_IN_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={SPRING}
                className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line border-y border-line mb-6"
            >
                {RESULT_RAIL.map(({ value, label }) => (
                    <div key={label} className="px-4 py-3 first:pl-0">
                        <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-muted">
                            {label}
                        </dt>
                        <dd className="mt-1 font-display text-2xl md:text-3xl font-semibold text-ink">
                            {value}
                        </dd>
                    </div>
                ))}
            </motion.dl>

            <motion.div
                variants={FADE_IN_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={SPRING}
                className="mb-6"
            >
                <ThesisFigures />
            </motion.div>

            <motion.div
                variants={FADE_IN_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={SPRING}
                className="grid gap-8 lg:grid-cols-12"
            >
                <div className="lg:col-span-7">
                    <div className="mb-4 max-w-[62ch]">
                        <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">
                            Key innovations
                        </h4>
                        <ul className="space-y-2">
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

                    <div className="flex flex-wrap gap-2">
                        {FYP_CONTENT.techStack.map((tech) => (
                            <Chip key={tech}>{tech}</Chip>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        {FYP_CONTENT.demoLink ? (
                            <Button variant="primary" href={FYP_CONTENT.demoLink}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View presentation
                            </Button>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-muted cursor-not-allowed">
                                Presentation coming soon
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

                    {FYP_CONTENT.award && (
                        <button
                            type="button"
                            onClick={() => setSelectedImage(FYP_CONTENT.award.image)}
                            className="group flex items-center gap-4 rounded-lg border border-transparent text-left hover:border-accent/40 active:scale-[0.99] transition-colors"
                            aria-label={`View ${FYP_CONTENT.award.title} poster`}
                        >
                            <img
                                {...resizedImage(FYP_CONTENT.award.image)}
                                sizes="64px"
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-16 w-auto rounded-md border border-line object-cover group-hover:border-accent/50 transition-colors"
                            />
                            <span className="border-l-2 border-accent pl-4">
                                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">Award</span>
                                <span className="block text-ink font-medium text-sm">{FYP_CONTENT.award.title}</span>
                                <span className="mt-0.5 block font-mono text-[0.625rem] text-ink-muted">View proof</span>
                            </span>
                        </button>
                    )}
                </div>
            </motion.div>

            <Lightbox
                src={selectedImage}
                alt={selectedImage === FYP_CONTENT.award?.image ? FYP_CONTENT.award.title : "Full screen preview"}
                onClose={closePreview}
            />
        </Section>
    );
};

export default FYPShowcase;
