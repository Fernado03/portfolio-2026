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

    return (
        <Section id="experience" className="min-h-[100dvh] py-20">
            <SectionHeader
                eyebrow="Journey"
                title="Education & experience"
                description="Education, leadership roles, and hands-on experience shaping my path."
            />

            {/* Left-rail editorial list */}
            <div className="border-y border-line divide-y divide-line">
                {timelineItems.map((item, index) => {
                    const isExperience = item.type === "experience";
                    const startYear = item.period.match(/(\d{4})/)?.[0] || "";

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
                            className="grid md:grid-cols-12 gap-6 py-8"
                        >
                            {/* Left rail — sticky year block */}
                            <div className="md:col-span-3">
                                <div className="md:sticky md:top-24">
                                    <div className="font-display text-3xl font-semibold text-ink">
                                        {startYear}
                                    </div>
                                    <div className="font-mono text-xs text-ink-muted mt-1">
                                        {item.period}
                                    </div>
                                    <div
                                        className={`font-mono text-xs uppercase tracking-wider mt-2 ${isExperience ? "text-accent" : "text-ink-muted"
                                            }`}
                                    >
                                        {isExperience ? "Experience" : "Education"}
                                    </div>
                                </div>
                            </div>

                            {/* Right content */}
                            <div className="md:col-span-9">
                                <h3 className="font-display font-semibold text-xl text-ink">
                                    {item.title}
                                </h3>
                                <p className={`text-sm mt-1 ${isExperience ? "text-accent" : "text-ink-muted"}`}>
                                    {item.subtitle}
                                </p>
                                {item.details && (
                                    <p className="text-sm text-ink-muted leading-relaxed mt-3 max-w-[65ch]">
                                        {item.details}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Experience;
