const SectionHeader = ({ index, eyebrow, title, description, className = "", ...props }) => {
    const kicker = [index, eyebrow].filter(Boolean).join(" — ");

    return (
        <div className={`mb-8 border-t border-line pt-6 md:mb-10 ${className}`} {...props}>
            {kicker && (
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {kicker}
                </p>
            )}
            <h2 className="mt-4 font-sans text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-tight text-ink">
                {title}
            </h2>
            {description && (
                <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
