import { motion } from "framer-motion";
import { CUT, FADE_IN_VARIANTS } from "../constants/animations";
import { ABOUT_CONTENT, HERO_CONTENT } from "../constants";
import { resizedImage } from "../utils/image";
import { GitHubIcon, LinkedInIcon } from "./ui/Icons";
import ParticleField from "./ParticleField";

const isExternal = (href) => /^https?:/i.test(href) || /\.pdf($|\?)/i.test(href);

const CTA_BASE =
    "inline-flex min-h-11 items-center justify-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-200 sm:px-5 sm:py-3 sm:tracking-[0.2em]";
const CTA_PRIMARY = "bg-ink text-bg hover:bg-accent hover:text-black";
const CTA_SECONDARY = "border border-line hover:border-ink text-ink";

const PORTRAIT = ABOUT_CONTENT.profileImages[0];
const PORTRAIT_IMAGE = resizedImage(PORTRAIT.src);

const Hero = () => {
    return (
        <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-10 pt-20 sm:pb-12 sm:pt-24 lg:pb-16 lg:pt-20">
            <ParticleField className="absolute inset-y-0 right-0 hidden h-full w-[36%] opacity-40 lg:block" />

            <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_20rem]">
                    {/* Portrait — decorative, non-clickable; above copy on mobile, right column on lg+ */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={FADE_IN_VARIANTS}
                        transition={CUT}
                        className="pointer-events-none mb-5 w-fit select-none sm:mb-8 lg:order-2 lg:mb-0 lg:justify-self-end lg:w-full"
                    >
                        <div className="relative">
                            <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 border border-line" />
                            <img
                                {...PORTRAIT_IMAGE}
                                sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, 160px"
                                alt={PORTRAIT.alt}
                                className="relative h-20 w-20 border border-line bg-bg-subtle object-cover sm:h-28 sm:w-28 lg:aspect-[4/5] lg:h-auto lg:w-full"
                            />
                        </div>
                    </motion.div>

                <div className="max-w-3xl lg:order-1">
                {/* Recruiter identity — readable before the thesis hook. */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                >
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">{HERO_CONTENT.name}</p>
                    <p className="mt-1 text-lg font-semibold text-ink sm:mt-2">{HERO_CONTENT.title}</p>
                </motion.div>

                {/* Display-serif hook with ember/blue italic accents */}
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                    className="mt-3 font-sans font-extrabold tracking-tight text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-ink sm:mt-5"
                >
                    Can a machine tell you&rsquo;re <em className="text-accent">angry</em> and not just <em className="text-accent2">frustrated</em>?
                </motion.h1>

                {/* Receipts — thesis result, award, shipped systems, particle hook */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                    className="mt-3 max-w-xl leading-7 text-ink-muted sm:mt-5"
                >
                    My thesis reached 71.6% weighted F1 overall — and shows where angry still reads as frustrated. Best Research Award, FYP 2026. I also shipped a client RAG
                    assistant and a CCTV vision pipeline running on real footage.
                </motion.p>
                {/* CTA row — resume solid, LinkedIn/GitHub bordered. */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                    className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3"
                >
                    <a
                        href={HERO_CONTENT.resumeLink}
                        {...(isExternal(HERO_CONTENT.resumeLink) ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                        className={`${CTA_BASE} ${CTA_PRIMARY}`}
                    >
                        Résumé (PDF)
                    </a>
                    <a
                        href={HERO_CONTENT.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${CTA_BASE} ${CTA_SECONDARY}`}
                    >
                        <LinkedInIcon className="h-4 w-4" />
                        LinkedIn ↗
                    </a>
                    <a
                        href={HERO_CONTENT.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${CTA_BASE} ${CTA_SECONDARY}`}
                    >
                        <GitHubIcon className="h-4 w-4" />
                        GitHub ↗
                    </a>
                </motion.div>

                {/* Proof strip — four traceable figures, compact ruled dl */}
                <motion.dl
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                    className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 sm:mt-8 sm:gap-y-4 sm:pt-6 lg:grid-cols-4"
                >
                    {HERO_CONTENT.proof.map(({ value, label }) => (
                        <div key={label}>
                            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted lg:text-[11px]">
                                {label}
                            </dt>
                            <dd className="mt-1 font-sans text-xl font-bold text-ink lg:text-2xl">{value}</dd>
                        </div>
                    ))}
                </motion.dl>


                {/* Availability — pulsing accent2 dot (reduced-motion guard is global) */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                    className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent2 sm:mt-6"
                >
                    <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-accent2" />
                    {HERO_CONTENT.availability}
                </motion.p>

                {/* Scroll cue */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={CUT}
                    className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted sm:mt-8"
                >
                    ▼ Next: thesis evidence
                </motion.p>
            </div>
            </div>
            </div>
        </section>
    );
};

export default Hero;
