import React from "react";
import { motion } from "framer-motion";
import { AWARDS } from "../constants";

const Awards = () => {
    // Helper to determine award tier and styling
    const getAwardStyle = (award) => {
        const lowerAward = award.toLowerCase();
        if (lowerAward.includes("gold") || lowerAward.includes("1st")) {
            return {
                border: "border-yellow-500/50 dark:border-yellow-400/50",
                glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
                icon: "🥇",
                badge: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
            };
        }
        if (lowerAward.includes("2nd") || lowerAward.includes("silver") || lowerAward.includes("2nd prize")) {
            return {
                border: "border-slate-400/50 dark:border-slate-300/50",
                glow: "shadow-[0_0_20px_rgba(148,163,184,0.15)]",
                icon: "🥈",
                badge: "bg-slate-400/20 text-slate-600 dark:text-slate-300 border-slate-400/30"
            };
        }
        if (lowerAward.includes("3rd") || lowerAward.includes("bronze")) {
            return {
                border: "border-amber-600/50 dark:border-amber-500/50",
                glow: "shadow-[0_0_20px_rgba(217,119,6,0.15)]",
                icon: "🥉",
                badge: "bg-amber-600/20 text-amber-700 dark:text-amber-400 border-amber-600/30"
            };
        }
        if (lowerAward.includes("best") || lowerAward.includes("award")) {
            return {
                border: "border-purple-500/50 dark:border-purple-400/50",
                glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
                icon: "⭐",
                badge: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30"
            };
        }
        return {
            border: "border-cyan-500/50 dark:border-cyan-400/50",
            glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
            icon: "🏆",
            badge: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30"
        };
    };

    // Extract year from award text
    const extractYear = (award) => {
        const match = award.match(/\d{4}/);
        return match ? match[0] : null;
    };

    // Remove year from award name for cleaner display
    const cleanAwardName = (award) => {
        return award.replace(/\s*[-–]\s*\d{4}/, "").replace(/\s*\d{4}/, "").trim();
    };

    return (
        <section id="awards" className="min-h-[50vh] flex items-center py-20 relative overflow-hidden">
            {/* Floating Decorations */}
            <motion.div
                animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[8%] w-8 h-8 border-2 border-yellow-400/25 dark:border-yellow-400/35"
                style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
            />
            <motion.div
                animate={{ y: [0, 12, 0], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] right-[12%] w-4 h-4 bg-amber-400/25 dark:bg-amber-500/35 rounded-full"
            />

            <div className="container mx-auto px-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white"
                >
                    Honors & <span className="text-yellow-500 dark:text-yellow-400">Awards</span>
                </motion.h2>

                <div className="space-y-4">
                    {AWARDS.map((award, index) => {
                        const style = getAwardStyle(award);
                        const year = extractYear(award);
                        const name = cleanAwardName(award);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ x: 8, scale: 1.01 }}
                                className={`flex items-center justify-between p-5 bg-gradient-to-r from-white dark:from-slate-900 to-slate-50 dark:to-slate-800 rounded-xl border-2 ${style.border} transition-all duration-300 hover:${style.glow} cursor-default group`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl group-hover:scale-110 transition-transform">{style.icon}</span>
                                    <span className="text-lg font-medium text-slate-700 dark:text-gray-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                        {name}
                                    </span>
                                </div>
                                {year && (
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${style.badge}`}>
                                        {year}
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Awards;
