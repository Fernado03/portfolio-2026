import React from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import { FADE_IN_VARIANTS } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Chip from "./ui/Chip";
import Button from "./ui/Button";
import { resizedImage } from "../utils/image";

const spring = { type: "spring", stiffness: 100, damping: 20 };

const ZoomIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
);

const ArrowIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

const DocIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const LockIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const ProjectMeta = ({ project }) => (
    <>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
            {project.role && <span className="text-xs text-ink-muted">{project.role}</span>}
            {project.badge && (
                <span className="bg-accent-muted text-accent rounded-md px-1.5 py-0.5 font-mono text-xs">
                    {project.badge}
                </span>
            )}
        </div>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
            ))}
        </div>
    </>
);

const ProjectLinks = ({ project }) => (
    <div className="mt-auto pt-4 flex flex-wrap items-center gap-3">
        {project.link && (
            <Button variant="secondary" href={project.link} className="text-xs">
                {project.linkText || "GitHub"}
                <ArrowIcon />
            </Button>
        )}
        {project.privateRepo && (
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <LockIcon />
                Private repo
            </span>
        )}
        {project.documentLink && (
            <Button variant="tertiary" href={project.documentLink} className="text-xs">
                <DocIcon />
                PDF
            </Button>
        )}
    </div>
);

const Projects = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [featured, ...rest] = PROJECTS;

    return (
        <Section id="projects" className="min-h-[100dvh] flex flex-col justify-center py-20">
            <SectionHeader eyebrow="Selected work" title="Projects" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature card — full width, image left / content right */}
                {featured && (
                    <motion.article
                        variants={FADE_IN_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={spring}
                        className="md:col-span-2 bg-bg-elev border border-line rounded-xl overflow-hidden hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                        <div className="grid md:grid-cols-2 h-full">
                            <button
                                type="button"
                                onClick={() => setSelectedImage(featured.image)}
                                className="relative block aspect-video md:aspect-auto md:h-full w-full overflow-hidden bg-bg-subtle focus-visible:outline-accent"
                                aria-label={`Enlarge ${featured.title} preview`}
                            >
                                <img
                                    {...resizedImage(featured.image)}
                                    sizes="(min-width: 768px) 45vw, 100vw"
                                    alt={featured.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                />
                                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-bg-elev/90 border border-line">
                                        <ZoomIcon className="w-5 h-5 text-ink" />
                                    </span>
                                </span>
                            </button>
                            <div className="p-6 md:p-8 flex flex-col">
                                <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
                                    {featured.category}
                                </p>
                                <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-3">
                                    {featured.title}
                                </h3>
                                <ProjectMeta project={featured} />
                                <ProjectLinks project={featured} />
                            </div>
                        </div>
                    </motion.article>
                )}

                {/* Remaining projects — 2-col zig-zag rows */}
                {rest.map((project, index) => (
                    <motion.article
                        key={project.id}
                        variants={FADE_IN_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ ...spring, delay: (index % 2) * 0.1 }}
                        className={`bg-bg-elev border border-line rounded-xl overflow-hidden hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col ${
                            index % 4 === 3 ? "md:-translate-y-4" : ""
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedImage(project.image)}
                            className="relative block aspect-video w-full overflow-hidden bg-bg-subtle focus-visible:outline-accent"
                            aria-label={`Enlarge ${project.title} preview`}
                        >
                            <img
                                {...resizedImage(project.image)}
                                sizes="(min-width: 768px) 45vw, 100vw"
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-bg-elev/90 border border-line">
                                    <ZoomIcon className="w-5 h-5 text-ink" />
                                </span>
                            </span>
                        </button>
                        <div className="p-6 flex flex-col flex-grow">
                            <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
                                {project.category}
                            </p>
                            <h3 className="font-display text-xl font-semibold text-ink mb-3">
                                {project.title}
                            </h3>
                            <ProjectMeta project={project} />
                            <ProjectLinks project={project} />
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={spring}
                        className="relative max-w-5xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors focus-visible:outline-accent"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close preview"
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full screen preview"
                            className="w-full h-full object-contain rounded-lg border border-line bg-bg-elev"
                        />
                    </motion.div>
                </div>
            )}
        </Section>
    );
};

export default Projects;
