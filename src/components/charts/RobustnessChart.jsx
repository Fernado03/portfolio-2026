import { useState } from "react";
import { NOISE_BANDS, NOISE_SIGMAS } from "../../constants/thesis";
import useElementWidth from "../../hooks/useElementWidth";
import { FAMILIES } from "./families";
import FamilyLegend from "./FamilyLegend";

const BAND_FAMILY = {
    "Classical ML": "classical",
    "DL Statistical": "statistical",
    "DL Contextual": "contextual",
    Ensemble: "ensemble",
};
const BANDS = NOISE_BANDS.map((b) => ({ ...b, key: BAND_FAMILY[b.family] }));
const Y_MIN = 10;
const Y_MAX = 75;
const Y_TICKS = [20, 40, 60];
const M = { l: 36, r: 14, t: 14, b: 44 };

const range = (b, i) => (b.min[i] === b.max[i] ? `${b.max[i]}` : `${b.min[i]}–${b.max[i]}`);

export default function RobustnessChart() {
    const [ref, width] = useElementWidth();
    const [col, setCol] = useState(null);
    const [focus, setFocus] = useState(null);

    const height = width < 480 ? 260 : 300;
    const iw = Math.max(width - M.l - M.r, 0);
    const ih = height - M.t - M.b;
    const last = NOISE_SIGMAS.length - 1;
    const x = (i) => M.l + (iw * i) / last;
    const y = (v) => M.t + ih * (1 - (v - Y_MIN) / (Y_MAX - Y_MIN));
    const line = (vals) => vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("");
    const area = (b) =>
        `${line(b.max)}${b.min
            .map((v, i) => [i, v])
            .reverse()
            .map(([i, v]) => `L${x(i)},${y(v)}`)
            .join("")}Z`;

    const onKeyDown = (e) => {
        if (e.key === "ArrowRight") setCol((c) => Math.min((c ?? -1) + 1, last));
        else if (e.key === "ArrowLeft") setCol((c) => Math.max((c ?? 1) - 1, 0));
        else return;
        e.preventDefault();
    };

    return (
        <div>
            <div
                ref={ref}
                className="relative rounded-lg"
                tabIndex={0}
                role="group"
                aria-label="Noise robustness chart. Use left and right arrow keys to step through noise levels."
                onKeyDown={onKeyDown}
                onFocus={() => setCol((c) => c ?? 0)}
                onBlur={() => setCol(null)}
                onMouseLeave={() => setCol(null)}
            >
                {width > 0 && (
                    <svg width={width} height={height} aria-hidden className="block overflow-visible">
                        {Y_TICKS.map((t) => (
                            <g key={t}>
                                <line x1={M.l} x2={width - M.r} y1={y(t)} y2={y(t)} stroke="rgb(var(--line))" strokeDasharray="2 4" />
                                <text x={M.l - 10} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted font-mono text-[11px]">
                                    {t}
                                </text>
                            </g>
                        ))}
                        <line x1={M.l} x2={width - M.r} y1={y(Y_MIN)} y2={y(Y_MIN)} stroke="rgb(var(--line))" />
                        {NOISE_SIGMAS.map((s, i) => (
                            <text key={s} x={x(i)} y={height - M.b + 20} textAnchor="middle" className={`font-mono text-[11px] ${col === i ? "fill-ink" : "fill-muted"}`}>
                                {s}
                            </text>
                        ))}
                        <text x={M.l + iw / 2} y={height - 4} textAnchor="middle" className="fill-muted font-mono text-[11px]">
                            Gaussian noise (σ)
                        </text>

                        {col !== null && <line x1={x(col)} x2={x(col)} y1={M.t} y2={y(Y_MIN)} stroke="rgb(var(--ink) / 0.35)" />}

                        {BANDS.map((b) => {
                            const { color } = FAMILIES[b.key];
                            const opacity = focus && focus !== b.key ? 0.12 : 1;
                            return (
                                <g key={b.key} style={{ opacity, transition: "opacity 200ms" }}>
                                    <path d={area(b)} fill={color} fillOpacity={0.14} />
                                    <path d={line(b.max)} fill="none" stroke={color} strokeWidth={b.key === "ensemble" ? 2.5 : 1.5} />
                                    <path d={line(b.min)} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.6} />
                                    {col !== null && <circle cx={x(col)} cy={y(b.max[col])} r={3.5} fill={color} stroke="rgb(var(--surface))" strokeWidth={2} />}
                                </g>
                            );
                        })}

                        {NOISE_SIGMAS.map((s, i) => (
                            <rect
                                key={s}
                                x={i === 0 ? M.l : x(i) - iw / last / 2}
                                width={i === 0 || i === last ? iw / last / 2 : iw / last}
                                y={M.t}
                                height={ih}
                                fill="transparent"
                                onMouseEnter={() => setCol(i)}
                            />
                        ))}
                    </svg>
                )}

                {col !== null && width > 0 && (
                    <div
                        className="pointer-events-none absolute top-2 w-60 rounded-lg border border-line bg-bg p-3 shadow-xl shadow-black/40"
                        style={col > last / 2 ? { right: width - x(col) + 12 } : { left: x(col) + 12 }}
                    >
                        <p className="mb-2 font-mono text-[11px] text-muted">σ = {NOISE_SIGMAS[col]} · F1 %</p>
                        <ul className="space-y-1">
                            {[...BANDS].reverse().map((b) => (
                                <li key={b.key} className="flex items-center justify-between gap-3 whitespace-nowrap text-xs">
                                    <span className="flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-sm ${FAMILIES[b.key].swatch}`} />
                                        {FAMILIES[b.key].label}
                                    </span>
                                    <span className="font-mono tabular-nums text-ink">{range(b, col)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <p className="sr-only" aria-live="polite">
                    {col !== null &&
                        `Noise sigma ${NOISE_SIGMAS[col]}: ${BANDS.map((b) => `${FAMILIES[b.key].label} ${range(b, col)} percent`).join(", ")}`}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <FamilyLegend focus={focus} onFocus={setFocus} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">y: weighted F1 %</span>
            </div>
        </div>
    );
}
