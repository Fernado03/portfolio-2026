import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import { FADE_IN_VARIANTS, SPRING } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const startYearOf = (period) => period.match(/(\d{4})/)?.[0] || "";

const timelineItems = [
    ...ABOUT_CONTENT.education.map((edu) => ({
        id: `edu-${edu.degree}`,
        type: "education",
        title: edu.degree,
        subtitle: edu.university,
        location: null,
        period: edu.year,
        details: edu.details,
        logo: edu.logo,
    })),
    ...ABOUT_CONTENT.experience.map((exp) => ({
        id: `exp-${exp.role}-${exp.period}`,
        type: "experience",
        title: exp.role,
        subtitle: exp.organization,
        location: exp.location,
        period: exp.period,
        details: exp.description,
        logo: exp.logo,
    })),
].sort((a, b) => Number(startYearOf(b.period)) - Number(startYearOf(a.period)));

const Experience = () => {
    return (
        <Section id="experience">
            <SectionHeader
                index="04"
                eyebrow="Journey"
                title="Education & experience"
                description="Where the work happened — degree, faculty association terms, and the internship shipping client systems."
                scale="minor"
            />

            {/* Left-rail editorial list */}
            <div className="border-y border-line divide-y divide-line">
                {timelineItems.map((item, index) => {
                    const isExperience = item.type === "experience";

                    return (
                        <motion.div
                            key={item.id}
                            variants={FADE_IN_VARIANTS}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ ...SPRING, delay: index * 0.05 }}
                            className="grid md:grid-cols-12 gap-2 py-2.5 md:gap-4 md:py-3"
                        >
                            {/* Left rail — sticky year block */}
                            <div className="md:col-span-3 md:border-r md:border-line md:pr-6">
                                <div className="md:sticky md:top-24">
                                    <div className="font-display text-2xl font-semibold text-ink">
                                        {startYearOf(item.period)}
                                    </div>
                                    <div className="font-mono text-xs text-ink-muted mt-1">
                                        {item.period}
                                    </div>
                                    <div
                                        className={`font-mono text-xs uppercase tracking-wider mt-2 ${isExperience ? "text-accent" : "text-ink-muted"}`}
                                    >
                                        {isExperience ? "Experience" : "Education"}
                                    </div>
                                </div>
                            </div>

                            {/* Right content */}
                            <div className="md:col-span-9">
                                <div className="flex items-start gap-4">
                                    {item.logo && (
                                        <div className="shrink-0 w-12 h-12 rounded-lg border border-line bg-bg-subtle flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.logo}
                                                alt={`${item.subtitle} logo`}
                                                width={32}
                                                height={32}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-8 h-8 object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h3 className="font-display font-semibold text-xl text-ink">
                                            {item.title}
                                        </h3>
                                        <p className={`text-sm mt-1 ${isExperience ? "text-accent" : "text-ink-muted"}`}>
                                            {item.subtitle}
                                        </p>
                                        {item.location && (
                                            <p className="font-mono text-xs text-ink-muted mt-1">
                                                {item.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
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
