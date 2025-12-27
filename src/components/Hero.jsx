import React from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 relative">

            <div className="container mx-auto px-6 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6"
                >
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        {HERO_CONTENT.availability}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
                >
                    Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{HERO_CONTENT.name}</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    {HERO_CONTENT.title}
                    <br />
                    <span className="text-gray-500 text-lg mt-2 block">{HERO_CONTENT.subtitle}</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-white text-slate-950 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        View Projects
                    </a>
                    <a
                        href={HERO_CONTENT.resumeLink}
                        className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all hover:scale-105"
                    >
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
