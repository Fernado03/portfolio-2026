import { HERO_CONTENT } from "../constants";
import { GitHubIcon, LinkedInIcon } from "./ui/Icons";

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
        <footer className="border-t border-line py-6 md:py-8">
            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left: name + note */}
                <div>
                    <p className="font-display font-semibold text-ink">Fernado George Anak Mani</p>
                    <p className="text-sm text-ink-muted mt-1">
                        Data science &amp; AI engineering — Kuching, Sarawak
                    </p>
                </div>

                {/* Right: copyright + socials */}
                <div className="flex flex-col gap-2 md:items-end">
                    <div className="flex items-center gap-4">
                        {socials.map(({ name, href, Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="inline-flex h-11 w-11 items-center justify-center text-ink-muted hover:text-accent active:scale-[0.99] transition-colors rounded"
                                aria-label={name}
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                    <p className="text-sm text-ink-muted">
                        © {new Date().getFullYear()} Fernado George Anak Mani. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
