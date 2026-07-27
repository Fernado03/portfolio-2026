import { motion } from "framer-motion";
import { SPRING, FADE_IN_VARIANTS } from "../constants/animations";
import { HERO_CONTENT, ABOUT_CONTENT } from "../constants";
import { resizedImage } from "../utils/image";
import Button from "./ui/Button";


// Formal portrait — the owner's face, above the fold. Only 700w/350w variants exist.
const PORTRAIT = ABOUT_CONTENT.profileImages[0];
const PORTRAIT_IMAGE = resizedImage(PORTRAIT.src);

const Hero = () => {
    return (
        // Fixed navbar does not participate in layout; keep its clearance at every breakpoint.
        <section className="min-h-[100dvh] flex items-center relative pt-28">
            <div className="max-w-6xl mx-auto px-6 w-full">
                {/* Mobile portrait — the hero opens on a face; hidden on md+ where the desktop plate lives. */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={SPRING}
                    className="md:hidden mb-6 w-24 aspect-[3/4] overflow-hidden border border-line"
                >
                    <img
                        {...PORTRAIT_IMAGE}
                        sizes="112px"
                        alt={PORTRAIT.alt}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover"
                    />
                </motion.div>

                <div className="grid md:grid-cols-12 gap-10 md:items-center">
                    {/* Content — left aligned */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={FADE_IN_VARIANTS}
                        transition={SPRING}
                        className="md:col-span-7"
                    >
                        {/* Eyebrow */}
                        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
                            {HERO_CONTENT.title}
                        </p>

                        {/* H1 */}
                        <h1 className="text-[clamp(2.5rem,8.5vw,6rem)] font-display font-medium tracking-[-0.03em] leading-[0.94] text-ink mt-5">
                            {HERO_CONTENT.name}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-ink-muted max-w-[46ch] mt-6 leading-relaxed">
                            {HERO_CONTENT.subtitle}
                        </p>

                        {/* Availability chip */}
                        <div className="mt-8">
                            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-bg-subtle px-3 py-1.5 font-mono text-xs text-ink-muted">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                                </span>
                                {HERO_CONTENT.availability}
                            </span>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 mt-10">
                            <Button variant="primary" href={HERO_CONTENT.resumeLink}>
                                Download resume
                            </Button>
                            <Button
                                variant="secondary"
                                href={`mailto:${HERO_CONTENT.email}`}
                            >
                                Get in touch
                            </Button>
                            <Button variant="tertiary" href={HERO_CONTENT.github}>
                                GitHub
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M7 17 17 7" />
                                    <path d="M7 7h10v10" />
                                </svg>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Desktop portrait — one strong editorial plate; the navbar already owns section navigation. */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={FADE_IN_VARIANTS}
                        transition={SPRING}
                        className="hidden aspect-[4/5] w-full max-w-[24rem] justify-self-end overflow-hidden border border-line md:col-span-5 md:block"
                    >
                        <img
                            {...PORTRAIT_IMAGE}
                            sizes="(min-width: 768px) 456px, 0px"
                            alt={PORTRAIT.alt}
                            loading="eager"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* Proof strip — turns the hero's dead vertical space into substance.
                    Every figure is restated in a section further down. */}
                <motion.dl
                    initial="hidden"
                    animate="visible"
                    variants={FADE_IN_VARIANTS}
                    transition={SPRING}
                    className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4"
                >
                    {HERO_CONTENT.proof.map((stat) => (
                        <div key={stat.label}>
                            <dt className="sr-only">{stat.label}</dt>
                            <dd>
                                <span className="block font-display text-2xl font-semibold tracking-tight text-ink">
                                    {stat.value}
                                </span>
                                <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                                    {stat.label}
                                </span>
                            </dd>
                        </div>
                    ))}
                </motion.dl>
            </div>
        </section>
    );
};

export default Hero;
