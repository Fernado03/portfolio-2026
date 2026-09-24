import { useState } from "react";
import { FYP_CONTENT } from "../constants";
import { EMOTIONS, MODAL_RELIANCE, MODALITY_CONDITIONS } from "../constants/thesis";
import { resizedImage } from "../utils/image";
import AblationChart from "./charts/AblationChart";
import ConfusionChart from "./charts/ConfusionChart";
import RobustnessChart from "./charts/RobustnessChart";
import CountUp from "./ui/CountUp";
import { ArrowUpRight, Expand, FileText, GitHub, Trophy } from "./ui/Icons";
import Lightbox from "./ui/Lightbox";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";

// Headline numbers derived from the figure data so they can't drift from the charts.
const ENSEMBLE_F1 = MODAL_RELIANCE.find((row) => row[1] === "ensemble")[2];
const RESULTS = [
    { value: `${ENSEMBLE_F1}%`, label: "Weighted F1, ensemble" },
    { value: String(MODAL_RELIANCE.length), label: "Models benchmarked" },
    { value: String(MODALITY_CONDITIONS.filter((c) => c.endsWith("_only")).length), label: "Modalities fused" },
    { value: String(EMOTIONS.length), label: "Emotion classes" },
];

const FIGURES = [
    {
        id: "robustness",
        label: "Noise",
        title: "What happens when the inputs get noisy",
        caption:
            "Weighted F1 as Gaussian noise is added to every input. Each band spans the best and worst model in a family. Values above σ = 0 are read off the thesis plots, so treat them as approximate.",
        Chart: RobustnessChart,
    },
    {
        id: "ablation",
        label: "Missing inputs",
        title: "What happens when a sensor drops out",
        caption:
            "Weighted F1 for all 15 models when one or two modalities are removed. Classical models collapse without audio; contextual models and the ensemble degrade gracefully.",
        Chart: AblationChart,
    },
    {
        id: "confusion",
        label: "Confusion",
        title: "Which emotions get mixed up",
        caption:
            "Share of each true emotion's samples by predicted label. Sad is recognised most reliably (83%); the thesis's key failure mode is angry ↔ frustrated, with a quarter of angry samples labelled frustrated.",
        Chart: ConfusionChart,
    },
];

const award = resizedImage(FYP_CONTENT.award.image);
const AWARD_GALLERY = [{ ...award, alt: FYP_CONTENT.award.title, caption: FYP_CONTENT.award.title }];

export default function Research() {
    const [tab, setTab] = useState(0);
    const [certOpen, setCertOpen] = useState(null);
    const figure = FIGURES[tab];
    const { Chart } = figure;

    const links = [
        { href: FYP_CONTENT.demoLink, label: "Live presentation", icon: ArrowUpRight, primary: true },
        { href: FYP_CONTENT.thesisLink, label: "Read the thesis", icon: FileText },
        { href: FYP_CONTENT.githubLink, label: "Code", icon: GitHub },
    ].filter((link) => link.href);

    return (
        <Section
            id="research"
            index="02"
            eyebrow={FYP_CONTENT.tagline}
            title="Does emotion recognition survive the real world?"
            intro={FYP_CONTENT.description}
        >
            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                <Reveal>
                    <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-balance">{FYP_CONTENT.title}</h3>

                    <dl className="mt-6 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-line bg-line">
                        {RESULTS.map(({ value, label }, i) => (
                            <div key={label} className="flex flex-col-reverse justify-end bg-surface px-3 py-3.5">
                                <dt className="mt-1 text-[11px] leading-tight text-muted">{label}</dt>
                                <dd className={`font-display text-xl font-semibold tabular-nums tracking-tight sm:text-2xl ${i === 0 ? "text-accent" : ""}`}>
                                    <CountUp value={value} />
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <button
                        type="button"
                        onClick={() => setCertOpen(0)}
                        className="group mt-3 flex w-full items-center gap-4 rounded-xl border border-accent/30 bg-accent/[0.06] p-3 text-left transition-colors hover:bg-accent/10"
                    >
                        <img src={award.src} alt="" className="h-14 w-20 shrink-0 rounded-md object-cover" loading="lazy" decoding="async" />
                        <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                                <Trophy width={14} height={14} /> Award
                            </span>
                            <span className="mt-0.5 block text-sm font-medium">{FYP_CONTENT.award.title}</span>
                        </span>
                        <Expand width={16} height={16} className="mr-1 shrink-0 text-muted transition-colors group-hover:text-ink" />
                    </button>

                    <ol className="mt-8 space-y-5">
                        {FYP_CONTENT.features.map((feature, i) => {
                            const [head, ...parts] = feature.split(": ");
                            const rest = parts.join(": ");
                            return (
                                <li key={head} className="grid grid-cols-[2rem_1fr] gap-2">
                                    <span className="font-mono text-xs leading-6 text-accent">0{i + 1}</span>
                                    <p className="leading-relaxed text-muted">
                                        <span className="font-medium text-ink">{head}.</span> {rest.charAt(0).toUpperCase() + rest.slice(1)}
                                    </p>
                                </li>
                            );
                        })}
                    </ol>

                    <ul className="mt-8 flex flex-wrap gap-1.5">
                        {FYP_CONTENT.techStack.map((t) => (
                            <li key={t} className="chip">
                                {t}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-2 [&>a]:px-4">
                        {links.map(({ href, label, icon: Icon, primary }) => (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={primary ? "btn-primary" : "btn-ghost"}>
                                <Icon width={16} height={16} /> {label}
                            </a>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <figure className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
                        <div role="tablist" aria-label="Thesis figures" className="flex gap-1 rounded-full border border-line bg-bg p-1">
                            {FIGURES.map((f, i) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    role="tab"
                                    id={`fig-tab-${f.id}`}
                                    aria-selected={tab === i}
                                    aria-controls="fig-panel"
                                    onClick={() => setTab(i)}
                                    className={`flex-1 whitespace-nowrap rounded-full px-2 py-2 text-xs transition-colors sm:px-3 sm:text-sm ${
                                        tab === i ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div id="fig-panel" role="tabpanel" aria-labelledby={`fig-tab-${figure.id}`} className="mt-6">
                            <p className="eyebrow">
                                Fig. 0{tab + 1}
                            </p>
                            <h4 className="mt-2 font-display text-xl font-semibold tracking-tight">{figure.title}</h4>
                            <div className="mt-6">
                                <Chart key={figure.id} />
                            </div>
                            <figcaption className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">{figure.caption}</figcaption>
                        </div>
                    </figure>
                </Reveal>
            </div>

            <Lightbox items={AWARD_GALLERY} index={certOpen} onIndexChange={setCertOpen} onClose={() => setCertOpen(null)} />
        </Section>
    );
}
