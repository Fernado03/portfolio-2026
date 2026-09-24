import { HERO_CONTENT } from "../constants";
import { ArrowUp } from "./ui/Icons";

export default function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="container-page flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
                <p>
                    © {new Date().getFullYear()} {HERO_CONTENT.name}
                </p>
                <p className="font-mono text-xs">Built with React, Tailwind CSS &amp; Vite</p>
                <a href="#top" className="flex items-center gap-2 transition-colors hover:text-ink">
                    Back to top <ArrowUp width={15} height={15} />
                </a>
            </div>
        </footer>
    );
}
