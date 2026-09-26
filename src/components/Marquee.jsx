import { useState } from "react";
import { SKILLS } from "../constants";
import { Pause, Play } from "./ui/Icons";

const ITEMS = SKILLS.flatMap((group) => group.items);

// Decorative: the same toolkit is listed accessibly in the Experience section. It loops forever, so
// it needs a pause control that works without a mouse (WCAG 2.2.2); hover still pauses it too.
export default function Marquee() {
    const [paused, setPaused] = useState(false);

    return (
        <div className="relative border-y border-line bg-surface/40">
            <div
                aria-hidden
                className="group overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_calc(100%_-_7rem),transparent_calc(100%_-_3.5rem))]"
            >
                <ul
                    className={`flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] ${
                        paused ? "[animation-play-state:paused]" : ""
                    }`}
                >
                    {[...ITEMS, ...ITEMS].map((item, i) => (
                        <li key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
                            {item}
                            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                        </li>
                    ))}
                </ul>
            </div>
            <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play the skills ticker" : "Pause the skills ticker"}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg text-muted transition-colors hover:border-muted/60 hover:text-ink motion-reduce:hidden sm:right-5"
            >
                {paused ? <Play width={14} height={14} /> : <Pause width={14} height={14} />}
            </button>
        </div>
    );
}
