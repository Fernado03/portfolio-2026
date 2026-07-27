const SCALES = {
    major: "text-[clamp(2rem,4.5vw,3.25rem)]",
    minor: "text-[clamp(1.6rem,3vw,2.25rem)]",
};

const SectionHeader = ({ index, eyebrow, title, description, scale = "minor", className = "", ...props }) => {
    return (
        <div className={`mb-4 md:mb-8 ${className}`} {...props}>
            {(index || eyebrow) && (
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
                    {index && (
                        <>
                            <span className="text-ink-muted">{index}</span>
                            <span className="text-line px-1.5">/</span>
                        </>
                    )}
                    {eyebrow}
                </p>
            )}
            <h2 className={`mt-3 font-display ${SCALES[scale] ?? SCALES.minor} font-semibold tracking-[-0.01em] text-ink`}>
                {title}
            </h2>
            {description && (
                <p className="text-ink-muted max-w-[62ch] mt-4 leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
