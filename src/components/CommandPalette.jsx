import { useState, useEffect, useId, useRef } from "react";
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

const CommandIcon = ({ name, className = "w-4 h-4 text-ink-muted shrink-0" }) => (
    <svg
        className={className}
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
    const panelRef = useRef(null);
    const inputRef = useRef(null);
    const selectedOptionRef = useRef(null);
    const restoreFocusRef = useRef(null);
    const paletteId = useId();
    const titleId = `${paletteId}-title`;
    const listboxId = `${paletteId}-listbox`;
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
        { id: "resume", label: "Download Resume", icon: "file", action: () => window.open("/Fernado_George_DataScience_Resume.pdf", "_blank"), category: "Actions" },
        { id: "theme", label: `Switch to ${isDark ? "Light" : "Dark"} Mode`, icon: isDark ? "sun" : "moon", action: toggleTheme, category: "Actions" },
        { id: "github", label: "Open GitHub", icon: "github", action: () => window.open("https://github.com/Fernado03", "_blank"), category: "Links" },
        { id: "linkedin", label: "Open LinkedIn", icon: "linkedin", action: () => window.open("https://linkedin.com/in/fernado-george", "_blank"), category: "Links" },
    ];

    const scrollTo = (hash) => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        if (hash === "#") {
            window.scrollTo({ top: 0, behavior });
        } else {
            document.querySelector(hash)?.scrollIntoView({ behavior });
        }
    };

    const filteredCommands = commands.filter(
        (cmd) =>
            cmd.label.toLowerCase().includes(search.toLowerCase()) ||
            cmd.category.toLowerCase().includes(search.toLowerCase())
    );
    const activeIndex = filteredCommands.length
        ? Math.min(selectedIndex, filteredCommands.length - 1)
        : 0;
    const activeCommand = filteredCommands[activeIndex];
    const activeCommandId = activeCommand?.id ?? null;

    const closePalette = () => setIsOpen(false);

    const openPalette = () => {
        if (document.querySelector('[aria-modal="true"]')) return;

        restoreFocusRef.current = document.activeElement;
        setSearch("");
        setSelectedIndex(0);
        setIsOpen(true);
    };

    // ⌘K / Ctrl+K shortcut, plus an explicit open request from the navbar trigger.
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                openPalette();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener(OPEN_PALETTE_EVENT, openPalette);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener(OPEN_PALETTE_EVENT, openPalette);
        };
    }, []);

    useEffect(() => {
        if (!isOpen) return undefined;

        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        inputRef.current?.focus();

        const handleModalKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closePalette();
                return;
            }
            if (event.key !== "Tab") return;

            const focusable = panelRef.current?.querySelectorAll(
                'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable?.length) {
                event.preventDefault();
                panelRef.current?.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement;
            if (!panelRef.current?.contains(active)) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            } else if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            } else if (active !== first && active !== last) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            }
        };

        window.addEventListener("keydown", handleModalKeyDown);
        return () => {
            window.removeEventListener("keydown", handleModalKeyDown);
            document.body.style.overflow = overflow;

            const opener = restoreFocusRef.current;
            restoreFocusRef.current = null;
            if (opener?.isConnected) opener.focus?.({ preventScroll: true });
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !activeCommandId) return;

        selectedOptionRef.current?.scrollIntoView({
            block: "nearest",
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "auto" : "smooth",
        });
    }, [isOpen, selectedIndex, search, isDark, activeCommandId]);

    // Arrow key navigation
    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (filteredCommands.length) {
                setSelectedIndex(Math.min(activeIndex + 1, filteredCommands.length - 1));
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (filteredCommands.length) {
                setSelectedIndex(Math.max(activeIndex - 1, 0));
            }
        } else if (event.key === "Enter" && activeCommand) {
            event.preventDefault();
            executeCommand(activeCommand);
        }
    };

    const executeCommand = (cmd) => {
        cmd.action();
        closePalette();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="palette-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closePalette}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />
            )}

            {isOpen && (
                <motion.div
                    key="palette-panel"
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    tabIndex={-1}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
                >
                    <div className="bg-bg-elev rounded-none border border-line shadow-lg overflow-hidden">
                        {/* Title bar */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-line text-ink">
                            <span id={titleId} className="font-mono text-xs uppercase tracking-[0.2em]">
                                Command palette
                            </span>
                            <span className="font-mono text-xs text-accent">⌘K</span>
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-4 py-4 border-b border-line">
                            <span className="font-mono text-lg leading-none text-accent">›</span>
                            <input
                                ref={inputRef}
                                role="combobox"
                                aria-label="Search commands"
                                aria-autocomplete="list"
                                aria-expanded="true"
                                aria-controls={listboxId}
                                aria-activedescendant={activeCommand ? `${paletteId}-option-${activeCommand.id}` : undefined}
                                type="text"
                                placeholder="SEARCH COMMANDS…"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent text-ink placeholder-ink-muted outline-none text-base font-mono"
                            />
                            <kbd className="px-1.5 py-1 border border-line rounded-none font-mono text-[0.625rem] text-ink-muted">ESC</kbd>
                        </div>

                        {/* Commands List */}
                        <div id={listboxId} role="listbox" aria-label="Commands" tabIndex={-1} className="max-h-80 overflow-y-auto py-2">
                            {filteredCommands.length === 0 ? (
                                <div className="px-4 py-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                                    No commands found
                                </div>
                            ) : (
                                filteredCommands.map((cmd, index) => (
                                    <button
                                        key={cmd.id}
                                        id={`${paletteId}-option-${cmd.id}`}
                                        ref={index === activeIndex ? selectedOptionRef : null}
                                        role="option"
                                        tabIndex={-1}
                                        aria-selected={index === activeIndex}
                                        onClick={() => executeCommand(cmd)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        onFocus={() => setSelectedIndex(index)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left ${index === activeIndex
                                            ? "bg-accent/10 text-accent"
                                            : "text-ink hover:bg-bg-subtle"
                                            }`}
                                    >
                                        <span className="w-4 shrink-0 font-mono text-xs text-accent">›</span>
                                        <CommandIcon
                                            name={cmd.icon}
                                            className={`w-4 h-4 shrink-0 ${index === activeIndex ? "text-accent" : "text-ink-muted"}`}
                                        />
                                        <span className="flex-1 font-mono text-sm uppercase tracking-[0.1em]">{cmd.label}</span>
                                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-muted">{cmd.category}</span>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-line text-xs text-ink-muted">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 border border-line rounded-none font-mono text-[0.625rem]">↑↓</kbd>
                                    Navigate
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 border border-line rounded-none font-mono text-[0.625rem]">↵</kbd>
                                    Select
                                </span>
                            </div>
                            <span className="font-mono">Fernado's Portfolio</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
