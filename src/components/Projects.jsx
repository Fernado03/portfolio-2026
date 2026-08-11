import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import { CHAPTER_VARIANTS, CHAPTER_T } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

// Status colour from the badge copy — Live/Client = blue, award = ember, else muted.
const statusOf = (badge) => {
    if (!badge) return { label: "Shipped", tone: "text-ink-muted" };
    const b = badge.toLowerCase();
    if (/(live|production|client)/.test(b)) return { label: "Live", tone: "text-accent2" };
    if (/(gold|medal|prize|finalist|winner|award)/.test(b))
        return { label: "Award", tone: "text-accent" };
    return { label: "Built", tone: "text-ink-muted" };
};

const Projects = () => {
    return (
        <Section id="projects">
            <SectionHeader
                index="02"
                eyebrow="Selected work"
                title="Projects"
                description="Client systems and competition builds — two are private client work, described but not shown."
            />

            {/* Appendix ledger — flat ruled rows, no cards. */}
            <motion.nav
                aria-label="Projects"
                variants={CHAPTER_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={CHAPTER_T}
            >
                <ul className="divide-y divide-line border-y border-line">
                    {PROJECTS.map((project, index) => {
                        const idx = `P.${String(index + 1).padStart(2, "0")}`;
                        const status = statusOf(project.badge);
                        return (
                            <li key={project.id}>
                                <a
                                    href={"#work/" + project.slug}
                                    className="group flex w-full flex-col gap-3 py-5 text-left transition-colors duration-200 hover:bg-bg-subtle focus-visible:bg-bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset sm:grid sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 md:py-6"
                                >
                                    {project.image ? (
                                        <img
                                            {...resizedImage(project.image)}
                                            sizes="112px"
                                            alt=""
                                            loading="lazy"
                                            className="block h-[4.5rem] w-28 shrink-0 border border-line object-cover"
                                        />
                                    ) : (
                                        <span aria-hidden="true" className="flex h-[4.5rem] w-28 shrink-0 items-center justify-center border border-line bg-bg-subtle px-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ink-muted">
                                            {project.confidential ? "Private" : "No preview"}
                                        </span>
                                    )}

                                    {/* Title + em-dash + description; tech + badge inline. */}
                                    <span className="flex min-w-0 flex-col gap-2">
                                        <span className="mb-1 font-mono text-[11px] text-ink-muted tabular-nums">
                                            {idx}
                                        </span>
                                        <span className="font-sans text-lg font-semibold text-ink">{project.title}</span>
                                        <span className="text-base leading-7 text-ink-muted">{project.description}</span>
                                        {project.techStack?.length > 0 && (
                                            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                                                {project.techStack.join(" · ")}
                                            </span>
                                        )}
                                        {project.badge && (
                                            <span className={`font-mono text-[11px] uppercase tracking-[0.15em] ${status.tone}`}>
                                                {project.badge}
                                            </span>
                                        )}
                                    </span>

                                    {/* Right column — status mono + chevron. */}
                                    <span className="flex items-center justify-end gap-2">
                                        <span className={`hidden font-mono text-[11px] uppercase tracking-[0.15em] sm:inline ${status.tone}`}>
                                            {status.label}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="font-mono text-ink-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent group-focus-visible:translate-x-1 group-focus-visible:text-accent"
                                        >
                                            →
                                        </span>
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </motion.nav>
        </Section>
    );
};

export default Projects;
