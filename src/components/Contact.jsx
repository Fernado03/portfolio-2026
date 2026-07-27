import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import { SPRING, FADE_IN_VARIANTS } from "../constants/animations";
import Section from "./ui/Section";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import { GitHubIcon, LinkedInIcon } from "./ui/Icons";

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

const ArrowUpRightIcon = () => (
    <svg
        className="w-4 h-4 ml-auto shrink-0 text-ink-muted group-hover:text-accent transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
    </svg>
);


const WhatsAppIcon = () => (
    <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z" />
        <path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1.5-1.5-2-1-1 .5c-.5-.5-1.5-1.5-2-2l.5-1-1-2L9 9.5z" />
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

    const links = [
        { label: "LinkedIn", href: HERO_CONTENT.linkedin, icon: <LinkedInIcon /> },
        { label: "GitHub", href: HERO_CONTENT.github, icon: <GitHubIcon /> },
        {
            label: "WhatsApp",
            href: `https://wa.me/${HERO_CONTENT.phone.replace("+", "")}`,
            icon: <WhatsAppIcon />,
        },
    ];

    const emails = [
        {
            address: HERO_CONTENT.email,
            label: "university email",
            className: "font-mono text-lg md:text-xl text-ink hover:text-accent",
        },
        {
            address: HERO_CONTENT.altEmail,
            label: "personal email",
            className: "inline-flex items-center min-h-11 font-mono text-sm md:text-base text-ink-muted hover:text-accent",
        },
    ];

    return (
        <Section id="contact" className="flex items-center">
            {/* Copied Toast */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={SPRING}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-bg-elev text-ink border border-line px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 font-mono text-xs"
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

            <div className="grid md:grid-cols-12 gap-7 md:gap-12">
                {/* Left: email hero treatment */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ ...SPRING, delay: 0.1 }}
                    className="md:col-span-7"
                >
                    {emails.map(({ address, label, className }, index) => (
                        <div
                            key={address}
                            className={`flex flex-wrap items-center gap-3 min-h-11 ${index > 0 ? "mt-5" : ""}`}
                        >
                            <a
                                href={`mailto:${address}`}
                                className={`${className} transition-colors break-all`}
                            >
                                {address}
                            </a>
                            <button
                                type="button"
                                onClick={(e) => handleCopy(e, address)}
                                className="inline-flex items-center justify-center min-h-11 min-w-11 border border-line rounded-md px-2 text-ink-muted hover:text-accent hover:border-accent/50 transition-colors active:scale-[0.98]"
                                aria-label={`Copy ${label} to clipboard`}
                            >
                                <CopyIcon />
                            </button>
                        </div>
                    ))}

                    <div className="mt-9">
                        <Button variant="primary" href={HERO_CONTENT.resumeLink}>
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
                                <path d="M12 10v6m0 0l-3-3m3 3l3-3" />
                                <path d="M20 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2h3" />
                            </svg>
                            Download resume
                        </Button>
                    </div>
                </motion.div>

                {/* Right: elsewhere links */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ ...SPRING, delay: 0.2 }}
                    className="md:col-span-5"
                >
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted mb-4">
                        Elsewhere
                    </p>
                    <div className="border-y border-line divide-y divide-line">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 py-3.5 min-h-11 text-ink hover:text-accent active:scale-[0.99] transition-colors"
                            >
                                {link.icon}
                                <span className="font-medium">{link.label}</span>
                                <ArrowUpRightIcon />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default Contact;
