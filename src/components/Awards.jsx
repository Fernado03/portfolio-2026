import { useState } from "react";
import { motion } from "framer-motion";
import { AWARDS } from "../constants";
import { SPRING } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Lightbox from "./ui/Lightbox";

const TrophyIcon = () => (
    <svg
        className="w-5 h-5 shrink-0 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" />
        <path d="M7 6H4a1 1 0 0 0-1 1c0 2 1.5 3.5 4 3.5" />
        <path d="M17 6h3a1 1 0 0 1 1 1c0 2-1.5 3.5-4 3.5" />
    </svg>
);

const extractYear = (title) => title.match(/\d{4}/)?.[0] || null;
const stripYear = (title) =>
    title.replace(/\s*[-–]\s*\d{4}/, "").replace(/\s*\d{4}/, "").trim();

const Awards = () => {
    const [preview, setPreview] = useState(null);

    return (
        <Section id="awards" className="flex items-center">
            <SectionHeader eyebrow="Recognition" title="Honors & awards" />

            <motion.ul
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="border-y border-line divide-y divide-line"
            >
                {AWARDS.map((award) => {
                    const year = extractYear(award.title);
                    const name = stripYear(award.title);

                    return (
                        <li key={award.title} className="py-5 flex items-center gap-4">
                            <span className="font-mono text-xs text-ink-muted w-12 shrink-0">
                                {year || "—"}
                            </span>
                            <TrophyIcon />
                            <span className="text-ink font-medium">{name}</span>
                            {award.image && (
                                <button
                                    type="button"
                                    onClick={() => setPreview(award)}
                                    className="ml-auto shrink-0 rounded-lg border border-line overflow-hidden hover:border-accent/50 transition-colors"
                                    aria-label={`Enlarge ${name} certificate`}
                                >
                                    <img
                                        {...resizedImage(award.image)}
                                        sizes="64px"
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="w-16 h-16 object-cover"
                                    />
                                </button>
                            )}
                        </li>
                    );
                })}
            </motion.ul>

            <Lightbox
                src={preview?.image}
                alt={preview ? `${stripYear(preview.title)} — award certificate` : ""}
                onClose={() => setPreview(null)}
            />
        </Section>
    );
};

export default Awards;
