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
 *
 * Each figure exposes exactly one focusable ARIA grid: pointer and arrow-key
 * selection share the live readout, while `aria-activedescendant` keeps every
 * non-tabbable mark named for assistive technology.
 */

const CAPTION_CLASS = "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted";
const READOUT_CLASS = "min-h-[1.25rem] font-mono text-[0.6875rem] text-ink-muted sm:text-right";
const INSTRUMENT_ROW_CLASS = "mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1";
const PAIRED_INSTRUMENT_ROW_CLASS = "mb-3 grid items-baseline gap-x-4 gap-y-1 xl:grid-cols-[auto_minmax(0,1fr)]";
const SCROLL_CLASS = "w-full overflow-hidden";
// Figures scale to their plate width at every breakpoint. Their viewBox keeps
// geometry and interactions intact without a nested horizontal scrollbar.
const FIGURE_PLATE_CLASS = "block w-full overflow-hidden border border-line bg-bg-subtle";
const LOWER_NOTE_CLASS = "mt-1 mb-3 min-h-3 font-mono text-[0.625rem] text-ink-muted";
const LOWER_PLATE_CLASS = FIGURE_PLATE_CLASS;

const clamp = (value, lo, hi) => Math.min(hi, Math.max(lo, value));

// Shared chart keyboard model: one focusable ARIA grid per figure. Arrow keys
// move a selection across the (rowCount × columnCount) matrix and clamp at
// every edge; the focused chart announces the active mark via
// aria-activedescendant, and the visible readout follows the selection.
const useChartKeyboardNavigation = (rowCount, columnCount, initialReadout, getReadout) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [readout, setReadout] = useState(initialReadout);

    const activate = (index) => {
        setActiveIndex(index);
        setReadout(getReadout(index));
    };

    const handleKeyDown = (event) => {
        const row = Math.floor(activeIndex / columnCount);
        const column = activeIndex % columnCount;
        let nextRow = row;
        let nextColumn = column;

        switch (event.key) {
            case "ArrowUp":
                nextRow = clamp(row - 1, 0, rowCount - 1);
                break;
            case "ArrowDown":
                nextRow = clamp(row + 1, 0, rowCount - 1);
                break;
            case "ArrowLeft":
                nextColumn = clamp(column - 1, 0, columnCount - 1);
                break;
            case "ArrowRight":
                nextColumn = clamp(column + 1, 0, columnCount - 1);
                break;
            default:
                return;
        }

        event.preventDefault();
        activate(nextRow * columnCount + nextColumn);
    };

    return { activeIndex, activate, handleKeyDown, readout };
};

// The one viz palette rule, shared by both heatmap-style figures: fill rides
// the accent channel at variable alpha, text flips to bg once the fill is
// dark enough to need light-on-dark.
const cellFill = (t) => `rgb(var(--accent-rgb) / ${(0.06 + 0.82 * t).toFixed(3)})`;
const cellText = (t) => (t > 0.55 ? "rgb(var(--bg-rgb))" : "rgb(var(--ink-rgb))");

// ---------------------------------------------------------------------------
// Fig. 1 — modal reliance heatmap (15 models × 7 modality conditions)
// ---------------------------------------------------------------------------

