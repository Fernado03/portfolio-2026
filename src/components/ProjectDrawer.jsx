import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "../constants";
import { SPRING } from "../constants/animations";
import { resizedImage } from "../utils/image";
import { GitHubIcon } from "./ui/Icons";
import Chip from "./ui/Chip";
import Button from "./ui/Button";

const HASH_PATTERN = /^#work\/(.+)$/;

const slugFromHash = () => {
    if (typeof window === "undefined") return null;
    const match = window.location.hash.match(HASH_PATTERN);
    return match ? decodeURIComponent(match[1]) : null;
};

const isDesktopViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

const CloseIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DocIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const LockIcon = ({ className = "h-4 w-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

/**
 * Stands in for the cover image on client work whose visuals cannot be published.
 * Mirrors the wording Projects.jsx uses for the same case in its tile grid.
 */
const ConfidentialPanel = ({ note }) => (
    <div className="flex h-full w-full flex-col items-start justify-end gap-2 bg-bg-subtle p-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-muted">
            <LockIcon />
        </span>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted">
            Private client work
        </p>
        <p className="max-w-[34ch] text-xs leading-relaxed text-ink-muted">{note}</p>
    </div>
);

const ProjectMeta = ({ project }) => (
    <>
        <div className="mt-3 mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            {project.role && <span className="text-xs text-ink-muted">{project.role}</span>}
            {project.badge && (
                <span className="rounded-md bg-accent-muted px-1.5 py-0.5 font-mono text-xs text-accent">
                    {project.badge}
                </span>
            )}
        </div>
        <p className="mb-6 text-sm leading-relaxed text-ink-muted">{project.description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
            ))}
        </div>
    </>
);

const ProjectLinks = ({ project }) => (
    <div className="flex flex-wrap items-center gap-3">
        {project.link && (
            <Button variant="secondary" href={project.link} className="text-xs">
                <GitHubIcon className="h-4 w-4" />
                {project.linkText || "GitHub"}
            </Button>
        )}
        {project.documentLink && (
            <Button variant="tertiary" href={project.documentLink} className="text-xs">
                <DocIcon />
                PDF
            </Button>
        )}
        {(project.privateRepo || project.confidential) && (
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <LockIcon />
                Private repo
            </span>
        )}
    </div>
);

/**
 * Case-study drawer. Self-mounted, no props — it resolves the open project
 * straight from window.location.hash ("#work/<slug>"), so Projects.jsx tiles
 * open it by writing the hash directly, with no prop or callback between them.
 */
const ProjectDrawer = () => {
    const [slug, setSlug] = useState(slugFromHash);
    const [isDesktop, setIsDesktop] = useState(isDesktopViewport);
    const panelRef = useRef(null);
    const restoreRef = useRef(null);

    // undefined (slug set, no matching project) collapses to null so "closed"
    // and "unknown slug" are indistinguishable to everything below.
    const project = slug ? (PROJECTS.find((p) => p.slug === slug) ?? null) : null;

    // The lazy state above resolves a cold deep-link; this keeps the drawer in
    // sync with every later navigation (tile clicks, back/forward, hand edits).
    useEffect(() => {
        const onHashChange = () => setSlug(slugFromHash());
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    // Tailwind classes alone can't flip a motion transform axis, so the
    // sheet-vs-panel choice is tracked in state from the md breakpoint.
    useEffect(() => {
        const query = window.matchMedia("(min-width: 768px)");
        const onChange = (event) => setIsDesktop(event.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    // pushState — never location.hash = "" — so the fragment is dropped
    // outright instead of leaving a bare "#", and closing never scroll-jumps.
    // pushState doesn't fire hashchange, hence the explicit setSlug alongside it.
    const handleClose = useCallback(() => {
        history.pushState(null, "", window.location.pathname + window.location.search);
        setSlug(null);
    }, []);

    // Focus trap, activeElement capture/restore, body-scroll lock — same shape
    // as ui/Lightbox.jsx's dialog effect.
    useEffect(() => {
        if (!project) return;

        restoreRef.current = document.activeElement;
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClose();
                return;
            }
            if (event.key !== "Tab") return;

            const focusable = panelRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            restoreRef.current?.focus?.();
        };
    }, [project, handleClose]);

    const axis = isDesktop ? "x" : "y";

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key="drawer-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-50 bg-[#0B0A09]/70 backdrop-blur-sm"
                />
            )}

            {project && (
                <motion.div
                    key="drawer-panel"
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={project.title}
                    initial={{ [axis]: "100%" }}
                    animate={{ [axis]: 0 }}
                    exit={{ [axis]: "100%" }}
                    transition={SPRING}
                    className="fixed left-0 right-0 bottom-0 z-50 flex max-h-[88dvh] flex-col overflow-hidden rounded-t-2xl border-t border-line bg-bg-elev shadow-2xl md:left-auto md:top-0 md:w-full md:max-w-2xl md:max-h-none md:rounded-t-none md:border-t-0 md:border-l"
                >
                    <button
                        type="button"
                        autoFocus
                        onClick={handleClose}
                        aria-label="Close project details"
                        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B0A09] text-[#F5F3EF] transition-transform hover:scale-105 active:scale-95"
                    >
                        <CloseIcon />
                    </button>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-subtle">
                            {project.image ? (
                                <img
                                    {...resizedImage(project.image)}
                                    sizes="(min-width: 768px) 672px, 100vw"
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <ConfidentialPanel note={project.confidentialNote} />
                            )}
                        </div>

                        <div className="px-6 py-6 md:px-8 md:py-8">
                            <p className="font-mono text-xs uppercase tracking-wider text-accent">
                                {project.category}
                            </p>
                            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                                {project.title}
                            </h2>
                            <ProjectMeta project={project} />
                            <ProjectLinks project={project} />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDrawer;
