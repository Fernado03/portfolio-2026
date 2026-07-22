import React from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const Skills = () => {
    return (
        <section id="skills" className="min-h-[100dvh] flex items-center py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="mb-12 md:mb-16"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                        Capabilities
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink mt-3">
                        Technical toolkit
                    </h2>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                    className="border-y border-line divide-y divide-line"
                >
                    {SKILLS.map((skillGroup) => (
                        <div
                            key={skillGroup.category}
                            className="grid md:grid-cols-12 py-6 items-baseline gap-y-4"
                        >
                            <div className="md:col-span-3 flex items-center gap-3">
                                {skillGroup.icon && (
                                    <img
                                        src={skillGroup.icon}
                                        alt={`${skillGroup.category} icon`}
                                        loading="lazy"
                                        className="w-8 h-8 rounded-md border border-line object-cover"
                                    />
                                )}
                                <h3 className="font-display font-semibold text-ink">
                                    {skillGroup.category}
                                </h3>
                            </div>
                            <div className="md:col-span-9 flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-md border border-line px-2 py-0.5 text-xs font-mono text-ink-muted hover:text-accent hover:border-accent/50 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
