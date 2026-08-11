import { motion } from "framer-motion";
import { SKILLS } from "../constants";
import { CHAPTER_VARIANTS, CHAPTER_T } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const Skills = () => (
    <Section id="skills">
        <SectionHeader
            index="05"
            eyebrow="Capability index"
            title="Tools for building evidence"
            description="A compact field index of the languages, model work and production tools behind the research and shipped systems."
        />

        <motion.div
            variants={CHAPTER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={CHAPTER_T}
            className="border-y border-line"
        >
            <div aria-hidden="true" className="flex items-center justify-between border-b border-line py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                <span>Working index</span>
                <span>{String(SKILLS.reduce((total, group) => total + group.items.length, 0)).padStart(2, "0")} entries / {String(SKILLS.length).padStart(2, "0")} fields</span>
            </div>

            <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0" role="list">
                {SKILLS.map((group, groupIndex) => (
                    <li key={group.category} className="relative min-w-0 py-5 md:px-6 md:py-6 first:md:pl-0 last:md:pr-0">
                        <div className="mb-4 flex items-end justify-between gap-4">
                            <div className="min-w-0">
                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                                    Field {String(groupIndex + 1).padStart(2, "0")}
                                </p>
                                <h3 className="mt-1 font-sans text-lg font-semibold leading-tight text-ink">{group.category}</h3>
                            </div>
                            <span aria-hidden="true" className="font-sans text-4xl font-bold leading-none text-line tabular-nums">
                                {String(groupIndex + 1).padStart(2, "0")}
                            </span>
                        </div>

                        <ul className="border-t border-line" role="list">
                            {group.items.map((skill, skillIndex) => (
                                <li key={skill} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2 border-b border-line py-2 last:border-b-0">
                                    <span aria-hidden="true" className="font-mono text-[10px] leading-5 text-ink-muted tabular-nums">
                                        {String(groupIndex + 1).padStart(2, "0")}.{String(skillIndex + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-sans text-sm font-medium leading-5 text-ink">{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </motion.div>
    </Section>
);

export default Skills;
