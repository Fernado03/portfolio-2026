import { motion } from "framer-motion";
import { SKILLS } from "../constants";
import { SPRING } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Chip from "./ui/Chip";

const Skills = () => {
    return (
        <Section id="skills" className="flex items-center">
            <SectionHeader eyebrow="Capabilities" title="Technical toolkit" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...SPRING, delay: 0.1 }}
                className="border-y border-line divide-y divide-line"
            >
                {SKILLS.map((skillGroup) => (
                    <div
                        key={skillGroup.category}
                        className="grid md:grid-cols-12 py-6 items-baseline gap-y-4"
                    >
                        <div className="md:col-span-3 flex items-center gap-3">
                            {skillGroup.icon && (
                                <img
                                    {...resizedImage(skillGroup.icon)}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="w-8 h-8 rounded-md border border-line object-cover"
                                />
                            )}
                            <h3 className="font-display font-semibold text-ink">
                                {skillGroup.category}
                            </h3>
                        </div>
                        <div className="md:col-span-9 flex flex-wrap gap-2">
                            {skillGroup.items.map((skill) => (
                                <Chip
                                    key={skill}
                                    className="hover:text-accent hover:border-accent/50 transition-colors"
                                >
                                    {skill}
                                </Chip>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>
        </Section>
    );
};

export default Skills;
