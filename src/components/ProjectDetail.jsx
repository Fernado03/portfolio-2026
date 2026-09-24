import { splitTitle } from "../utils/text";
import ProjectVisual from "./ProjectVisual";
import { ArrowUpRight, FileText, GitHub, Lock, Trophy } from "./ui/Icons";

function projectLinks(project) {
    const links = [];
    if (project.link) {
        const isRepo = project.link.includes("github.com");
        links.push({
            href: project.link,
            label: project.linkText ?? (isRepo ? "View code" : "Visit site"),
            icon: isRepo ? GitHub : ArrowUpRight,
        });
    }
    if (project.documentLink) {
        links.push({ href: project.documentLink, label: "Case study (PDF)", icon: FileText });
    }
    return links;
}

export default function ProjectDetail({ project }) {
    const { name, aside } = splitTitle(project.title);
    const links = projectLinks(project);
    const privateNote = project.confidentialNote ?? (project.privateRepo ? "Repository is private." : null);

    return (
        <article>
            <ProjectVisual project={project} live sizes="(min-width: 900px) 896px, 100vw" className="relative aspect-[16/9] border-b border-line" />
            <div className="p-6 sm:p-10">
                <p className="eyebrow">
                    {project.category} <span className="mx-1.5 text-line">·</span> {project.role}
                </p>
                <h2 id="project-dialog-title" className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {name}
                    {aside && <span className="block text-xl font-medium text-muted sm:text-2xl">{aside}</span>}
                </h2>
                {project.badge && (
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm text-accent">
                        <Trophy width={15} height={15} /> {project.badge}
                    </p>
                )}
                <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-ink/85">{project.description}</p>

                <div className="mt-8 grid gap-8 border-t border-line pt-8 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div>
                        <h3 className="eyebrow">Stack</h3>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {project.techStack.map((t) => (
                                <li key={t} className="chip">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {(links.length > 0 || privateNote) && (
                        <div>
                            <h3 className="eyebrow">Links</h3>
                            <div className="mt-3 flex flex-wrap gap-2 sm:flex-col sm:items-start">
                                {links.map(({ href, label, icon: Icon }) => (
                                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-10 px-4">
                                        <Icon width={16} height={16} /> {label}
                                    </a>
                                ))}
                                {privateNote && (
                                    <p className="flex items-center gap-2 py-2 text-sm text-muted">
                                        <Lock width={15} height={15} /> {privateNote}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
