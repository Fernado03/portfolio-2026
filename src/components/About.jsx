import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";

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
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const About = () => {
    return (
        <section id="about" className="min-h-[70vh] flex items-center py-20 relative overflow-hidden">
            {/* Floating Decorations */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] right-[12%] w-10 h-10 border-2 border-blue-400/20 dark:border-blue-400/30"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[10%] left-[8%] w-5 h-5 bg-cyan-400/25 dark:bg-cyan-500/35 rounded-full"
            />

            <div className="container mx-auto px-6">

                {/* Top Section: Intro & Profile */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                            About <span className="text-blue-500">Me</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed text-justify">
                            Final-year <span className="text-blue-500 font-semibold">Data Science</span> student at{" "}
                            <span className="text-blue-500 font-semibold">Universiti Malaysia Sabah</span> (CGPA 3.75),
                            based in <span className="font-medium">Kuching, Sarawak</span>. What started as an addiction to mobile games
                            sparked a childhood dream of becoming a programmer. That curiosity led me to Data Science,
                            where I discovered my passion for <span className="text-cyan-500 font-semibold">AI</span>,{" "}
                            <span className="text-cyan-500 font-semibold">machine learning</span>, and the thrill of turning
                            raw data into insights. Now a <span className="text-yellow-500 font-semibold">Gold Medalist</span>,
                            I specialize in <span className="text-purple-500 font-semibold">Generative AI</span> and{" "}
                            <span className="text-purple-500 font-semibold">RAG systems</span>, combining data analysis with
                            full-stack engineering (React, Node.js) to build complete, scalable solutions. Currently seeking
                            internships in <span className="text-green-500 font-semibold">AI/ML</span> or{" "}
                            <span className="text-green-500 font-semibold">Data Science</span> roles — though I'm equally
                            comfortable building web applications. When I'm not training models or debugging code,
                            you'll probably find me fishing. 🎣
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-full flex items-center justify-end p-8"
                    >
                        <div className="relative w-80 h-72 md:w-96 md:h-80 lg:w-[28rem] lg:h-96 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl rotate-3 opacity-30 blur-lg group-hover:rotate-6 transition-transform duration-700" />
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 w-full h-full shadow-2xl bg-slate-100 dark:bg-slate-900 transition-all duration-500 group-hover:scale-[1.02] group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20">
                                <Carousel images={ABOUT_CONTENT.profileImages} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

