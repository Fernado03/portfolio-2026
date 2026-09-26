import { useState } from "react";
import { AWARDS } from "../constants";
import { resizedImage } from "../utils/image";
import { splitEvent } from "../utils/text";
import { Expand, Trophy } from "./ui/Icons";
import Lightbox from "./ui/Lightbox";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

// Highlights first, so the lightbox order matches the page order.
const ORDERED = [...AWARDS.filter((a) => a.highlight), ...AWARDS.filter((a) => !a.highlight)];
const GALLERY = ORDERED.filter((a) => a.image).map((a) => ({ ...resizedImage(a.image), alt: a.title, caption: a.title, title: a.title }));
const galleryIndex = (award) => GALLERY.findIndex((g) => g.title === award.title);
const medalTone = (name) => (/2nd|silver/i.test(name) ? "text-slate-300" : "text-amber-300");

// Tilt and sheen follow the pointer on hover-capable devices; values land in CSS variables that
// only feed transforms, so tracking never repaints the card.
const tilt = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    // The sheen band is twice the card's width, so ±25% of its own width spans the card.
    e.currentTarget.style.setProperty("--sx", `${(x * 50).toFixed(2)}%`);
};
const untilt = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
};

function Highlight({ award, onOpen }) {
    const [name, event] = splitEvent(award.title);
    const img = resizedImage(award.image);
    return (
        <button
            type="button"
            onClick={onOpen}
            onPointerMove={tilt}
            onPointerLeave={untilt}
            className="group block h-full w-full text-left [perspective:1000px]"
            aria-label={`View certificate: ${award.title}`}
        >
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface transition-[transform,border-color] duration-200 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] group-hover:border-muted/50 motion-reduce:transform-none">
                <div className="relative aspect-[4/3] overflow-hidden bg-bg">
                    <img
                        src={img.src}
                        srcSet={img.srcSet}
                        sizes="(min-width: 1024px) 400px, 80vw"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-[200%] opacity-0 transition-opacity duration-300 [transform:translateX(var(--sx,0%))] group-hover:opacity-100 group-hover:will-change-transform"
                        style={{ background: "linear-gradient(105deg, transparent 40%, rgb(255 255 255 / 0.14) 50%, transparent 60%)" }}
                    />
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg/90 text-muted transition-colors group-hover:text-ink">
                        <Expand width={15} height={15} />
                    </span>
                </div>
                <div className="p-5">
                    <p className={`flex items-center gap-2 font-display text-xl font-semibold tracking-tight ${medalTone(name)}`}>
                        <Trophy width={18} height={18} className="shrink-0" />
                        <span className="text-ink">{name}</span>
                    </p>
                    {event && <p className="mt-1.5 text-sm text-muted">{event}</p>}
                </div>
            </div>
        </button>
    );
}

function Tile({ award, onOpen }) {
    const [name, event] = splitEvent(award.title);
    const img = award.image ? resizedImage(award.image) : null;
    const body = (
        <>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-bg text-muted">
                {img ? <img src={img.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <Trophy width={20} height={20} />}
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium leading-snug">{name}</span>
                {event && <span className="mt-0.5 block text-xs leading-snug text-muted">{event}</span>}
            </span>
        </>
    );
    const base = "flex h-full w-full items-center gap-4 rounded-xl border border-line bg-surface p-3 text-left";
    return img ? (
        <button type="button" onClick={onOpen} className={`${base} transition-colors hover:border-muted/50`} aria-label={`View certificate: ${award.title}`}>
            {body}
        </button>
    ) : (
        <div className={base}>{body}</div>
    );
}

export default function Recognition() {
    const [open, setOpen] = useState(null);
    const highlights = ORDERED.filter((a) => a.highlight);
    const others = ORDERED.filter((a) => !a.highlight);

    return (
        <Section
            id="recognition"
            index="05"
            eyebrow="Recognition"
            title="Awards and certificates"
            intro={`${highlights.length} competitive wins and ${others.length} more certificates and finalist places. Select any certificate to view it.`}
        >
            <Reveal>
                <ul className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                    {highlights.map((award) => (
                        <li key={award.title} className="w-[80%] shrink-0 snap-start sm:w-auto">
                            <Highlight award={award} onOpen={() => setOpen(galleryIndex(award))} />
                        </li>
                    ))}
                </ul>
            </Reveal>
            <Reveal delay={0.08}>
                <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {others.map((award) => (
                        <li key={award.title}>
                            <Tile award={award} onOpen={() => setOpen(galleryIndex(award))} />
                        </li>
                    ))}
                </ul>
            </Reveal>

            <Lightbox items={GALLERY} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
        </Section>
    );
}
