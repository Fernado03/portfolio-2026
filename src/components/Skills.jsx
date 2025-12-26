import React from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-slate-950">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16 text-white"
                >
                    Technical <span className="text-cyan-400">Toolkit</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {SKILLS.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all hover:bg-slate-900"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-slate-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
