import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CONFUSION, EMOTIONS } from "../constants/thesis";

const INPUTS = [
    { label: "Audio", model: "WavLM", glyph: "wave" },
    { label: "Visual", model: "DINOv2", glyph: "grid" },
    { label: "Text", model: "ModernBERT", glyph: "tokens" },
];

// Row-normalised confusion matrix: P(predicted | true) per emotion.
const DISTRIBUTIONS = CONFUSION.map((row) => {
    const total = row.reduce((a, b) => a + b, 0);
    return row.map((v) => v / total);
});

function Glyph({ type }) {
    if (type === "wave") {
        return (
            <svg viewBox="0 0 40 16" className="h-4 w-10 text-series-contextual" aria-hidden>
                <path
                    d="M0 8 Q3 1 6 8 T12 8 T18 8 T24 8 T30 8 T36 8 T42 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                />
            </svg>
        );
    }
    if (type === "grid") {
        const cells = [0.9, 0.3, 0.6, 0.2, 0.8, 0.5, 0.4, 0.95, 0.25, 0.7];
        return (
            <svg viewBox="0 0 40 16" className="h-4 w-10 text-series-statistical" aria-hidden>
                {cells.map((o, i) => (
                    <rect key={i} x={(i % 5) * 8} y={Math.floor(i / 5) * 8} width="7" height="7" rx="1" fill="currentColor" opacity={o} />
                ))}
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 40 16" className="h-4 w-10 text-ink" aria-hidden>
            {[
                [0, 12],
                [14, 7],
                [23, 17],
            ].map(([x, w]) => (
                <rect key={x} x={x} y="4" width={w} height="8" rx="4" fill="currentColor" opacity="0.7" />
            ))}
        </svg>
    );
}

// Cycles through the thesis emotions on its own; hovering or focusing pauses it, picking a label or
// pressing Pause stops it, and it idles while scrolled out of view. `autoPlay={false}` renders a
// still (used for the social preview card).
export default function FusionGraphic({ autoPlay = true, defaultIndex = 2 }) {
    const reduceMotion = useReducedMotion();
    const figure = useRef(null);
    const [active, setActive] = useState(defaultIndex);
    const [auto, setAuto] = useState(autoPlay);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        io.observe(figure.current);
        return () => io.disconnect();
    }, []);

    const cycling = auto && !hovering && visible && !reduceMotion;
    useEffect(() => {
        if (!cycling) return undefined;
        const id = setInterval(() => setActive((i) => (i + 1) % EMOTIONS.length), 2600);
        return () => clearInterval(id);
    }, [cycling]);

    const dist = DISTRIBUTIONS[active];

    return (
        <figure
            ref={figure}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
        >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                </div>
                <span className="font-mono text-[11px] text-muted">multimodal_fusion.infer()</span>
                {reduceMotion || !autoPlay ? (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">Thesis</span>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAuto((a) => !a)}
                        aria-pressed={auto}
                        aria-label={auto ? "Pause the emotion demo" : "Play the emotion demo"}
                        className="flex items-center gap-1.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent transition-colors hover:text-ink"
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            {cycling && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />}
                            <span className={`relative h-1.5 w-1.5 rounded-full ${auto ? "bg-accent" : "bg-muted"}`} />
                        </span>
                        {auto ? "Pause" : "Play"}
                    </button>
                )}
            </div>

            {/* Pipeline: three encoders converge on the fusion head. */}
            <div className="grid grid-cols-[auto_minmax(2.5rem,1fr)_auto] items-stretch px-4 pt-5 sm:px-6" aria-hidden>
                <div className="grid grid-rows-3">
                    {INPUTS.map((input) => (
                        <div key={input.label} className="flex items-center py-1.5">
                            <div className="flex w-full items-center gap-3 rounded-xl border border-line bg-bg/60 px-3 py-2">
                                <Glyph type={input.glyph} />
                                <div className="leading-tight">
                                    <p className="text-[13px] font-medium">{input.label}</p>
                                    <p className="font-mono text-[10px] text-muted">{input.model}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                    {[16.67, 50, 83.33].map((y) => (
                        <g key={y}>
                            <path d={`M0 ${y} C 55 ${y}, 45 50, 100 50`} fill="none" stroke="rgb(var(--line))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                            <path
                                d={`M0 ${y} C 55 ${y}, 45 50, 100 50`}
                                fill="none"
                                stroke="rgb(var(--accent))"
                                strokeWidth="1.5"
                                strokeDasharray="4 16"
                                vectorEffect="non-scaling-stroke"
                                className="animate-dash-flow"
                            />
                        </g>
                    ))}
                </svg>
                <div className="flex items-center">
                    <div className="rounded-xl border border-accent/40 bg-accent/[0.07] px-3 py-3 text-center sm:px-4">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-accent">Fusion</p>
                        <p className="mt-1 text-[13px] font-medium">Bi-GRU</p>
                        <p className="text-[13px] font-medium">+ Ensemble</p>
                    </div>
                </div>
            </div>

            <figcaption className="px-4 pb-5 pt-5 sm:px-6">
                <div className="rounded-xl border border-line bg-bg/60 p-4">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                        <p className="font-mono text-[11px] text-muted">
                            true label <span className="text-ink">{EMOTIONS[active]}</span>
                        </p>
                        <p className="font-mono text-[11px] text-muted">P(predicted)</p>
                    </div>
                    <ul>
                        {EMOTIONS.map((emotion, i) => {
                            const isTrue = i === active;
                            return (
                                <li key={emotion}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActive(i);
                                            setAuto(false);
                                        }}
                                        className="group grid min-h-6 w-full grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3 rounded text-left"
                                        aria-pressed={isTrue}
                                    >
                                        <span className={`font-mono text-[11px] ${isTrue ? "text-ink" : "text-muted group-hover:text-ink"}`}>{emotion}</span>
                                        <span className="h-2 overflow-hidden rounded-full bg-line/60">
                                            <span
                                                className={`block h-full rounded-full transition-[width] duration-700 ease-out ${isTrue ? "bg-accent" : "bg-muted/50"}`}
                                                style={{ width: `${Math.max(dist[i] * 100, 1.5)}%` }}
                                            />
                                        </span>
                                        <span className={`text-right font-mono text-[11px] tabular-nums ${isTrue ? "text-accent" : "text-muted"}`}>
                                            {(dist[i] * 100).toFixed(0)}%
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted">
                    Row-normalised confusion matrix from the thesis. Pick a label to compare.
                </p>
            </figcaption>
        </figure>
    );
}
