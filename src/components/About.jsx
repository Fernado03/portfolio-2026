import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Fernado - Profile photo"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-4" : "bg-white/40 w-1.5"}`}
                    />
                ))}
            </div>
        </div>
    );
};

const About = () => {
    return (
        <Section id="about" className="min-h-[100dvh] flex items-center py-20">
            <SectionHeader eyebrow="About" title="The short version" />

            {/* Top Section: Intro & Profile */}
            <div className="grid md:grid-cols-12 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="md:col-span-7"
                >
                    <p className="text-ink-muted leading-relaxed max-w-[65ch]">
                        Final-year <span className="text-ink font-medium">Data Science</span> student at{" "}
                        <span className="text-ink font-medium">Universiti Malaysia Sabah</span> (CGPA 3.75),
                        based in Kuching, Sarawak. What started as an addiction to mobile games
                        sparked a childhood dream of becoming a programmer. That curiosity led me to Data Science,
                        where I discovered my passion for <span className="text-ink font-medium">AI</span>,{" "}
                        <span className="text-ink font-medium">machine learning</span>, and the thrill of turning
                        raw data into insights. Now a Gold Medalist, I specialize in{" "}
                        <span className="text-ink font-medium">Generative AI</span> and{" "}
                        <span className="text-ink font-medium">RAG systems</span>, combining data analysis with
                        full-stack engineering (React, Node.js) to build complete, scalable solutions. Currently an{" "}
                        <span className="text-ink font-medium">AI/ML Development Intern</span> at{" "}
                        <span className="text-ink font-medium">Breakfast Byte</span>, shipping client-facing{" "}
                        RAG and computer-vision systems — and equally
                        comfortable building web applications. When I'm not training models or debugging code,
                        you'll probably find me fishing.
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
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
