import { useState } from "react";
import { CONFUSION, EMOTIONS } from "../../constants/thesis";

const SHORT = ["ang", "hap", "sad", "neu", "exc", "fru"];
const ROWS = CONFUSION.map((row) => {
    const total = row.reduce((a, b) => a + b, 0);
    return row.map((count) => ({ count, share: count / total }));
});
const MOVES = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
// The thesis's headline failure mode.
const isAngryFrustrated = (r, c) => (r === 0 && c === 5) || (r === 5 && c === 0);
const clamp = (v) => Math.min(EMOTIONS.length - 1, Math.max(0, v));

export default function ConfusionChart() {
    const [active, setActive] = useState(null);

    const onKeyDown = (e) => {
        const move = MOVES[e.key];
        if (!move) return;
        e.preventDefault();
        const [r, c] = active ?? [0, 0];
        setActive([clamp(r + move[0]), clamp(c + move[1])]);
    };

    let readout = "Hover a cell, or focus the table and use the arrow keys.";
    if (active) {
        const [r, c] = active;
        const { count, share } = ROWS[r][c];
        readout = `${r === c ? "Correct" : "Confused"}: true ${EMOTIONS[r]} → predicted ${EMOTIONS[c]} · ${count} samples (${Math.round(share * 100)}%)`;
    }

    return (
        <div>
            <p className="mb-3 min-h-[2.5em] font-mono text-[11px] leading-relaxed text-muted" aria-live="polite">
                {readout}
            </p>
            <table
                tabIndex={0}
                onKeyDown={onKeyDown}
                onFocus={() => setActive((a) => a ?? [0, 0])}
                onBlur={() => setActive(null)}
                onMouseLeave={() => setActive(null)}
                className="w-full table-fixed border-separate border-spacing-1 rounded-lg"
                aria-label="Confusion matrix. Rows are true emotions, columns are predicted emotions, values are the share of each true emotion."
            >
                <thead>
                    <tr>
                        <th className="w-14 whitespace-nowrap pb-1 text-left align-bottom font-mono text-[10px] font-normal text-muted sm:w-20">
                            true ↓
                        </th>
                        {EMOTIONS.map((e, c) => (
                            <th
                                key={e}
                                scope="col"
                                className={`pb-1 font-mono text-[10px] font-normal transition-colors ${active?.[1] === c ? "text-ink" : "text-muted"}`}
                            >
                                <span className="sm:hidden">{SHORT[c]}</span>
                                <span className="hidden sm:inline">{e}</span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {ROWS.map((row, r) => (
                        <tr key={EMOTIONS[r]}>
                            <th
                                scope="row"
                                className={`text-left font-mono text-[10px] font-normal transition-colors sm:text-[11px] ${active?.[0] === r ? "text-ink" : "text-muted"}`}
                            >
                                {EMOTIONS[r]}
                            </th>
                            {row.map(({ count, share }, c) => {
                                const dim = active && active[0] !== r && active[1] !== c;
                                const isActive = active && active[0] === r && active[1] === c;
                                return (
                                    <td
                                        key={c}
                                        onMouseEnter={() => setActive([r, c])}
                                        title={`${EMOTIONS[r]} → ${EMOTIONS[c]}: ${count}`}
                                        className={`relative h-9 rounded-md text-center font-mono text-[11px] tabular-nums transition-opacity duration-150 sm:h-11 ${
                                            isActive ? "outline outline-2 outline-offset-1 outline-ink" : ""
                                        }`}
                                        style={{
                                            background: `rgb(var(--accent) / ${0.05 + share * 0.9})`,
                                            color: share > 0.4 ? "rgb(var(--bg))" : "rgb(var(--ink) / 0.8)",
                                            opacity: dim ? 0.3 : 1,
                                        }}
                                    >
                                        {Math.round(share * 100)}
                                        {isAngryFrustrated(r, c) && (
                                            <span aria-hidden className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-series-statistical" />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-series-statistical" aria-hidden /> angry ↔ frustrated
                </span>
                <span>% of each true emotion</span>
            </div>
        </div>
    );
}
