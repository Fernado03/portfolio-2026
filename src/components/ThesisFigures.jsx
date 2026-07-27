import { useState } from "react";
import {
    MODALITY_CONDITIONS,
    MODALITY_CODES,
    MODAL_RELIANCE,
    NOISE_SIGMAS,
    NOISE_BANDS,
    EMOTIONS,
    CONFUSION,
} from "../constants/thesis";

/**
 * The FYP thesis results, rebuilt as three hand-rolled SVG figures — no
 * charting dependency. 105 heatmap cells + 36 matrix cells + 4 band paths
 * don't justify d3/recharts, and every fill/stroke below derives from the
 * `--*-rgb` custom properties, so the figures are theme-correct for free.
 *
 * Each figure owns one `readout` string surfaced through a single
 * `aria-live="polite"` line above its body. Cells update it on both hover
 * and focus, replacing tooltips (unusable on touch) with something a
 * screen reader and a keyboard both already get.
 */

const CAPTION_CLASS = "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted";
const READOUT_CLASS = "min-h-[1.25rem] font-mono text-[0.6875rem] text-ink-muted sm:text-right";
const INSTRUMENT_ROW_CLASS = "mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1";
const SCROLL_CLASS = "-mx-6 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0";
// Figures render at their natural viewBox scale (1 unit = 1px) via an inline
// maxWidth, not stretched to the full column. Below md each figure's own
// min-width wins and it scrolls inside its own container.

const clamp = (value, lo, hi) => Math.min(hi, Math.max(lo, value));

// The one viz palette rule, shared by both heatmap-style figures: fill rides
// the accent channel at variable alpha, text flips to bg once the fill is
// dark enough to need light-on-dark.
const cellFill = (t) => `rgb(var(--accent-rgb) / ${(0.06 + 0.82 * t).toFixed(3)})`;
const cellText = (t) => (t > 0.55 ? "rgb(var(--bg-rgb))" : "rgb(var(--ink-rgb))");

// ---------------------------------------------------------------------------
// Fig. 1 — modal reliance heatmap (15 models × 7 modality conditions)
// ---------------------------------------------------------------------------

const FIG1_HINT = "Hover or focus a cell — F1 collapses when a modality is removed.";
const FIG1_PAD = 8;
const FIG1_ROW_LABEL_W = 210;
const FIG1_COL_W = 140;
const FIG1_ROW_H = 30;
const FIG1_HEADER_H = 78;
const FIG1_GRID_X = FIG1_PAD + FIG1_ROW_LABEL_W;
const FIG1_GRID_W = FIG1_COL_W * MODALITY_CONDITIONS.length;
const FIG1_WIDTH = FIG1_GRID_X + FIG1_GRID_W + FIG1_PAD;
const FIG1_HEIGHT = FIG1_HEADER_H + FIG1_ROW_H * MODAL_RELIANCE.length + FIG1_PAD;
const FIG1_LAST_ROW = MODAL_RELIANCE.length - 1;
const FIG1_SVG_CLASS = "h-auto w-full min-w-[720px] md:min-w-0";

