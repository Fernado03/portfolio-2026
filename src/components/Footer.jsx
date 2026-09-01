const Footer = () => {
    return (
        <footer className="border-t border-line">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                    Set in Geist — © {new Date().getFullYear()}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent2">
                    Graduating Nov 2026 — open to DS/AI roles
                </p>
            </div>
        </footer>
    );
};

export default Footer;
