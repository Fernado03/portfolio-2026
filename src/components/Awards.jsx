import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AWARDS } from "../constants";
import { SPRING, FADE_IN_VARIANTS } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Lightbox from "./ui/Lightbox";

const extractYear = (title) => title.match(/\d{4}/)?.[0] || null;
const stripYear = (title) =>
    title.replace(/\s*[-–]\s*\d{4}/, "").replace(/\s*\d{4}/, "").trim();

const Awards = () => {
    const [preview, setPreview] = useState(null);
    const closePreview = useCallback(() => setPreview(null), []);


    return (
        <Section id="awards" className="flex items-center">
            <SectionHeader index="06" eyebrow="Recognition" title="Honors & awards" scale="minor" />

            <motion.ul
                variants={FADE_IN_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="border-y border-line divide-y divide-line"
            >
                {AWARDS.map((award) => {
                    const year = extractYear(award.title);
                    const name = stripYear(award.title);

                    return (
                        <li key={award.title} className="flex min-h-20 items-center gap-4 py-3 sm:gap-6">
                            <span className="w-12 shrink-0 font-mono text-xs text-ink-muted">
                                {year || "—"}
                            </span>
                            <span className="min-w-0 flex-1 text-ink font-medium">{name}</span>
                            {award.image ? (
                                <button
                                    type="button"
                                    onClick={() => setPreview(award)}
                                    className="group flex h-14 w-20 shrink-0 items-center justify-center border border-line bg-bg-subtle transition-colors hover:border-accent/50"
                                    aria-label={`Enlarge ${name} certificate`}
                                >
                                    <img
                                        {...resizedImage(award.image)}
                                        sizes="80px"
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-contain"
                                    />
                                </button>
                            ) : (
                                <span className="w-20 shrink-0 text-right font-mono text-xs text-ink-muted" aria-hidden="true">—</span>
                            )}
                        </li>
                    );
                })}
            </motion.ul>

            <Lightbox
                src={preview?.image}
                alt={preview ? `${stripYear(preview.title)} — award certificate` : ""}
                onClose={closePreview}
            />
        </Section>
    );
};

export default Awards;
