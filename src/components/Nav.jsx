import { useEffect, useState } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import useActiveSection from "../hooks/useActiveSection";
import { ArrowUpRight, Close, Menu } from "./ui/Icons";

const LINKS = [
    { id: "work", label: "Work" },
    { id: "research", label: "Research" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
];
// Sections without a nav link are still observed so the highlight clears over them.
const OBSERVED = ["top", "work", "research", "experience", "about", "recognition", "contact"];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const active = useActiveSection(OBSERVED);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return undefined;
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, [menuOpen]);

    const solid = scrolled || menuOpen;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
                solid ? "border-line bg-bg/95" : "border-transparent"
            }`}
        >
            <m.div aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent" style={{ scaleX: progress }} />
            <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6">
                <a href="#top" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-bg transition-transform group-hover:-rotate-6">
                        FG
                    </span>
                    <span className="font-display text-[15px] font-semibold tracking-tight">{HERO_CONTENT.shortName}</span>
                </a>

                <ul className="hidden items-center gap-1 md:flex">
                    {LINKS.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                aria-current={active === id ? "true" : undefined}
                                className={`relative isolate rounded-full px-3.5 py-2 text-sm transition-colors ${
                                    active === id ? "text-ink" : "text-muted hover:text-ink"
                                }`}
                            >
                                {active === id && (
                                    <span aria-hidden className="absolute inset-0 -z-10 rounded-full border border-line bg-surface" />
                                )}
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <a
                        href={HERO_CONTENT.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost hidden min-h-9 px-4 sm:inline-flex"
                    >
                        Resume <ArrowUpRight width={15} height={15} />
                    </a>
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen((o) => !o)}
                    >
                        {menuOpen ? <Close /> : <Menu />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div id="mobile-menu" className="container-page border-t border-line pb-6 pt-2 md:hidden">
                    <ul>
                        {LINKS.map(({ id, label }, i) => (
                            <li key={id} className="border-b border-line/60">
                                <a
                                    href={`#${id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-baseline gap-4 py-4 font-display text-2xl font-semibold"
                                >
                                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a
                        href={HERO_CONTENT.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-6 w-full"
                    >
                        Download resume <ArrowUpRight width={15} height={15} />
                    </a>
                </div>
            )}
        </header>
    );
}
