import React from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const Skills = () => {
    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16 text-white"
                >
                    Technical <span className="text-cyan-400">Toolkit</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {SKILLS.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Faded Background Image */}
                            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-40 transition-all duration-700 pointer-events-none transform group-hover:scale-110">
                                <img
                                    src={skillGroup.icon}
                                    alt={`${skillGroup.category} illustration`}
                                    className="w-full h-full object-cover object-bottom filter saturate-0 group-hover:saturate-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
                                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors drop-shadow-lg">
                                    {skillGroup.category}
                                </h3>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {skillGroup.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 rounded-full text-sm font-medium hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