const FIG1_HINT = "Hover or focus a cell — F1 collapses when a modality is removed.";
const FIG1_DESC = [
    "Figure 1 — modal reliance heatmap. 15 models by 7 modality conditions, F1 percent per cell.",
    "Keyboard: focus the chart, then use the arrow keys to move between cells; movement stops at the chart edges.",
    "Data by model, baseline, no audio, no visual, no text, audio only, visual only, text only:",
    MODAL_RELIANCE.map(([model, , ...values]) => `${model}: ${values.map((v) => v.toFixed(1)).join(", ")}`).join(". "),
].join(" ");
const FIG1_READOUT = (index) => {
    const i = Math.floor(index / MODALITY_CONDITIONS.length);
    const j = index % MODALITY_CONDITIONS.length;
    const [model, , ...values] = MODAL_RELIANCE[i];
    return `${model} · ${MODALITY_CONDITIONS[j]} · ${values[j].toFixed(1)}% F1`;
};
const FIG1_PAD = 8;
const FIG1_ROW_LABEL_W = 210;
const FIG1_COL_W = 140;
const FIG1_ROW_H = 49;
const FIG1_HEADER_H = 78;
const FIG1_GRID_X = FIG1_PAD + FIG1_ROW_LABEL_W;
const FIG1_GRID_W = FIG1_COL_W * MODALITY_CONDITIONS.length;
const FIG1_WIDTH = FIG1_GRID_X + FIG1_GRID_W + FIG1_PAD;
const FIG1_HEIGHT = FIG1_HEADER_H + FIG1_ROW_H * MODAL_RELIANCE.length + FIG1_PAD;
const FIG1_LAST_ROW = MODAL_RELIANCE.length - 1;
const FIG1_SVG_CLASS = "block h-auto w-full min-w-0 max-w-full";

