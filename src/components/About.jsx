import React from "react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";

const About = () => {
    return (
        <section id="about" className="py-20 bg-slate-950 relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-blue-600/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            About <span className="text-blue-500">Me</span>
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            {ABOUT_CONTENT.narrative}
                        </p>

                        <div className="space-y-6">
                            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">Education</h3>
                                <div className="space-y-4">
                                    {Array.isArray(ABOUT_CONTENT.education) ? (
                                        ABOUT_CONTENT.education.map((edu, index) => (
                                            <div key={index} className="border-l-2 border-slate-700 pl-4 py-1">
                                                <p className="text-blue-400 font-medium">{edu.degree}</p>
                                                <div className="flex justify-between items-center mt-1">
                                                    <p className="text-gray-400 text-sm">{edu.university}</p>
                                                    <p className="text-gray-500 text-xs">{edu.year}</p>
                                                </div>
                                                <p className="text-gray-500 text-sm mt-1">{edu.details}</p>
                                            </div>
                                        ))
                                    ) : (
                                        /* Fallback for single object structure if needed during transition */
                                        <div>
                                            <p className="text-blue-400">{ABOUT_CONTENT.education.degree}</p>
                                            <p className="text-gray-400 text-sm mt-1">{ABOUT_CONTENT.education.university}</p>
                                            <p className="text-gray-500 text-sm mt-2 font-medium">{ABOUT_CONTENT.education.details}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Experience Section */}
                            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-4">Leadership Experience</h3>
                                <div className="space-y-4">
                                    {ABOUT_CONTENT.experience?.map((exp, index) => (
                                        <div key={index} className="border-l-2 border-slate-700 pl-4 py-1">
                                            <p className="text-green-400 font-medium">{exp.role}</p>
                                            <p className="text-gray-300 text-sm font-medium">{exp.organization}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-gray-500 text-xs">{exp.period}</p>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-1">Hackathon Experience</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {ABOUT_CONTENT.hackathons}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-full flex items-center justify-center p-8"
                    >
                        <div className="relative w-full aspect-square max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl rotate-6 opacity-30 blur-lg" />
                            <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-square">
                                <img
                                    src={ABOUT_CONTENT.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
