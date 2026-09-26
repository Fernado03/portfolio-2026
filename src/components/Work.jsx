import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { PROJECT_FILTERS, PROJECTS } from "../constants";
import { splitTitle } from "../utils/text";
import ProjectDetail from "./ProjectDetail";
import ProjectVisual from "./ProjectVisual";
import Dialog from "./ui/Dialog";
import { ArrowRight, ArrowUpRight, Trophy } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

const HASH = /^#project\/([\w-]+)$/;
const slugFromHash = () => {
    const slug = window.location.hash.match(HASH)?.[1];
    return PROJECTS.some((p) => p.slug === slug) ? slug : null;
};
const cx = (...parts) => parts.filter(Boolean).join(" ");

// Keep chips to one row: take stack items until the character budget is spent.
function fitChips(stack, budget) {
    const out = [];
    let used = 0;
    for (const item of stack) {
        if (out.length && used + item.length > budget) break;
        out.push(item);
        used += item.length + 4;
    }
    return out;
}

// object-fit per breakpoint: wide boxes letterbox the whole cover (over a blur), others crop.
function fitClasses(featured, wideMd, wideLg) {
    if (featured || (wideMd && wideLg)) return "object-cover object-top md:object-contain md:object-center";
    if (wideMd) return "object-cover object-left-top md:object-contain md:object-center lg:object-cover lg:object-top";
    if (wideLg) return "object-cover object-left-top md:object-top lg:object-contain lg:object-center";
    // Narrow mobile thumbnails anchor left, where cover slides put their titles.
    return "object-cover object-left-top md:object-top";
}

// The spotlight follows the pointer with a transform written straight to the element: no React
// re-render, no repaint, just compositing.
const trackSpotlight = (e, spot) => {
    if (!spot) return;
    const r = e.currentTarget.getBoundingClientRect();
    spot.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
};

// Bento placement for the unfiltered grid: the first project spans two columns, and the last one
// widens to close any gap left in the final row.
function placement(index, count, bento) {
    if (!bento) return { featured: false, wideMd: false, lgSpan: 1 };
    if (index === 0) return { featured: true, wideMd: false, lgSpan: 2 };
    const last = index === count - 1;
    const rest = (count - 2) % 3;
    return {
        featured: false,
        wideMd: last && (count - 1) % 2 === 1,
        lgSpan: last && rest ? 4 - rest : 1,
    };
}

