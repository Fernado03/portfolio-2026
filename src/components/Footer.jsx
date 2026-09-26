import { HERO_CONTENT } from "../constants";
import useBrowserValue from "../hooks/useBrowserValue";
import { ArrowUp } from "./ui/Icons";

const readYear = () => new Date().getFullYear();

export default function Footer() {
    // Read in the browser so a build from last December doesn't pin last year's date.
    const year = useBrowserValue(readYear, null);
    return (
        <footer className="border-t border-line">
            <div className="container-page flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
                <p>
                    © {year && `${year} `}
                    {HERO_CONTENT.name}
                </p>
                <p className="font-mono text-xs">Built with React, Tailwind CSS &amp; Vite</p>
                <a href="#top" className="flex items-center gap-2 transition-colors hover:text-ink">
                    Back to top <ArrowUp width={15} height={15} />
                </a>
            </div>
        </footer>
    );
}
