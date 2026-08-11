import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import { CHAPTER_VARIANTS, CHAPTER_T } from "../constants/animations";
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
            />

            {/* Ledger rows — period | role, hard rules, no cards. */}
            <motion.ul
                variants={CHAPTER_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={CHAPTER_T}
                className="divide-y divide-line border-y border-line"
                role="list"
            >
                {timelineItems.map((item) => {
                    const isCurrent = item.period.includes("Present");
                    return (
                        <li key={item.id} className="grid gap-4 py-5 md:py-6 sm:grid-cols-[9rem_3.5rem_minmax(0,1fr)] sm:gap-6">
                            <div className="flex items-baseline justify-between gap-3 sm:block sm:space-y-1">
                                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                                    {item.period}
                                </p>
                                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                                    {item.type === "experience" ? "Experience" : "Education"}
                                </p>
                            </div>

                            <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 sm:contents">
                                {item.logo ? (
                                    <img
                                        src={item.logo}
                                        alt={`${item.subtitle} logo`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-14 w-14 border border-line bg-bg-elev object-contain p-1.5"
                                    />
                                ) : (
                                    <span aria-hidden="true" className="h-14 w-14 border border-line bg-bg-subtle" />
                                )}

                                <div className="min-w-0">
                                    <h3 className="font-sans font-semibold text-ink">
                                        {isCurrent && <span className="text-accent2">▪ </span>}
                                        {item.title}
                                    </h3>
                                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                                        {item.subtitle}
                                        {item.location && (
                                            <span className="text-ink-muted"> — {item.location}</span>
                                        )}
                                    </p>
                                    {item.details && (
                                        <p className="mt-2.5 max-w-[65ch] text-base leading-7 text-ink-muted">
                                            {item.details}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </motion.ul>
        </Section>
    );
};

export default Experience;
