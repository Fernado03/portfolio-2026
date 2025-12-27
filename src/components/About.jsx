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
                    alt="Profile"
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
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6">

                {/* Top Section: Intro & Profile */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            About <span className="text-blue-500">Me</span>
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {ABOUT_CONTENT.narrative}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-full flex items-center justify-center p-8"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl rotate-6 opacity-30 blur-lg group-hover:rotate-12 transition-transform duration-700" />
                            <div className="relative rounded-2xl overflow-hidden border border-slate-700 w-full h-full shadow-2xl bg-slate-900">
                                <Carousel images={ABOUT_CONTENT.profileImages} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section: Bento Grid Details */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Education Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Education</h3>
                        </div>
                        <div className="space-y-4">
                            {Array.isArray(ABOUT_CONTENT.education) ? (
                                ABOUT_CONTENT.education.map((edu, index) => (
                                    <div key={index} className="border-l-2 border-slate-700 pl-4 py-1">
                                        <p className="text-blue-400 font-bold text-sm">{edu.degree}</p>
                                        <p className="text-gray-400 text-xs mt-1">{edu.university}</p>
                                        <p className="text-gray-500 text-xs mt-0.5">{edu.year}</p>
                                        <p className="text-gray-500 text-xs mt-1 italic">{edu.details}</p>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </motion.div>

                    {/* Experience Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-green-500/30 transition-all hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Experience</h3>
                        </div>
                        <div className="space-y-4">
                            {ABOUT_CONTENT.experience?.map((exp, index) => (
                                <div key={index} className="border-l-2 border-slate-700 pl-4 py-1">
                                    <p className="text-green-400 font-bold text-sm">{exp.role}</p>
                                    <p className="text-gray-300 text-xs font-medium">{exp.organization}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">{exp.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hackathon Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-all hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Hackathons</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {ABOUT_CONTENT.hackathons}
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
