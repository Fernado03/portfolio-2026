import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/theme";
import { openCommandPalette } from "../utils/commandPalette";

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

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "FYP", href: "#fyp" },
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        { name: "Journey", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Awards", href: "#awards" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            {/* Skip to content */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-accent text-bg px-3 py-1 rounded"
            >
                Skip to content
            </a>

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed w-full z-40 transition-all duration-300 ${
                    isScrolled
                        ? "bg-bg/80 backdrop-blur border-b border-line py-4"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <a href="#" className="font-display text-xl font-semibold text-ink">
                        Fernado<span className="text-accent">.</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm text-ink-muted hover:text-ink transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Command palette trigger — the chip used to be decorative only. */}
                        <button
                            type="button"
                            onClick={openCommandPalette}
                            className="border border-line rounded-md px-1.5 py-0.5 font-mono text-xs text-ink-muted hover:text-accent hover:border-accent/50 transition-colors"
                            aria-label="Open command palette"
                        >
                            ⌘K
                        </button>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-ink-muted hover:text-accent transition-colors rounded-lg"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    {/* Mobile Menu Button + Theme Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-ink-muted hover:text-accent transition-colors rounded-lg"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button
                            className="p-2 text-ink-muted hover:text-ink transition-colors rounded-lg"
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

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-bg border-t border-line mt-4"
                        >
                            <div className="flex flex-col space-y-4 px-6 py-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm text-ink-muted hover:text-ink transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;
