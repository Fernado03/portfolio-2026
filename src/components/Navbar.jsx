import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/theme";
import { openCommandPalette } from "../utils/commandPalette";
import { SPRING } from "../constants/animations";

const SunIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364 6.364l-1.06-1.06M6.697 6.697L5.636 5.636m12.728 0l-1.06 1.06M6.697 17.303l-1.06 1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
        />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
    </svg>
);

const navLinks = [
    { name: "FYP", href: "#fyp" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Journey", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Awards", href: "#awards" },
    { name: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ids = navLinks.map((link) => link.href.slice(1));
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
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
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setIsMobileMenuOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Skip to content */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-bg-elev focus:border focus:border-line focus:text-ink focus:px-3 focus:py-1.5 focus:rounded"
            >
                Skip to content
            </a>

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed w-full z-40 transition-all duration-300 ${
                    isScrolled
                        ? "bg-bg/85 backdrop-blur-md border-b border-line py-4"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <a href="#main" className="inline-flex min-h-11 items-center font-display text-xl font-semibold text-ink active:text-accent">
                        Fernado<span className="text-accent">.</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm transition-colors active:text-accent ${
                                        isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                                    }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent" />
                                    )}
                                </a>
                            );
                        })}

                        {/* Command palette trigger — the chip used to be decorative only. */}
                        <button
                            type="button"
                            onClick={openCommandPalette}
                            className="border border-line rounded-md px-1.5 py-0.5 font-mono text-xs text-ink-muted hover:text-accent hover:border-accent/50 active:scale-[0.98] transition-colors"
                            aria-label="Open command palette"
                        >
                            ⌘K
                        </button>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-accent active:scale-[0.98] transition-colors rounded-lg"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    {/* Mobile Menu Button + Theme Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="flex h-11 w-11 items-center justify-center text-ink-muted hover:text-accent active:scale-[0.98] transition-colors rounded-lg"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button
                            className="p-2 text-ink-muted hover:text-ink active:scale-[0.98] transition-colors rounded-lg"
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

            {/* Mobile Menu — full-screen sheet */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={SPRING}
                        className="md:hidden fixed inset-0 z-50 bg-bg flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center py-6">
                            <a
                                href="#main"
                                className="font-display text-xl font-semibold text-ink active:text-accent"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Fernado<span className="text-accent">.</span>
                            </a>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-muted hover:text-accent active:scale-[0.98] transition-colors rounded-lg"
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    {isDark ? <SunIcon /> : <MoonIcon />}
                                </button>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-muted hover:text-ink active:scale-[0.98] transition-colors rounded-lg"
                                    aria-label="Close navigation menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <nav className="flex-1 overflow-y-auto px-6" aria-label="Mobile sections">
                            <ul className="flex flex-col divide-y divide-line border-t border-line">
                                {navLinks.map((link, index) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-4 min-h-[44px] py-3 font-display text-2xl text-ink hover:text-accent active:text-accent transition-colors"
                                        >
                                            <span className="font-mono text-[0.6875rem] text-ink-muted">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
