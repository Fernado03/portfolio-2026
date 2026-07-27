import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import { FADE_IN_VARIANTS, SPRING } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Lightbox from "./ui/Lightbox";

const About = () => {
    const [preview, setPreview] = useState(null);
    const closePreview = useCallback(() => setPreview(null), []);

    return (
        <Section id="about" className="flex items-center">
            <SectionHeader index="03" eyebrow="About" title="The short version" scale="minor" />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={FADE_IN_VARIANTS}
                    transition={SPRING}
                    className="md:col-span-7"
                >
                    <p className="text-ink-muted leading-relaxed max-w-[65ch]">
                        Final-year <span className="text-ink font-medium">Data Science</span> student at{" "}
                        <span className="text-ink font-medium">Universiti Malaysia Sabah</span> (CGPA 3.75),
                        based in Kuching, Sarawak. I started out writing small game mods, which turned into
                        a habit of taking systems apart to see how they decide things — and that is still
                        what I do, now with <span className="text-ink font-medium">retrieval systems</span>{" "}
                        and <span className="text-ink font-medium">computer vision</span>. My thesis
                        benchmarked multimodal emotion models under noise and missing inputs, reaching
                        71.6% F1; my internship work turned a client&apos;s document archive into a
                        queryable assistant and their CCTV feed into structured service records. I write
                        the model and the React front end that puts it in someone&apos;s hands. Off-hours,
                        I fish.
                    </p>

                    {/* Hackathon footnote */}
                    <p className="border-l-2 border-accent pl-4 mt-8 text-sm font-mono text-ink-muted max-w-[65ch]">
                        {ABOUT_CONTENT.hackathons}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={FADE_IN_VARIANTS}
                    transition={SPRING}
                    className="md:col-span-5"
                >
                    {/* Filmstrip: horizontal scroll-snap strip on mobile, 4-col mosaic from md up */}
                    <div className="flex gap-px overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:snap-none">
                        {ABOUT_CONTENT.profileImages.map((image) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setPreview(image)}
                                aria-label={`Enlarge photo: ${image.alt}`}
                                className="relative block w-[60vw] shrink-0 snap-start overflow-hidden bg-bg-subtle md:w-auto md:shrink"
                            >
                                <img
                                    {...resizedImage(image.src)}
                                    sizes="(min-width: 768px) 25vw, 60vw"
                                    alt={image.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[4/5] md:aspect-square w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            <Lightbox src={preview?.src} alt={preview?.alt ?? ""} onClose={closePreview} />
        </Section>
    );
};

export default About;
