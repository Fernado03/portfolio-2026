import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { MODAL_RELIANCE, MODALITY_CONDITIONS } from "../../constants/thesis";
import { rovingKeyDown } from "../../utils/roving";
import { FAMILIES } from "./families";
import FamilyLegend from "./FamilyLegend";

const CONDITION_LABELS = {
    baseline: "All inputs",
    no_audio: "No audio",
    no_visual: "No visual",
    no_text: "No text",
    audio_only: "Audio only",
    visual_only: "Visual only",
    text_only: "Text only",
};
const X_MAX = 75;

export default function AblationChart() {
    const [cond, setCond] = useState(0);
    const [focus, setFocus] = useState(null);

    const rows = useMemo(
        () =>
            MODAL_RELIANCE.map(([model, family, ...values]) => ({ model, family, value: values[cond] })).sort(
                (a, b) => b.value - a.value,
            ),
        [cond],
    );

    return (
        <div>
            <div role="radiogroup" aria-label="Input condition" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
                {MODALITY_CONDITIONS.map((c, i) => (
                    <button
                        key={c}
                        type="button"
                        role="radio"
                        aria-checked={cond === i}
                        tabIndex={cond === i ? 0 : -1}
                        onClick={() => setCond(i)}
                        onKeyDown={(e) => rovingKeyDown(e, i, MODALITY_CONDITIONS.length, setCond)}
                        className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            cond === i ? "border-accent bg-accent text-bg" : "border-line text-muted hover:border-muted/60 hover:text-ink"
                        }`}
                    >
                        {CONDITION_LABELS[c]}
                    </button>
                ))}
            </div>

            <ol className="mt-5 space-y-1" aria-label={`Weighted F1 by model, ${CONDITION_LABELS[MODALITY_CONDITIONS[cond]]}`}>
                {rows.map((r) => {
                    const dimmed = focus && focus !== r.family;
                    return (
                        <m.li
                            layout="position"
                            transition={{ type: "spring", stiffness: 380, damping: 36 }}
                            key={r.model}
                            className={`grid grid-cols-[8.5rem_minmax(0,1fr)_2.5rem] items-center gap-3 transition-opacity sm:grid-cols-[10rem_minmax(0,1fr)_2.75rem] ${dimmed ? "opacity-30" : ""}`}
                        >
                            <span className="truncate text-xs text-muted" title={r.model}>
                                {r.model}
                            </span>
                            <span className="h-3.5 rounded-sm bg-line/40">
                                <span
                                    className="block h-full rounded-sm transition-[width] duration-500 ease-out"
                                    style={{ width: `${(r.value / X_MAX) * 100}%`, background: FAMILIES[r.family].color }}
                                />
                            </span>
                            <span className="text-right font-mono text-xs tabular-nums text-ink">{r.value.toFixed(1)}</span>
                        </m.li>
                    );
                })}
            </ol>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <FamilyLegend focus={focus} onFocus={setFocus} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">weighted F1 %</span>
            </div>
        </div>
    );
}
