import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const { toggleTheme, isDark } = useTheme();

    const commands = [
        { id: "home", label: "Go to Home", icon: "🏠", action: () => scrollTo("#"), category: "Navigation" },
        { id: "fyp", label: "Go to FYP Showcase", icon: "🎓", action: () => scrollTo("#fyp"), category: "Navigation" },
        { id: "projects", label: "Go to Projects", icon: "💼", action: () => scrollTo("#projects"), category: "Navigation" },
        { id: "about", label: "Go to About", icon: "👤", action: () => scrollTo("#about"), category: "Navigation" },
        { id: "experience", label: "Go to Journey", icon: "🚀", action: () => scrollTo("#experience"), category: "Navigation" },
        { id: "skills", label: "Go to Skills", icon: "⚡", action: () => scrollTo("#skills"), category: "Navigation" },
        { id: "awards", label: "Go to Awards", icon: "🏆", action: () => scrollTo("#awards"), category: "Navigation" },
        { id: "contact", label: "Go to Contact", icon: "📧", action: () => scrollTo("#contact"), category: "Navigation" },
        { id: "resume", label: "Download Resume", icon: "📄", action: () => window.open("/Fernado_George_DataScience_Intern_Resume.pdf", "_blank"), category: "Actions" },
        { id: "theme", label: `Switch to ${isDark ? "Light" : "Dark"} Mode`, icon: isDark ? "☀️" : "🌙", action: toggleTheme, category: "Actions" },
        { id: "github", label: "Open GitHub", icon: "🐙", action: () => window.open("https://github.com/Fernado03", "_blank"), category: "Links" },
        { id: "linkedin", label: "Open LinkedIn", icon: "💼", action: () => window.open("https://linkedin.com/in/fernado-george", "_blank"), category: "Links" },
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

    // Keyboard shortcut to open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setSearch("");
            setSelectedIndex(0);
        }
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
            {/* Keyboard hint - fixed bottom */}
            <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg">
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono">⌘K</kbd>
                <span>Quick actions</span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Command Palette Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-800">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                                        className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none text-base"
                                    />
                                    <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs text-slate-500 dark:text-slate-400">ESC</kbd>
                                </div>

                                {/* Commands List */}
                                <div className="max-h-80 overflow-y-auto py-2">
                                    {filteredCommands.length === 0 ? (
                                        <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                                            No commands found
                                        </div>
                                    ) : (
                                        filteredCommands.map((cmd, index) => (
                                            <button
                                                key={cmd.id}
                                                onClick={() => executeCommand(cmd)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${index === selectedIndex
                                                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    }`}
                                            >
                                                <span className="text-lg">{cmd.icon}</span>
                                                <span className="flex-1 font-medium">{cmd.label}</span>
                                                <span className="text-xs text-slate-400 dark:text-slate-500">{cmd.category}</span>
                                            </button>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">↑↓</kbd>
                                            Navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">↵</kbd>
                                            Select
                                        </span>
                                    </div>
                                    <span>Fernado's Portfolio</span>
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
