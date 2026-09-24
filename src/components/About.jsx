import { useState } from "react";
import { ABOUT_CONTENT, HERO_CONTENT } from "../constants";
import { resizedImage } from "../utils/image";
import { Expand } from "./ui/Icons";
import Lightbox from "./ui/Lightbox";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

const [portrait, ...moments] = ABOUT_CONTENT.profileImages;
const portraitImg = resizedImage(portrait.src);
// lg collage on a 12-column grid: wide, square, square / square, square, wide.
const SPANS = ["lg:col-span-6", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-6"];
const PHOTOS = moments.map((m) => ({ ...resizedImage(m.src), alt: m.alt, caption: m.alt, label: m.label }));

export default function About() {
    const [photo, setPhoto] = useState(null);
    const [lead, ...rest] = ABOUT_CONTENT.bio;
    const primaryEdu = ABOUT_CONTENT.education[0];

    const facts = [
        { label: "Based in", value: HERO_CONTENT.location },
        { label: "Focus", value: ABOUT_CONTENT.focus },
        { label: "Studying", value: `${primaryEdu.degree}, ${primaryEdu.university}` },
        { label: "Grades", value: primaryEdu.details },
    ];

    return (
        <Section id="about" index="04" eyebrow="About" title="The short version">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <Reveal>
                    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
                        <img
                            src={portraitImg.src}
                            srcSet={portraitImg.srcSet}
                            sizes="(min-width: 1216px) 440px, (min-width: 768px) 40vw, 100vw"
                            alt={portrait.alt}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/5] w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-4 pt-16">
                            <span className="font-display text-lg font-semibold">{HERO_CONTENT.name}</span>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <p className="text-pretty font-display text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">{lead}</p>
                    {rest.map((p) => (
                        <p key={p} className="mt-5 text-pretty text-lg leading-relaxed text-muted">
                            {p}
                        </p>
                    ))}

                    <dl className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
                        {facts.map(({ label, value }) => (
                            <div key={label}>
                                <dt className="eyebrow">{label}</dt>
                                <dd className="mt-1.5 text-[15px] leading-snug">{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-10 rounded-2xl border border-line bg-surface p-5">
                        <p className="eyebrow">Hackathons</p>
                        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink/80">{ABOUT_CONTENT.hackathons}</p>
                    </div>
                </Reveal>
            </div>

            <Reveal className="mt-16">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                    <h3 className="eyebrow">Off the keyboard</h3>
                    <p className="font-mono text-[11px] text-muted">
                        <span className="lg:hidden">Swipe · </span>
                        {PHOTOS.length} photos
                    </p>
                </div>
                {/* Swipeable strip below lg; collage at lg. scroll-padding keeps snapped photos aligned with the text column. */}
                <ul className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-12 lg:grid-rows-[15rem_15rem] lg:overflow-visible lg:px-0 lg:pb-0">
                    {PHOTOS.map((m, i) => (
                        <li key={m.src} className={`w-64 shrink-0 snap-start sm:w-72 lg:w-auto ${SPANS[i % SPANS.length]}`}>
                            <button
                                type="button"
                                onClick={() => setPhoto(i)}
                                className="group relative block h-full w-full overflow-hidden rounded-xl border border-line bg-surface text-left"
                                aria-label={`Enlarge photo: ${m.alt}`}
                            >
                                <img
                                    src={m.src}
                                    srcSet={m.srcSet}
                                    sizes="(min-width: 1024px) 600px, 288px"
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04] lg:aspect-auto lg:h-full"
                                />
                                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg/90 to-transparent px-3 pb-2.5 pt-10 font-mono text-[11px] text-ink/90">
                                    {m.label}
                                    <Expand width={14} height={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </Reveal>

            <Lightbox items={PHOTOS} index={photo} onIndexChange={setPhoto} onClose={() => setPhoto(null)} />
        </Section>
    );
}
