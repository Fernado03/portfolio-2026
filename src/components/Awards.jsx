import React from "react";
import { motion } from "framer-motion";
import { AWARDS } from "../constants";

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;

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

const Awards = () => {
    const cleanTitle = (title) => title.replace(EMOJI_RE, "").trim();
    const extractYear = (title) => {
        const match = title.match(/\d{4}/);
        return match ? match[0] : null;
    };
    const stripYear = (title) =>
        title.replace(/\s*[-–]\s*\d{4}/, "").replace(/\s*\d{4}/, "").trim();

    return (
        <section id="awards" className="min-h-[100dvh] flex items-center py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="mb-12 md:mb-16"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                        Recognition
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink mt-3">
                        Honors &amp; awards
                    </h2>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                    className="border-y border-line divide-y divide-line"
                >
                    {AWARDS.map((award, index) => {
                        const cleaned = cleanTitle(award.title);
                        const year = extractYear(cleaned);
                        const name = stripYear(cleaned);

                        return (
                            <div
                                key={index}
                                className="py-5 flex items-center gap-4"
                            >
                                <span className="font-mono text-xs text-ink-muted w-12 shrink-0">
                                    {year || "—"}
                                </span>
                                <TrophyIcon />
                                <span className="text-ink font-medium">
                                    {name}
                                </span>
                                {index === 0 && award.image && (
                                    <img
                                        src={award.image}
                                        alt={name}
                                        loading="lazy"
                                        className="w-16 h-16 rounded-lg object-cover border border-line ml-auto shrink-0"
                                    />
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Awards;
