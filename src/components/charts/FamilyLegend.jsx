import { FAMILIES, FAMILY_ORDER } from "./families";

export default function FamilyLegend({ focus, onFocus }) {
    return (
        <ul className="flex flex-wrap gap-x-1 gap-y-1">
            {FAMILY_ORDER.map((key) => {
                const dimmed = focus && focus !== key;
                return (
                    <li key={key}>
                        <button
                            type="button"
                            onClick={() => onFocus(focus === key ? null : key)}
                            aria-pressed={focus === key}
                            className={`flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs transition-opacity hover:bg-surface-2 ${dimmed ? "opacity-40" : ""}`}
                        >
                            <span className={`h-2.5 w-2.5 rounded-sm ${FAMILIES[key].swatch}`} aria-hidden />
                            {FAMILIES[key].label}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