export const ModalRelianceHeatmap = () => {
    const { activeIndex, activate, handleKeyDown, readout } = useChartKeyboardNavigation(
        MODAL_RELIANCE.length,
        MODALITY_CONDITIONS.length,
        FIG1_HINT,
        FIG1_READOUT,
    );

    return (
        <figure className="min-w-0">
            <div className={INSTRUMENT_ROW_CLASS}>
                <figcaption id="fig1-caption" className={CAPTION_CLASS}>
                    <span className="text-accent">FIG. 01</span> — MODAL RELIANCE ACROSS MODELS
                </figcaption>
                <p aria-live="polite" className={READOUT_CLASS}>
                    {readout}
                </p>
            </div>
            <p className="sr-only" id="fig1-desc">{FIG1_DESC}</p>
            <div className={SCROLL_CLASS}>
                <div className={FIGURE_PLATE_CLASS}>
                <svg
                    viewBox={`0 0 ${FIG1_WIDTH} ${FIG1_HEIGHT}`}
                    style={{ maxWidth: FIG1_WIDTH }}
                    className={FIG1_SVG_CLASS}
                    role="grid"
                    aria-labelledby="fig1-caption"
                    aria-describedby="fig1-desc"
                    aria-activedescendant={`fig1-cell-${activeIndex}`}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onFocus={() => activate(activeIndex)}
                >
                    {/* Desktop column headers: rotated condition names. */}
                    <g role="row">
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
                                    role="columnheader"
                                    aria-label={condition}
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
                            <g key={model} role="row">
                                <text
                                    x={FIG1_PAD}
                                    y={y + FIG1_ROW_H / 2}
                                    dominantBaseline="middle"
                                    fill="rgb(var(--ink-rgb))"
                                    className="font-mono text-[12px]"
                                    role="rowheader"
                                >
                                    {model}
                                </text>
                                {values.map((value, j) => {
                                    const condition = MODALITY_CONDITIONS[j];
                                    const t = clamp((value - 5) / 70, 0, 1);
                                    const label = `${model} · ${condition} · ${value.toFixed(1)}% F1`;
                                    const index = i * MODALITY_CONDITIONS.length + j;
                                    const x = FIG1_GRID_X + j * FIG1_COL_W;
                                    return (
                                        <g
                                            key={condition}
                                            id={`fig1-cell-${index}`}
                                            role="gridcell"
                                            aria-label={label}
                                            aria-selected={index === activeIndex}
                                        >
                                            <rect
                                                x={x + 1}
                                                y={y + 1}
                                                width={FIG1_COL_W - 2}
                                                height={FIG1_ROW_H - 2}
                                                fill={cellFill(t)}
                                                aria-hidden="true"
                                                pointerEvents="all"
                                                onMouseEnter={() => activate(index)}
                                            />
                                            <text
                                                x={x + FIG1_COL_W / 2}
                                                y={y + FIG1_ROW_H / 2}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill={cellText(t)}
                                                pointerEvents="none"
                                                aria-hidden="true"
                                                className="font-mono text-[13px]"
                                            >
                                                {value.toFixed(1)}
                                            </text>
                                            {index === activeIndex && (
                                                <rect
                                                    x={x + 1}
                                                    y={y + 1}
                                                    width={FIG1_COL_W - 2}
                                                    height={FIG1_ROW_H - 2}
                                                    fill="none"
                                                    stroke="rgb(var(--accent-rgb))"
                                                    strokeWidth={2}
                                                    pointerEvents="none"
                                                    aria-hidden="true"
                                                />
                                            )}
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
                                        aria-hidden="true"
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>
                </div>
            </div>
        </figure>
    );
};

// ---------------------------------------------------------------------------
// Fig. 2 — noise robustness bands (4 model families across the σ sweep)
// ---------------------------------------------------------------------------

const FIG2_HINT = "Hover or focus a point";
const FIG2_DESC = [
    "Figure 2 — noise robustness bands. 4 model families by 6 noise levels, with mean, minimum, and maximum weighted F1 percent per point.",
    "Keyboard: focus the chart, then use the arrow keys to move between points; movement stops at the chart edges.",
    "Data by family and sigma:",
    NOISE_BANDS.map((band) =>
        `${band.family}: ${NOISE_SIGMAS.map((sigma, i) => {
            const mean = (band.min[i] + band.max[i]) / 2;
            return `σ ${sigma}, mean ${mean.toFixed(1)}% F1, minimum ${band.min[i].toFixed(1)}% F1, maximum ${band.max[i].toFixed(1)}% F1`;
        }).join("; ")}`,
    ).join(". "),
].join(" ");
const FIG2_READOUT = (index) => {
    const sigmaIndex = index % NOISE_SIGMAS.length;
    const band = NOISE_BANDS[Math.floor(index / NOISE_SIGMAS.length)];
    const sigma = NOISE_SIGMAS[sigmaIndex];
    const mean = (band.min[sigmaIndex] + band.max[sigmaIndex]) / 2;
    return `${band.family} · σ ${sigma} · mean ${mean.toFixed(1)}% F1 · minimum ${band.min[sigmaIndex].toFixed(1)}% F1 · maximum ${band.max[sigmaIndex].toFixed(1)}% F1`;
};
const FIG2_WIDTH = 640;
const FIG2_HEIGHT = 395;
const FIG2_MARGIN_LEFT = 48;
const FIG2_MARGIN_RIGHT = 112;
const FIG2_MARGIN_TOP = 28;
const FIG2_MARGIN_BOTTOM = 40;
const FIG2_PLOT_W = FIG2_WIDTH - FIG2_MARGIN_LEFT - FIG2_MARGIN_RIGHT;
const FIG2_PLOT_H = FIG2_HEIGHT - FIG2_MARGIN_TOP - FIG2_MARGIN_BOTTOM;
const FIG2_Y_MAX = 80;
const FIG2_Y_TICKS = [0, 20, 40, 60, 80];
const FIG2_LAST = NOISE_SIGMAS.length - 1;
const FIG2_HIT_SIZE = 47;
const FIG2_SVG_CLASS = "block h-auto w-full min-w-0 max-w-full";

const xAt = (i) => FIG2_MARGIN_LEFT + (i / FIG2_LAST) * FIG2_PLOT_W;
const yAt = (v) => FIG2_MARGIN_TOP + (1 - v / FIG2_Y_MAX) * FIG2_PLOT_H;

// Allocate each sigma's four targets to non-overlapping quadrants around
// their marks, ordered vertically so nearby series never steal a datum.
const FIG2_POINT_RANKS = NOISE_SIGMAS.map((_, i) => {
    const ranked = NOISE_BANDS.map((band, bandIndex) => ({
        bandIndex,
        mean: (band.min[i] + band.max[i]) / 2,
    })).sort((a, b) => b.mean - a.mean || a.bandIndex - b.bandIndex);
    const ranks = Array(NOISE_BANDS.length);
    ranked.forEach(({ bandIndex }, rank) => {
        ranks[bandIndex] = rank;
    });
    return ranks;
});

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

export const NoiseRobustnessBands = () => {
    const { activeIndex, activate, handleKeyDown, readout } = useChartKeyboardNavigation(
        NOISE_BANDS.length,
        NOISE_SIGMAS.length,
        FIG2_HINT,
        FIG2_READOUT,
    );

    return (
        <figure className="min-w-0">
            <div className={PAIRED_INSTRUMENT_ROW_CLASS}>
                <figcaption id="fig2-caption" aria-label="Figure 2 — Noise robustness by model family" className={`${CAPTION_CLASS} whitespace-nowrap`}>
                    <span className="text-accent">FIG. 02</span> — NOISE ROBUSTNESS
                </figcaption>
                <p aria-live="polite" className={`${READOUT_CLASS} min-w-0 whitespace-nowrap`}>
                    {readout}
                </p>
            </div>
            <p className={LOWER_NOTE_CLASS}>
                CURVES DIGITISED FROM THESIS FIG. 4.7 · σ = 0 VALUES EXACT
            </p>
            <p className="sr-only" id="fig2-desc">{FIG2_DESC}</p>
            <div className={SCROLL_CLASS}>
                <div className={LOWER_PLATE_CLASS}>
                <svg
                    viewBox={`0 0 ${FIG2_WIDTH} ${FIG2_HEIGHT}`}
                    style={{ maxWidth: FIG2_WIDTH }}
                    className={FIG2_SVG_CLASS}
                    role="grid"
                    aria-labelledby="fig2-caption"
                    aria-describedby="fig2-desc"
                    aria-activedescendant={`fig2-point-${activeIndex}`}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onFocus={() => activate(activeIndex)}
                >
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
                    </g>
                    <g role="row">
                        {NOISE_SIGMAS.map((sigma, i) => (
                            <text
                                key={sigma}
                                x={xAt(i)}
                                y={FIG2_HEIGHT - FIG2_MARGIN_BOTTOM + 16}
                                textAnchor="middle"
                                fill="rgb(var(--ink-muted-rgb))"
                                className="font-mono text-[9px]"
                                role="columnheader"
                                aria-label={`σ ${sigma}`}
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

                    {NOISE_BANDS.map((band, bandIndex) => {
                        const isEnsemble = band.family === "Ensemble";
                        const lineColor = isEnsemble ? "rgb(var(--accent-rgb))" : "rgb(var(--ink-muted-rgb) / 0.5)";
                        const lastMean = (band.min[FIG2_LAST] + band.max[FIG2_LAST]) / 2;
                        return (
                            <g key={band.family} role="row">
                                <path
                                    d={bandPath(band)}
                                    fill={isEnsemble ? "rgb(var(--accent-rgb) / 0.14)" : "rgb(var(--ink-muted-rgb) / 0.08)"}
                                    pointerEvents="none"
                                    aria-hidden="true"
                                />
                                <path
                                    d={centerPath(band)}
                                    fill="none"
                                    stroke={lineColor}
                                    strokeWidth={1.5}
                                    pointerEvents="none"
                                    aria-hidden="true"
                                />
                                <text
                                    x={xAt(FIG2_LAST) + 10}
                                    y={yAt(lastMean)}
                                    dominantBaseline="middle"
                                    fill={isEnsemble ? "rgb(var(--accent-rgb))" : "rgb(var(--ink-muted-rgb))"}
                                    pointerEvents="none"
                                    className="font-mono text-[9px]"
                                    role="rowheader"
                                >
                                    {band.family}
                                </text>
                                {NOISE_SIGMAS.map((sigma, i) => {
                                    const mean = (band.min[i] + band.max[i]) / 2;
                                    const label = `${band.family} · σ ${sigma} · mean ${mean.toFixed(1)}% F1 · minimum ${band.min[i].toFixed(1)}% F1 · maximum ${band.max[i].toFixed(1)}% F1`;
                                    const rank = FIG2_POINT_RANKS[i][bandIndex];
                                    const hitX = xAt(i) + (rank % 2 === 0 ? -FIG2_HIT_SIZE : 0);
                                    const hitY = yAt(mean) + (rank < 2 ? -FIG2_HIT_SIZE : 0);
                                    const index = bandIndex * NOISE_SIGMAS.length + i;
                                    return (
                                        <g
                                            key={`${band.family}-${sigma}`}
                                            id={`fig2-point-${index}`}
                                            role="gridcell"
                                            aria-label={label}
                                            aria-selected={index === activeIndex}
                                        >
                                            <rect
                                                x={hitX}
                                                y={hitY}
                                                width={FIG2_HIT_SIZE}
                                                height={FIG2_HIT_SIZE}
                                                fill="transparent"
                                                pointerEvents="all"
                                                onMouseEnter={() => activate(index)}
                                            />
                                            <circle cx={xAt(i)} cy={yAt(mean)} r={3} fill={lineColor} pointerEvents="none" aria-hidden="true" />
                                            {index === activeIndex && (
                                                <circle
                                                    cx={xAt(i)}
                                                    cy={yAt(mean)}
                                                    r={6.5}
                                                    fill="none"
                                                    stroke="rgb(var(--accent-rgb))"
                                                    strokeWidth={1.5}
                                                    pointerEvents="none"
                                                    aria-hidden="true"
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
            </div>
        </figure>
    );
};

// ---------------------------------------------------------------------------
// Fig. 3 — confusion matrix (6 true × 6 predicted emotions)
// ---------------------------------------------------------------------------

const FIG3_HINT = "Hover or focus a cell";
const FIG3_DESC = [
    "Figure 3 — confusion matrix across emotions. 6 true emotions by 6 predicted emotions, sample counts per cell.",
    "Keyboard: focus the chart, then use the arrow keys to move between cells; movement stops at the chart edges.",
    "Data by true emotion, predicted angry, happy, sad, neutral, excited, frustrated:",
    CONFUSION.map((rowValues, r) => {
        const rowSum = rowValues.reduce((sum, n) => sum + n, 0);
        const pcts = rowValues.map((value) => Math.round((value / rowSum) * 100));
        return `${EMOTIONS[r]}: ${rowValues.map((value, c) => `${EMOTIONS[c]} ${value} (${pcts[c]}%)`).join(", ")}`;
    }).join(". "),
].join(" ");
const FIG3_READOUT = (index) => {
    const r = Math.floor(index / EMOTIONS.length);
    const c = index % EMOTIONS.length;
    const rowValues = CONFUSION[r];
    const rowSum = rowValues.reduce((sum, n) => sum + n, 0);
    const pct = Math.round((rowValues[c] / rowSum) * 100);
    return `${EMOTIONS[r]} → ${EMOTIONS[c]} · ${rowValues[c]} (${pct}%)`;
};
const FIG3_PAD = 8;
const FIG3_ROW_LABEL_W = 118;
const FIG3_COL_W = 76;
const FIG3_ROW_H = 49;
const FIG3_HEADER_H = 62;
const FIG3_GRID_X = FIG3_PAD + FIG3_ROW_LABEL_W;
const FIG3_GRID_W = FIG3_COL_W * EMOTIONS.length;
const FIG3_WIDTH = FIG3_GRID_X + FIG3_GRID_W + FIG3_PAD;
const FIG3_HEIGHT = FIG3_HEADER_H + FIG3_ROW_H * EMOTIONS.length + FIG3_PAD;
const FIG3_MAX = 461;
const FIG3_SVG_CLASS = "block h-auto w-full min-w-0 max-w-full";

// The angry↔frustrated confusion (cells [0][5] and [5][0]) is the paper's
// stated finding — flagged with a small corner tick rather than a callout.
const isAmbiguityCell = (r, c) => (r === 0 && c === 5) || (r === 5 && c === 0);

export const ConfusionMatrix = () => {
    const { activeIndex, activate, handleKeyDown, readout } = useChartKeyboardNavigation(
        EMOTIONS.length,
        EMOTIONS.length,
        FIG3_HINT,
        FIG3_READOUT,
    );

    return (
        <figure className="min-w-0">
            <div className={PAIRED_INSTRUMENT_ROW_CLASS}>
                <figcaption id="fig3-caption" aria-label="Figure 3 — Confusion matrix across emotions" className={`${CAPTION_CLASS} whitespace-nowrap`}>
                    <span className="text-accent">FIG. 03</span> — CONFUSION MATRIX
                </figcaption>
                <p aria-live="polite" className={`${READOUT_CLASS} min-w-0 whitespace-nowrap`}>
                    {readout}
                </p>
            </div>
            <p className={LOWER_NOTE_CLASS}>
                EMBER CORNERS MARK ANGRY ↔ FRUSTRATED ERRORS
            </p>
            <p className="sr-only" id="fig3-desc">{FIG3_DESC}</p>
            <div className={SCROLL_CLASS}>
                <div className={LOWER_PLATE_CLASS}>
                <svg
                    viewBox={`0 0 ${FIG3_WIDTH} ${FIG3_HEIGHT}`}
                    style={{ maxWidth: FIG3_WIDTH }}
                    className={FIG3_SVG_CLASS}
                    role="grid"
                    aria-labelledby="fig3-caption"
                    aria-describedby="fig3-desc"
                    aria-activedescendant={`fig3-cell-${activeIndex}`}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onFocus={() => activate(activeIndex)}
                >
                    <g role="row">
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
                                    role="columnheader"
                                    aria-label={emotion}
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
                            <g key={EMOTIONS[r]} role="row">
                                <text
                                    x={FIG3_PAD}
                                    y={y + FIG3_ROW_H / 2}
                                    dominantBaseline="middle"
                                    fill="rgb(var(--ink-rgb))"
                                    className="font-mono text-[11px]"
                                    role="rowheader"
                                >
                                    {EMOTIONS[r]}
                                </text>
                                {rowValues.map((value, c) => {
                                    const t = value / FIG3_MAX;
                                    const pct = Math.round((value / rowSum) * 100);
                                    const label = `true ${EMOTIONS[r]} → predicted ${EMOTIONS[c]} · ${value} samples (${pct}% of row)`;
                                    const index = r * EMOTIONS.length + c;
                                    const x = FIG3_GRID_X + c * FIG3_COL_W;
                                    return (
                                        <g
                                            key={EMOTIONS[c]}
                                            id={`fig3-cell-${index}`}
                                            role="gridcell"
                                            aria-label={label}
                                            aria-selected={index === activeIndex}
                                        >
                                            <rect
                                                x={x + 1}
                                                y={y + 1}
                                                width={FIG3_COL_W - 2}
                                                height={FIG3_ROW_H - 2}
                                                fill={cellFill(t)}
                                                aria-hidden="true"
                                                pointerEvents="all"
                                                onMouseEnter={() => activate(index)}
                                            />
                                            <text
                                                x={x + FIG3_COL_W / 2}
                                                y={y + FIG3_ROW_H / 2}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill={cellText(t)}
                                                pointerEvents="none"
                                                aria-hidden="true"
                                                className="font-mono text-[12px]"
                                            >
                                                {value}
                                            </text>
                                            {isAmbiguityCell(r, c) && (
                                                <path
                                                    d={`M${x + FIG3_COL_W - 11},${y + 1} L${x + FIG3_COL_W - 1},${y + 1} L${x + FIG3_COL_W - 1},${y + 11} Z`}
                                                    fill="rgb(var(--accent-rgb))"
                                                    pointerEvents="none"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {index === activeIndex && (
                                                <rect
                                                    x={x + 1}
                                                    y={y + 1}
                                                    width={FIG3_COL_W - 2}
                                                    height={FIG3_ROW_H - 2}
                                                    fill="none"
                                                    stroke="rgb(var(--accent-rgb))"
                                                    strokeWidth={2}
                                                    pointerEvents="none"
                                                    aria-hidden="true"
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
            </div>
        </figure>
    );
};
