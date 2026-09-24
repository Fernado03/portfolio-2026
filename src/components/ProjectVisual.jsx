import { resizedImage } from "../utils/image";
import { Lock } from "./ui/Icons";
import { RagIllustration, VisionIllustration } from "./work/Illustrations";

const ILLUSTRATIONS = {
    "ki-konnekt": RagIllustration,
    "cctv-records": VisionIllustration,
};

// Row segment widths in % of the card, drawn as redacted text lines.
const REDACTED = [
    [48, 30],
    [22, 40, 14],
    [60, 26],
    [18, 34, 28],
    [52],
];

function Redacted() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,rgb(var(--surface-2))_0_10px,rgb(var(--surface))_10px_20px)]">
            <div className="w-[62%] max-w-sm rounded-xl border border-line bg-bg/90 p-4 shadow-xl shadow-black/40 sm:p-5">
                <span className="mb-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                    <Lock width={12} height={12} /> Confidential
                </span>
                <div className="space-y-2" aria-hidden>
                    {REDACTED.map((row, r) => (
                        <div key={r} className="flex gap-1.5">
                            {row.map((w, i) => (
                                <span key={i} className="h-2 rounded-full bg-line" style={{ width: `${w}%` }} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// `live` is the dialog view: full colour and always-on motion. Cards stay muted until hovered
// so eight differently branded covers read as one set. Callers supply positioning and size.
// `backdrop` adds a blurred copy behind the cover for when fitClass letterboxes it (object-contain).
export default function ProjectVisual({ project, sizes, live = false, backdrop = false, fitClass = "object-cover object-top", className = "" }) {
    if (!project.image) {
        const Illustration = ILLUSTRATIONS[project.slug];
        return (
            <div className={`overflow-hidden bg-surface-2 ${className}`}>
                {Illustration ? <Illustration live={live} /> : <Redacted />}
                {project.confidentialNote && <p className="sr-only">{project.confidentialNote}</p>}
            </div>
        );
    }

    const img = resizedImage(project.image);
    const muted = live
        ? ""
        : "group-hover:brightness-100 group-hover:saturate-100 group-focus-within:brightness-100 group-focus-within:saturate-100 [@media(hover:hover)]:brightness-[.8] [@media(hover:hover)]:saturate-[.35]";
    return (
        <div className={`overflow-hidden bg-surface-2 ${className}`}>
            {backdrop && (
                <img src={img.src} alt="" aria-hidden className={`absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl ${muted}`} />
            )}
            <img
                src={img.src}
                srcSet={img.srcSet}
                sizes={sizes}
                alt={`${project.title} cover`}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full transition duration-500 ease-out ${fitClass} ${
                    live ? "" : `group-hover:scale-[1.03] ${muted}`
                }`}
            />
        </div>
    );
}
