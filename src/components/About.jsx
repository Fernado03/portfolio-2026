import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import { SPRING } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => window.clearInterval(timer);
    }, [images.length]);

    const current = images[currentIndex];

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    {...resizedImage(current.src)}
                    sizes="(min-width: 1024px) 35vw, 90vw"
                    alt={current.alt}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Passive progress dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10" aria-hidden="true">
                {images.map((image, idx) => (
                    <span
                        key={image.src}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-accent w-4" : "bg-[#fafaf9]/50 w-1.5"}`}
                    />
                ))}
            </div>
        </div>
    );
};

const About = () => {
    return (
        <Section id="about" className="flex items-center">
            <SectionHeader eyebrow="About" title="The short version" />

            <div className="grid md:grid-cols-12 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={SPRING}
                    className="md:col-span-5 relative h-full flex items-center md:justify-end"
                >
                    <div className="relative w-full max-w-sm h-72 md:h-80 lg:h-96 group">
                        {/* Offset backdrop */}
                        <div className="absolute inset-0 bg-bg-subtle rounded-xl border border-line translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
                        <div className="relative rounded-xl overflow-hidden border border-line w-full h-full bg-bg-subtle transition-transform duration-300 group-hover:rotate-1">
                            <Carousel images={ABOUT_CONTENT.profileImages} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
