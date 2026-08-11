import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../constants";
import { CHAPTER_VARIANTS, CHAPTER_T } from "../constants/animations";
import { resizedImage } from "../utils/image";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Lightbox from "./ui/Lightbox";

const About = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [preview, setPreview] = useState(null);
    const [canScrollPrevious, setCanScrollPrevious] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const galleryRef = useRef(null);
    const tabRefs = useRef([]);
    const closePreview = useCallback(() => setPreview(null), []);
    const activeImage = ABOUT_CONTENT.profileImages[activeIndex];

    const facts = [
        { label: "Location", value: ABOUT_CONTENT.experience[0]?.location ?? "Malaysia" },
        { label: "Degree", value: ABOUT_CONTENT.education[0]?.degree ?? "" },
        { label: "CGPA", value: ABOUT_CONTENT.education[0]?.details ?? "" },
        { label: "Focus", value: "Retrieval systems · Computer vision" },
    ];

    const updateGalleryControls = useCallback(() => {
        const gallery = galleryRef.current;
        if (!gallery) return;

        const maxScrollLeft = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
        const scrollLeft = Math.max(0, gallery.scrollLeft);
        setCanScrollPrevious(scrollLeft > 1);
        setCanScrollNext(scrollLeft < maxScrollLeft - 1);
    }, []);

    useEffect(() => {
        const gallery = galleryRef.current;
        if (!gallery) return undefined;

        updateGalleryControls();
        gallery.addEventListener("scroll", updateGalleryControls, { passive: true });
        const resizeObserver = new ResizeObserver(updateGalleryControls);
        resizeObserver.observe(gallery);

        return () => {
            gallery.removeEventListener("scroll", updateGalleryControls);
            resizeObserver.disconnect();
        };
    }, [updateGalleryControls]);
    useEffect(() => {
        if (preview || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const interval = window.setInterval(() => {
            if (!document.hidden && window.innerWidth >= 1024) {
                setActiveIndex((index) => (index + 1) % ABOUT_CONTENT.profileImages.length);
            }
        }, 5000);

        return () => window.clearInterval(interval);
    }, [preview]);

    const scrollGallery = (direction) => {
        const gallery = galleryRef.current;
        if (!gallery) return;
        const cardWidth = gallery.firstElementChild?.getBoundingClientRect().width ?? gallery.clientWidth * 0.8;
        gallery.scrollBy({
            left: direction * (cardWidth + 12),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
    };

    const selectTab = (index) => {
        setActiveIndex(index);
        tabRefs.current[index]?.focus();
    };

    const handleTabKeyDown = (event, index) => {
        let nextIndex;
        if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = (index + 1) % ABOUT_CONTENT.profileImages.length;
        if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = (index - 1 + ABOUT_CONTENT.profileImages.length) % ABOUT_CONTENT.profileImages.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = ABOUT_CONTENT.profileImages.length - 1;
        if (nextIndex === undefined) return;
        event.preventDefault();
        selectTab(nextIndex);
    };

    return (
        <Section id="about">
            <SectionHeader index="03" eyebrow="About" title="The short version" />

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
                <div className="min-w-0">
                    <motion.p
                        variants={CHAPTER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        transition={CHAPTER_T}
                        className="max-w-4xl font-sans text-xl font-semibold leading-7 text-ink md:text-2xl md:leading-8"
                    >
                        Final-year <strong className="font-semibold">Data Science</strong> student at{" "}
                        <strong className="font-semibold">Universiti Malaysia Sabah</strong>, based in Kuching, Sarawak.
                    </motion.p>

                    <motion.dl
                        variants={CHAPTER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        transition={CHAPTER_T}
                        className="mt-8 border-t border-line"
                    >
                        {facts.map((fact, index) => (
                            <div key={fact.label} className="grid grid-cols-[1.4rem_5.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-5 lg:grid-cols-[1.8rem_7rem_minmax(0,1fr)]">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">0{index + 1}</span>
                                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{fact.label}</dt>
                                <dd className="min-w-0 break-words font-mono text-xs uppercase leading-5 tracking-[0.12em] text-ink">{fact.value}</dd>
                            </div>
                        ))}
                    </motion.dl>

                    <motion.p
                        variants={CHAPTER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        transition={CHAPTER_T}
                        className="mt-8 max-w-[65ch] text-base leading-7 text-ink-muted"
                    >
                        I started out writing small game mods, which turned into a habit of taking systems apart to see
                        how they decide things — and that is still what I do, now with{" "}
                        <strong className="font-semibold text-ink">retrieval systems</strong> and{" "}
                        <strong className="font-semibold text-ink">computer vision</strong>. My thesis benchmarked
                        multimodal emotion models under noise and missing inputs, reaching 71.6% F1; my internship work
                        turned a client&apos;s document archive into a queryable assistant and their CCTV feed into
                        structured service records. I build the model and the interface that puts it in someone&apos;s hands.
                        Off-hours, I fish.
                    </motion.p>

                </div>

                <motion.div
                    variants={CHAPTER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={CHAPTER_T}
                    className="min-w-0"
                >
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Life outside the model</p>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                                <span className="lg:hidden">Swipe or use arrows · {ABOUT_CONTENT.profileImages.length} photos</span>
                                <span className="hidden lg:inline">Select a chapter · {ABOUT_CONTENT.profileImages.length} photos</span>
                            </p>
                        </div>
                        <div className="flex gap-2 lg:hidden">
                            <button type="button" onClick={() => scrollGallery(-1)} disabled={!canScrollPrevious} aria-disabled={!canScrollPrevious} className="flex h-11 w-11 items-center justify-center border border-line text-ink-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous photographs">←</button>
                            <button type="button" onClick={() => scrollGallery(1)} disabled={!canScrollNext} aria-disabled={!canScrollNext} className="flex h-11 w-11 items-center justify-center border border-line text-ink-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next photographs">→</button>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="grid grid-cols-[minmax(0,1fr)_10rem] gap-4">
                            <button
                                type="button"
                                id="about-photo-panel"
                                role="tabpanel"
                                aria-labelledby={`about-tab-${activeIndex}`}
                                onClick={() => setPreview(activeImage)}
                                className="group relative aspect-[16/10] overflow-hidden border border-line bg-bg-subtle text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                                aria-label={`Enlarge photo: ${activeImage.alt}`}
                            >
                                <img {...resizedImage(activeImage.src)} sizes="(min-width: 1024px) 520px, 82vw" alt={activeImage.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                                <span className="absolute bottom-0 left-0 bg-bg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">{activeImage.label}</span>
                            </button>

                            <div role="tablist" aria-label="Photo chapters" aria-orientation="vertical" className="border-t border-line">
                                {ABOUT_CONTENT.profileImages.map((image, index) => (
                                    <button
                                        key={image.src}
                                        ref={(node) => { tabRefs.current[index] = node; }}
                                        type="button"
                                        id={`about-tab-${index}`}
                                        role="tab"
                                        aria-selected={activeIndex === index}
                                        aria-controls="about-photo-panel"
                                        tabIndex={activeIndex === index ? 0 : -1}
                                        onClick={() => setActiveIndex(index)}
                                        onKeyDown={(event) => handleTabKeyDown(event, index)}
                                        className="grid w-full grid-cols-[2rem_1fr] items-center gap-2 border-b border-line py-3 text-left text-ink-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/50 aria-selected:text-ink"
                                    >
                                        <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                                        <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em]">{image.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-8 gap-2" aria-label="All photo chapters">
                            {ABOUT_CONTENT.profileImages.map((image, index) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    onClick={(event) => {
                                        event.currentTarget.focus();
                                        setActiveIndex(index);
                                        setPreview(image);
                                    }}
                                    aria-label={`Select and enlarge ${image.label}: ${image.alt}`}
                                    aria-current={activeIndex === index ? "true" : undefined}
                                    className="aspect-[4/5] overflow-hidden border border-line bg-bg-subtle opacity-70 transition-[border-color,opacity] hover:border-accent hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 aria-[current=true]:border-accent aria-[current=true]:opacity-100"
                                >
                                    <img {...resizedImage(image.src)} sizes="96px" alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div ref={galleryRef} className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-3 lg:hidden" role="region" aria-label="Personal photographs">
                        {ABOUT_CONTENT.profileImages.map((image) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={(event) => {
                                    event.currentTarget.focus();
                                    setPreview(image);
                                }}
                                aria-label={`Enlarge ${image.label}: ${image.alt}`}
                                className="block w-[82%] shrink-0 snap-start overflow-hidden border border-line bg-bg-subtle text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:w-[44%]"
                            >
                                <img {...resizedImage(image.src)} sizes="(min-width: 640px) 44vw, 82vw" alt={image.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
                                <span className="block border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">{image.label}</span>
                            </button>
                        ))}
                    </div>
                    <motion.div
                        variants={CHAPTER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        transition={CHAPTER_T}
                        className="mt-8 border-y border-accent py-6"
                    >
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Hackathons</p>
                        <p className="mt-3 max-w-[65ch] text-base leading-7 text-ink-muted">{ABOUT_CONTENT.hackathons}</p>
                    </motion.div>
                </motion.div>
            </div>

            <Lightbox src={preview ? resizedImage(preview.src).src : null} alt={preview?.alt ?? ""} onClose={closePreview} />
        </Section>
    );
};

export default About;
