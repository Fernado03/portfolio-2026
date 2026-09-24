import Reveal from "./Reveal";

export default function Section({ id, index, eyebrow, title, intro, children, className = "" }) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className={`border-t border-line py-20 sm:py-28 ${className}`}>
            <div className="container-page">
                <Reveal className="mb-10 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
                    <div>
                        <p className="eyebrow">
                            <span className="text-accent">{index}</span>
                            <span className="mx-2 text-line">/</span>
                            {eyebrow}
                        </p>
                        <h2 id={`${id}-title`} className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                            {title}
                        </h2>
                    </div>
                    {intro && <p className="text-pretty leading-relaxed text-muted">{intro}</p>}
                </Reveal>
                {children}
            </div>
        </section>
    );
}