function ProjectCard({ project, featured, wideMd, wideLg, onOpen }) {
    const spot = useRef(null);
    const { name, aside } = splitTitle(project.title);
    const wide = featured || wideMd || wideLg;
    const chips = fitChips(project.techStack, featured ? 64 : 24);
    const extra = project.techStack.length - chips.length;

    return (
        <article
            onPointerMove={(e) => trackSpotlight(e, spot.current)}
            className={cx(
                "group relative flex h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-muted/40",
                featured ? "flex-col md:flex-row lg:flex-col" : "flex-row",
                !featured && (wideMd ? "md:flex-row" : "md:flex-col"),
                !featured && (wideLg ? "lg:flex-row" : "lg:flex-col"),
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
                <div
                    ref={spot}
                    className="absolute -left-[234px] -top-[234px] h-[468px] w-[468px] bg-[radial-gradient(closest-side,rgb(var(--accent)/0.09),transparent)] group-hover:will-change-transform"
                />
            </div>
            <div
                className={cx(
                    "relative shrink-0",
                featured
                        ? "aspect-[16/10] w-full md:aspect-auto md:min-h-[20rem] md:w-[55%] lg:min-h-[14rem] lg:w-full lg:flex-1"
                        : "w-[36%] self-stretch",
                    !featured && (wideMd ? "md:w-1/2 md:min-h-[18rem]" : "md:aspect-[16/10] md:w-full md:self-auto"),
                    !featured && (wideLg ? "lg:aspect-auto lg:w-1/2 lg:self-stretch" : "lg:aspect-[16/10] lg:min-h-0 lg:w-full lg:self-auto"),
                )}
            >
                <ProjectVisual
                    project={project}
                    backdrop={wide}
                    fitClass={fitClasses(featured, wideMd, wideLg)}
                    sizes={featured ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 40vw"}
                    className="absolute inset-0"
                />
                <span className="chip absolute left-3 top-3 hidden bg-bg/90 text-ink md:inline-flex">{project.category}</span>
                {featured && (
                    <span className="absolute right-3 top-3 hidden rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-bg md:inline-flex">
                        Featured
                    </span>
                )}
            </div>

            <div className={cx("flex min-w-0 flex-1 flex-col p-4 md:p-6", featured && "p-5 lg:flex-none")}>
                {project.badge && (
                    <p className="flex items-center gap-1.5 text-[11px] font-medium text-accent md:text-xs">
                        <Trophy width={13} height={13} className="shrink-0" />
                        <span className="truncate">{project.badge}</span>
                    </p>
                )}
                <h3 className={cx("mt-2 font-display font-semibold tracking-tight md:mt-3", featured ? "text-2xl lg:text-[1.75rem]" : "text-lg leading-snug md:text-xl")}>
                    {/* Stretched button makes the whole card the click target. */}
                    <button
                        type="button"
                        onClick={onOpen}
                        className="text-left after:absolute after:inset-0 after:z-20 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-accent"
                    >
                        {name}
                        {aside && <span className="text-muted"> / {aside}</span>}
                    </button>
                </h3>
                <p className="mt-1 truncate text-xs text-muted md:text-sm">{project.role}</p>
                <p
                    className={cx(
                        "mt-3 text-pretty leading-relaxed text-ink/75",
                        featured ? "line-clamp-3 text-[15px] lg:line-clamp-2" : "line-clamp-2 text-sm md:line-clamp-3 md:text-[15px]",
                    )}
                >
                    {project.description}
                </p>
                <div className="mt-auto hidden items-end justify-between gap-4 pt-5 md:flex">
                    <ul className="flex min-w-0 flex-wrap gap-1.5 overflow-hidden">
                        {chips.map((t) => (
                            <li key={t} className="chip">
                                {t}
                            </li>
                        ))}
                        {extra > 0 && <li className="chip">+{extra}</li>}
                    </ul>
                    <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
                    >
                        <ArrowUpRight width={16} height={16} />
                    </span>
                </div>
            </div>
        </article>
    );
}

export default function Work() {
    const [filter, setFilter] = useState("all");
    // Closed in the pre-rendered HTML; a #project/<slug> link opens the dialog once the page hydrates.
    const [openSlug, setOpenSlug] = useState(null);

    // Deep links: #project/<slug> opens that project (shareable, and used by the Experience section).
    useEffect(() => {
        const onHash = () => {
            const slug = slugFromHash();
            if (slug) setOpenSlug(slug);
        };
        onHash();
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.tags?.includes(filter));
    const bento = filter === "all" && visible.length >= 5;
    const navList = visible.some((p) => p.slug === openSlug) ? visible : PROJECTS;
    const openIndex = navList.findIndex((p) => p.slug === openSlug);
    const current = navList[openIndex];

    const show = (slug) => {
        setOpenSlug(slug);
        window.history.replaceState(null, "", `#project/${slug}`);
    };
    const close = () => {
        setOpenSlug(null);
        if (HASH.test(window.location.hash)) window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    const step = (delta) => show(navList[(openIndex + delta + navList.length) % navList.length].slug);

    const counts = Object.fromEntries(PROJECT_FILTERS.map((f) => [f.id, PROJECTS.filter((p) => p.tags?.includes(f.id)).length]));
    const filters = [{ id: "all", label: "All work", count: PROJECTS.length }, ...PROJECT_FILTERS.map((f) => ({ ...f, count: counts[f.id] }))];

    return (
        <Section
            id="work"
            index="01"
            eyebrow="Selected work"
            title="Things I've built and shipped"
            intro={`${PROJECTS.length} builds across retrieval, computer vision, forecasting and social-impact products, including two client systems running in production.`}
        >
            <Reveal>
                <div role="group" aria-label="Filter projects" className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                    {filters.map(({ id, label, count }) => (
                        <button
                            key={id}
                            type="button"
                            aria-pressed={filter === id}
                            aria-label={`${label} (${count})`}
                            onClick={() => setFilter(id)}
                            className={cx(
                                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                                filter === id ? "border-accent bg-accent text-bg" : "border-line text-muted hover:border-muted/60 hover:text-ink",
                            )}
                        >
                            {label}
                            <span className={cx("font-mono text-[11px]", filter === id ? "text-bg/70" : "text-muted/70")}>{count}</span>
                        </button>
                    ))}
                </div>

                <m.ul layout className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((project, i) => {
                            const { featured, wideMd, lgSpan } = placement(i, visible.length, bento);
                            return (
                                <m.li
                                    key={project.slug}
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                                    className={cx(
                                        featured && "md:col-span-2",
                                        wideMd && "md:col-span-2",
                                        lgSpan === 1 && wideMd && "lg:col-span-1",
                                        lgSpan === 2 && !featured && "lg:col-span-2",
                                        lgSpan === 3 && "lg:col-span-3",
                                    )}
                                >
                                    <ProjectCard
                                        project={project}
                                        featured={featured}
                                        wideMd={wideMd}
                                        wideLg={!featured && lgSpan > 1}
                                        onOpen={() => show(project.slug)}
                                    />
                                </m.li>
                            );
                        })}
                    </AnimatePresence>
                </m.ul>

                <p className="mt-6 hidden items-center gap-2 font-mono text-[11px] text-muted md:flex">
                    <ArrowRight width={14} height={14} /> Open any project for the full write-up · ← → to browse
                </p>
            </Reveal>

            <Dialog
                open={Boolean(current)}
                onClose={close}
                labelledBy="project-dialog-title"
                onPrev={navList.length > 1 ? () => step(-1) : undefined}
                onNext={navList.length > 1 ? () => step(1) : undefined}
                counter={current ? `${openIndex + 1} / ${navList.length}` : null}
                scrollKey={openSlug}
            >
                {current && <ProjectDetail key={current.slug} project={current} />}
            </Dialog>
        </Section>
    );
}
