import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import { SPRING } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";

const CopyIcon = () => (
    <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
        <path d="M8 20h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
    </svg>
);

const Contact = () => {
    const [copied, setCopied] = useState("");
    const copyTimeoutRef = useRef(null);

    useEffect(() => {
        return () => clearTimeout(copyTimeoutRef.current);
    }, []);

    const handleCopy = async (e, text) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
        setCopied(text);
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopied(""), 2000);
    };

    const primaryEmail = HERO_CONTENT.altEmail;
    const altEmail = HERO_CONTENT.email;

    const channels = [
        {
            label: "Phone",
            href: `tel:${HERO_CONTENT.phone}`,
            value: HERO_CONTENT.phone,
            valueClass: "text-sm",
            external: false,
        },
        {
            label: "LinkedIn",
            href: HERO_CONTENT.linkedin,
            value: "LinkedIn ↗",
            valueClass: "text-xs uppercase tracking-[0.2em]",
            external: true,
        },
        {
            label: "GitHub",
            href: HERO_CONTENT.github,
            value: "GitHub ↗",
            valueClass: "text-xs uppercase tracking-[0.2em]",
            external: true,
        },
        {
            label: "Resume",
            href: HERO_CONTENT.resumeLink,
            value: "Résumé ↗",
            valueClass: "text-xs uppercase tracking-[0.2em]",
            external: true,
        },
    ];

    return (
        <Section id="contact">
            {/* Copied Toast */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={SPRING}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-bg-elev text-ink border border-line px-4 py-2 rounded-none flex items-center gap-2 font-mono text-xs"
                        role="status"
                    >
                        <svg
                            className="w-4 h-4 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                        Email copied
                    </motion.div>
                )}
            </AnimatePresence>

            <SectionHeader
                index="07"
                eyebrow="Contact"
                title="Hiring for data science in 2026?"
                description="I am looking for a data science or AI engineering graduate role from September 2026, in Malaysia or remote. Email is the fastest way to reach me."
            />

            <div
                className="grid gap-6 border-y border-line py-6 md:grid-cols-[12rem_minmax(0,1fr)] md:items-center"
            >
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Best route</p>
                    <p className="mt-2 text-base leading-7 text-ink-muted">Email for roles, interviews, or collaboration.</p>
                </div>

                <div className="min-w-0 md:border-l md:border-line md:pl-8">
                    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-3">
                        <a
                            href={`mailto:${primaryEmail}`}
                            className="min-w-0 break-all font-mono text-base text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent md:text-xl"
                        >
                            {primaryEmail}
                        </a>
                        <button
                            type="button"
                            onClick={(e) => handleCopy(e, primaryEmail)}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-bg text-ink-muted transition-colors hover:border-accent hover:text-accent"
                            aria-label="Copy personal email to clipboard"
                        >
                            <CopyIcon />
                        </button>
                    </div>
                    <div className="mt-3 grid min-w-0 grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-3">
                        <a
                            href={`mailto:${altEmail}`}
                            className="min-w-0 break-all font-mono text-sm text-ink-muted transition-colors hover:text-accent"
                        >
                            {altEmail}
                        </a>
                        <button
                            type="button"
                            onClick={(e) => handleCopy(e, altEmail)}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-bg text-ink-muted transition-colors hover:border-accent hover:text-accent"
                            aria-label="Copy university email to clipboard"
                        >
                            <CopyIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="mt-8"
            >
                <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
                    {channels.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                            className="group flex min-h-20 items-center justify-between gap-4 border-b border-line px-0 py-4 text-ink transition-colors hover:text-accent sm:px-4 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:first:pl-0"
                        >
                            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted transition-colors group-hover:text-accent">
                                {link.label}
                            </span>
                            <span className={`font-mono text-right ${link.valueClass}`}>{link.value}</span>
                        </a>
                    ))}
                </div>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent2">
                    <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-accent2" />
                    {HERO_CONTENT.availability}
                </p>
            </div>
        </Section>
    );
};

export default Contact;
