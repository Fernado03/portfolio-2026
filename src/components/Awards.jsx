import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AWARDS } from "../constants";
import { CHAPTER_VARIANTS, CHAPTER_T } from "../constants/animations";
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
        <Section id="awards">
            <SectionHeader
                index="06"
                eyebrow="Recognition"
                title="Honors & awards"
                description="Thesis, hackathon and academic results — certificates where they exist."
            />

            {(() => {
                const featured = AWARDS.find((award) => award.title.includes("Best Research"));
                const remaining = AWARDS.filter((award) => award !== featured);

                return (
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
                        {featured && (
                            <motion.article
                                variants={CHAPTER_VARIANTS}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-80px" }}
                                transition={CHAPTER_T}
                                className="border-y border-line py-6 sm:py-8"
                            >
                                <div className="grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(15rem,1.2fr)] sm:items-start sm:gap-8">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                                            <span className="text-accent">01</span>
                                            <span>{extractYear(featured.title) || "—"}</span>
                                        </div>
                                        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                                            Thesis — FYP 2026
                                        </p>
                                        <h3 className="mt-2 font-sans text-xl font-semibold leading-tight text-accent sm:text-2xl">
                                            {stripYear(featured.title)}
                                        </h3>
                                    </div>
                                    {featured.image && (
                                        <button
                                            type="button"
                                            onClick={() => setPreview(featured)}
                                            className="block aspect-[4/3] w-full border border-line bg-bg-subtle transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                                            aria-label={`Enlarge ${stripYear(featured.title)} certificate`}
                                        >
                                            <img
                                                {...resizedImage(featured.image)}
                                                sizes="(min-width: 640px) 40vw, 100vw"
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-contain"
                                            />
                                        </button>
                                    )}
                                </div>
                            </motion.article>
                        )}

                        <motion.ul
                            variants={CHAPTER_VARIANTS}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            transition={CHAPTER_T}
                            className="divide-y divide-line border-y border-line"
                        >
                            {remaining.map((award, index) => {
                                const year = extractYear(award.title);
                                const name = stripYear(award.title);

                                return (
                                    <li key={award.title} className={`grid min-w-0 gap-3 py-4 sm:items-center sm:gap-4 ${award.image ? "sm:grid-cols-[2.5rem_minmax(0,1fr)_5rem]" : "sm:grid-cols-[2.5rem_minmax(0,1fr)]"}`}>
                                        <span className="font-mono text-[11px] text-ink-muted tabular-nums">
                                            {String(index + 2).padStart(2, "0")}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block font-sans text-sm font-semibold leading-5 text-ink">
                                                {name}
                                            </span>
                                            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                                                {year || "Recognition"}
                                            </span>
                                        </span>
                                        {award.image && (
                                            <button
                                                type="button"
                                                onClick={() => setPreview(award)}
                                                className="h-12 w-20 justify-self-start border border-line bg-bg-subtle transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:justify-self-end"
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
                                        )}
                                    </li>
                                );
                            })}
                        </motion.ul>
                    </div>
                );
            })()}

            <Lightbox
                src={preview?.image ? resizedImage(preview.image).src : undefined}
                alt={preview ? `${stripYear(preview.title)} — award certificate` : ""}
                onClose={closePreview}
            />
        </Section>
    );
};

export default Awards;
