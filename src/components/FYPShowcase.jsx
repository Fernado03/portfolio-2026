import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FYP_CONTENT } from "../constants";
import { MODAL_RELIANCE, MODALITY_CONDITIONS, EMOTIONS } from "../constants/thesis";
import { CHAPTER_VARIANTS, CHAPTER_T } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Chip from "./ui/Chip";
import Button from "./ui/Button";
import Lightbox from "./ui/Lightbox";
import { ModalRelianceHeatmap, NoiseRobustnessBands, ConfusionMatrix } from "./ThesisFigures";
import { resizedImage } from "../utils/image";

// Derived from thesis.js — the paper's headline numbers, never hardcoded.
const RESULT_RAIL = [
    { value: `${Math.max(...MODAL_RELIANCE.map((row) => row[2]))}%`, label: "Best F1 (ensemble)" },
    { value: MODAL_RELIANCE.length, label: "Models benchmarked" },
    { value: MODALITY_CONDITIONS.length, label: "Modality conditions" },
    { value: EMOTIONS.length, label: "Emotion classes" },
];

const MOTION_PROPS = {
    variants: CHAPTER_VARIANTS,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-15%" },
    transition: CHAPTER_T,
};

const FYPShowcase = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const closePreview = useCallback(() => setSelectedImage(null), []);

    const selectedAlt = selectedImage ? FYP_CONTENT.award?.title ?? "Full screen preview" : "";

    return (
        <Section id="fyp" className="flex flex-col justify-center !py-12 md:!py-20">
            <SectionHeader
                index="01"
                eyebrow="Thesis"
                title="Multimodal emotion recognition"
                description={FYP_CONTENT.description}
                className="!mb-6 !pt-5 md:!mb-8 md:!pt-6"
            />

            <motion.dl
                {...MOTION_PROPS}
                className="mb-5 grid grid-cols-2 divide-line border-y border-line md:grid-cols-4 md:divide-x"
            >
                {RESULT_RAIL.map(({ value, label }, idx) => (
                    <div
                        key={label}
                        className={`px-3 py-2.5 first:pl-0 md:px-4 md:py-3 ${
                            idx >= 2 ? `border-t border-line md:border-t-0 ${idx === 2 ? "pl-0 md:pl-4" : ""}` : ""
                        }`}
                    >
                        <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted md:text-[0.6875rem] md:tracking-[0.18em]">
                            {label}
                        </dt>
                        <dd className="mt-0.5 font-sans text-xl font-bold text-ink md:mt-1 md:text-3xl">
                            {value}
                        </dd>
                    </div>
                ))}
            </motion.dl>

            <motion.div {...MOTION_PROPS} className="mb-6 md:mb-8">
                <ModalRelianceHeatmap />
                <div className="mt-6 grid gap-6 md:mt-8 md:gap-8 min-[1180px]:grid-cols-2">
                    <NoiseRobustnessBands />
                    <ConfusionMatrix />
                </div>
            </motion.div>

            <motion.div
                {...MOTION_PROPS}
                className="grid gap-6 border-t border-line pt-6 md:gap-8 md:pt-8 lg:grid-cols-12"
            >
                <div className="lg:col-span-7">
                    <div className="mb-3 max-w-[62ch] md:mb-4">
                        <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted md:mb-4">
                            Key innovations
                        </h3>
                        <ul className="space-y-2 md:space-y-3">
                            {FYP_CONTENT.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-ink-muted md:text-base md:leading-7">
                                    <svg
                                        className="w-4 h-4 text-accent mt-1 shrink-0"
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
                    <div className="mb-4 flex flex-wrap items-center gap-2 md:mb-5 md:gap-3">
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
                            className="group flex items-center gap-4 border border-transparent text-left hover:border-accent/40 active:scale-[0.99] transition-colors"
                            aria-label={`View ${FYP_CONTENT.award.title} poster`}
                        >
                            <img
                                {...resizedImage(FYP_CONTENT.award.image)}
                                sizes="64px"
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-16 w-auto border border-line object-cover group-hover:border-accent/50 transition-colors"
                            />
                            <span className="border-l-2 border-accent pl-4">
                                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">Award</span>
                                <span className="block text-ink font-medium text-base leading-7">{FYP_CONTENT.award.title}</span>
                                <span className="mt-0.5 block font-mono text-[0.625rem] text-ink-muted">View proof</span>
                            </span>
                        </button>
                    )}
                </div>
            </motion.div>

            <Lightbox src={selectedImage} alt={selectedAlt} onClose={closePreview} />
        </Section>
    );
};

export default FYPShowcase;
