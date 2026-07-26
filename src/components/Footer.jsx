import React from "react";
import { HERO_CONTENT } from "../constants";

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
        />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V8h4v1.5A5.5 5.5 0 0116 8zM6 9H2v12h4V9zM4 6a2 2 0 100-4 2 2 0 000 4z"
        />
    </svg>
);

const EmailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
    </svg>
);

const Footer = () => {
    const socials = [
        { name: "GitHub", href: HERO_CONTENT.github, Icon: GitHubIcon },
        { name: "LinkedIn", href: HERO_CONTENT.linkedin, Icon: LinkedInIcon },
        { name: "Email", href: `mailto:${HERO_CONTENT.email}`, Icon: EmailIcon },
    ];

    return (
        <footer className="border-t border-line py-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Left: name + note */}
                <div>
                    <p className="font-display font-semibold text-ink">Fernado George</p>
                    <p className="text-sm text-ink-muted mt-1">
                        Data science &amp; AI engineering — Kuching, Sarawak
                    </p>
                </div>

                {/* Right: copyright + socials */}
                <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex items-center gap-4">
                        {socials.map(({ name, href, Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="text-ink-muted hover:text-accent transition-colors rounded"
                                aria-label={name}
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                    <p className="text-sm text-ink-muted">
                        © {new Date().getFullYear()} Fernado George. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
