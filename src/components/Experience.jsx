import { ABOUT_CONTENT, PROJECTS, SKILLS } from "../constants";
import { splitTitle } from "../utils/text";
import { ArrowUpRight } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

function Logo({ src, alt, size = "h-11 w-11" }) {
    return (
        <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5 ${size}`}>
            <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" decoding="async" />
        </span>
    );
}

function Role({ item }) {
    return (
        <>
            {item.role}
            {item.roleEn && <span className="mt-0.5 block text-sm font-normal text-muted">{item.roleEn}</span>}
        </>
    );
}

function FeaturedRole({ item }) {
    const [period, status] = item.period.split(" · ");
    const shipped = (item.projects ?? []).map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(Boolean);

    return (
        <article className="relative overflow-hidden rounded-2xl border border-line bg-surface">
            <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 bg-[radial-gradient(closest-side,rgb(var(--accent)/0.12),transparent)]" />
            <div className="relative p-5 sm:p-7">
                <div className="flex flex-wrap items-start gap-4">
                    <Logo src={item.logo} alt={item.organization} size="h-14 w-14" />
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="font-mono text-xs text-muted">{period}</p>
                            {status && (
                                <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                                    {status}
                                </span>
                            )}
                        </div>
                        <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight">{item.role}</h3>
                        <p className="mt-1 text-sm text-muted">{[item.organization, item.location].filter(Boolean).join(" · ")}</p>
                    </div>
                </div>
                <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink/80">{item.description}</p>
            </div>

            {shipped.length > 0 && (
                <div className="relative border-t border-line">
                    <p className="eyebrow px-5 pt-5 sm:px-7">Built during the internship</p>
                    <ul className="p-2 sm:p-3">
                        {shipped.map((project) => {
                            const { name, aside } = splitTitle(project.title);
                            return (
                                <li key={project.slug}>
                                    <a
                                        href={`#project/${project.slug}`}
                                        className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface-2 sm:px-4"
                                    >
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-medium">
                                                {name}
                                                {aside && <span className="font-normal text-muted"> / {aside}</span>}
                                            </span>
                                            <span className="mt-0.5 block truncate font-mono text-[11px] text-muted">{project.category}</span>
                                        </span>
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                                            <ArrowUpRight width={15} height={15} />
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </article>
    );
}

export default function Experience() {
    const { experience, education } = ABOUT_CONTENT;
    const [lead, ...others] = experience;

    return (
        <Section
            id="experience"
            index="03"
            eyebrow="Experience"
            title="Where the work happened"
            intro="A completed six-month AI/ML internship with two client systems in production, plus two terms on my faculty's student association committee."
        >
            <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                <div>
                    <Reveal>
                        <FeaturedRole item={lead} />
                    </Reveal>

                    <Reveal delay={0.06} className="mt-10">
                        <h3 className="eyebrow">Student leadership</h3>
                        <ol className="mt-6">
                            {others.map((item, i) => (
                                <li key={`${item.role}-${item.period}`} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
                                    <div className="flex flex-col items-center">
                                        <Logo src={item.logo} alt={item.organization ?? item.location} />
                                        {i < others.length - 1 && <span aria-hidden className="my-3 w-px flex-1 bg-line" />}
                                    </div>
                                    <div className={i < others.length - 1 ? "pb-10" : ""}>
                                        <p className="font-mono text-xs text-muted">{item.period}</p>
                                        <h4 className="mt-1.5 font-display text-lg font-semibold tracking-tight">
                                            <Role item={item} />
                                        </h4>
                                        <p className="mt-1 text-sm text-muted">{[item.organization, item.location].filter(Boolean).join(" · ")}</p>
                                        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink/75">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </div>

                <div className="space-y-12">
                    <Reveal delay={0.08}>
                        <h3 className="eyebrow">Education</h3>
                        <ul className="mt-5 space-y-3">
                            {education.map((edu) => (
                                <li key={edu.degree} className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
                                    <Logo src={edu.logo} alt={edu.university} />
                                    <div className="min-w-0">
                                        <p className="font-medium leading-snug">{edu.degree}</p>
                                        <p className="mt-1 text-sm text-muted">
                                            {edu.university} · {edu.year}
                                        </p>
                                        <p className="mt-2 font-mono text-xs text-accent">{edu.details}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal delay={0.12}>
                        <h3 className="eyebrow">Toolkit</h3>
                        <div className="mt-5 space-y-6">
                            {SKILLS.map((group) => (
                                <div key={group.category}>
                                    <p className="mb-2.5 flex items-baseline justify-between text-sm font-medium">
                                        {group.category}
                                        <span className="font-mono text-[11px] font-normal text-muted">{group.items.length}</span>
                                    </p>
                                    <ul className="flex flex-wrap gap-1.5">
                                        {group.items.map((skill) => (
                                            <li key={skill} className="chip">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </Section>
    );
}
