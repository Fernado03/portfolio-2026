import { SKILLS } from "../constants";

const ITEMS = SKILLS.flatMap((group) => group.items);

// Decorative: the same toolkit is listed accessibly in the Experience section.
export default function Marquee() {
    return (
        <div
            aria-hidden
            className="group relative overflow-hidden border-y border-line bg-surface/40 py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
        >
            <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
                {[...ITEMS, ...ITEMS].map((item, i) => (
                    <li key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
                        {item}
                        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                    </li>
                ))}
            </ul>
        </div>
    );
}
