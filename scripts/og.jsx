import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "../src/index.css";
import FusionGraphic from "../src/components/FusionGraphic";
import { HERO_CONTENT } from "../src/constants";

// 1200×630 social card: the hero headline next to a still of the hero's thesis graphic
// (see og.html for the capture steps).
export default function OgCard() {
    const [ready, setReady] = useState(false);
    const stats = HERO_CONTENT.proof.slice(0, 3);

    useEffect(() => {
        document.fonts.ready.then(() => requestAnimationFrame(() => setReady(true)));
    }, []);

    return (
        <main data-ready={ready} className="relative flex overflow-hidden bg-bg text-ink" style={{ width: 1200, height: 630 }}>
            <div aria-hidden className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_75%_85%_at_72%_45%,black,transparent)]" />
            <div aria-hidden className="absolute bg-[radial-gradient(closest-side,rgb(var(--accent)/0.12),transparent)]" style={{ right: -300, top: -100, width: 1000, height: 840 }} />

            <div className="relative z-10 flex flex-col justify-between" style={{ width: 640, padding: "64px 0 60px 76px" }}>
                <div>
                    <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 text-sm text-muted">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {HERO_CONTENT.availabilityShort}
                    </p>
                    <h1 className="mt-8 font-display font-semibold" style={{ fontSize: 78, lineHeight: 0.95, letterSpacing: "-0.035em" }}>
                        Models that leave the <span className="text-accent">notebook.</span>
                    </h1>
                    <p className="mt-6 text-2xl text-muted">
                        <span className="font-semibold text-ink">{HERO_CONTENT.shortName}</span> · {HERO_CONTENT.title}
                    </p>
                </div>
                <dl className="grid grid-cols-3 gap-6 border-t border-line pt-6">
                    {stats.map(({ value, label }) => (
                        <div key={label} className="flex flex-col-reverse justify-end">
                            <dt className="mt-1 text-sm leading-snug text-muted">{label}</dt>
                            <dd className="font-display text-4xl font-semibold tracking-tight">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="absolute" style={{ right: 56, top: "50%", width: 440, transform: "translateY(-50%)" }}>
                <FusionGraphic autoPlay={false} defaultIndex={4} />
            </div>
        </main>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <OgCard />
    </StrictMode>,
);
