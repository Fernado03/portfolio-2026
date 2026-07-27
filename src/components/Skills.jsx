import { motion } from "framer-motion";
import { SKILLS } from "../constants";
import { FADE_IN_VARIANTS, SPRING } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const Skills = () => {
    return (
        <Section id="skills" className="flex items-center">
            <SectionHeader
                index="05"
                eyebrow="Capabilities"
                title="Technical toolkit"
                scale="minor"
            />

            <motion.div
                variants={FADE_IN_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="grid gap-x-10 gap-y-5 md:grid-cols-3"
            >
                {SKILLS.map((skillGroup) => (
                    <div key={skillGroup.category}>
                        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted pb-3 border-b border-line">
                            {skillGroup.category}
                        </h3>
                        <ul className="divide-y divide-line">
                            {skillGroup.items.map((skill) => (
                                <li key={skill} className="font-mono text-sm text-ink py-1">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </motion.div>
        </Section>
    );
};

export default Skills;
