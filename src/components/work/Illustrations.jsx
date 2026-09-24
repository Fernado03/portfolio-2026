// Schematic visuals for confidential client projects: they show how each system works without
// using any client material. Motion runs on card hover, or always when `live` (inside the dialog).

// Literal class pairs so Tailwind's scanner can see both variants.
const MOTION = {
    flow: ["animate-flow", "group-hover:animate-flow"],
    stream: ["animate-stream", "group-hover:animate-stream"],
    scan: ["animate-scan", "group-hover:animate-scan"],
    playhead: ["animate-playhead", "group-hover:animate-playhead"],
};
const on = (live, name) => MOTION[name][live ? 0 : 1];

const Dots = () => (
    <div
        aria-hidden
        className="absolute inset-0 bg-surface-2 [background-image:radial-gradient(rgb(var(--line))_1px,transparent_1px)] [background-size:16px_16px]"
    />
);

const Tag = ({ x, y, w, children }) => (
    <g>
        <rect x={x} y={y} width={w} height="20" rx="10" className="fill-bg stroke-line" />
        <text x={x + w / 2} y={y + 13.5} textAnchor="middle" className="fill-muted font-mono text-[10px]">
            {children}
        </text>
    </g>
);

export function RagIllustration({ live = false }) {
    const flow = on(live, "flow");
    return (
        <div className="absolute inset-0">
            <Dots />
            <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
                <text x="24" y="34" className="fill-muted font-mono text-[11px]">
                    hybrid_retrieval.stream()
                </text>
                <Tag x={364} y={20} w={92}>
                    illustration
                </Tag>

                {/* Query */}
                <rect x="24" y="58" width="192" height="52" rx="14" className="fill-bg stroke-line" />
                <circle cx="46" cy="84" r="10" className="fill-ink/90" />
                <text x="46" y="88" textAnchor="middle" className="fill-bg font-mono text-[11px] font-bold">
                    Q
                </text>
                <rect x="64" y="75" width="128" height="7" rx="3.5" className="fill-ink/70" />
                <rect x="64" y="89" width="84" height="7" rx="3.5" className="fill-muted/50" />

                {/* Query fans out to lexical and vector retrievers */}
                {[
                    "M216 84 C 234 84, 234 66, 250 66",
                    "M216 84 C 234 84, 234 104, 250 104",
                    "M330 66 C 350 66, 350 84, 360 84",
                    "M330 104 C 350 104, 350 84, 360 84",
                ].map((d) => (
                    <g key={d}>
                        <path d={d} fill="none" className="stroke-line" strokeWidth="1.5" />
                        <path d={d} fill="none" className={`stroke-accent ${flow}`} strokeWidth="1.5" strokeDasharray="3 9" />
                    </g>
                ))}
                <rect x="250" y="52" width="80" height="28" rx="8" className="fill-bg stroke-series-statistical" />
                <text x="290" y="70" textAnchor="middle" className="fill-series-statistical font-mono text-[11px]">
                    BM25
                </text>
                <rect x="250" y="90" width="80" height="28" rx="8" className="fill-bg stroke-series-contextual" />
                <text x="290" y="108" textAnchor="middle" className="fill-series-contextual font-mono text-[11px]">
                    FAISS
                </text>
                <circle cx="376" cy="84" r="16" className="fill-bg stroke-accent" strokeWidth="1.5" />
                <text x="376" y="88" textAnchor="middle" className="fill-accent font-mono text-[10px]">
                    k=3
                </text>
                <text x="400" y="88" className="fill-muted font-mono text-[10px]">
                    rerank
                </text>

                {/* Retrieved documents */}
                {[
                    ["PDF", 252, "fill-series-statistical"],
                    ["DOCX", 322, "fill-series-contextual"],
                    ["XLSX", 392, "fill-accent"],
                ].map(([label, x, band]) => (
                    <g key={label}>
                        <path d={`M376 100 L ${x + 30} 140`} className="stroke-line" strokeWidth="1.2" />
                        <rect x={x} y="140" width="60" height="46" rx="8" className="fill-bg stroke-line" />
                        <rect x={x} y="140" width="60" height="6" rx="3" className={band} />
                        <text x={x + 30} y="168" textAnchor="middle" className="fill-ink font-mono text-[10px]">
                            {label}
                        </text>
                        <rect x={x + 14} y="175" width="32" height="4" rx="2" className="fill-muted/40" />
                        <path d={`M${x + 30} 186 L ${x + 30} 208`} className="stroke-line" strokeWidth="1.2" />
                    </g>
                ))}

                {/* Streamed, cited answer */}
                <rect x="96" y="208" width="360" height="72" rx="16" className="fill-accent/[0.06] stroke-accent/60" />
                <circle cx="122" cy="232" r="10" className="fill-accent" />
                <text x="122" y="236" textAnchor="middle" className="fill-bg font-mono text-[11px] font-bold">
                    A
                </text>
                {[
                    [226, 280, "0s"],
                    [242, 236, "0.35s"],
                    [258, 150, "0.7s"],
                ].map(([y, w, delay]) => (
                    <rect
                        key={y}
                        x="144"
                        y={y}
                        width={w}
                        height="7"
                        rx="3.5"
                        className={`origin-left fill-ink/70 [transform-box:fill-box] ${on(live, "stream")}`}
                        style={{ animationDelay: delay }}
                    />
                ))}
                {[
                    ["1", 302],
                    ["2", 326],
                ].map(([n, x]) => (
                    <g key={n}>
                        <rect x={x} y="253" width="20" height="16" rx="5" className="fill-bg stroke-accent/60" />
                        <text x={x + 10} y="264.5" textAnchor="middle" className="fill-accent font-mono text-[9px]">
                            {n}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

export function VisionIllustration({ live = false }) {
    return (
        <div className="absolute inset-0 bg-[#0b0e13]">
            <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
                {/* Top-down view of three wash bays */}
                <rect x="0" y="44" width="480" height="196" className="fill-surface-2/60" />
                {[160, 320].map((x) => (
                    <line key={x} x1={x} x2={x} y1="44" y2="240" className="stroke-muted/40" strokeWidth="2" strokeDasharray="10 8" />
                ))}
                {["BAY 1", "BAY 2", "BAY 3"].map((label, i) => (
                    <text key={label} x={80 + i * 160} y="64" textAnchor="middle" className="fill-muted/70 font-mono text-[10px] tracking-widest">
                        {label}
                    </text>
                ))}

                {/* Vehicle in bay 2 */}
                <rect x="196" y="98" width="88" height="128" rx="24" className="fill-[#2b3342]" />
                <rect x="206" y="116" width="68" height="28" rx="9" className="fill-[#5a6a84]/70" />
                <rect x="208" y="188" width="64" height="18" rx="6" className="fill-[#5a6a84]/50" />
                {[
                    [190, 112],
                    [284, 112],
                    [190, 196],
                    [284, 196],
                ].map(([x, y]) => (
                    <rect key={`${x}-${y}`} x={x} y={y} width="6" height="20" rx="3" className="fill-[#151a22]" />
                ))}
                <rect x="186" y="88" width="108" height="148" rx="4" fill="none" className="stroke-accent" strokeWidth="2" />
                <rect x="186" y="72" width="94" height="17" rx="3" className="fill-accent" />
                <text x="192" y="84.5" className="fill-bg font-mono text-[10px] font-bold">
                    vehicle 0.97
                </text>

                {/* Plate read, masked */}
                <rect x="216" y="214" width="48" height="12" rx="2" fill="none" className="stroke-series-statistical" strokeWidth="1.5" />
                <path d="M264 220 L 300 220" className="stroke-series-statistical" strokeWidth="1.2" />
                <rect x="300" y="208" width="112" height="24" rx="5" className="fill-bg stroke-series-statistical" />
                <text x="310" y="224" className="fill-series-statistical font-mono text-[10px]">
                    OCR ▮▮▮ ▮▮▮▮
                </text>

                {/* Structured record emitted per session */}
                <rect x="340" y="92" width="120" height="72" rx="8" className="fill-bg/90 stroke-line" />
                <text x="352" y="112" className="fill-muted font-mono text-[10px]">
                    record
                </text>
                {[
                    ["bay", "2"],
                    ["service", "full"],
                    ["plate", "•••"],
                ].map(([k, v], i) => (
                    <text key={k} x="352" y={128 + i * 13} className="font-mono text-[10px]">
                        <tspan className="fill-muted">{k}: </tspan>
                        <tspan className="fill-ink">{v}</tspan>
                    </text>
                ))}

                <line x1="0" x2="480" y1="44" y2="44" className={`stroke-accent/70 ${on(live, "scan")}`} strokeWidth="1.5" />

                {/* Camera overlay */}
                <circle cx="30" cy="26" r="5" className="fill-red-500" />
                <text x="42" y="30" className="fill-ink font-mono text-[11px]">
                    REC · CAM-02
                </text>
                <Tag x={364} y={16} w={92}>
                    illustration
                </Tag>

                {/* Wash-action timeline */}
                {[
                    ["rinse", 24, 104, "fill-series-contextual/30"],
                    ["foam", 128, 116, "fill-ink/15"],
                    ["brush", 244, 100, "fill-series-statistical/30"],
                    ["dry", 344, 112, "fill-accent/25"],
                ].map(([label, x, w, fill]) => (
                    <g key={label}>
                        <rect x={x} y="252" width={w - 4} height="28" rx="6" className={fill} />
                        <text x={x + 10} y="270" className="fill-ink/80 font-mono text-[10px]">
                            {label}
                        </text>
                    </g>
                ))}
                <line x1="24" x2="24" y1="246" y2="286" className={`stroke-ink ${on(live, "playhead")}`} strokeWidth="2" />
            </svg>
        </div>
    );
}
