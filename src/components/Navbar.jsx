import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/theme";
import { CUT } from "../constants/animations";

const SunIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        />
    </svg>
);

const navLinks = [
    { name: "Thesis", href: "#fyp" },
    { name: "Work", href: "#projects" },
    { name: "Journey", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Awards", href: "#awards" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { isDark, toggleTheme } = useTheme();
    const menuToggleRef = useRef(null);
    const menuRef = useRef(null);
    const menuNavigationRef = useRef(false);

    const closeMenuForNavigation = () => {
        menuNavigationRef.current = true;
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const ids = navLinks.map((link) => link.href.slice(1));
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (sections.length === 0) return;

        let raf = null;
        const pick = () => {
            raf = null;
            const midY = window.innerHeight / 2;
            let best = null;
            let bestDist = Infinity;
            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
                const dist = Math.abs(rect.top + rect.height / 2 - midY);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = section;
                }
            }
            setActiveSection(best ? best.id : "");
        };

        const observer = new IntersectionObserver(pick, { rootMargin: "0px" });
        sections.forEach((section) => observer.observe(section));
        pick();
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(pick);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);
    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 1280px)");
        const closeMenuOnDesktop = (event) => {
            if (event.matches) setIsMobileMenuOpen(false);
        };
        desktopQuery.addEventListener("change", closeMenuOnDesktop);
        return () => desktopQuery.removeEventListener("change", closeMenuOnDesktop);
    }, []);


    useEffect(() => {
        if (!isMobileMenuOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!isMobileMenuOpen) return undefined;
        menuNavigationRef.current = false;
        const previousFocus = document.activeElement;
        const returnFocus = menuToggleRef.current;
        const menu = menuRef.current;
        const focusable = menu?.querySelectorAll('a[href], button:not([disabled])') ?? [];
        focusable[0]?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
                return;
            }
            if (event.key !== "Tab" || focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (!menuNavigationRef.current) {
                (previousFocus?.isConnected ? previousFocus : returnFocus)?.focus();
            }
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Skip to content */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-bg-elev focus:border focus:border-line focus:text-ink focus:px-3 focus:py-1.5 focus:rounded-none"
            >
                Skip to content
            </a>

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={CUT}
                className="fixed w-full h-16 z-40 bg-bg/80 backdrop-blur border-b border-line"
            >
                <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
                    <a
                        href="#main"
                        className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
                    >
                        Fernado George
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center gap-5">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                                        isActive ? "text-accent" : "text-ink-muted hover:text-ink"
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}

                        {/* Résumé */}
                        <a
                            href="/Fernado_George_DataScience_Resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="border border-line rounded-none px-2 py-1 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-accent hover:border-accent transition-colors"
                        >
                            Résumé
                        </a>


                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="flex h-11 w-11 items-center justify-center border border-line rounded-none text-ink-muted hover:text-accent hover:border-accent active:scale-[0.98] transition-colors"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    {/* Mobile Menu Button + Theme Toggle */}
                    <div className="xl:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="flex h-11 w-11 items-center justify-center border border-line rounded-none text-ink-muted hover:text-accent hover:border-accent active:scale-[0.98] transition-colors"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button
                            ref={menuToggleRef}
                            className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-ink active:scale-[0.98] transition-colors rounded-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

            </motion.nav>

            {/* Mobile Menu — flat panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div
                        ref={menuRef}
                        className="xl:hidden fixed inset-0 z-50 bg-bg flex flex-col border-b border-line"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center py-6 border-b border-line">
                            <a
                                href="#main"
                                className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
                                onClick={closeMenuForNavigation}
                            >
                                Fernado George
                            </a>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center border border-line rounded-none text-ink-muted hover:text-accent hover:border-accent active:scale-[0.98] transition-colors"
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    {isDark ? <SunIcon /> : <MoonIcon />}
                                </button>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-muted hover:text-ink active:scale-[0.98] transition-colors rounded-none"
                                    aria-label="Close navigation menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <nav className="flex-1 overflow-y-auto px-6" aria-label="Mobile sections">
                            <ul className="flex flex-col divide-y divide-line border-b border-line">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={closeMenuForNavigation}
                                            className="flex items-center min-h-[56px] py-4 font-mono text-xl uppercase tracking-[0.08em] text-ink hover:text-accent active:text-accent transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href="/Fernado_George_DataScience_Resume.pdf"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={closeMenuForNavigation}
                                        className="flex items-center min-h-[56px] py-4 font-mono text-xl uppercase tracking-[0.08em] text-accent hover:text-accent active:text-accent transition-colors"
                                    >
                                        Résumé
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <p className="px-6 py-5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted border-t border-line">
                            FERNADO GEORGE — MMXXVI
                        </p>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
