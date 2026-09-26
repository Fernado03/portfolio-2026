import { HERO_CONTENT } from "../constants";
import FusionGraphic from "./FusionGraphic";
import CountUp from "./ui/CountUp";
import { ArrowRight, ArrowUpRight, GitHub, LinkedIn } from "./ui/Icons";

// The headline and lede are the LCP candidates, so they render at full opacity from the first paint
// (Chromium ignores opacity: 0 elements for LCP). Only the supporting pieces rise in, via a CSS
// entrance that starts on first paint instead of waiting for the lazily loaded Motion features;
// reduced-motion users get no entrance at all.
const rise = (ms) => ({ style: { animationDelay: `${ms}ms` } });

export default function Hero() {
    return (
        <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
            <div
                aria-hidden
                className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
            />

            <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                    <p {...rise(0)} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-3 pr-4 text-xs text-muted motion-safe:animate-rise">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inset-0 animate-pulse-brief rounded-full bg-accent opacity-0" />
                            <span className="relative h-2 w-2 rounded-full bg-accent" />
                        </span>
                        {HERO_CONTENT.availabilityShort}
                    </p>

                    <p {...rise(50)} className="eyebrow mt-8 motion-safe:animate-rise">
                        {HERO_CONTENT.shortName} · {HERO_CONTENT.title}
                    </p>

                    <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                        Models that leave the <span className="text-accent">notebook.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                        I&apos;m a data scientist and AI engineer in {HERO_CONTENT.location}. I build retrieval assistants,
                        computer-vision pipelines and the interfaces that put them in people&apos;s hands, then measure
                        whether they hold up outside the lab.
                    </p>

                    <div {...rise(120)} className="mt-9 flex flex-wrap items-center gap-3 motion-safe:animate-rise">
                        <a href="#work" className="btn-primary group">
                            See selected work
                            <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                        <a href={HERO_CONTENT.resumeLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            Resume <ArrowUpRight width={15} height={15} />
                        </a>
                        <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
                        <a
                            href={HERO_CONTENT.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                            aria-label="GitHub"
                        >
                            <GitHub width={20} height={20} />
                        </a>
                        <a
                            href={HERO_CONTENT.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                            aria-label="LinkedIn"
                        >
                            <LinkedIn width={18} height={18} />
                        </a>
                    </div>
                </div>

                <div {...rise(200)} className="motion-safe:animate-rise">
                    <FusionGraphic />
                </div>
            </div>

            <dl
                {...rise(300)}
                className="container-page relative mt-16 grid grid-cols-2 gap-x-6 gap-y-8 motion-safe:animate-rise sm:mt-20 lg:grid-cols-4"
            >
                {HERO_CONTENT.proof.map(({ value, label }) => (
                    <div key={label} className="flex flex-col-reverse justify-end border-t border-line pt-5">
                        <dt className="mt-2 max-w-[16rem] text-sm leading-snug text-muted">{label}</dt>
                        <dd className="font-display text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl">
                            <CountUp value={value} />
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
