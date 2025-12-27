import React from "react";
import { motion } from "framer-motion";
import { AWARDS } from "../constants";

const Awards = () => {
    return (
        <section id="awards" className="py-20 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16 text-white"
                >
                    Honors & <span className="text-yellow-400">Awards</span>
                </motion.h2>

                <div className="space-y-6">
                    {AWARDS.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                        >
                            <span className="text-3xl mr-6">🏆</span>
                            <span className="text-lg md:text-xl font-medium text-gray-200">{award}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
