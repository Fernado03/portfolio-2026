import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/theme";
import { OPEN_PALETTE_EVENT } from "../utils/commandPalette";

const iconPaths = {
    home: "M3 10.5L12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5",
    graduation: "M12 4L2 9l10 5 10-5-10-5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v5",
    briefcase: "M4 8h16v11H4V8zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M4 13h16",
    user: "M12 11a4 4 0 100-8 4 4 0 000 8zM4 21c0-3.3 3.6-6 8-6s8 2.7 8 6",
    clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 3",
    bolt: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
    award: "M12 14a5 5 0 100-10 5 5 0 000 10zM9 13l-2 8 5-3 5 3-2-8",
    mail: "M4 6h16v12H4V6zM4 7l8 6 8-6",
    file: "M6 3h8l4 4v14H6V3zM14 3v4h4",
    moon: "M20 13.5A8 8 0 0110.5 4 8 8 0 1020 13.5z",
    sun: "M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
    github: "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
    linkedin: "M6 9v11M6 4v.01M10 20v-6a3 3 0 016 0v6M10 9v11",
};

const CommandIcon = ({ name }) => (
    <svg
        className="w-4 h-4 text-ink-muted shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d={iconPaths[name]} />
    </svg>
);

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const { toggleTheme, isDark } = useTheme();

    const commands = [
        { id: "home", label: "Go to Home", icon: "home", action: () => scrollTo("#"), category: "Navigation" },
        { id: "fyp", label: "Go to FYP Showcase", icon: "graduation", action: () => scrollTo("#fyp"), category: "Navigation" },
        { id: "projects", label: "Go to Projects", icon: "briefcase", action: () => scrollTo("#projects"), category: "Navigation" },
        { id: "about", label: "Go to About", icon: "user", action: () => scrollTo("#about"), category: "Navigation" },
        { id: "experience", label: "Go to Journey", icon: "clock", action: () => scrollTo("#experience"), category: "Navigation" },
        { id: "skills", label: "Go to Skills", icon: "bolt", action: () => scrollTo("#skills"), category: "Navigation" },
        { id: "awards", label: "Go to Awards", icon: "award", action: () => scrollTo("#awards"), category: "Navigation" },
        { id: "contact", label: "Go to Contact", icon: "mail", action: () => scrollTo("#contact"), category: "Navigation" },
        { id: "resume", label: "Download Resume", icon: "file", action: () => window.open("/Fernado_George_DataScience_Intern_Resume.pdf", "_blank"), category: "Actions" },
        { id: "theme", label: `Switch to ${isDark ? "Light" : "Dark"} Mode`, icon: isDark ? "sun" : "moon", action: toggleTheme, category: "Actions" },
        { id: "github", label: "Open GitHub", icon: "github", action: () => window.open("https://github.com/Fernado03", "_blank"), category: "Links" },
        { id: "linkedin", label: "Open LinkedIn", icon: "linkedin", action: () => window.open("https://linkedin.com/in/fernado-george", "_blank"), category: "Links" },
    ];

    const scrollTo = (hash) => {
        if (hash === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const filteredCommands = commands.filter(
        (cmd) =>
            cmd.label.toLowerCase().includes(search.toLowerCase()) ||
            cmd.category.toLowerCase().includes(search.toLowerCase())
    );

    // Resetting here (not in an effect reacting to isOpen) keeps the state change in the
    // event that caused it, so there is no render-then-correct pass.
    const openPalette = () => {
        setSearch("");
        setSelectedIndex(0);
        setIsOpen(true);
    };

    // ⌘K / Ctrl+K shortcut, plus an explicit open request from the navbar trigger.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                openPalette();
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener(OPEN_PALETTE_EVENT, openPalette);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener(OPEN_PALETTE_EVENT, openPalette);
        };
    }, []);

    // Focus the input once the palette is actually mounted.
    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    // Arrow key navigation
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
            e.preventDefault();
            executeCommand(filteredCommands[selectedIndex]);
        }
    };

    const executeCommand = (cmd) => {
        cmd.action();
        setIsOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-[#0c0a09]/60 backdrop-blur-sm z-50"
                        />

                        {/* Command Palette Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
                        >
                            <div className="bg-bg-elev rounded-xl border border-line shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-4 py-4 bg-bg-subtle border-b border-line">
                                    <svg className="w-5 h-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Search commands..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setSelectedIndex(0);
                                        }}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent text-ink placeholder-ink-muted outline-none text-base"
                                    />
                                    <kbd className="px-2 py-1 border border-line rounded font-mono text-xs text-ink-muted">ESC</kbd>
                                </div>

                                {/* Commands List */}
                                <div className="max-h-80 overflow-y-auto py-2">
                                    {filteredCommands.length === 0 ? (
                                        <div className="px-4 py-8 text-center text-ink-muted">
                                            No commands found
                                        </div>
                                    ) : (
                                        filteredCommands.map((cmd, index) => (
                                            <button
                                                key={cmd.id}
                                                onClick={() => executeCommand(cmd)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${index === selectedIndex
                                                    ? "bg-accent-muted text-ink"
                                                    : "text-ink-muted hover:bg-bg-subtle"
                                                    }`}
                                            >
                                                <CommandIcon name={cmd.icon} />
                                                <span className="flex-1 font-medium">{cmd.label}</span>
                                                <span className="font-mono text-xs uppercase text-ink-muted">{cmd.category}</span>
                                            </button>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-line text-xs text-ink-muted">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 border border-line rounded font-mono text-[10px]">↑↓</kbd>
                                            Navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 border border-line rounded font-mono text-[10px]">↵</kbd>
                                            Select
                                        </span>
                                    </div>
                                    <span className="font-mono">Fernado's Portfolio</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CommandPalette;
