import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { HERO_CONTENT } from "../constants";
import useBrowserValue from "../hooks/useBrowserValue";
import { ArrowUpRight, Check, Clock, Copy, Download, GitHub, LinkedIn, Mail, MapPin, Phone } from "./ui/Icons";
import Reveal from "./ui/Reveal";

const TIME_ZONE = "Asia/Kuala_Lumpur";
const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const readTime = () => timeFormat.format(new Date());
const every15s = (onChange) => {
    const id = setInterval(onChange, 15_000);
    return () => clearInterval(id);
};

const partOfDay = (hour) => (hour < 5 ? "Night" : hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : hour < 22 ? "Evening" : "Night");

// "14:05" in Malaysia, or null in the pre-rendered HTML (the build time would be wrong by the time anyone reads it).
function useMalaysiaTime() {
    const time = useBrowserValue(readTime, null, every15s);
    return { time, period: time && partOfDay(Number(time.slice(0, 2))) };
}

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return undefined;
        const id = setTimeout(() => setCopied(false), 1800);
        return () => clearTimeout(id);
    }, [copied]);

    return (
        <button
            type="button"
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(value);
                    setCopied(true);
                } catch {
                    window.location.href = `mailto:${value}`;
                }
            }}
            className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-muted transition-colors hover:border-ink/50 hover:text-ink sm:px-4"
            aria-label={`Copy ${label}`}
        >
            {copied ? <Check width={16} height={16} className="text-accent" /> : <Copy width={16} height={16} />}
            <span aria-live="polite" className="hidden sm:inline">
                {copied ? "Copied" : "Copy"}
            </span>
        </button>
    );
}

function StatusCard() {
    const { time, period } = useMalaysiaTime();
    // The brief availability pulse starts when the card scrolls into view rather than on page load.
    const dot = useRef(null);
    const dotInView = useInView(dot, { once: true, margin: "-80px" });
    const rows = [
        { icon: Clock, label: "Local time", value: time ? `${time} · GMT+8` : "GMT+8", hint: period ? `${period} in Malaysia` : "Malaysia" },
        { icon: MapPin, label: "Based in", value: HERO_CONTENT.location, hint: "Open to roles in Malaysia or remote" },
    ];
    return (
        <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="flex items-center gap-2.5 text-sm font-medium">
                <span ref={dot} className="relative flex h-2 w-2">
                    {dotInView && <span className="absolute inset-0 animate-pulse-brief rounded-full bg-accent opacity-0" />}
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                {HERO_CONTENT.availabilityShort}
            </p>
            <dl className="mt-5 space-y-4 border-t border-line pt-5">
                {rows.map(({ icon: Icon, label, value, hint }) => (
                    <div key={label}>
                        <dt className="eyebrow flex items-center gap-2">
                            <Icon width={16} height={16} className="shrink-0 text-muted" aria-hidden />
                            {label}
                        </dt>
                        <dd className="mt-1 pl-6 font-medium tabular-nums">{value}</dd>
                        <dd className="pl-6 text-xs text-muted">{hint}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default function Contact() {
    const channels = [
        { href: HERO_CONTENT.linkedin, label: "LinkedIn", value: "in/fernado-george", icon: LinkedIn, external: true },
        { href: HERO_CONTENT.github, label: "GitHub", value: "@Fernado03", icon: GitHub, external: true },
        { href: `tel:${HERO_CONTENT.phone}`, label: "Phone", value: HERO_CONTENT.phone, icon: Phone },
        { href: HERO_CONTENT.resumeLink, label: "Resume", value: "Download PDF", icon: Download, external: true },
    ];

    return (
        <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
            <div
                aria-hidden
                className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_100%,black,transparent)]"
            />

            <div className="container-page relative">
                <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
                    <Reveal>
                        <p className="eyebrow">
                            <span className="text-accent">06</span>
                            <span className="mx-2 text-line">/</span>
                            Contact
                        </p>
                        <h2 id="contact-title" className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                            Let&apos;s build something <span className="text-accent">that ships.</span>
                        </h2>
                        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">{HERO_CONTENT.contactNote}</p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <StatusCard />
                    </Reveal>
                </div>

                <Reveal delay={0.08} className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2">
                    {[
                        { email: HERO_CONTENT.email, label: "Personal email" },
                        { email: HERO_CONTENT.altEmail, label: "University email" },
                    ].map(({ email, label }) => (
                        <div key={email} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 pl-4 sm:pl-5">
                            <Mail width={20} height={20} className="shrink-0 text-accent" />
                            <div className="min-w-0 flex-1">
                                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</p>
                                <a href={`mailto:${email}`} className="block truncate text-sm font-medium hover:text-accent sm:text-base">
                                    {email}
                                </a>
                            </div>
                            <CopyButton value={email} label={label} />
                        </div>
                    ))}
                </Reveal>

                <Reveal delay={0.12}>
                    <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {channels.map(({ href, label, value, icon: Icon, external }) => (
                            <li key={label} className="min-w-0">
                                <a
                                    href={href}
                                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                                    className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-muted/50"
                                >
                                    <span className="min-w-0">
                                        <Icon width={20} height={20} className="text-muted transition-colors group-hover:text-ink" />
                                        <span className="mt-6 block font-medium">{label}</span>
                                        <span className="mt-0.5 block truncate font-mono text-xs text-muted">{value}</span>
                                    </span>
                                    <ArrowUpRight width={16} height={16} className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
