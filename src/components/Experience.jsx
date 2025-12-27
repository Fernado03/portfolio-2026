import React from "react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";

const Experience = () => {
    // Combine education and experience into unified timeline
    const timelineItems = [
        // Education entries (marked as education type)
        ...ABOUT_CONTENT.education.map(edu => ({
            type: "education",
            title: edu.degree,
            subtitle: edu.university,
            period: edu.year,
            details: edu.details,
        })),
        // Experience entries
        ...ABOUT_CONTENT.experience.map(exp => ({
            type: "experience",
            title: exp.role,
            subtitle: exp.organization,
            period: exp.period,
            details: exp.description,
        })),
    ].sort((a, b) => {
        // Sort by start year descending (most recent first)
        const getYear = (period) => parseInt(period.match(/\d{4}/)?.[0] || "0");
        return getYear(b.period) - getYear(a.period);
    });

    const getAccentColor = (type) => {
        return type === "education"
            ? { bg: "bg-blue-500/10", text: "text-blue-500 dark:text-blue-400", border: "border-blue-500", dot: "bg-blue-500" }
            : { bg: "bg-green-500/10", text: "text-green-500 dark:text-green-400", border: "border-green-500", dot: "bg-green-500" };
    };

    const getIcon = (type) => {
        if (type === "education") {
            return (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            );
        }
        return (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        );
    };

    return (
        <section id="experience" className="min-h-[85vh] py-20 relative overflow-hidden">
            {/* Floating Decorations */}
            <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[12%] right-[8%] w-10 h-10 border-2 border-green-400/20 dark:border-green-400/30 rounded-lg rotate-12"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] left-[6%] w-4 h-4 bg-emerald-400/25 dark:bg-emerald-500/35 rounded-full"
            />

            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        My <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Journey</span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Education, leadership roles, and hands-on experience shaping my path.
                    </p>
                </motion.div>

                {/* Hackathon Highlight Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20 rounded-2xl border border-purple-500/20 dark:border-purple-500/30"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <svg className="w-8 h-8 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hackathon Leadership</h3>
                                <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">{ABOUT_CONTENT.hackathons}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 md:ml-auto">
                            <div className="text-center px-4 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-2xl font-bold text-purple-500">4+</p>
                                <p className="text-xs text-slate-500 dark:text-gray-500">Led</p>
                            </div>
                            <div className="text-center px-4 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-2xl font-bold text-yellow-500">🥇</p>
                                <p className="text-xs text-slate-500 dark:text-gray-500">Gold</p>
                            </div>
                            <div className="text-center px-4 py-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                <p className="text-2xl font-bold text-slate-400">🥈</p>
                                <p className="text-xs text-slate-500 dark:text-gray-500">Silver</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-green-500/50 to-emerald-500/50 transform md:-translate-x-1/2" />

                    {timelineItems.map((item, index) => {
                        const colors = getAccentColor(item.type);
                        const isLeft = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-start mb-8 ${isLeft ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className={`absolute left-4 md:left-1/2 w-3 h-3 ${colors.dot} rounded-full border-4 border-slate-50 dark:border-slate-950 transform -translate-x-1/2 z-10 shadow-lg`} />

                                {/* Content Card */}
                                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-8" : "md:ml-8"}`}>
                                    <div className={`p-5 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:${colors.border}/30 transition-all hover:-translate-y-1 group`}>
                                        {/* Type Badge + Period */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded-full`}>
                                                {getIcon(item.type)}
                                                {item.type === "education" ? "Education" : "Leadership"}
                                            </span>
                                            <span className="text-slate-400 dark:text-gray-500 text-xs">{item.period}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`text-lg font-bold text-slate-900 dark:text-white group-hover:${colors.text} transition-colors mb-1`}>
                                            {item.title}
                                        </h3>

                                        {/* Subtitle */}
                                        <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">
                                            {item.subtitle}
                                        </p>

                                        {/* Details */}
                                        {item.details && (
                                            <p className="text-slate-500 dark:text-gray-500 text-xs italic">
                                                {item.details}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
