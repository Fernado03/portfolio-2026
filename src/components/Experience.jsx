import React from "react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

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

    const getIcon = (type) => {
        if (type === "education") {
            return (
                <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            );
        }
        return (
            <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        );
    };

    return (
        <Section id="experience" className="min-h-[100dvh] py-20">
            <SectionHeader
                eyebrow="Journey"
                title="Education & experience"
                description="Education, leadership roles, and hands-on experience shaping my path."
            />

            {/* Timeline */}
            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 border-l border-line transform md:-translate-x-1/2" />

                {timelineItems.map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
                            className={`relative flex flex-col md:flex-row items-start mb-8 ${isLeft ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot — filled accent for experience, hollow for education */}
                            <div
                                className={`absolute left-4 md:left-1/2 top-6 h-2.5 w-2.5 rounded-full transform -translate-x-1/2 z-10 ${item.type === "experience"
                                        ? "bg-accent"
                                        : "bg-bg border border-line"
                                    }`}
                            />

                            {/* Content Card */}
                            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-8" : "md:ml-8"}`}>
                                <div className="bg-bg-elev border border-line rounded-xl p-6 hover:border-accent/40 transition-colors">
                                    {/* Type label + Period */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted">
                                            {getIcon(item.type)}
                                            {item.type === "education" ? "Education" : "Experience"}
                                        </span>
                                        <span className="font-mono text-xs text-ink-muted">{item.period}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-display font-semibold text-lg text-ink mb-1">
                                        {item.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-sm text-ink-muted">
                                        {item.subtitle}
                                    </p>

                                    {/* Details */}
                                    {item.details && (
                                        <p className="text-sm text-ink-muted leading-relaxed mt-2">
                                            {item.details}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Experience;
