import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import { FADE_IN_VARIANTS, SPRING } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import { resizedImage } from "../utils/image";

/**
 * Stands in for the cover image on client work whose visuals cannot be published.
 * Says so plainly instead of shipping a broken or placeholder frame.
 */
const ConfidentialPanel = ({ note }) => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-bg-subtle p-2 sm:items-start sm:justify-end sm:p-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-ink-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        </span>
        {/* The 96px mobile cover slot cannot hold the note legibly; the full
            wording still shows on the tile at sm: and inside the drawer. */}
        <p className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted sm:block">
            Private client work
        </p>
        <p className="hidden max-w-[34ch] text-xs leading-relaxed text-ink-muted sm:block">{note}</p>
    </div>
);

/** Cover slot: the resized project image, or the confidential panel when there is nothing publishable. */
const ProjectCover = ({ project, className }) => {
    if (!project.image) {
        return (
            <div className={className}>
                <ConfidentialPanel note={project.confidentialNote} />
            </div>
        );
    }

    return (
        <div className={className}>
            <img
                {...resizedImage(project.image)}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 133px"
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

const Projects = () => {
    return (
        <Section id="projects" className="flex flex-col justify-center">
            <SectionHeader
                index="02"
                eyebrow="Selected work"
                title="Projects"
                scale="major"
                description="Client systems, competition builds and research tooling — two are private client work, described but not shown."
            />

            <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {PROJECTS.map((project, index) => (
                    <motion.button
                        key={project.id}
                        type="button"
                        onClick={() => {
                            window.location.hash = "#work/" + project.slug;
                        }}
                        variants={FADE_IN_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ ...SPRING, delay: (index % 3) * 0.06 }}
                        className="group flex items-center sm:flex-col sm:items-stretch bg-bg text-left transition-colors duration-300 hover:bg-bg-subtle focus-visible:bg-bg-subtle"
                    >
                        <ProjectCover
                            project={project}
                            className="w-24 shrink-0 aspect-square overflow-hidden bg-bg-subtle sm:w-full sm:aspect-[2/1]"
                        />
                        <div className="flex flex-1 min-w-0 flex-col gap-0.5 p-3 sm:p-4">
                            <p className="font-mono text-xs uppercase tracking-wider text-accent">
                                {project.category}
                            </p>
                            <h3 className="font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-accent">
                                {project.title}
                            </h3>
                            {project.role && (
                                <p className="text-xs text-ink-muted">{project.role}</p>
                            )}
                            {project.badge && (
                                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                                    {project.badge}
                                </p>
                            )}
                        </div>
                    </motion.button>
                ))}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ ...SPRING, delay: 0.06 }}
                    className="hidden bg-bg-subtle sm:flex sm:flex-col sm:items-stretch"
                >
                    <div className="flex w-24 shrink-0 aspect-square items-center justify-center border border-line/60 sm:w-full sm:aspect-[2/1]">
                        <span className="font-display text-4xl text-ink-muted/40">+</span>
                    </div>
                    <div className="flex flex-1 min-w-0 flex-col gap-0.5 p-3 sm:p-4">
                        <p className="font-mono text-xs uppercase tracking-wider text-accent">Next build</p>
                        <h3 className="font-display text-lg font-semibold text-ink">Coming soon</h3>
                        <p className="text-xs text-ink-muted">Another field note is in progress.</p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default Projects;