const ModalRelianceHeatmap = () => {
    const [readout, setReadout] = useState(FIG1_HINT);

    return (
        <figure className="min-w-0">
            <div className={INSTRUMENT_ROW_CLASS}>
                <figcaption id="fig1-caption" className={CAPTION_CLASS}>
                    Fig. 1 — Modal reliance across models
                </figcaption>
                <p aria-live="polite" className={READOUT_CLASS}>
                    {readout}
                </p>
            </div>
            <div className={SCROLL_CLASS}>
                <svg viewBox={`0 0 ${FIG1_WIDTH} ${FIG1_HEIGHT}`} style={{ maxWidth: FIG1_WIDTH }} className={FIG1_SVG_CLASS} aria-labelledby="fig1-caption">
                    {/* Desktop column headers: rotated condition names. */}
                    <g className="hidden md:block" aria-hidden="true">
                        {MODALITY_CONDITIONS.map((condition, j) => {
                            // Ascending -45° label: anchor its START at the column's
                            // left edge so it rises up-right and clears row 1. An
                            // "end" anchor would send the text down-left into the grid.
                            const cx = FIG1_GRID_X + j * FIG1_COL_W + 4;
                            const cy = FIG1_HEADER_H - 5;
                            return (
                                <text
                                    key={condition}
                                    x={cx}
                                    y={cy}
                                    transform={`rotate(-45 ${cx} ${cy})`}
                                    textAnchor="start"
                                    fill="rgb(var(--ink-muted-rgb))"
                                    className="font-mono text-[11px] uppercase"
                                >
                                    {condition}
                                </text>
                            );
                        })}
                    </g>
                    {/* Mobile column headers: straight short codes, no rotation. */}
                    <g className="md:hidden" aria-hidden="true">
                        {MODALITY_CODES.map((code, j) => (
                            <text
                                key={code}
                                x={FIG1_GRID_X + j * FIG1_COL_W + FIG1_COL_W / 2}
                                y={FIG1_HEADER_H - 12}
                                textAnchor="middle"
                                fill="rgb(var(--ink-muted-rgb))"
                                className="font-mono text-[10px] uppercase"
                            >
                                {code}
                            </text>
                        ))}
                    </g>

                    {MODAL_RELIANCE.map((row, i) => {
                        const [model, , ...values] = row;
                        const y = FIG1_HEADER_H + i * FIG1_ROW_H;
                        return (
                            <g key={model}>
                                <text
                                    x={FIG1_PAD}
                                    y={y + FIG1_ROW_H / 2}
                                    dominantBaseline="middle"
                                    fill="rgb(var(--ink-rgb))"
                                    className="font-mono text-[12px]"
                                >
                                    {model}
                                </text>
                                {values.map((value, j) => {
                                    const condition = MODALITY_CONDITIONS[j];
                                    const t = clamp((value - 5) / 70, 0, 1);
                                    const label = `${model} · ${condition} · ${value.toFixed(1)}% F1`;
                                    const x = FIG1_GRID_X + j * FIG1_COL_W;
                                    return (
                                        <g
                                            key={condition}
                                            tabIndex={0}
                                            role="img"
                                            aria-label={label}
                                            onMouseEnter={() => setReadout(label)}
                                            onFocus={() => setReadout(label)}
                                            className="cursor-pointer"
                                        >
                                            <rect
                                                x={x + 1}
                                                y={y + 1}
                                                width={FIG1_COL_W - 2}
                                                height={FIG1_ROW_H - 2}
                                                fill={cellFill(t)}
                                            />
                                            <text
                                                x={x + FIG1_COL_W / 2}
                                                y={y + FIG1_ROW_H / 2}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill={cellText(t)}
                                                pointerEvents="none"
                                                className="font-mono text-[13px]"
                                            >
                                                {value.toFixed(1)}
                                            </text>
                                        </g>
                                    );
                                })}
                                {i === FIG1_LAST_ROW && (
                                    <rect
                                        x={FIG1_GRID_X}
                                        y={y + 1}
                                        width={FIG1_GRID_W}
                                        height={FIG1_ROW_H - 2}
                                        fill="none"
                                        stroke="rgb(var(--accent-rgb))"
                                        strokeWidth={1}
                                        pointerEvents="none"
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </figure>
    );
};

// ---------------------------------------------------------------------------
// Fig. 2 — noise robustness bands (4 model families across the σ sweep)
// ---------------------------------------------------------------------------

const FIG2_HINT = "Hover or focus a point — each family degrades differently as σ rises.";
const FIG2_WIDTH = 640;
const FIG2_HEIGHT = 240;
const FIG2_MARGIN_LEFT = 40;
const FIG2_MARGIN_RIGHT = 120;
const FIG2_MARGIN_TOP = 16;
const FIG2_MARGIN_BOTTOM = 40;
const FIG2_PLOT_W = FIG2_WIDTH - FIG2_MARGIN_LEFT - FIG2_MARGIN_RIGHT;
const FIG2_PLOT_H = FIG2_HEIGHT - FIG2_MARGIN_TOP - FIG2_MARGIN_BOTTOM;
const FIG2_Y_MAX = 80;
const FIG2_Y_TICKS = [0, 20, 40, 60, 80];
const FIG2_LAST = NOISE_SIGMAS.length - 1;
const FIG2_SVG_CLASS = "h-auto w-full min-w-[520px] md:min-w-0";

const xAt = (i) => FIG2_MARGIN_LEFT + (i / FIG2_LAST) * FIG2_PLOT_W;
const yAt = (v) => FIG2_MARGIN_TOP + (1 - v / FIG2_Y_MAX) * FIG2_PLOT_H;

// Closed ribbon: max values forward, min values back, per NOISE_BANDS family.
const bandPath = (band) => {
    const top = NOISE_SIGMAS.map((_, i) => `${xAt(i).toFixed(1)},${yAt(band.max[i]).toFixed(1)}`);
    const bottom = NOISE_SIGMAS.map((_, i) => `${xAt(i).toFixed(1)},${yAt(band.min[i]).toFixed(1)}`).reverse();
    return `M${[...top, ...bottom].join("L")}Z`;
};

const centerPath = (band) =>
    NOISE_SIGMAS.map((_, i) => {
        const mean = (band.min[i] + band.max[i]) / 2;
        return `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(mean).toFixed(1)}`;
    }).join("");

const NoiseRobustnessBands = () => {
    const [readout, setReadout] = useState(FIG2_HINT);

    return (
        <figure className="min-w-0">
            <div className={INSTRUMENT_ROW_CLASS}>
                <figcaption id="fig2-caption" className={CAPTION_CLASS}>
                    Fig. 2 — Noise robustness by model family
                </figcaption>
                <p aria-live="polite" className={READOUT_CLASS}>
                    {readout}
                </p>
            </div>
            <p className="mt-1 mb-3 font-mono text-[0.625rem] text-ink-muted">
                Curves digitised from thesis Fig. 4.7 · σ = 0 values exact
            </p>
            <div className={SCROLL_CLASS}>
                <svg viewBox={`0 0 ${FIG2_WIDTH} ${FIG2_HEIGHT}`} style={{ maxWidth: FIG2_WIDTH }} className={FIG2_SVG_CLASS} aria-labelledby="fig2-caption">
                    <g aria-hidden="true">
                        {FIG2_Y_TICKS.map((v) => (
                            <g key={v}>
                                <line
                                    x1={FIG2_MARGIN_LEFT}
                                    x2={FIG2_WIDTH - FIG2_MARGIN_RIGHT}
                                    y1={yAt(v)}
                                    y2={yAt(v)}
                                    stroke="rgb(var(--line-rgb))"
                                    strokeWidth={1}
                                />
                                <text
                                    x={FIG2_MARGIN_LEFT - 8}
                                    y={yAt(v)}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fill="rgb(var(--ink-muted-rgb))"
                                    className="font-mono text-[9px]"
                                >
                                    {v}
                                </text>
                            </g>
                        ))}
                        {NOISE_SIGMAS.map((sigma, i) => (
                            <text
                                key={sigma}
                                x={xAt(i)}
                                y={FIG2_HEIGHT - FIG2_MARGIN_BOTTOM + 16}
                                textAnchor="middle"
                                fill="rgb(var(--ink-muted-rgb))"
                                className="font-mono text-[9px]"
                            >
                                {sigma}
                            </text>
                        ))}
                        <text
                            x={FIG2_MARGIN_LEFT + FIG2_PLOT_W / 2}
                            y={FIG2_HEIGHT - 6}
                            textAnchor="middle"
                            fill="rgb(var(--ink-muted-rgb))"
                            className="font-mono text-[9px] uppercase tracking-wide"
                        >
                            Noise level σ
                        </text>
                        <text
                            x={14}
                            y={FIG2_MARGIN_TOP + FIG2_PLOT_H / 2}
                            textAnchor="middle"
                            transform={`rotate(-90 14 ${FIG2_MARGIN_TOP + FIG2_PLOT_H / 2})`}
                            fill="rgb(var(--ink-muted-rgb))"
                            className="font-mono text-[9px] uppercase tracking-wide"
                        >
                            Weighted F1 (%)
                        </text>
                    </g>

                    {NOISE_BANDS.map((band) => {
                        const isEnsemble = band.family === "Ensemble";
                        const lineColor = isEnsemble ? "rgb(var(--accent-rgb))" : "rgb(var(--ink-muted-rgb) / 0.5)";
                        const lastMean = (band.min[FIG2_LAST] + band.max[FIG2_LAST]) / 2;
                        return (
                            <g key={band.family}>
                                <path d={bandPath(band)} fill="rgb(var(--accent-rgb) / 0.14)" aria-hidden="true" />
                                <path
                                    d={centerPath(band)}
                                    fill="none"
                                    stroke={lineColor}
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                />
                                <text
                                    x={xAt(FIG2_LAST) + 10}
                                    y={yAt(lastMean)}
                                    dominantBaseline="middle"
                                    fill={isEnsemble ? "rgb(var(--accent-rgb))" : "rgb(var(--ink-muted-rgb))"}
                                    className="font-mono text-[9px]"
                                    aria-hidden="true"
                                >
                                    {band.family}
                                </text>
                                {NOISE_SIGMAS.map((sigma, i) => {
                                    const mean = (band.min[i] + band.max[i]) / 2;
                                    const label = `${band.family} · σ ${sigma} · ${mean.toFixed(1)}% F1`;
                                    return (
                                        <g
                                            key={`${band.family}-${sigma}`}
                                            tabIndex={0}
                                            role="img"
                                            aria-label={label}
                                            onMouseEnter={() => setReadout(label)}
                                            onFocus={() => setReadout(label)}
                                            className="cursor-pointer"
                                        >
                                            <circle cx={xAt(i)} cy={yAt(mean)} r={9} fill="transparent" />
                                            <circle cx={xAt(i)} cy={yAt(mean)} r={3} fill={lineColor} pointerEvents="none" />
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </figure>
    );
};

// ---------------------------------------------------------------------------
// Fig. 3 — confusion matrix (6 true × 6 predicted emotions)
// ---------------------------------------------------------------------------

const FIG3_HINT = "Hover or focus a cell — see which emotion pairs get confused most.";
const FIG3_PAD = 8;
const FIG3_ROW_LABEL_W = 118;
const FIG3_COL_W = 76;
const FIG3_ROW_H = 38;
const FIG3_HEADER_H = 62;
const FIG3_GRID_X = FIG3_PAD + FIG3_ROW_LABEL_W;
const FIG3_GRID_W = FIG3_COL_W * EMOTIONS.length;
const FIG3_WIDTH = FIG3_GRID_X + FIG3_GRID_W + FIG3_PAD;
const FIG3_HEIGHT = FIG3_HEADER_H + FIG3_ROW_H * EMOTIONS.length + FIG3_PAD;
const FIG3_MAX = 461;
const FIG3_SVG_CLASS = "h-auto w-full min-w-[460px] md:min-w-0";

// The angry↔frustrated confusion (cells [0][5] and [5][0]) is the paper's
// stated finding — flagged with a small corner tick rather than a callout.
const isAmbiguityCell = (r, c) => (r === 0 && c === 5) || (r === 5 && c === 0);

const ConfusionMatrix = () => {
    const [readout, setReadout] = useState(FIG3_HINT);

    return (
        <figure className="min-w-0">
            <div className={INSTRUMENT_ROW_CLASS}>
                <figcaption id="fig3-caption" className={CAPTION_CLASS}>
                    Fig. 3 — Confusion matrix across emotions
                </figcaption>
                <p aria-live="polite" className={READOUT_CLASS}>
                    {readout}
                </p>
            </div>
            <div className={SCROLL_CLASS}>
                <svg viewBox={`0 0 ${FIG3_WIDTH} ${FIG3_HEIGHT}`} style={{ maxWidth: FIG3_WIDTH }} className={FIG3_SVG_CLASS} aria-labelledby="fig3-caption">
                    <g aria-hidden="true">
                        {EMOTIONS.map((emotion, j) => {
                            const cx = FIG3_GRID_X + j * FIG3_COL_W + 4;
                            const cy = FIG3_HEADER_H - 5;
                            return (
                                <text
                                    key={emotion}
                                    x={cx}
                                    y={cy}
                                    transform={`rotate(-45 ${cx} ${cy})`}
                                    textAnchor="start"
                                    fill="rgb(var(--ink-muted-rgb))"
                                    className="font-mono text-[10px] uppercase"
                                >
                                    {emotion}
                                </text>
                            );
                        })}
                    </g>

                    {CONFUSION.map((rowValues, r) => {
                        const rowSum = rowValues.reduce((sum, n) => sum + n, 0);
                        const y = FIG3_HEADER_H + r * FIG3_ROW_H;
                        return (
                            <g key={EMOTIONS[r]}>
                                <text
                                    x={FIG3_PAD}
                                    y={y + FIG3_ROW_H / 2}
                                    dominantBaseline="middle"
                                    fill="rgb(var(--ink-rgb))"
                                    className="font-mono text-[11px]"
                                >
                                    {EMOTIONS[r]}
                                </text>
                                {rowValues.map((value, c) => {
                                    const t = value / FIG3_MAX;
                                    const pct = Math.round((value / rowSum) * 100);
                                    const label = `true ${EMOTIONS[r]} → predicted ${EMOTIONS[c]} · ${value} samples (${pct}% of row)`;
                                    const x = FIG3_GRID_X + c * FIG3_COL_W;
                                    return (
                                        <g
                                            key={EMOTIONS[c]}
                                            tabIndex={0}
                                            role="img"
                                            aria-label={label}
                                            onMouseEnter={() => setReadout(label)}
                                            onFocus={() => setReadout(label)}
                                            className="cursor-pointer"
                                        >
                                            <rect
                                                x={x + 1}
                                                y={y + 1}
                                                width={FIG3_COL_W - 2}
                                                height={FIG3_ROW_H - 2}
                                                fill={cellFill(t)}
                                            />
                                            <text
                                                x={x + FIG3_COL_W / 2}
                                                y={y + FIG3_ROW_H / 2}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill={cellText(t)}
                                                pointerEvents="none"
                                                className="font-mono text-[12px]"
                                            >
                                                {value}
                                            </text>
                                            {isAmbiguityCell(r, c) && (
                                                <path
                                                    d={`M${x + FIG3_COL_W - 11},${y + 1} L${x + FIG3_COL_W - 1},${y + 1} L${x + FIG3_COL_W - 1},${y + 11} Z`}
                                                    fill="rgb(var(--accent-rgb))"
                                                    pointerEvents="none"
                                                />
                                            )}
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </figure>
    );
};

const ThesisFigures = () => (
    <div className="space-y-8">
        <ModalRelianceHeatmap />
        <div className="grid gap-8 lg:grid-cols-2">
            <NoiseRobustnessBands />
            <ConfusionMatrix />
        </div>
    </div>
);

export default ThesisFigures;
