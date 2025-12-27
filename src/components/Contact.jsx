import React from "react";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";

const Contact = () => {
    return (
        <section id="contact" className="min-h-[70vh] flex items-center py-20 relative overflow-hidden">
            {/* Floating Decorations */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[12%] right-[6%] w-12 h-12 border-2 border-transparent rounded-full"
                style={{ borderImage: "linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(59, 130, 246, 0.3)) 1" }}
            />
            <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[20%] left-[10%] w-3 h-3 bg-blue-400/30 dark:bg-blue-500/40 rounded-full"
            />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Connect</span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Open for internship opportunities from March - August 2026. Feel free to reach out!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {/* Email Card */}
                    <a
                        href={`mailto:${HERO_CONTENT.email}`}
                        className="group p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] flex items-center gap-4"
                    >
                        <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-500 dark:text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Email me at</p>
                            <p className="text-slate-900 dark:text-white font-medium group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{HERO_CONTENT.email}</p>
                        </div>
                    </a>

                    {/* LinkedIn Card */}
                    <a
                        href={HERO_CONTENT.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] flex items-center gap-4"
                    >
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Connect on</p>
                            <p className="text-slate-900 dark:text-white font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">LinkedIn</p>
                        </div>
                    </a>

                    {/* GitHub Card */}
                    <a
                        href={HERO_CONTENT.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] flex items-center gap-4"
                    >
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500 dark:text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">View my code on</p>
                            <p className="text-slate-900 dark:text-white font-medium group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">GitHub</p>
                        </div>
                    </a>

                    {/* Phone Card */}
                    <a
                        href={`tel:${HERO_CONTENT.phone}`}
                        className="group p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(34,197,94,0.15)] flex items-center gap-4"
                    >
                        <div className="p-3 bg-green-500/10 rounded-lg text-green-500 dark:text-green-400 group-hover:bg-green-500/20 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Call or WhatsApp</p>
                            <p className="text-slate-900 dark:text-white font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">{HERO_CONTENT.phone}</p>
                        </div>
                    </a>
                </motion.div>

                {/* Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href={HERO_CONTENT.resumeLink}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;

